require("jasmine-matcher-wrapper");

function getMatchers(testdouble) {
  return {
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
}

function useMatchers(testdouble) {
  beforeEach(function() {
    if(jasmine.addMatchers) {
      // Jasmine 2.0
      jasmine.addMatchers(jasmine.matcherWrapper.wrap(getMatchers(testdouble)));
    } else {
      // Jasmine 1.0
      this.addMatchers(getMatchers(testdouble));
    }
  });
};

module.exports = {
  get: getMatchers,
  use: useMatchers
}