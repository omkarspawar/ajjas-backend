const asyncHandler = require("express-async-handler");
const stats = require("../model/statsmodel");
const moment = require("moment");



const getStats = asyncHandler(async (req, res) => {

const {startdate, enddate} = req.body



let startdateTimeStamp = moment(startdate,'YYYY/MM/DD').endOf('day').valueOf()

 let enddateTimeStamp = moment(enddate,'YYYY/MM/DD').startOf('day').valueOf()


 console.log({startdate, enddate, startdateTimeStamp, enddateTimeStamp })


try{
const statsData = await stats.aggregate([
    {
      $match: { startDate:{$gte:enddateTimeStamp, $lte:startdateTimeStamp}}
    },
    {
      $group: {
        _id: {},
        distance: { $sum: '$distance' },
        duration: { $sum: '$duration' },
        averageSpeed: { $avg: '$averageSpeed' },
        topSpeed: { $max: '$topSpeed' },
        score: { $avg: '$score' },
        fuelConsumed: { $sum: '$fuelConsumed' },
        fuelCost: { $sum: '$fuelCost' },
      }
    },
    {
      $project: {
        _id: 0,
         distance: { $round: [{ $divide: ['$distance', 1000] }, 2] },
        durationOriginal: { $sum: '$duration' },
        durationHours: { $floor: { $divide: ['$duration', 60] } }, // Convert minutes to hours
        durationMinutes: { $mod: ['$duration', 60] }, // Get remaining minutes
        averageSpeed: { $round: ['$averageSpeed', 0] },
        topSpeed: { $round: ['$topSpeed', 0] },
        score: { $round: ['$score', 0] },
        fuelConsumed: { $round: ['$fuelConsumed', 2] },
        fuelCost: { $round: ['$fuelCost', 2] },
      }
    }
  ]);









  if(statsData){
    res.status(200).json({
        success: true,
        data: {
            statsData,
        },
      });
  }else{
    res.status(404).json({
        success: false,
        data: "Not found",
      });
  }
} catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }


});

module.exports = { getStats };