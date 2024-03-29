import React from 'react'
import { graphql } from 'gatsby'

import { Layout } from '../components/Layout'
import SEO from '../components/SEO'

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
  location: Location
}

const NotFoundPage: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='404: Not Found' />
      <h1>Not Found</h1>
      <p>This route doesn&#39;t exist...</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
