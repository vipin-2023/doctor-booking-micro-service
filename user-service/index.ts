import express from 'express';
import "./config/mongodb"
import cors from 'cors';

const app = express();
const port = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());
// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
