const jwt = require('jsonwebtoken');
const studentModel = require('./student/schema');

async function authentication(req, res, next) {
  try {
    const token = req.headers['x-api-key'];

    const decodedToken = jwt.verify(
      token,
      'Pravin21',
      (error, done) => {
        if (error)
          return res
            .status(500)
            .send({ status: false, message: 'token is invalid' });
        return done;
      }
    );
    req.teacherId = decodedToken.teacherId;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

async function authorization(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const teacherId = req.teacherId;

    const check = await studentModel.findById(studentId);
    if (!check)
      return res.status(400).send({ message: 'student is not present' });

    if (check.teacherId != teacherId)
      return res
        .status(400)
        .send({ message: 'You have not permission to change' });
    next();
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
}

function isValidEmail(email) {
  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    'gm'
  );
  return emailRegex.test(email);
}

function isValidName(name) {
  const nameRegex = new RegExp(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/, 'gm');
  return nameRegex.test(name);
}

module.exports = { authentication, authorization,isValidName ,isValidEmail };