import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import connectdb from './connectdb/connectdb.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
// require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api/v1", routes);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  connectdb()
});