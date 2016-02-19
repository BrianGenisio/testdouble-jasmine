# testdouble-jasmine
This is a tiny library (modeled after [testdouble-chai](https://github.com/BaseCase/testdouble-chai)) that adds a `.toVerify` matcher to Jasmine for use with [testdouble.js](https://github.com/testdouble/testdouble.js).  This matcher can be used as syntactic sugar over the `testdouble.verify` function.  It solves the problem that Jasmine doesn't register `testdouble.verify` as a legitimate assertion.  Jasmine will complain, in fact, if you only include `testdouble.verify` without another assertion, and will leave it out of the assertion count.  This libary fixes that.

Here are some examples:

## Use
```js
it("can verify that a testdouble object was called", function() {
	var td = testdouble.function();
	td();
	expect().toVerify(td());
});
```

or with arguments:

```js
it("can tell you if a testdouble object was called a certain way", function() {
  var td = testdouble.function();
  td("hi");
  expect().toVerify(td("hi"));  // instead of `verify(td("hi"))`!
});
```

## Setup
After installing the library with `npm install --save-dev testdouble-jasmine`, here's how to get jasmine to know about `testdouble-jasmine`:

### Global
If you want to hook up the matchers for everyone, you can `use()` this to the top of your spec helper:

```js
// at the top of a spec helper
var td = require('testdouble');
var tdJasmine = require('../lib/testdouble-jasmine'); 
tdJasmine.use(td); // make sure to call tdJasmine.use with td to register the matcher
```

### More Control
You may not want to add the testdouble matcher to every test.  In that case, you can `get()` the matchers and register them yourself:

*Jasmine 1.x*
```js
var td = require('testdouble');
var tdMatchers = require('../lib/testdouble-jasmine').get(td);

describe('something', function() {
    beforeEach(function() {
        this.addMatchers(tdMatchers);
    });
});
```

*Jasmine 2.x*
```js
var td = require('testdouble');
var tdMatchers = require('../lib/testdouble-jasmine').get(td);

describe('something', function() {
    beforeEach(function() {
        jasmine.addMatchers(tdMatchers);
    });
});
```

And you should be good to go! Check out `test/testdouble-jasmine_spec.js` for an exhaustive description of how this library behaves.
