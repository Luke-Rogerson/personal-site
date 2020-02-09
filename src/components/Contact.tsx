import React from 'react'
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

export const Contact: React.FC = () => {
  return (
    <Icons>
      <Icon name='Blog' component={CreateIcon} color='primary' href='ysy' />
      <Icon name='GitHub' component={GitHubIcon} href='www.github.com/' />
      <Icon name='LinkedIn' component={LinkedInIcon} href='www.linkedin.com/' />
    </Icons>
  )
}
