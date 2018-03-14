# Node TSOA example Web

[![BuildStatus](https://travis-ci.org/stevenalexander/node-tsoa-example-web.svg?branch=master)](https://travis-ci.org/stevenalexander/node-tsoa-example-web?branch=master)

Example Node web application used to call onto a Node TypeScript API, with model/request definitions shared via external versioned models module.

This repo is part of a collection of three repos that make up the entire example solution, [web](https://github.com/stevenalexander/node-tsoa-example-web), [api](https://github.com/stevenalexander/node-tsoa-example-api) and [models](https://github.com/stevenalexander/node-tsoa-example-models).

Requires:
* NodeJS (v8+)

## Run

```
npm install
npm start # http://localhost:3000
```

## Debug

```
node --inspect bin/www # open chrome://inspect and connect to debugger
```

## Updating models

The models module, used for DTO and request/response object definitions, is imported from a separate repository [here](https://github.com/stevenalexander/node-tsoa-example-models).

To update, change the tagged version in `package.json` to required branch, e.g.:

```
"tsoa-example-models": "git+https://github.com/stevenalexander/node-tsoa-example-models.git#v0.1"
```

You can use a local path for the module, allowing local devleopment:

```
npm install --save file://src/node-tsoa-example-models
# "tsoa-example-models": "file:../node-tsoa-example-models"
```