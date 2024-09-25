import express from "express";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
//import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
require("dotenv").config();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
