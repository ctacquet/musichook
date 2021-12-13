import '../styles/globals.css';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <RecoilRoot>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  )

}

export default MyApp
