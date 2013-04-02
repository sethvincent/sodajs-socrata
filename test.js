var soda = require('./index.js');

var s = new soda({
  url: 'http://data.seattle.gov'
});

s.all({
  resource: 'bnq7-2pc8',
  success: function(data){
    var i=0;
    for (key in data){
      i++;
      console.log(i);
    }
    if (i===39) {
      console.log(data)
    }
  }
});