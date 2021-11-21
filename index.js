// index.js
//const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });


// fetchCoordsByIP('76.71.88.171', (error, data) =>{
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('Here is your coordinate location:' , data);
// })

// fetchISSFlyOverTimes({latitude: 43.8864, longitude: -78.9742}, (error, response) =>{
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('Here are the fly over times for your coordinates:' , response);
// })


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});