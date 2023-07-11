import express from 'express';
import "../config/mongodb"


const app = express();
const port = 3001;



app.use("/",)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
