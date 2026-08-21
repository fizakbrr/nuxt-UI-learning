export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug') || 'home'
  const page = await getPage(slug)

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' })
  }

  return page
})
