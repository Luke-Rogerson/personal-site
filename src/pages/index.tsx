import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/bio'
import { Layout } from '../components/layout'
import SEO from '../components/seo'
import { Contact } from '../components/Contact'

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
      <Contact />
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
