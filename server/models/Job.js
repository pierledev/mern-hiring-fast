import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      trim: true,
      required: [true, 'Job position is required'],
      minlength: [3, 'Job position min 3 characters'],
      maxlength: [100, 'Job position max 100 characters'],
    },
    company: {
      type: String,
      required: true,
    },
    companyLogo: {
      type: String
    },
    description: {
      type: String,
      trim: true,
      minlength: [25, 'description min 25 characters'],
      maxlength: [2000, 'description max 2000 characters'],
      required: [true, 'description is required'],
    },
    minSalary: {
      type: Number,
      trim: true,
      required: [true, 'min salary is required'],
    },
    maxSalary: {
      type: Number,
      trim: true,
      required: [true, 'max salary is required'],
    },
    salaryType: {
      type: String,
      enum: ['hourly', 'weekly', 'monthly', 'yearly'],
      default: 'monthly',
    },
    location: {
      type: String,
      trim: true,
      required: true,
      minlength: [6, 'location min 6 characters'],
      maxlength: [30, 'location max 30 characters'],
    },
    jobType: {
      type: String,
      enum: ['internship', 'freelance', 'part-time', 'full-time'],
      default: 'full-time',
    },
    level: {
      type: String,
      enum: [
        'junior',
        'middle',
        'senior'
      ],
    },
    experience: {
      type: String,
      enum: ['0-1 year', '2-5 years', '5-10 years', '> 10 years'],
      default: '0-1 year',
    },
    skills: {
      type: [String],
      trim: true,
      required: [true, 'Skills are required'],
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
      validate: {
        validator: function (value) {
          // Validate that the deadline is a future date
          return value > new Date();
        },
        message: 'Deadline must be set to a future date',
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    savedBy: {
      type: Map,
      of: Boolean,
      default: {},
    },
    appliedBy: {
      type: Map,
      of: Boolean,
      default: {},
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'createdby is required'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Job', JobSchema);
