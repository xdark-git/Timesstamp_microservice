// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date", 
    function(req, res, next){
     
      next();
    }, 
    function(req, res){
      let date= new Date(req.params.date);
     // console.log(Date(date))
      if(date.toUTCString()=="Invalid Date")
      {
        let regex = /^\d*$/
        //console.log(regex.test(req.params.date))
        
        if(regex.test(req.params.date))
        {
          date = new Date(req.params.date * 1)
          return res.json({
            unix: Date.parse(date),
            utc: date.toUTCString()
          })
        }
        return res.json({
          error: date.toUTCString()
        })
      }
      //return below if req has a normal date format
      return res.json({
        unix: Date.parse(date),
        utc: date.toUTCString()
      })   
})
app.get("/api", (req, res)=>{
  
  req.time = new Date();
  let date = req.time
  return res.json({
    unix: Date.parse(date),
    utc: date.toUTCString()
  })
        
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
