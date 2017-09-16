# filter
![logo](https://avatars1.githubusercontent.com/u/31987273?v=4&s=100)

filter a sequence

[![NPM version][npm-image]][npm-url]
[![Travis Status][travis-image]][travis-url]
[![Travis Status][codecov-image]][codecov-url]

## Usage

_package requires a system that supports async-iteration, either natively or via down-compiling_

### Install
```
npm install @async-generators/filter --save
yarn add @async-generators/filter
```

This package's `main` entry points to a `commonjs` distribution. 

Additionally, the `module` entry points to a `es2015` distribution, which can be used by build systems, such as webpack, to directly use es2015 modules. 

## Api

### filter(source, predicate)

<code>filter()</code> iterates the source and yields any item where `await predicate(item) === true`

`source` must have a `[Symbol.asyncIterator]` or `[Symbol.iterator]` property. If both are present only `[Symbol.asyncIterator]` is used. 

`predicate(item, index)` should return a boolean (optionally as Promise)  to signal whether the item should be yielded. 

## Example

example.js
```js
const filter = require('@async-generators/filter').default;

async function* source() {
  yield 1; yield 2; yield 3; yield 4;
}

async function main(){
  for await (let item of filter(source(), x=>x > 1 && x < 4)){
     console.log(item);
  }
}

main();
```

Execute with the latest node.js: 

```
node --harmony-async-iteration example.js
```


output:
```
2
3
```
## Typescript

This library is fully typed and can be imported using: 

```ts
import filter from '@async-generators/filter');
```

It is also possible to directly execute your [properly configured](https://stackoverflow.com/a/43694282/1657476) typescript with [ts-node](https://www.npmjs.com/package/ts-node):

```
ts-node --harmony_async_iteration foo.ts
```

[npm-url]: https://npmjs.org/package/@async-generators/filter
[npm-image]: https://img.shields.io/npm/v/@async-generators/filter.svg
[npm-downloads]: https://img.shields.io/npm/dm/@async-generators/filter.svg
[travis-url]: https://travis-ci.org/async-generators/filter
[travis-image]: https://img.shields.io/travis/async-generators/filter/master.svg
[codecov-url]: https://codecov.io/gh/async-generators/filter
[codecov-image]: https://codecov.io/gh/async-generators/filter/branch/master/graph/badge.svg
