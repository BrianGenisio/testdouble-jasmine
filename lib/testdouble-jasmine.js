require("jasmine-matcher-wrapper");

module.exports = function(testdouble) {
  var matchers = {
    toVerify: function(doubleCall) {
      try {
        testdouble.verify(doubleCall);
        return true;
      } catch(e) {
        this.message = function() { return e.message; }
        return false;
      }
    }
  };

  beforeEach(function() {
    if(jasmine.addMatchers) {
      // Jasmine 2.0
      jasmine.addMatchers(jasmine.matcherWrapper.wrap(matchers));
    } else {
      // Jasmine 1.0
      this.addMatchers(matchers);
    }
  });
};