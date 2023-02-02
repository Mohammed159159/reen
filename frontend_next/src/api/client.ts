import SanityClient from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

const client = SanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2023-02-01', // use current UTC date - see "specifying API version"!
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})


const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export {client, urlFor}