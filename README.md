# apache2-conf-formatter [![Build Status](https://img.shields.io/github/workflow/status/SavageCore/node-apache2-conf-formatter/test)](https://github.com/SavageCore/node-apache2-conf-formatter/actions/workflows/npm-test.yml)
 [![Codecov](https://img.shields.io/codecov/c/github/SavageCore/node-apache2-conf-formatter.svg?style=flat-square)](https://codecov.io/gh/SavageCore/node-apache2-conf-formatter/)

> Format apache2 configuration files

## Install

```
$ npm install apache2-conf-formatter
```

## Usage

```js
const apache2ConfFormatter = require('apache2-conf-formatter');

console.log(apache2ConfFormatter.format('httpd.conf'));
//=> Promise <String> the formatted configuration file
```

## API

### format(path, [options])

Format the given file

**arguments:**
`path` the path to file.
`options` (optional) `Object` see [options](#options)

**returns:**
`Promise` \<String> the formatted configuration file

#### options

##### useTabs

Type: `boolean`

Default: `false`

Indent lines with tabs instead of spaces

##### tabWidth

Type: `number`

Default: `2`

Specify the number of spaces/tabs per indentation-level

## License

MIT © [SavageCore](https://savagecore.eu)
