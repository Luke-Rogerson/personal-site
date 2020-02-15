import React from 'react'
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles'
import styled, { ThemeProvider as SCThemeProvider } from 'styled-components'

import { rhythm } from '../utils/typography'
import { theme as MUITheme } from '../theme/muiTheme'
import { theme } from '../theme/theme'
import { GlobalStyles } from './GlobalStyle'
import { Header } from './Header'

interface Props {
  location?: Location
  title: string
}

const Container = styled.div`
  margin: 0 auto;
  max-width: ${rhythm(30)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`

export const Layout: React.FC<Props> = ({ location, title, children }) => {
  return (
    <>
      <SCThemeProvider theme={theme}>
        <MUIThemeProvider theme={MUITheme}>
          <GlobalStyles />
          <Container>
            <header>
              <Header title={title} location={location} />
            </header>
            <main>{children}</main>
          </Container>
        </MUIThemeProvider>
      </SCThemeProvider>
    </>
  )
}
