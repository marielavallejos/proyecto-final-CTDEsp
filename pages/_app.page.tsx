import type { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "styles/material-theme"
import { AuthProvider } from '../context/AuthContext';


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />

      <style>{`  #__next { height: 100%; } `}</style>
    </ThemeProvider>
  </AuthProvider>
}
export default MyApp
