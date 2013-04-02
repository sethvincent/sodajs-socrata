var request = require('request');
var qs = require('querystring');

module.exports = SodaClient;

function SodaClient(options){
  if (!options) options = {};
  this.url = options.url + (options.url.match('/$') ? '' : '/')
}

SodaClient.prototype.list = function(options){
  var resource = options.resource;
  var queries={};

  for (option in options.filters) {
    value = options.filters[option];
    queries['$' + option] = value;
  }

  request({
    url: this.url + 'resource/' + resource +'.json?' + qs.stringify(queries),
    headers: {
      //'X-App-Token': options.apiToken,
      //'Authorization': options.username + ':' + options.password
    },
  },

  function(error, response, body){
    if (error && options.error) options.error(error, response, body)
    if (response.statusCode == 200) {
      var data = JSON.parse(body);
      if (options.success) return options.success(data);
    }
    return response;
  });
}



SodaClient.prototype.all = function(options){
  if (!allData) var allData = {};
  if (!options.filters) options.filters = {};
  if (!options.filters.limit) options.filters.limit = 1000;
  if (!options.filters.offset) options.filters.offset = 0;
  var self = this;

  this.list({
    resource: options.resource,
    filters: {
      limit: options.filters.limit,
      offset: options.filters.offset
    },
    success: function(data){
      for (var key in data) {
        allData[parseInt(key)+options.filters.offset] = data[key];
      }

      if(data.length === options.filters.limit){
        options.filters.offset += options.filters.limit;

        self.all({
          resource: options.resource,
          length: data.length,
          success: options.success,
          filters: options.filters
        })
      } else {
        if (options.success) options.success(allData);
      }
    },
    error: function(error, response, body){
      console.log(error)
    }
  });
}