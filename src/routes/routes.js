const express = require('express');
const { readfile, generateId } = require('../utils/utils');
const validateEmail = require('../middleares/validateEmail');
const validatePassword = require('../middleares/validatePassword');

const route = express.Router();

route.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateId();
  res.status(200).json({ token: `${token}` });
});

route.get('/talker', async (req, res) => {
  const result = await readfile();
  try {
    res.status(200).json(result);
  } catch (err) {
    res.status(400).end([]);
  }
});

route.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
const result = await readfile();

const talkerid = result.find((talker) => talker.id === Number(id));

if (!talkerid) {
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}

  return res.status(200).json(talkerid);
});

module.exports = route;