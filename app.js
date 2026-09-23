require("dotenv").config();

const express = require("express");
const { sequelize } = require("./models");

const authRoutes = require("./routes/authRoutes");
const sportRoutes = require("./routes/sportRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const reportRoutes = require("./routes/reportRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);

    try {
        await sequelize.authenticate();
        console.log("PostgreSQL connected successfully!");
    } catch (error) {
        console.error("Unable to connect to PostgreSQL:", error.message);
    }
});