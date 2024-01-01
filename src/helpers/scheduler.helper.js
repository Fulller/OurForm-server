import schedule from "node-schedule";
import axios from "axios";
import config from "../configs/index.js";

const alwaysLive = config.app.alwaysLive;

(() => {
  if (alwaysLive == 0) {
    console.log("Turn OFF always live mode");
    return;
  }
  console.log("Turn ON always live mode");
  const serverUrl = config.app.serverUrl;
  schedule.scheduleJob("* * * * *", async () => {
    try {
      const response = await axios.get(`${serverUrl}/ping`);
      console.log(`Scheduled request sent: ${response.status}`);
    } catch (error) {
      console.error("Error sending scheduled request:", error);
    }
  });
})();
