export default defineEventHandler(async event => {
  const { q = '', page = '1', limit = '6' } = getQuery(event)

  return await listArticles(String(q).trim(), Number(page) || 1, Number(limit) || 6)
})
