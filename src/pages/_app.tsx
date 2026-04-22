import { AppProps } from 'next/app';
import '@src/styles/globals.css';
import Header from '@src/components/header';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
