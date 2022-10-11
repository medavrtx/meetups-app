import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  const router = useRouter();

  async function deleteMeetupHandler() {
    const response = await fetch('/api/meetup', {
      method: 'DELETE',
      body: JSON.stringify(props.meetupData.id),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    router.push('/');
  }
  console.log(props);

  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        date={props.meetupData.date}
        description={props.meetupData.description}
        onDeleteMeetup={deleteMeetupHandler}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

    client.close();

    return {
      fallback: 'blocking',
      paths: meetups.map((meetup) => ({
        params: { meetupId: meetup._id.toString() },
      })),
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps(context) {
  try {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
      _id: ObjectId(meetupId),
    });

    client.close();

    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          date: selectedMeetup.date,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
        },
      },
    };
  } catch {
    return {
      props: {
        meetupData: {
          id: 'm1',
          title: 'Dummy Meetup 1',
          image:
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          address: 'Some Address, 12345 Some City',
          date: '2022-10-02',
          description: 'This is the first meetup!',
        },
      },
    };
  }
}

export default MeetupDetails;
