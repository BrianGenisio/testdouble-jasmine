require("jasmine-matcher-wrapper");

function getMatchers(testdouble) {
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

  if(jasmine.addMatchers) {
    // Jasmine 2.0
    matchers = jasmine.matcherWrapper.wrap(matchers);
  }

  return matchers;
}

function useMatchers(testdouble) {
  beforeEach(function() {
    var matchers = getMatchers(testdouble);

    if(jasmine.addMatchers) {
      // Jasmine 2.0
      jasmine.addMatchers(matchers);
    } else {
      // Jasmine 1.0
      this.addMatchers(matchers);
    }
  });
};

module.exports = {
  get: getMatchers,
  use: useMatchers
}