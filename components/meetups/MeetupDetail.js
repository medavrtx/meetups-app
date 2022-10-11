import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
      <div className={classes.actions}>
        <button onClick={props.onDeleteMeetup}>Delete Meetup</button>
      </div>
    </section>
  );
}

export default MeetupDetail;
