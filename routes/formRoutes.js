import express from 'express';
import FormData from '../models/FormData.js';

const router = express.Router();

// Route to handle form submissions
router.post('/submit', async (req, res) => {
  console.log('Request body:', req.body);
  const formData = new FormData(req.body);
  try {
    await formData.save();
    console.log("Data saved successfully");
    res.status(200).send({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).send({ message: 'Error saving form data', error });
  }
});

// Route to search form data
router.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const formData = await FormData.find({
      $or: [
        { Company: new RegExp(query, 'i') },
        { Fullname: new RegExp(query, 'i') },
        { Workemail: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
        { phone: new RegExp(query, 'i') }
      ]
    });
    res.status(200).send(formData);
  } catch (error) {
    res.status(500).send({ message: 'Error searching form data', error });
  }
});

// Route to fetch all form data
router.get('/all', async (req, res) => {
  try {
    const formData = await FormData.find();
    res.status(200).send(formData);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching form data', error });
  }
});

// Route to delete form data
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await FormData.findByIdAndDelete(id);
    res.status(200).send({ message: 'Form data deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting form data', error });
  }
});

// Route to edit form data
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFormData = await FormData.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).send(updatedFormData);
  } catch (error) {
    res.status(500).send({ message: 'Error updating form data', error });
  }
});

export default router;
