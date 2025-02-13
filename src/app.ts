import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/database";
import userRoute from "./routes/user.route";
import ownerCarRoute from "./routes/ownerCar.route";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("api is ready!!!");
  });

app.use(express.json());

app.post('/checkAndRecordEntry', (req, res) => {
  
    console.log(req.body); 
    res.send('Data received successfully!');
});

  app.use("/users", userRoute);
  app.use("/ownerCars", ownerCarRoute);

  app.listen(process.env.PORT!, async () => {
  
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
  });
  

  