import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'first name is required'],
      minlength: [2, 'first name min 2 characters'],
      maxlength: [20, 'first name max 20 characters'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'last name is required'],
      minlength: [2, 'last name min 2 characters'],
      maxlength: [20, 'last name max 20 characters'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'please provide a valid email',
      },
    },
    password: {
      type: String,
      requid: [true, 'password is required'],
      minlength: [8, 'password min 8 characters'],
      select: false,
    },
    userType: {
      type: String,
      enum: ['job-seeker', 'employer', 'admin'],
      default: 'job-seeker',
    },
    userPicture: {
      public_id: String,
      url: String
    },
    companyLogo: {
      public_id: String,
      url: String
    },
    company: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, userType: this.userType, company: this.company },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

export default mongoose.model('User', UserSchema);
