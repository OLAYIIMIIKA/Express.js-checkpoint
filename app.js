const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const app = express();

const checkTime = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  const hourOfDay = date.getHours();

  if (dayOfWeek === 0 || dayOfWeek === 6 || hourOfDay < 9 || hourOfDay >= 17) {
    res.status(403).send(`<h1 style="text-align: center;">Dear customer, Sorry the website is only available during working hours (Monday to Friday, from 9am to 5pm).</h1>`);
  } else {
    next();
  }
};

app.use(checkTime);

app.get('/', checkTime, (req, res) => {
  fs.readFile(__dirname + '/views/home.html', (error, data) => {
    if (error) {
      res.status(500).send('Error loading home page.');
    } else {
      res.send(data.toString());
    }
  });
});

app.get('/services', checkTime, (req, res) => {
  fs.readFile(__dirname + '/views/services.html', (error, data) => {
    if (error) {
      res.status(500).send('Error loading services page.');
    } else {
      res.send(data.toString());
    }
  });
});

app.get('/contact', checkTime, (req, res) => {
  fs.readFile(__dirname + '/views/contact.html', (error, data) => {
    if (error) {
      res.status(500).send('Error loading contact page.');
    } else {
      res.send(data.toString());
    }
  });
});

app.use((req, res) => {
  res.status(404).send('<h1 style="text-align: center;">404! Page Not Found</h1>');
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

