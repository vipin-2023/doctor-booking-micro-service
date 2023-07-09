import express from 'express';
import cors from "cors";
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3005;

app.use(cors);
app.use(express.json());
app.use('/api',createProxyMiddleware("/api",{ target: 'http://localhost:3001/', changeOrigin: true,pathRewrite: {
  '^/api': '/',} }));
// app.use('/api/v1/admin',proxy("www.google.com"));
// app.use('/api/v1/doctor',proxy("www.google.com"));






app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`);
  }catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
});