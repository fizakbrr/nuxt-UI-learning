import { z } from 'zod'

const seoSchema = z.object({
  description: z.string(),
  image: z.string().optional(),
})

const blockSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('hero'),
    title: z.string(),
    description: z.string().optional(),
    links: z
      .array(z.object({ label: z.string(), to: z.string(), icon: z.string().optional() }))
      .optional(),
  }),
  z.object({
    type: z.literal('features'),
    title: z.string().optional(),
    items: z.array(z.object({ title: z.string(), description: z.string() })),
  }),
  z.object({
    type: z.literal('richtext'),
    body: z.string(),
  }),
])

export const pageSchema = z.object({
  slug: z.string(),
  title: z.string(),
  seo: seoSchema,
  blocks: z.array(blockSchema),
})

export type Page = z.infer<typeof pageSchema>

/** content/ is mounted as a Nitro server asset under `assets:content`; unstorage keys use `:` as the path separator regardless of OS. */
async function findKey(folder: string, slug: string) {
  const keys = await useStorage('assets:content').getKeys()
  return keys.find(key => key.endsWith(`${folder}:${slug}.json`))
}

export async function getPage(slug: string): Promise<Page | null> {
  const key = await findKey('pages', slug)
  if (!key) return null
  return pageSchema.parse(await useStorage('assets:content').getItem(key))
}

/**
 * Articles are backed by DummyJSON (https://dummyjson.com/posts), a public demo API,
 * not local content. This is the site's real external trust boundary: the zod schema
 * below validates a third party's response shape, not our own file content.
 */
export const dummyPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  body: z.string(),
  tags: z.array(z.string()),
  reactions: z.object({ likes: z.number(), dislikes: z.number() }),
  views: z.number(),
})

const dummyPostListSchema = z.object({
  posts: z.array(dummyPostSchema),
  total: z.number(),
})

export interface Article {
  slug: string
  title: string
  excerpt: string
  image: string
  category: string
  views: number
  likes: number
  body: string
}

const EXCERPT_LENGTH = 140

export function toArticle(post: z.infer<typeof dummyPostSchema>): Article {
  const category = post.tags[0] ?? 'general'
  return {
    slug: String(post.id),
    title: post.title,
    excerpt:
      post.body.length > EXCERPT_LENGTH
        ? `${post.body.slice(0, EXCERPT_LENGTH).trimEnd()}...`
        : post.body,
    image: `https://picsum.photos/seed/post-${post.id}/1200/700`,
    category: category.charAt(0).toUpperCase() + category.slice(1),
    views: post.views,
    likes: post.reactions.likes,
    body: post.body,
  }
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export async function listArticles(
  query: string,
  page: number,
  limit: number,
): Promise<Paginated<Article>> {
  const skip = (page - 1) * limit
  const raw = query
    ? await $fetch('https://dummyjson.com/posts/search', { query: { q: query, limit, skip } })
    : await $fetch('https://dummyjson.com/posts', { query: { limit, skip } })

  const data = dummyPostListSchema.parse(raw)
  return {
    items: data.posts.map(toArticle),
    total: data.total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(data.total / limit)),
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!/^\d+$/.test(slug)) return null

  try {
    const raw = await $fetch(`https://dummyjson.com/posts/${slug}`)
    return toArticle(dummyPostSchema.parse(raw))
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
      return null
    }
    throw error
  }
}
