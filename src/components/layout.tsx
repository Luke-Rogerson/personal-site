import React from 'react'
import { ThemeProvider as MUIThemeProvider } from '@material-ui/core/styles'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

import { rhythm } from '../utils/typography'
import { theme as MUITheme } from '../theme/muiTheme'
import { theme } from '../theme/theme'
import { GlobalStyles } from './GlobalStyle'
import { Header } from './header'

interface Props {
  location?: Location
  title: string
}

export const Layout: React.FC<Props> = ({ location, title, children }) => {
  return (
    <>
      <SCThemeProvider theme={theme}>
        <MUIThemeProvider theme={MUITheme}>
          <GlobalStyles />
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            <header>
              <Header title={title} location={location} />
            </header>
            <main>{children}</main>
          </div>
        </MUIThemeProvider>
      </SCThemeProvider>
    </>
  )
}
