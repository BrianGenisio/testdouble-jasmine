var td = require('testdouble');
var tdJasmine = require('../lib/testdouble-jasmine');

tdJasmine.use(td);

var runTests = require('./common');

describe("testdouble-jasmine with global matchers", function() {

  beforeEach(function() {
    this.subject = td.function("dubs");
  });

  runTests();

});
