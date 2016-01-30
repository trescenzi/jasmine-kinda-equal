(function(jasmine) {
  beforeEach(function() {
    function checkIfNumbersAreKindaEqual(actual, expected) {
      return {pass: actual - 1 === expected ||
        actual + 1 === expected ||
        actual === expected ||
        Math.round(actual) === Math.round(expected) ||
        Math.round(actual - 1) === Math.round(expected) ||
        Math.round(actual + 1) === Math.round(expected)};
    }

    function checkIfBooleansAreKindaEqual(actual, expected) {
      return {pass: true};
    }

    function checkIfStringsAreKindaEqual(actual, expected) {
      if(actual.length !== expected.length) {
        return {
          pass: false, 
          message: actual + ' and ' + expected +
            ' are different lengths there\'s no way they are kinda equal'
        };
      }

      expected = expected.toUpperCase();
      actual = actual.toUpperCase();
      for(i = 0; i < expected.length; i++) {
        var currChar = expected.charAt(i);
        if (currChar !== actual.charAt(i) && 
            currChar !== actual.charAt(i+1) && 
            currChar !== actual.charAt(i-1) && 
            (i === 0 && currChar !== actual.substr(-1)) && 
            (i === expected.length-1 && currChar !== actual.charAt(0))) {
          return {
            pass: false,
            message: actual + ' and ' + expected + ' aren\'t kinda equal'
          };
        }
      }
      return {pass: true};
    }

    function checkIfObjectsAreKindaEqual(actual, expected) {
      if(actual.length !== expected.length) {
        return {
          pass: false,
          message: 'Objects and arrays of different lengths aren\'t equal'
        };
      }

      for(var key in actual) {
        if(!expected[key] || !checkIfKindaEqual(actual[key], expected[key])) {
          return {
            pass: false,
            message: 'Objects differed at key:' + key
          };
        }
      }
      return {pass: true};
    }

    function checkIfFunctionsAreKindaEqual(actual, expected) {
      return {pass: checkIfKindaEqual(actual(),expected())};
    }

    function checkIfKindaEqual(actual, expected) {
      if(expected === undefined) {
        return {pass: false};
      }

      if(typeof actual !== typeof expected) {
        return {
          pass: false,
          message: 'Don\'t try to compare things of different types. It\'s really' +
            ' not a good idea. We reccomend you use [TypeScript](http://www.typescriptlang.org/)' +
            ' to ween yourself off of the bad habits JavaScript tought you.'
        };
      }

      switch(typeof expected) {
        case 'boolean':
          return checkIfBooleansAreKindaEqual(actual, expected);
        case 'number':
          return checkIfNumbersAreKindaEqual(actual, expected);
        case 'string':
          return checkIfStringsAreKindaEqual(actual, expected);
        case 'object':
          return checkIfObjectsAreKindaEqual(actual, expected);
        case 'function':
          return checkIfFunctionsAreKindaEqual(actual, expected);
        default:
          return {pass: false, message: actual + ' isn\'t even kinda equal to ' + expected};
      }
    }

    jasmine.addMatchers({
      toBeKindaEqualTo: function() {
        return {
          compare: function(actual, expected) {
            return checkIfKindaEqual(actual, expected);
          }
        };
      }
    });
  });
})(jasmine);
