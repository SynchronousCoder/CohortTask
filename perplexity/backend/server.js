import dotenv from "dotenv";
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 3000;

dotenv.config();

const httpServer = http.createServer(app)
initSocket(httpServer)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();