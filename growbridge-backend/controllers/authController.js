const fs = require('fs');
const path = require('path');

// Database path
const dbPath = path.join(__dirname, '../data/db.json');

// Helpers to read/write JSON
const readDB = () => JSON.parse(fs.readFileSync(dbPath));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Signup function
exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  const db = readDB();
  const existingUser = db.users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password, // 🔐 we’ll hash later
    role // 'startup' or 'investor'
  };

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ message: 'Signup successful', user: newUser });
};

// Login function
exports.login = (req, res) => {
  const { email, password } = req.body;

  const db = readDB();
  const user = db.users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user });
};
