# sodajs-socrata
> javascrip client for socrata's soda api

Tested with node 0.10.0 so far.  

Will likely work in the browser using browserify.  

### Usage:
```
var soda = require('sodajs-socrata');

var s = new soda({
  url: 'http://data.seattle.gov'
});

s.all({
  // the id of the data set on socrata. 
  // find it in the url: https://data.seattle.gov/Community/beaches-in-seattle/9mk3-vhgr
  resource: 'bnq7-2pc8',
  success: function(data){
    // do stuff with the data
  }
});
```