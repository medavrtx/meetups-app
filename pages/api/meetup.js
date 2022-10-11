import { MongoClient, ObjectId } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup inserted!' });
    } catch {
      res.status(400).json({ message: 'Error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const id = new ObjectId(req.body);

      const client = await MongoClient.connect(process.env.MONGO_URI);
      const db = client.db();

      const meetupsCollection = db.collection('meetups');

      const result = await meetupsCollection.deleteOne({ _id: id });

      console.log(result);

      client.close();

      res.status(201).json({ message: 'Meetup deleted!' });
    } catch {
      res.status(400).json({ message: 'Error' });
    }
  }
}

export default handler;
