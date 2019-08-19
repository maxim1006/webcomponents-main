const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('../script'));
 
app.get('/', (req, res, next) => {
  res.render('starting-page', { message: 'Hello from Node.js' });
});

app.listen(3003);
