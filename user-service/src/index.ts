import express from 'express';
import "../config/mongodb"
import routes from "../src/application/routes/userRoutes"

const app = express();
const port = 3001;



app.use("/",routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
