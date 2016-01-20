# mod.js
[![Build Status](https://travis-ci.org/zack37/mod.js.svg?branch=master)](https://travis-ci.org/zack37/mod.js)
A Rust inspired utility tool for loading modules from a directory. Much like the `mod.rs` file that handles the repsonsibility or exporting modules inside a directory, <code>mod.<i>js</i></code> attempts to take on a similar responsibility with minimal overhead.

## Getting Started
First, install through npm

`npm install --save mod.js`

Then, just require:

#### ES5
`var load = require('mod.js');`

#### ES6
`import load from 'mod.js';`

## Examples

### load
Given the directory
```
├ schemas/
│   ├ index.js
│   ├ person.js
│   ├ house.json // Supports .js and .json
├ index.js
```
Then in your `schemas/index.js` file, you can simply
```js
// ES5
var load = require('mod.js');

module.exports = load(__dirname);

---

// ES6
import load from 'mod.js';

export default load(__dirname);
```
And then it's as easy as
```js
// root index.js
var schemas = require('./schemas');
// {
//    person: { ... },
//    house: { ... }
//}
```

### loadAsync
There is another function, `loadAsync`, that will load the files asynchronously and return a promise.

Given the same directory as above, your `schemas/index.js` file should look something like:
```js
// ES5
var loadAsync = require('mod.js').loadAsync; 

module.exports = loadAsync(__dirname);

---

// ES6

import { loadAsync } from 'mod.js';

export default loadAsync(__dirname);
``` 
And once again:
```js
// root index.js
require('./schemas')
    .then(schemas => {
        console.log(schemas); // { person: { ... }, house: { ... } }
    });
```
