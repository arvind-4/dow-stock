import { AppProps } from 'next/app';
import '@src/styles/globals.css';
import Header from '@src/components/Header';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
