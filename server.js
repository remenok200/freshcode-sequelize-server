require('dotenv').config();
const express = require('express');

const router = require('./routers');
const app = express();

app.use(express.json());

/* localhost:9999/api */
app.use('/api', router);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
