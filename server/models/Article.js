import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [10, 'Title min 10 characters'],
      maxlength: [100, 'Title max 100 characters'],
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
    },
    selectedBanner: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likedBy: {
      type: Map,
      of: Boolean,
      default: {},
    },
    savedBy: {
      type: Map,
      of: Boolean,
      default: {},
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'createdby is required'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Article', ArticleSchema);
