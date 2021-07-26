import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm } from '../utils/typography'

interface HeaderProps {
  location?: Location
  title?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

declare const __PATH_PREFIX__: string

export const Header: React.FC<HeaderProps> = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const data = useStaticQuery(graphql`
    query AvatarQuery {
      avatar: file(relativePath: { eq: "profile-pic.jpg" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const { avatar } = data

  if (location && location.pathname === rootPath) {
    return (
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        <Container>
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={'Luke Rogerson'}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              height: 100,
              width: 100,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <h1
            style={{
              margin: 0,
            }}
          >
            {title ?? 'Luke Rogerson'}
          </h1>
        </Container>
      </Link>
    )
  } else {
    return (
      <Link
        style={{
          boxShadow: `none`,
          textDecoration: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        <Container>
          <Image
            fixed={avatar.childImageSharp.fixed}
            alt={'Luke Rogerson'}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              height: 50,
              width: 50,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <h3
            style={{
              margin: 0,
            }}
          >
            {title ?? 'Luke Rogerson'}
          </h3>
        </Container>
      </Link>
    )
  }
}
