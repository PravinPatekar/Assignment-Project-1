const studentModel = require('./schema');

async function registerStudent(req, res) {
  try {
    const { name, subject, marks } = req.body;
    const teacherId = req.teacherId;
    req.body.teacherId = teacherId
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: 'Student name is must' });
    if (!subject) return res.status(400).send({ message: 'subject is must' });
    if (!marks) return res.status(400).send({ message: 'marks is must' });

    const student = await studentModel.create(req.body);
    return res.status(201).json({ status: true, student });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

async function updateStudents(req, res) {
  try {
    const { name, subject, marks } = req.body;
    const studentId = req.params.studentId;

    const student = await studentModel.findByIdAndUpdate(
      { _id: studentId },
      { name, subject, $inc: { marks: marks } },
      { new: true }
    );
    return res.status(200).send({ status: true, student });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

async function deleteStudents(req, res) {
  try {
    const studentId = req.params.studentId;

    const data = await studentModel.findByIdAndDelete(studentId);
    return res
      .status(200)
      .send({ status: true, message: data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

module.exports = { registerStudent, updateStudents, deleteStudents };