// our-domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

async function addMeetupHandler(enteredMeetupData) {
  console.log(enteredMeetupData);
}
function NewMeetupPage() {
  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
