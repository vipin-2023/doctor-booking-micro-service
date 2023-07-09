import express from 'express';
import "./config/mongodb"
import cors from 'cors';

const app = express();
const port = 3001;

// app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello, world from user service !');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
