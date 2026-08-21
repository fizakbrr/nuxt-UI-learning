export default ({
  title = 'Nuxt UI Learning',
  description = 'A small file-based CMS built with Nuxt 4 and Nuxt UI',
  image = '/og.png',
  type = 'website',
}) => {
  return useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogType: type,
    twitterImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary',
  })
}
