const express = require("express");
const cors = require("cors");
const taxRoutes = require("./routes/taxRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/tax", taxRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});