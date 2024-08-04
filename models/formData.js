import mongoose from 'mongoose';

const formDataSchema = new mongoose.Schema({
  Company: String,
  Fullname: String,
  Workemail: String,
  description: String,
  phone: String,
});

export default mongoose.model('forms', formDataSchema);
