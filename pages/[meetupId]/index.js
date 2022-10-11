import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const meetupData = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    address: 'Some Address, 12345 Some City',
    description: 'This is the first meetup!',
  },
];

function MeetupDetails() {
  return (
    <Fragment>
      <Head>
        <title>{meetupData[0].title}</title>
        <meta name="description" content={meetupData[0].description} />
      </Head>
      <MeetupDetail
        image={meetupData[0].image}
        title={meetupData[0].title}
        address={meetupData[0].address}
        description={meetupData[0].description}
      />
    </Fragment>
  );
}

export default MeetupDetails;
