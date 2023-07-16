import express from 'express';
import "../config/mongodb"
import routes from "./application/routes/appointmentRoutes"

const app = express();
const port = 3002;

app.use("/",routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
