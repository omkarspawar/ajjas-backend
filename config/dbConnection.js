const mongoose = require("mongoose");

const mongoURI = "mongodb+srv://ajjas:ajjas1234@cluster0.dygrci6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connection = {};

const  connectDB = async()=> {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection");
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(mongoURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 30000, // 30 seconds
  });

  console.log("new connection");
}

const  disconnectDB = async()=> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected");
    }
  }
}

const db = {connectDB, disconnectDB}
module.exports = db;
