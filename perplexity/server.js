import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { main } from "./src/service/ai.service.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDB();
main();