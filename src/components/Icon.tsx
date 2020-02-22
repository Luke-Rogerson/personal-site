import React, { AnchorHTMLAttributes } from 'react'
import { Link, GatsbyLinkProps } from 'gatsby'
import { SvgIcon, SvgIconProps } from '@material-ui/core'
import styled from 'styled-components'

type BaseIconProps = {
  name: string
}

type InternalLinkIcon = BaseIconProps &
  GatsbyLinkProps<unknown> &
  SvgIconProps & {
    to: string
    href?: undefined
  }

type ExternalLinkIcon = BaseIconProps &
  AnchorHTMLAttributes<HTMLAnchorElement> &
  SvgIconProps & {
    href: string
    to?: undefined
  }

type IconProps = InternalLinkIcon | ExternalLinkIcon

const StyledAnchor = styled.a`
  box-shadow: none;
  color: initial;
  margin: 10px;
`

const StyledGatsbyLink = styled(Link)`
  margin: 10px;
  box-shadow: none;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`
/** render a Gatsby Link if `to` prop is passed */
const isPropsForGatsbyLink = (
  props: InternalLinkIcon | ExternalLinkIcon
): props is InternalLinkIcon => 'to' in props

export const Icon: React.FC<IconProps> = props => {
  const { name } = props

  if (isPropsForGatsbyLink(props)) {
    const { to } = props
    return (
      <StyledGatsbyLink to={to}>
        <title>{name}</title>
        <Wrapper>
          <SvgIcon style={{ width: '100%', height: '100%' }} {...props} />
        </Wrapper>
      </StyledGatsbyLink>
    )
  }
  const { href } = props
  return (
    <StyledAnchor href={href} target='_blank' rel='noopener noreferrer'>
      <title>{name}</title>
      <Wrapper>
        <SvgIcon style={{ width: '100%', height: '100%' }} {...props} />
      </Wrapper>
    </StyledAnchor>
  )
}
