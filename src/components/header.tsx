import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { rhythm, scale } from '../utils/typography'

interface HeaderProps {
  location?: Location
  title: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

export const Header: React.FC<HeaderProps> = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`

  const data = useStaticQuery(graphql`
    query AvatarQuery {
      avatarBig: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 100, height: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      avatarSmall: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const { avatarBig, avatarSmall } = data

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
            fixed={avatarBig.childImageSharp.fixed}
            alt={'Luke Rogerson'}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 100,
              borderRadius: `100%`,
            }}
            imgStyle={{
              borderRadius: `50%`,
            }}
          />
          <h1
            style={{
              ...scale(1.5),
              margin: 0,
            }}
          >
            {title}
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
            fixed={avatarSmall.childImageSharp.fixed}
            alt={'Luke Rogerson'}
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              minWidth: 50,
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
            {title}
          </h3>
        </Container>
      </Link>
    )
  }
}
