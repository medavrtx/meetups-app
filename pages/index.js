import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

export default function Home(props) {
  if (!props) {
    props = [
      {
        id: 'm1',
        title: 'A First Meetup',
        image:
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        address: 'Some Address, 12345 Some City',
        date: '2022-10-02',
        description: 'This is the first meetup!',
      },
      {
        id: 'm2',
        title: 'A Second Meetup',
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
        address: 'Some Address 2, 12345 Some City',
        date: '2022-10-02',
        description: 'This is the second meetup!',
      },
    ];
  }
  return (
    <Fragment>
      <Head>
        <title>Meetups App</title>
        <meta name="description" content="Browse a list of meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          date: meetup.date,
          image: meetup.image,
          id: meetup._id.toString(),
        })),
      },
      revalidate: 1,
    };
  } catch {
    return {
      props: {
        meetups: [
          {
            id: 'm1',
            title: 'Dummy Meetup 1',
            image:
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
            address: 'Some Address, 12345 Some City',
            date: '2022-10-02',
            description: 'This is the first meetup!',
          },
          {
            id: 'm2',
            title: 'Dummy Meetup 2',
            image:
              'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80',
            address: 'Some Address 2, 12345 Some City',
            date: '2022-10-02',
            description: 'This is the second meetup!',
          },
        ],
      },
    };
  }
}
