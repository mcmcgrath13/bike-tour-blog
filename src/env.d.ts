interface PostImage {
  image: {
    id: string
    publicURL: string
  }
  caption?: string
}

interface Location {
  coordinates: string
  state: string
  town: string
}
