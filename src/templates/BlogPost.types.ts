export interface BlogPostProps {
  location: Location
  data: {
    site: {
      siteMetadata: {
        title: string
        author: string
      }
    }
    markdownRemark: {
      id: number
      html: string
      frontmatter: Frontmatter
      fields: {
        slug: string
      }
      excerpt: string
    }
  }
  /** Typing here isn't good enough! */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: any
}

interface Frontmatter {
  date: string
  title: string
  path: string
  description: string
}
