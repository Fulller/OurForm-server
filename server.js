import app from "./src/app.js";
import config from "./src/configs/index.js";

const PORT = config.app.port;

const server = app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server stoped");
  });
});
