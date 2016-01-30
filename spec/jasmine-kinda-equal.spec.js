describe('kinda-equal', function() {
  describe('booleans', function() {
    it('knows true is kinda equal to false', function() {
      expect(true).toBeKindaEqualTo(false);
    });

    it('knows false is kinda equal to true', function() {
      expect(false).toBeKindaEqualTo(true);
    });
  });

  describe('numbers', function() {
    var testNum;
    var testDifference;
    beforeEach(function() {
      testNum = Math.floor(Math.random() * 100000);
      testDifference = Math.floor(Math.random() * 100000) + 2;
    });

    it('knows that all numbers are kinda within 1 of each other', function() {
      expect(testNum).toBeKindaEqualTo(testNum + 1);
      expect(testNum).toBeKindaEqualTo(testNum - 1);
      expect(-testNum).toBeKindaEqualTo(-testNum + 1);
      expect(-testNum).toBeKindaEqualTo(-testNum - 1);
    });

    it('is ok with floating point math being weird', function() {
      expect(1.1).toBeKindaEqualTo(0.1);
      expect(2.1).not.toBeKindaEqualTo(0.1);
      expect(0.1).toBeKindaEqualTo(0.1);
      expect(0.1).toBeKindaEqualTo(1.1);
      expect(0.5).toBeKindaEqualTo(1);
      expect(1.5).not.toBeKindaEqualTo(0.4);
      expect(0.5).toBeKindaEqualTo(0);
      expect(-0.5).toBeKindaEqualTo(-1);
    });

    it('knows that a number is equal to itself', function() {
      expect(testNum).toBeKindaEqualTo(testNum);
    });

    it('knows that numbers further than 1 from each other aren\'t even kinda equal', function() {
      expect(testNum).not.toBeKindaEqualTo(testNum + testDifference);
      expect(testNum).not.toBeKindaEqualTo(testNum - testDifference);
    });
  });

  describe('strings', function() {
    it('knows that dogs are basically god', function() {
      expect('dog').toBeKindaEqualTo('god');
    });

    it('knows that strings are equal to themselves', function() {
      expect('hey').toBeKindaEqualTo('hey');
      expect('supercalifragilisticexpialidocious').toBeKindaEqualTo('supercalifragilisticexpialidocious');
      expect('').toBeKindaEqualTo('');
    });
  });

  describe('objects', function() {
    it('knows arrays are kinda equal if every element is kinda equal', function() {
      expect([1,2,'dog',4]).toBeKindaEqualTo([2,3,'god',5]);
    });

    it('knows objects are kinda equal if every element is kinda equal', function() {
      expect({a: 1, b: 2, c: 'dog', d: 4}).toBeKindaEqualTo({a: 2, b: 3, c: 'god', d: 5});
    });

    it('knows objects aren\'t kinda equal if even a single element differs', function() {
      expect({a: 1, b: 2, c: 'dog', d: 4}).not.toBeKindaEqualTo({a: 2, b: 0, c: 'god', d: 5});
    });

    it('knows arrays aren\'t kinda equal if even a single element differs', function() {
      expect([1,2,'dog',4]).not.toBeKindaEqualTo([2,0,'god',5]);
    });
  });

  describe('functions', function() {
    it('knows functions are kinda equal if they return things that are kinda equal', function() {
      expect(function() {return 42;}).toBeKindaEqualTo(function() {return 41;});
    });

    it('knows functions are kinda equal if they return things that are equal', function() {
      expect(function() {return 42;}).toBeKindaEqualTo(function() {return 42;});
    });

    it('knows functions aren\'t kinda equal if they return things that aren\'t kinda equal', function() {
      expect(function() {return 42;}).toBeKindaEqualTo(function() {return 47;});
    });
  });

  describe('typesaftey', function() {
    it('knows that even while playing around with the truth it\'s a good idea to be safe', function() {
      expect(true).not.toBeKindaEqualTo({});
      expect(true).not.toBeKindaEqualTo('not a number');
      expect(true).not.toBeKindaEqualTo(function() {});
    });

    it('knows that even while playing around with numbers it\'s a good idea to be safe', function() {
      expect(Math.random()).not.toBeKindaEqualTo({});
      expect(Math.random()).not.toBeKindaEqualTo('not a number');
      expect(Math.random()).not.toBeKindaEqualTo(function() {});
    });

    it('knows that even while playing around with strings it\'s a good idea to be safe', function() {
      expect('').not.toBeKindaEqualTo({});
      expect('').not.toBeKindaEqualTo(42);
      expect('').not.toBeKindaEqualTo(function() {});
    });
  });
});
