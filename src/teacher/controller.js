const teacherModel = require('./schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isValidEmail, isValidName } = require('../auth');

const registerTeacher = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name) return res.status(400).send({ message: 'name is must' });
    if(!isValidName(name)) return res.status(400).json({error:"Please provide valid name format"})

    if (!email) return res.status(400).send({ message: 'Email is must' });
    if(!isValidEmail(email)) return res.status(400).json({error:"Please provide valid email"})
    let checkEmail = await teacherModel.findOne({ email });
    if (checkEmail)
      return res.status(400).send({ message: 'Email is already in use' });
    if (!password) return res.status(400).send({ message: 'password is must' });
    let newPassword = await bcrypt.hash(password, 12);
    req.body.password = newPassword;

    const data = await teacherModel.create(req.body);
    return res.status(201).json({ data });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .send({ status: false, message: 'Please Provide Credentials' });

    const checkCredentials = await teacherModel.findOne({ email });
    if (!checkCredentials)
      return res.status(400).send({ error: 'Credentials are Incorrect' });
    const verifyPassword = await bcrypt.compare(
      password,
      checkCredentials.password
    );
    if (!verifyPassword)
      return res.status(400).json({ error: 'Credentials are Incorrect' });

    const token = jwt.sign(
      { teacherId: checkCredentials['_id'] },
      'Pravin21'
    );
    return res.status(200).send({ status: true, message: token });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { registerTeacher, login };