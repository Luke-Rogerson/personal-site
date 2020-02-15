import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import CreateIcon from '@material-ui/icons/Create'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import EmailIcon from '@material-ui/icons/Email'
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
        email: string
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
            email
          }
        }
      }
    }
  `)

  const { github, linkedin, email } = contactData.site.siteMetadata.contacts

  return (
    <Icons>
      <Icon name='Blog' component={CreateIcon} color='primary' to='/blog' />
      <Icon name='GitHub' component={GitHubIcon} href={github} />
      <Icon name='LinkedIn' component={LinkedInIcon} href={linkedin} />
      <Icon name='Contact Me' component={EmailIcon} href={`mailto:${email}`} />
    </Icons>
  )
}
