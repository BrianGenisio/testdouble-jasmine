module.exports = function() {
  describe('toVerify', function() {
    it('verifies if the given testdouble was called', function() {
      this.subject();
      expect().toVerify(this.subject());
    });

    it('doesnt verify if the testdouble was not called', function() {
      expect().not.toVerify(this.subject());
    });

    it('doesnt verify if called on an object that isnt a testdouble', function() {
      var not_a_testdouble = function() {};
      not_a_testdouble();
      expect().not.toVerify(not_a_testdouble());
    });

    it('uses options with the verify function', function() {
      this.subject();
      this.subject();

      // Passing Arguments only works with Jasmine 2.0
      expect().toVerify(this.subject(), {times: 2});
    });

    it('can pass options as primary parameter', function() {
      this.subject();
      this.subject();

      // Passing Arguments only works with Jasmine 2.0
      expect().toVerify({called: this.subject(), times: 2});
      expect().not.toVerify({called: this.subject(), times: 3});
    });
  });
}