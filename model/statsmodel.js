const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
    {

        startDate: {
            type: Number,
        },
        distance:{
            type: Number,
        },
        duration: {
            type: Number,
        },
        averageSpeed:{
            type: Number,
        },
        topSpeed: {
            type: Number,
        },
        score:{
            type: Number,
        },
        fuelConsumed: {
            type: Number,
        },
        fuelCost:{
            type: Number,
        },
      },
      { timestamps: true }
);


  module.exports = mongoose.model("stats", statsSchema);
