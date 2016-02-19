var td = require('testdouble');
var tdJasmine = require('../lib/testdouble-jasmine');

var matchers = tdJasmine.get(td);

var runTests = require('./common');

describe("testdouble-jasmine with explicit matchers", function() {

  beforeEach(function() {
    this.subject = td.function("dubs");

    if(jasmine.addMatchers) {
      // Jasmine 2.x
      jasmine.addMatchers({toVerify: null}); // clear out any global matchers
      jasmine.addMatchers(matchers);
    } else {
      // Jasmine 1.x
      this.addMatchers({toVerify: null}); // clear out any global matchers
      this.addMatchers(matchers);
    }
  });

  runTests();

});