import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/index.js';

export const getAllCompanies = async (req, res) => {
  const { limit, search } = req.query; // Extract the 'limit' and 'search' query parameters

  // Convert the limit parameter to a number if it is provided
  const limitValue = parseInt(limit);

  let pipeline = [];

  // If a search query is provided, add a $match stage to the pipeline
  if (search) {
    pipeline.push({
      $match: {
        // Assuming 'companyName' is the field you want to search in
        // This example uses a simple regex match for case-insensitive partial matching
        // Adapt the field name and matching criteria as necessary
        company: new RegExp(search, 'i'),
      },
    });
  }

  // Continue building the pipeline with the $group stage
  pipeline.push({
    $group: {
      _id: '$company', // Group by the company field
      jobs: {
        $push: {
          // Accumulate all jobs for each company into an array
          id: '$_id',
          position: '$position',
          location: '$location',
          minSalary: '$minSalary',
          maxSalary: '$maxSalary',
          experience: '$experience',
          jobType: '$jobType',
        },
      },
    },
  });

  // Conditionally add the $limit stage if a valid limit is provided
  if (limitValue > 0) {
    pipeline.push({ $limit: limitValue });
  }

  const companiesWithJobs = await Job.aggregate(pipeline);

  res.status(StatusCodes.OK).json({ success: true, data: companiesWithJobs });
};

export const getSingleCompany = async (req, res) => {
  const { company } = req.params;

  const jobs = await Job.find({ company })
    .populate({
      path: 'createdBy',
      select: 'companyLogo',
    })
    .exec();

  if (jobs.length === 0) {
    throw new NotFoundError(
      `No jobs found for company ${
        company[0].toUpperCase() + company.slice(1)
      }. This may indicate the company has no open positions or does not exist in our records.`
    );
  }

  res.status(StatusCodes.OK).json({ success: true, data: { company, jobs } });
};
