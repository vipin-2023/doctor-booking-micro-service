import express from 'express';
import cors from "cors";
import proxy from "express-http-proxy";

const app = express();
const PORT = 3000;

app.use(cors);
app.use(express.json());
app.use('/api/v1/user',proxy("www.google.com"));
app.use('/api/v1/admin',proxy("www.google.com"));
app.use('/api/v1/doctor',proxy("www.google.com"));
  
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  }catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
});