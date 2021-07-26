import React from 'react'
import { graphql } from 'gatsby'

import Bio from '../components/Bio'
import { Layout } from '../components/Layout'
import SEO from '../components/SEO'
import { Contact } from '../components/Contact'

import styled from 'styled-components'
import { Header } from '../components/Header'

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

const Container = styled.div`
  height: 100%;
  display: flex;
  /* padding-top: 200px; */
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 720px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const Home: React.FC<Props> = ({ location, data }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title='Home' />
      <Container>
        <Header location={location} />
        <div>
          <Bio />
          <Contact />
        </div>
      </Container>
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
