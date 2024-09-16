const express =require('express')
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 8000;
const cors = require("cors");

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

const sequelize = require("./config/database");
const login = require("./Routes/User");
const carrousel = require("./Routes/carrousel");
const home_about =require("./Routes/HeaderContact");
const productName =require("./Routes/productName");
const productDetails =require("./Routes/product_category");
const apply_now = require("./Routes/apply_now");
const contact_us=require("./Routes/contactPersonRoutes");
const solution = require("./Routes/eventRoutes");
const Exhibition =require("./Routes/Exhibition");
const testimonial = require("./Routes/testimonialRoutes");
const Service_pdf = require("./Routes/Service_pdf");
const Our_service = require("./Routes/Our_service");
const Team =require("./Routes/teamRoutes");
const Infrastructure = require("./Routes/infrastructureRoute")
const Analysis = require("./Routes/v_analysis")
const ServiceName =require("./Routes/ServiceName");
const ServiceDetail = require("./Routes/ServiceDetails");
const About =require("./Routes/about");
const implemented =require("./Routes/implemented");
const Further = require("./Routes/further");
const Social = require("./Routes/socialcontact")




app.use("/auth", login);
app.use("/v_analysis",Analysis)
app.use("/carrousel", carrousel);
app.use("/home_about",home_about);
app.use("/productName",productName);
app.use("/productDetails",productDetails)
app.use("/apply_now",apply_now);
app.use("/contact_us",contact_us);
app.use("/solution",solution);
app.use("/exhibition",Exhibition);
app.use("/testimonial",testimonial);
app.use("/Service_pdf",Service_pdf);
app.use("/Our_service",Our_service);
app.use("/Team",Team);
app.use("/Vibration",Infrastructure);
app.use("/ServiceName",ServiceName);
app.use("/ServiceDetail",ServiceDetail);
app.use("/About",About);
app.use("/implemented",implemented);
app.use("/Further",Further);
app.use("/Social",Social)






// Test DB connection
const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected...");
    await sequelize.sync(); // Ensure the database and model are in sync
  } catch (err) {
    console.error("Error: " + err);
  }
};

// Initialize the application
const init = async () => {
  await testDbConnection();
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

init();

app.get("/", (req, res) => {
  res.send("server start");
});
