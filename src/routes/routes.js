const express = require('express');
const { readfile, generateId, Writefile } = require('../utils/utils');
const validateEmail = require('../middleares/validateEmail');
const validatePassword = require('../middleares/validatePassword');
const validateAutorization = require('../middleares/validateAutorization');
const validateName = require('../middleares/validateName');
const validateAge = require('../middleares/validateAge');
const validateTalk = require('../middleares/validateTalk');
const validateWatcheAt = require('../middleares/validateWatcheAt');
const validateRate = require('../middleares/validateRate');
const continuationValidateRate = require('../middleares/validateRateContinue');

const route = express.Router();
route.put('/talker/:id', validateAutorization,
validateName, validateAge, validateTalk,
validateWatcheAt, continuationValidateRate,
validateRate, async (req, res) => {
const { id } = req.params;
const talkers = await readfile();
const talkerI = talkers.indexOf((t) => t.id === Number(id));
talkers.splice(talkerI, 1);
const talker = { id: talkers.length + 1, ...req.body };
talkers.push(talker);
await Writefile(JSON.stringify(talkers, null, 2));
return res.status(200).json(talker);
});
route.post('/login', validateEmail,
 validatePassword, (req, res) => {
  const token = generateId();
  res.status(200).json({ token: `${token}` });
});

route.post('/talker', 
validateAutorization, 
validateName, validateAge,
 validateTalk, validateWatcheAt, 
 continuationValidateRate,
  validateRate, async (req, res) => {
  const talkers = await readfile();
  const id = talkers.length + 1;
   const talker = { id, ...req.body };
   talkers.push(talker);
   await Writefile(JSON.stringify(talkers, null, 2));
    return res.status(201).json(talker);
});
route.delete('/talker/:id', validateAutorization, async (req, res) => {
  const { id } = req.params;
  const talkers = await readfile();
  const exist = talkers.indexOf((t) => t.id === Number(id));
  talkers.splice(exist, 1);
  await Writefile(JSON.stringify(talkers, null, 2));
  return res.status(204).end();
});
route.get('/talker/search', validateAutorization, async (req, res) => {
  const { q } = req.query;
  const talkers = await readfile();
  const talker = talkers.filter((e) => e.name.includes(q));
  if (!q) {
    return res.status(200).json(talkers);
  }
  if (!talker) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talker);
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