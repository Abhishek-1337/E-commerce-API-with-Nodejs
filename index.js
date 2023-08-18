const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 3000;

const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

//useNewUrlParser is used to avoid the deprecated warnings
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful"));

app.listen(PORT, (req, res) => {
  console.log(`Listening on port ${PORT}`);
});
