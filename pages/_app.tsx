import '@fontsource/montserrat'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { normalize } from 'styled-normalize'
import { AuthProvider } from '../context/auth'
import { bunq } from '../utils/api'

const GlobalStyle = createGlobalStyle`
  ${normalize}

  html {
    font-family: Montserrat, sans-serif;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #272727;
    background-color: #f5f8fc;
  }
  p {
    letter-spacing: 0.5px;
    line-height: 1.6rem;
  }
`

const theme = {
  colors: {
    primary: '#00e4bd',
    secondary: '#9865d5',
    tertiary: '#fc0064',
    fg: '#272727',
    bg: '#fff',
  },
}

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await bunq.get(queryKey[0])
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchOnWindowFocus: false,
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>Bunq Chat</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
