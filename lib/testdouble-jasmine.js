function getMatchers(testdouble) {
  function verify(actual) {
    var options = {};

    if(!!actual && 'called' in actual) {
      delete actual.called;
      options = actual;
    }

    testdouble.verify(undefined, options);
  }

  var matchers = {
    toVerify: function(actual) {
      try {
        verify(actual);
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
          compare: function(expected, actual, options) {
            try {
              verify(actual);
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