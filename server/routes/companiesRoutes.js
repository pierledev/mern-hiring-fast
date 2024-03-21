import express from 'express';
import {
  getAllCompanies,
  getSingleCompany,
} from '../controllers/companiesController.js';

const router = express.Router();

router.get('/', getAllCompanies).get('/:company', getSingleCompany);

export default router;
