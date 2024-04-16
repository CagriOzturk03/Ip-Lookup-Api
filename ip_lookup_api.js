const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

const apiKey = 'YOUR_API_KEY';


app.get('/ip', async (req, res) => {
  try {
    
    const ipAddress = req.ip;
  
    request.get({
        url: 'https://api.api-ninjas.com/v1/iplookup?address=' + ipAddress,
        headers: {
          'X-Api-Key': apiKey
        },
      }, function(error, response, body) {
        if (error) {
          console.error('Request failed:', error);
        } else if (response.statusCode !== 200) {
          console.error('Error:', response.statusCode, body.toString('utf8'));
        } else {
          try {

            const responseData = JSON.parse(body);
      
            
            const entireResponse = responseData;
            res.json(entireResponse);

          } catch (parseError) {
            console.error('Error parsing response:', parseError);
          }
        }
        
      });


  } catch (error) {
    console.error('Error fetching IP location data:', error);
    res.status(500).json({ error: 'An error occurred while fetching IP location data' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
