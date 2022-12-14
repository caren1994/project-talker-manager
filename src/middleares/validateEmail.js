const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const verify = regex.test(email);
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!verify) {
  return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};
module.exports = validateEmail;