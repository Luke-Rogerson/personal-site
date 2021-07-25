import React from 'react'
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles'
import styled, { ThemeProvider as SCThemeProvider } from 'styled-components'

import { rhythm } from '../utils/typography'
import { theme as MUITheme } from '../theme/muiTheme'
import { theme } from '../theme/theme'
import { GlobalStyles } from './GlobalStyle'

interface Props {
  location?: Location
  title: string
}

const Main = styled.main`
  margin: 0 auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(3 / 4)};
  height: 100vh;
`

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <SCThemeProvider theme={theme}>
        <MUIThemeProvider theme={MUITheme}>
          <GlobalStyles />
          <Main>{children}</Main>
        </MUIThemeProvider>
      </SCThemeProvider>
    </>
  )
}
