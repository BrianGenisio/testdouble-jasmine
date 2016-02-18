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
    this.addMatchers(matchers);
  });
};