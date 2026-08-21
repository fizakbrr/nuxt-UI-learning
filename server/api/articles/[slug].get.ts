export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug')!
  const article = await getArticle(slug)

  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Article not found' })
  }

  return article
})
