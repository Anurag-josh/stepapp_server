const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const connectDB = require("./config/db");

const userRoutes =
  require("./routes/userRoutes");

const authRoutes =
  require("./routes/auth.routes");

const communityRoutes =
  require("./routes/community.routes");

const initSocket =
  require("./socket");

dotenv.config();

connectDB();

const app = express();

// ✅ Middleware
app.use(
  cors({
    origin: "*",
    methods: [
      "GET",
      "POST",
      "PUT",
    ],
  })
);

app.use(express.json());

// ✅ Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/community",
  communityRoutes
);

app.use(
  "/api/user",
  userRoutes
);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send(
    "StepCounter API Running"
  );
});

// ✅ KEEP RENDER SERVER ALIVE
const keepServerAlive = () => {

  setInterval(
    async () => {

      try {

        const response =
          await fetch(
            "https://stepapp-server.onrender.com"
          );

        console.log(
          "✅ Self ping success:",
          response.status
        );

      } catch (err) {

        console.log(
          "❌ Self ping failed"
        );
      }

    },

    5 * 60 * 1000 // 5 mins
  );
};

// ✅ Create HTTP server
const server =
  http.createServer(app);

// ✅ Initialize Socket.IO
initSocket(server);

// ✅ Start self ping
keepServerAlive();

const PORT =
  process.env.PORT || 5000;

// ✅ Start server
server.listen(PORT, () => {

  console.log(
    `🚀 Server running on ${PORT}`
  );

});