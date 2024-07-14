const express = require("express");
const bodyparser = require('body-parser');
const stats = require("./model/statsmodel");
const db = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require('path');

db.connectDB()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())


const AverageFuelConsumptionLitterPerKm= 0.034 
const costOfPetrolRupeesPerLitter = 102


// const  generateRandomObject = (date)=> {
//   const distance = Math.random() * 70000; // Assuming max distance of 15000 meters for randomness
//   const duration = Math.floor(Math.random() * 240); // Assuming max duration of 5000 minutes for randomness
//   const averageSpeed = Math.random() * 100; // Assuming max average speed of 100 kmph for randomness
//   const topSpeed = Math.random() * 200; // Assuming max top speed of 200 kmph for randomness
//   const score = Math.random() * 100; // Assuming max score of 100 for randomness
//   const fuelConsumed  = (distance/1000) * AverageFuelConsumptionLitterPerKm; 
//   const fuelCost  = fuelConsumed * costOfPetrolRupeesPerLitter; 

//   return {
//     startDate: date.getTime(),
//     distance: distance,
//     duration: duration,
//     averageSpeed: averageSpeed,
//     topSpeed: topSpeed,
//     score: score,
//     fuelConsumed:fuelConsumed,
//     fuelCost:fuelCost
//   };


// }


// function getDateArray(start, end) {
//   const arr = [];
//   const dt = new Date(start);

//   while (dt <= end) {
//     arr.push(new Date(dt));
//     dt.setDate(dt.getDate() + 1);
//   }
//   return arr;
// }

// const startDate = new Date('2023-09-05');
// const endDate = new Date('2024-09-25');

// const dateArray = getDateArray(startDate, endDate);
// const records = dateArray.map(date => generateRandomObject(date));

// console.log(records);



// fs.writeFileSync('dates.txt', JSON.stringify(records), 'utf-8');
// console.log('Data written to file');



// Assuming the file name is 'example.txt' in the root folder

// const createEntry = async(eachObj) =>{
//   const statsdata = await stats.create({ ...eachObj });
//   console.log(`User created ${statsdata}`);
// }

// const filePath = path.resolve(__dirname, 'dates.txt');

// try {
//     const fileContent = fs.readFileSync(filePath, 'utf8');
//     let  allObj = JSON.parse(fileContent)
//     allObj = allObj.reverse()
// for(let i=0; i<allObj.length; i++ ){
//   let eachObj = allObj[i]
//   createEntry(eachObj)
// }



// } catch (err) {
//     console.error('Error reading the file:', err);
// }

app.use("/api", require("./routes/statisticsRoutes"));




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


