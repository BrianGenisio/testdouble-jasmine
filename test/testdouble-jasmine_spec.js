var td = require('testdouble');
var tdJasmine = require('../lib/testdouble-jasmine');

tdJasmine(td, jasmine);

describe("testdouble-jasmine", function() {

  it('passes', () => {
    expect(true).toBe(true);
  });

});
