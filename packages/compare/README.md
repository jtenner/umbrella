<!-- This file is generated - DO NOT EDIT! -->
<!-- Please see: https://github.com/thi-ng/umbrella/blob/develop/CONTRIBUTING.md#changes-to-readme-files -->
# ![@thi.ng/compare](https://media.thi.ng/umbrella/banners-20230807/thing-compare.svg?6abf4a5f)

[![npm version](https://img.shields.io/npm/v/@thi.ng/compare.svg)](https://www.npmjs.com/package/@thi.ng/compare)
![npm downloads](https://img.shields.io/npm/dm/@thi.ng/compare.svg)
[![Mastodon Follow](https://img.shields.io/mastodon/follow/109331703950160316?domain=https%3A%2F%2Fmastodon.thi.ng&style=social)](https://mastodon.thi.ng/@toxi)

> [!NOTE]
> This is one of 190 standalone projects, maintained as part
> of the [@thi.ng/umbrella](https://github.com/thi-ng/umbrella/) monorepo
> and anti-framework.
>
> 🚀 Please help me to work full-time on these projects by [sponsoring me on
> GitHub](https://github.com/sponsors/postspectacular). Thank you! ❤️

- [About](#about)
  - [Generic comparison](#generic-comparison)
  - [Additional comparators](#additional-comparators)
  - [Operators](#operators)
- [Status](#status)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage examples](#usage-examples)
- [API](#api)
  - [ICompare support](#icompare-support)
  - [Cluster sort w/ multiple sort keys](#cluster-sort-w-multiple-sort-keys)
- [Authors](#authors)
- [License](#license)

## About

Comparators with optional support for types implementing the [@thi.ng/api
`ICompare`](https://github.com/thi-ng/umbrella/tree/develop/packages/api/src/compare.ts)
interface.

### Generic comparison

- [`compare()`](https://docs.thi.ng/umbrella/compare/functions/compare.html)

### Additional comparators

- [`compareByKey()`](https://docs.thi.ng/umbrella/compare/functions/compareByKey.html)
- [`compareByKeys2()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys2.html)
- [`compareByKeys3()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys3.html)
- [`compareByKeys4()`](https://docs.thi.ng/umbrella/compare/functions/compareByKeys4.html)
- [`compareLengthAsc()`](https://docs.thi.ng/umbrella/compare/functions/compareLengthAsc.html)
- [`compareLengthDesc()`](https://docs.thi.ng/umbrella/compare/functions/compareLengthDesc.html)
- [`compareNumAsc()`](https://docs.thi.ng/umbrella/compare/functions/compareNumAsc.html)
- [`compareNumDesc()`](https://docs.thi.ng/umbrella/compare/functions/compareNumDesc.html)
- [`reverse()`](https://docs.thi.ng/umbrella/compare/functions/reverse.html)

### Operators

- [`numericOp()`](https://docs.thi.ng/umbrella/compare/functions/numericOp.html)
- [`stringOp()`](https://docs.thi.ng/umbrella/compare/functions/stringOp.html)
- [`eq()`](https://docs.thi.ng/umbrella/compare/functions/eq.html)
- [`gt()`](https://docs.thi.ng/umbrella/compare/functions/gt.html)
- [`gte()`](https://docs.thi.ng/umbrella/compare/functions/gte.html)
- [`lt()`](https://docs.thi.ng/umbrella/compare/functions/lt.html)
- [`lte()`](https://docs.thi.ng/umbrella/compare/functions/lte.html)
- [`neq()`](https://docs.thi.ng/umbrella/compare/functions/neq.html)

## Status

**STABLE** - used in production

[Search or submit any issues for this package](https://github.com/thi-ng/umbrella/issues?q=%5Bcompare%5D+in%3Atitle)

## Installation

```bash
yarn add @thi.ng/compare
```

ES module import:

```html
<script type="module" src="https://cdn.skypack.dev/@thi.ng/compare"></script>
```

[Skypack documentation](https://docs.skypack.dev/)

For Node.js REPL:

```js
const compare = await import("@thi.ng/compare");
```

Package sizes (brotli'd, pre-treeshake): ESM: 629 bytes

## Dependencies

- [@thi.ng/api](https://github.com/thi-ng/umbrella/tree/develop/packages/api)

## Usage examples

Several projects in this repo's
[/examples](https://github.com/thi-ng/umbrella/tree/develop/examples)
directory are using this package:

| Screenshot                                                                                                             | Description                                                                 | Live demo                                              | Source                                                                              |
|:-----------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------|:-------------------------------------------------------|:------------------------------------------------------------------------------------|
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/dominant-colors.png" width="240"/> | Color palette generation via dominant color extraction from uploaded images | [Demo](https://demo.thi.ng/umbrella/dominant-colors/)  | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/dominant-colors)  |
|                                                                                                                        | Full umbrella repo doc string search w/ paginated results                   | [Demo](https://demo.thi.ng/umbrella/rdom-search-docs/) | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/rdom-search-docs) |
| <img src="https://raw.githubusercontent.com/thi-ng/umbrella/develop/assets/examples/triple-query.png" width="240"/>    | Triple store query results & sortable table                                 | [Demo](https://demo.thi.ng/umbrella/triple-query/)     | [Source](https://github.com/thi-ng/umbrella/tree/develop/examples/triple-query)     |

## API

[Generated API docs](https://docs.thi.ng/umbrella/compare/)

### ICompare support

```ts
import { ICompare } from "@thi.ng/api";
import { compare } from "@thi.ng/compare";

class Foo implements ICompare<Foo> {

    x: number;

    constructor(x: number) {
        this.x = x;
    }

    compare(o: Foo) {
        return compare(this.x, o.x);
    }
}

compare(new Foo(1), new Foo(2));
// -1
```

### Cluster sort w/ multiple sort keys

Key-based object comparison is supported for 1 - 4 keys / dimensions.

```ts tangle:export/readme1.ts
import * as cmp from "@thi.ng/compare";

const src = [
    { id: "charlie", age: 66 },
    { id: "bart", age: 42 },
    { id: "alice", age: 23 },
    { id: "dora", age: 11 },
];

// cluster sort by id -> age (default comparators)
console.log(
    [...src].sort(cmp.compareByKeys2("id", "age"))
);
// [
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 },
//   { id: 'dora', age: 11 }
// ]

// cluster sort by age -> id (default comparators)
console.log(
    [...src].sort(cmp.compareByKeys2("age", "id"))
);
// [
//   { id: 'dora', age: 11 },
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 }
// ]

// cluster sort by age -> id
// (custom comparator for `age` key)
console.log(
    [...src].sort(cmp.compareByKeys2("age", "id", cmp.compareNumDesc))
);
// [
//   { id: 'charlie', age: 66 },
//   { id: 'bart', age: 42 },
//   { id: 'alice', age: 23 },
//   { id: 'dora', age: 11 }
// ]

// using `reverse()` comparator for `id`
console.log(
    [...src].sort(cmp.compareByKeys2("age", "id", cmp.compare, cmp.reverse(cmp.compare)))
);
// [
//   { id: 'dora', age: 11 },
//   { id: 'alice', age: 23 },
//   { id: 'bart', age: 42 },
//   { id: 'charlie', age: 66 }
// ]
```

## Authors

- [Karsten Schmidt](https://thi.ng)

If this project contributes to an academic publication, please cite it as:

```bibtex
@misc{thing-compare,
  title = "@thi.ng/compare",
  author = "Karsten Schmidt",
  note = "https://thi.ng/compare",
  year = 2016
}
```

## License

&copy; 2016 - 2024 Karsten Schmidt // Apache License 2.0
