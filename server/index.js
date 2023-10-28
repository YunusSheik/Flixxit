const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
const path = require("path");

app.use(express.json());
app.use(
  cors({
    origin: "https://merry-tarsier-ff40a1.netlify.app",
  })
);

app.use(express.static(path.resolve(__dirname, "./static")));

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected successfully!"))
  .catch((err) => console.log(err));

app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/lists", listRoute);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./static", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
});
