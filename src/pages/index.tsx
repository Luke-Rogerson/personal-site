import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/bio'
import { Layout } from '../components/layout'
import SEO from '../components/seo'

interface Props {
  location: Location
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
  }
}

const Home: React.FC<Props> = ({ location, data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='Home' />
      <Bio />
      <Link to='/blog'>Read my blog</Link>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
