const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const usePath = path.resolve(__dirname, '..', 'talker.json');

const readfile = async () => {
  const response = await fs.readFile(usePath, 'utf8');
  const talkers = JSON.parse(response);
  return talkers;
};
const Writefile = async (talkers) => {
  await fs.writeFile('src/talker.json', talkers);
};
const generateId = () => crypto.randomBytes(8).toString('hex');

module.exports = {
  readfile,
  generateId,
  Writefile,

};
