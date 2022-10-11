import Head from 'next/head';
import { Fragment } from 'react';
import '../styles/globals.css';

import Layout from '../components/layout/Layout';

import icon from '/public/icon.svg';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href={icon.src} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
