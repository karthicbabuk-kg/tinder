import { MongoClient } from 'mongodb';
import { User } from '../models/user';

const uri = process.env.URI;

const getUser = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
};

const addUserMatch = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
};

const getAllUsers = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();

    res.json(foundUsers);
  } finally {
    await client.close();
  }
};

const getGenderedUsers = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { gender_identity: { $eq: gender } };
    const foundUsers = await users.find(query).toArray();
    res.json(foundUsers);
  } finally {
    await client.close();
  }
};

const updateUser = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: formData.user_id };

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);

    res.json(insertedUser);
  } finally {
    await client.close();
  }
};

export {
  getUser,
  addUserMatch,
  getAllUsers,
  getGenderedUsers,
  updateUser,
};
