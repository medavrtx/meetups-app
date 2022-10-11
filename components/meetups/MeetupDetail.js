import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
  const date = new Date(props.date).toLocaleDateString('en-US');
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <date>{date}</date>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classes.actions}>
        <button onClick={props.onDeleteMeetup}>Delete Meetup</button>
      </div>
    </section>
  );
}

export default MeetupDetail;
