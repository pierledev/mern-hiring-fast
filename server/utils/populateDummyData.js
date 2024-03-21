import { readFile } from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../db/connect.js';

import Job from '../models/Job.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const jsonJobs = JSON.parse(
      await readFile(new URL('../dummyData/jobs.json', import.meta.url))
    );
   
    // Clear existing data
    await Job.deleteMany();

    // Create new entries from JSON files
    await Job.create(jsonJobs);

    console.log('Success!! Data populated.');
    process.exit(0);
  } catch (error) {
    console.error('Error populating data: ', error);
    process.exit(1);
  }
};

start();
