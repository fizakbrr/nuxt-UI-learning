import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toArticle, dummyPostSchema } from './content.ts'

const samplePost = {
  id: 1,
  title: 'A short post',
  body: 'x'.repeat(200),
  tags: ['history', 'american'],
  reactions: { likes: 10, dislikes: 2 },
  views: 500,
}

test('dummyPostSchema accepts a well-formed DummyJSON post', () => {
  assert.doesNotThrow(() => dummyPostSchema.parse(samplePost))
})

test('dummyPostSchema rejects a malformed post', () => {
  assert.throws(() => dummyPostSchema.parse({ id: 1, title: 'Missing fields' }))
})

test('toArticle truncates a long body into a shorter excerpt', () => {
  const article = toArticle(samplePost)
  assert.ok(article.excerpt.length < samplePost.body.length)
  assert.ok(article.excerpt.endsWith('...'))
})

test('toArticle keeps a short body as the excerpt verbatim', () => {
  const article = toArticle({ ...samplePost, body: 'short body' })
  assert.equal(article.excerpt, 'short body')
})

test('toArticle capitalizes the first tag as the category', () => {
  const article = toArticle(samplePost)
  assert.equal(article.category, 'History')
})

test('toArticle falls back to a general category when there are no tags', () => {
  const article = toArticle({ ...samplePost, tags: [] })
  assert.equal(article.category, 'General')
})

test('toArticle uses the post id as the slug', () => {
  const article = toArticle({ ...samplePost, id: 42 })
  assert.equal(article.slug, '42')
})
