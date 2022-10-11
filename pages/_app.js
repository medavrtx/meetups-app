import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

import icon from '/public/icon.svg';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href={icon.src} />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
