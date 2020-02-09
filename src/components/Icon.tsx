import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'
import styled from 'styled-components'

// import { Link } from 'gatsby'
//  <Link to='/blog'>Read my blog</Link>

interface IconProps extends SvgIconProps {
  href: string
}

const StyledAnchor = styled.a`
  box-shadow: none;
  color: initial;
  margin: 10px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
`

export const Icon: React.FC<IconProps> = ({ href, ...props }) => {
  return (
    <StyledAnchor href={href}>
      <Wrapper>
        <SvgIcon style={{ width: '100%', height: '100%' }} {...props} />
      </Wrapper>
    </StyledAnchor>
  )
}
