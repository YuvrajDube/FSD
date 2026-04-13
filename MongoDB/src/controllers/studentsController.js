const Student = require('../models/Student');

async function getAllStudents(req, res) {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch students', error: error.message });
  }
}

async function getStudentById(req, res) {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid student id', error: error.message });
  }
}

async function createStudent(req, res) {
  try {
    const student = await Student.create(req.body);
    res.status(201).json({ success: true, message: 'Student created successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create student', error: error.message });
  }
}

async function updateStudent(req, res) {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, message: 'Student updated successfully', data: student });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update student', error: error.message });
  }
}

async function deleteStudent(req, res) {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    res.json({ success: true, message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to delete student', error: error.message });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};
