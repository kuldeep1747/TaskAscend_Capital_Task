// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('Task', 'postgres', 'Kbpatel@9753', {
  host: 'localhost',
  dialect: 'postgres',
//   port: 5432,
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.sync({ force: true }).then(() => {
  app.listen(5432, () => {
    console.log('Server is running on port 5432');
  });
});

// server.js
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Registration failed' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
  