module '*.jpeg';
module '*.svg';

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

interface Node {
  node: {
    frontmatter: {
      date: string
      title: string
      images: PostImage[]
    }
    parent: {
      relativeDirectory: string
    }
  }
}
