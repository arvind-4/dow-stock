import { AppProps } from 'next/app';
import '@src/styles/globals.css';
import Header from '@src/components/header';

const navigationData = [
  {
    title: 'Home',
    href: '#',
  },
  {
    title: 'Products',
    href: '#',
  },
  {
    title: 'About Us',
    href: '#',
  },
  {
    title: 'Contacts',
    href: '#',
  },
];

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
