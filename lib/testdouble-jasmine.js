function getMatchers(testdouble) {
  var matchers = {
    toVerify: function() {
      try {
        testdouble.verify();
        return true;
      } catch(e) {
        this.message = function() { return e.message; }
        return false;
      }
    }
  };

  if(jasmine.addMatchers) {
    // Jasmine 2.0
    matchers = {
      toVerify: function() {
        return {
          compare: function(actual, expected, config) {
            try {
              testdouble.verify(undefined, config);
              return { pass: true };
            } catch(e) {
              return {
                pass: false,
                message: e.message
              }
            }
          }
        }
      }
    };
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