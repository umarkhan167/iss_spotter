// index.js
//const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

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

fetchISSFlyOverTimes({latitude: 43.8864, longitude: -78.9742}, (error, response) =>{
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('Here are the fly over times for your coordinates:' , response);
})
