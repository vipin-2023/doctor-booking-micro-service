import express from 'express';
import "./config/mongodb"


const app = express();
const port = 3001;



app.get('/', (req, res) => {
  res.json('Hello, world from user service 3001!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
