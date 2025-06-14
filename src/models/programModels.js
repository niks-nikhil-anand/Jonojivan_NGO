import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  whatWeDo: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  description: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

const Program = mongoose.models.Program || mongoose.model('Program', programSchema);
export default Program;
