import express, { Request, Response } from 'express';
import proxy from 'express-http-proxy';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/users-service', proxy(process.env.USER_SERVICE_SERVER || 'http://localhost:3001'));
app.use('/doctor-service', proxy(process.env.DOCTOR_SERVICE_SERVER || 'http://localhost:3001'));
app.use('/appointment-service', proxy(process.env.APPOINTMENT_SERVICE_SERVER || 'http://localhost:3001'));
app.use('/notification-service', proxy(process.env.NOTIFICATION_SERVICE_SERVER || 'http://localhost:3001'));
app.use('/admin-service', proxy(process.env.ADMIN_SERVICE_SERVER || 'http://localhost:3001'));

app.get('/', (req: Request, res: Response) => {
  res.send('3000');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Gateway server is running on port ${process.env.PORT || 3000}`);
});
