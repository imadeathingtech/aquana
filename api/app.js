const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.APP_PORT || 3000;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/public", express.static("public"));

const plantRoutes = require("./routes/plants.js");
const notificationRoutes = require("./routes/notifications.js");
app.use("/api", [plantRoutes, notificationRoutes]);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
