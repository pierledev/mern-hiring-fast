import Job from '../models/Job.js';
import checkPermissions from '../utils/checkPermissions.js';
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

// All users
export const getAllJobs = async (req, res) => {
  const { featured, search, location, jobType, level, experience, sort } =
    req.query;

  const queryObject = {
    isArchived: false,
  };

  if (featured) {
    queryObject.isFeatured = true;
  }

  if (location) {
    queryObject.location = { $regex: location, $options: 'i' };
  }

  if (jobType) {
    queryObject.jobType = jobType;
  }

  if (level) {
    queryObject.level = level;
  }

  if (experience) {
    queryObject.experience = experience;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);

  if (sort === 'latest') {
    result = result.sort('-createdAt');
  }

  if (sort === 'oldest') {
    result = result.sort('createdAt');
  }

  if (sort === 'a-z') {
    result = result.sort('position');
  }

  if (sort === 'z-a') {
    result = result.sort('-position');
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result
    .populate('createdBy', ['companyLogo'])
    .skip(skip)
    .limit(limit);

  const jobs = await result;
  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res
    .status(StatusCodes.OK)
    .json({
      success: true,
      data: { jobs, totalJobs, numOfPages, hasMore: page < numOfPages },
    });
};

export const getSingleJob = async (req, res) => {
  const { id: jobId } = req.params;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new BadRequestError('Job not found');
  }

  res.status(StatusCodes.OK).json({ success: true, data: jobExists });
};

// Employers
export const addJob = async (req, res) => {
  const { location, maxSalary, minSalary, description, position, skills } =
    req.body;

  if (
    !location ||
    !maxSalary ||
    !minSalary ||
    !description ||
    !position ||
    skills.length === 0
  ) {
    throw new BadRequestError('Please fill in the required inputs');
  }

  const newJob = await Job.create({
    ...req.body,
    createdBy: req.user.userId,
    company: req.user.company,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ success: true, data: newJob, message: 'Job created!' });
};

export const getAllEmployerPostedJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({
    createdBy: userId,
    isArchived: false,
  });

  res.status(StatusCodes.OK).json({ success: true, data: jobs });
};

export const getAllEmployerArchivedJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({
    createdBy: userId,
    isArchived: true,
  });

  res.status(StatusCodes.OK).json({ success: true, data: jobs });
};

export const updateJob = async (req, res) => {
  const { id: jobId } = req.params;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  checkPermissions(req.user, jobExists.createdBy);

  const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
    new: true,
    runValidators: true,
  });

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedJob, message: 'Job updated!' });
};

export const deleteJob = async (req, res) => {
  const { userType } = req.user;

  // Check user type
  if (userType !== 'admin' && userType !== 'employer') {
    throw new UnAuthenticatedError('You have no access to this route');
  }

  const { id: jobId } = req.params;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  checkPermissions(req.user, jobExists.createdBy);

  await jobExists.deleteOne();

  res.status(StatusCodes.OK).json({ success: true, message: 'Job removed!' });
};

export const archiveJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { isArchived: true },
    { new: true, runValidators: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedJob, message: 'Job archived!' });
};

export const unarchiveJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { isArchived: false },
    { new: true, runValidators: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedJob, message: 'Unarchived job!' });
};

// Job-seekers
export const saveJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  jobExists.savedBy.set(userId, true);

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { savedBy: jobExists.savedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['companyLogo']);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedJob, message: 'Job saved!' });
};

export const unsaveJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  jobExists.savedBy.delete(userId);

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { savedBy: jobExists.savedBy },
    { new: true, runValidators: true }
  ).populate('createdBy', ['companyLogo']);

  res
    .status(StatusCodes.OK)
    .json({ success: true, data: updatedJob, message: 'Job unsaved!' });
};

export const getAllSavedJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({ [`savedBy.${userId}`]: true }).populate(
    'createdBy',
    ['companyLogo']
  );

  res.status(StatusCodes.OK).json({ success: true, data: jobs });
};

export const applyJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const jobExists = await Job.findOne({ _id: jobId });
  if (!jobExists) {
    throw new NotFoundError('Job not found');
  }

  jobExists.appliedBy.set(userId, true);

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    { appliedBy: jobExists.appliedBy },
    { new: true, runValidators: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ data: updatedJob, message: 'Successfully applied the job!' });
};

export const getAllAppliedJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await Job.find({ [`appliedBy.${userId}`]: true });

  res.status(StatusCodes.OK).json({ data: jobs });
};
