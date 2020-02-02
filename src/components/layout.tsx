import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'

import { rhythm } from '../utils/typography'
import { GlobalStyles } from './GlobalStyle'
import { theme } from '../theme/muiTheme'
import { ThemeProvider } from '@material-ui/core/styles'
import { Header } from './Header'

interface Props {
  location?: Location
  title: string
  children: React.ReactNode | React.ReactNode[]
}

export const Layout: React.FC<Props> = ({ location, title, children }) => {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  )
}
