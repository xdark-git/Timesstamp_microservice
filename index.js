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

//function for verifying 
function check(data){
  const checkFormat1 = /^\d{4}(-)(0[1-9]||[1-9]||1[1-2])(-)(0[1-9]||[1-9]||[1-2][1-9]||3[0-1])$/
  const checkFormat2 =/^\d./
  
  if(checkFormat1.test(data)===false && checkFormat2.test(data)===false)
    return "both false"
  
  if(checkFormat1.test(data)===true) return "0 true"

  if(checkFormat2.test(data)===true) return "1 true"
}

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/:date", 
    function(req, res, next){
      if(check(req.params.date)==="both false"){
        res.json({
        "error": "Invalide Date"
        })
      }
      next();
    }, 
    function(req, res){
      let date;
      if(check(req.params.date)==="1 true")
      {
        date = new Date(req.params.date * 1);
      }
      else{
        date = new Date(req.params.date)
      }
      console.log(date.getDate())
      let day;
      let month;
     
        switch (date.getDay()){
          case 1:
            day = "Mon"
            break;
          case 2:
            day = "Tue"
            break;
          case 3:
            day = "Wed"
            break;
          case 4:
            day = "Thu"
            break;
          case 5:
            day = "Fri"
            break;
          case 6:
            day = "Sat"
            break;
          case 7:
            day = "Sun"
            break;
        };
        
        switch (date.getMonth()){
          case 0:
            month = "Jan"
            break;
          case 1:
            month = "Feb"
            break;
          case 2:
            month = "Mar"
            break;
          case 3:
            month = "Apr"
            break;
          case 4:
            month = "May"
            break;
          case 5:
            month = "Jun"
            break;
          case 6:
            month = "Jul"
            break;
          case 7:
            month = "Aug"
            break;
          case 8:
            month = "Sep"
            break;
          case 9:
            month = "Oct"
            break;
          case 10:
            month = "Nov"
            break;
          case 11:
            month = "Dec"
            break;
        }
      
        return res.json({
          unix: date.getTime(),
          utc: day+", "
              +date.getDate()+" "
              +month+" "
              +date.getFullYear()+" "
              +date.getHours()+":"
              +date.getMinutes()+":"
              +date.getSeconds()+" GMT"
        })
      
      
})




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
