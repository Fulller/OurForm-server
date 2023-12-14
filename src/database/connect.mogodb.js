import mongoose from "mongoose";
import config from "../configs/index.js";

const mongodbURl = config.db.url;

class MongoDB {
  static instance;
  constructor() {
    this.connect();
  }
  connect() {
    mongoose
      .connect(mongodbURl)
      .then(() => {
        console.log("Connected to MongoDB successfully");
      })
      .catch(() => {
        console.log("Connection to MongoDB failed");
      });
  }
  static getInstance() {
    if (!MongoDB.instance) {
      this.instance = new MongoDB();
    }
    return this.instance;
  }
}

export default MongoDB;
