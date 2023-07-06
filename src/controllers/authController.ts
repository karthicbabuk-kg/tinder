import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/user';

const uri = process.env.URI;

const signup = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const { email, password } = req.body;

  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send('User already exists. Please login');
    }

    const sanitizedEmail = email.toLowerCase();

    const user = new User({
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    });

    const insertedUser = await users.insertOne(user);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });
    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const login = async (req: any, res: any) => {
  const client = new MongoClient(uri!);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const user  = await users.findOne({ email });
    if(!user){
        return res.send("email not found")
    }
    const correctPassword = await bcrypt.compare(password, user.hashed_password);

    

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id });
    }

    res.status(400).json('Invalid Credentials');
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

export { signup, login };
