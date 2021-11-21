const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const url = 'https://api.ipify.org/?format=json';
  request(url, (error, response, body) => {
    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    if (!data) {
      callback(`${data.ip} not found.`, null);
    } else {
      callback(null, data.ip);
    }
  });
};


const fetchCoordsByIP = function(ip, callback) {
  const API_KEY = "14fa4910-4ae2-11ec-acd9-9bc242548b0a";
  request(`https://api.freegeoip.app/json/${ip}?apikey=${API_KEY}`, (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const dataObj = JSON.parse(body);
    let coordsObj = {};
    coordsObj.latitude = dataObj["latitude"];
    coordsObj.longitude = dataObj["longitude"];
    if (!dataObj) {
      callback(`${coordsObj} not found.`, null);
    } else {
      callback(null, coordsObj);
    }
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  // https://iss-pass.herokuapp.com/json/?lat=43.8864&lon=-78.9742
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
     // error can be set if invalid domain, user is offline, etc.
     if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const dataObj = JSON.parse(body);
    const responseArr = dataObj.response;
    
    if (!dataObj) {
      callback(`${responseArr} not found.`, null);
    } else {
      callback(null, responseArr);
    }
  })

};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };



