# Jasmine Kinda Equal

### The Jasmine matcher for when you need tests that aren't quite as precise as usual

Jasmine Kinda Equal exports a single new matcher for use in tests: `toBeKindaEqualTo`. The exact
meaning of something being kinda equal to something else depends on the type of the values being
compared.

- `boolean`: Given that there are only two values for a boolean to have they are both, quite reasonably,
kinda equal to each other. For example true is kinda equal to false.
- `number`: Numbers are kinda equal to each other if they are within 1, or would round to within 1 of the same number.
For example 1 is kind equal to 2 and 0.5.
- `string`: Strings are kinda equal to each other if they are the same length and every character is within 1 position
of where it is expected to be also wrapping on the ends. For example 'dog' is kinda equal to 'god'.
- `object` and `array`: Objects and arrays are kinda equal to each other if they are the same length, have the same keys,
and all of their values are respectivly kinda equal. For example [1,2,3] is kinda equal to [0,3,4].
- `function`: Functions are kinda equal if they return, when called with no arguments, values that are kinda equal.

## Usage Examples
``` js
// compare some bools
expect(true).toBeKindaEqualTo(false);

// compare some numbers
expect(0).toBeKindaEqualTo(1);
expect(0.5).toBeKindaEqualTo(1);
expect(1).not.toBeKindaEqualTo(3);

// compare some strings
expect('dog').toBeKindaEqualTo('god');
expect('pepsi').not.toBeKindaEqualTo('coke');

// compare some objects
expect([1,'dog',3]).toBeKindaEqualTo([0,'god',4]);
expect({a: 1, b: 2, c: 'bob', d: 4}).toBeKindaEqualTo({a: 2, b: 3, c: 'obo', d: 5});
expect({a: 1, b: 0, c: 'john', d: 4}).not.toBeKindaEqualTo({a: 2, b: 3, c: 'fred', d: 5});

// compare some functions
expect(() => 42).toBeKindaEqualTo(() => 43)
expect(() => 0.007).not.toBeKindaEqualTo(() => 43)
```

## A Note on Typesaftey
JavaScript by default allows users to compare values that are different types. This is, in my opinion, a miserable idea.
While I'm ok with calling true basically the same thing as false, I am not ok with 1 being the same as '1'. That is 
absolute nonsense. As a result Jasmine Kinda Equals strictly enforces types. What does this mean? It means that
two values of different types are never ever kinda equal. It also means you should try out [typescript](http://www.typescriptlang.org/).
