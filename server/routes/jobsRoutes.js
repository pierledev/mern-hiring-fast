import express from 'express';
import {
  authHandlerMiddleware,
  employerHandlerMiddleware,
  jobSeekerHandlerMiddleware,
} from '../middlewares/index.js';
import {
  addJob,
  getAllJobs,
  getSingleJob,
  getAllEmployerPostedJobs,
  updateJob,
  deleteJob,
  saveJob,
  unsaveJob,
  getAllSavedJobs,
  applyJob,
  getAllAppliedJobs,
  archiveJob,
  unarchiveJob,
  getAllEmployerArchivedJobs
} from '../controllers/jobsController.js';

const router = express.Router();

router
  .route('/')
  .get(getAllJobs)
  .post(authHandlerMiddleware, employerHandlerMiddleware, addJob);

router
  .route('/posted')
  .get(
    authHandlerMiddleware,
    employerHandlerMiddleware,
    getAllEmployerPostedJobs
  );

router
  .route('/archived')
  .get(
    authHandlerMiddleware,
    employerHandlerMiddleware,
    getAllEmployerArchivedJobs
  );

router
  .route('/saved')
  .get(authHandlerMiddleware, jobSeekerHandlerMiddleware, getAllSavedJobs);

router
  .route('/applied')
  .get(authHandlerMiddleware, jobSeekerHandlerMiddleware, getAllAppliedJobs);

router
  .route('/:id')
  .get(getSingleJob)
  .patch(authHandlerMiddleware, employerHandlerMiddleware, updateJob)
  .delete(authHandlerMiddleware, employerHandlerMiddleware, deleteJob);

router
  .route('/:id/save')
  .patch(authHandlerMiddleware, jobSeekerHandlerMiddleware, saveJob);

router
  .route('/:id/unsave')
  .patch(authHandlerMiddleware, jobSeekerHandlerMiddleware, unsaveJob);

router
  .route('/:id/archive')
  .patch(authHandlerMiddleware, employerHandlerMiddleware, archiveJob);

router
  .route('/:id/unarchive')
  .patch(authHandlerMiddleware, employerHandlerMiddleware, unarchiveJob);

router
  .route('/:id/apply')
  .patch(authHandlerMiddleware, jobSeekerHandlerMiddleware, applyJob);

export default router;
