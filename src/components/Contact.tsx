import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import CreateIcon from '@material-ui/icons/Create'
import { Icon } from './Icon'

const Icons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`

interface ContactResponse {
  site: {
    siteMetadata: {
      contacts: {
        github: string
        linkedin: string
      }
    }
  }
}

export const Contact: React.FC = () => {
  const contactData = useStaticQuery<ContactResponse>(graphql`
    query ContactQuery {
      site {
        siteMetadata {
          contacts {
            github
            linkedin
          }
        }
      }
    }
  `)

  const { github, linkedin } = contactData.site.siteMetadata.contacts

  return (
    <Icons>
      <Icon name='Blog' component={CreateIcon} color='primary' to='/blog' />
      <Icon name='GitHub' component={GitHubIcon} href={github} />
      <Icon name='LinkedIn' component={LinkedInIcon} href={linkedin} />
    </Icons>
  )
}
