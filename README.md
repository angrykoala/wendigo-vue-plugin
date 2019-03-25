Wendigo Vue Plugin
==================
_by @angrykoala_

[![npm version](https://badge.fury.io/js/wendigo-vue-plugin.svg)](https://badge.fury.io/js/wendigo-vue-plugin)
[![Build Status](https://travis-ci.org/angrykoala/wendigo-vue-plugin.svg?branch=master)](https://travis-ci.org/angrykoala/wendigo-vue-plugin)


A [Wendigo](https://github.com/angrykoala/wendigo) plugin for [Vue.js](https://vuejs.org/) pages.

> This plugin requires Wendigo 1.11.0 or superior

**Contents**
* [Getting Started](#getting-started)
* [Plugin](#plugin)
  * [Store](#store)
  * [Router](#router)
* [Assertions](#assertions)
    * [Store Assertions](#store-assertions)
* [Development](#development)
* [Troubleshooting](#troubleshooting)
* [License](#license)

## Getting Started

To install Wendigo Vue Plugin, execute:
```
npm install --save-dev wendigo wendigo-vue-plugin
```

To add the plugin to Wendigo in your tests:

```js
const Wendigo = require('wendigo');
const WendigoVuePlugin = require('../index.js');


Wendigo.registerPlugin(WendigoVuePlugin);

const browser = Wendigo.createBrowser();
```

You can access the Vue methods using `browser.vue` and `browser.assert.vue`


## Plugin

All the methods and properties are under `browser.vue`. The plugin provides the following properties:

* **detected**: true if Vue.js is detected in the page, false otherwise.

There are several modules that can be accessed through `browser.vue.[module]`.

### Store
The store module allows to access and modify [Vuex](https://vuex.vuejs.org) store if it is set. These methods and properties can be accesed through `browser.vue.store`.

**getState(key?)**  
Returns the state of the given key, if no key is set, the whole state of the store will be returned.

```js
await browser.vue.store.getState("user"); // { id: 1234, email:"foo@bar.com" }
await browser.vue..store.getState(); // { user: { ... }, msg: ["My Msg"] }
```

> The state must be serializable and it cannot be modified

**getter(key)**  
Executes and returns the getter with given key:

```js
await browser.vue.store.getter("userEmail"); // "foo@bar.com"
```

**commit(name, data?)**  
Executes the mutation with given name, passing the data object as argument.

```js
await browser.vue.store.commit("updateUser", { id:1234, email: "bar@foo,com"})
```

**dispatch(name, data?)**  
Executes the action with given name, returns the promise returned by the action.

```js
await browser.vue.store.dispatch("userUpdateAndGetId"); // 2345
```

> Keep in mind that, unlike in Vuex, all methods are asynchronous and return promises.

### Router
This module allow to execute actions and get information about [vue-router](https://router.vuejs.org)

**getAll()**  
Returns all routes defined in the router, each route contains the following attributes:
* **name**: The name defined for the route, if any.
* **path**: The path the route is active (e.g `/page2`, `*`).
* **redirect**: The path the route is redirecting to, if any.

```js
const routes = await browser.vue.router.getAll();
```


## Assertions
Assertions regarding Vue, these can be accessed through `browser.assertions.vue`, some negative assertions are provided using `browser.assertions.vue.not`.

**detected()**   
Asserts that Vue.js is detected in page.

```js
await browser.open("http://localhost:8080/foo");
await browser.assert.vue.detected();
```

**not.detected()**
Asserts that Vue.js is not detected in page.

### Store Assertions
Assertions regarding Vuex store, these can be accessed through `browser.assertions.vue.store`.

**state(key, expected, msg?)**  
Asserts that the state element with given key has the expected value.

```js
await browser.assert.vue.store.state("count", 0);
```

**getter(key, expected, msg?)**
Asserts that the getter with given key has the expected value.

## Injected Scripts
Along with the scripts injected by Wendigo, this plugin required to inject some js scripts into the web to work properly. All these scripts are injected under the global object `WendigoVuePlugin`, and can be accessed by using `browser.evaluate()`.

This object contains the following properties:
* **vue**: Contains the Vue root parent, if any.

The following methods are exposed as well:

* **detectVue()**: Detects if Vue is in the page and sets the `vue` property, returns true if found, false otherwise. This method should not be executed by code outside the plugin itself.

# Development
To develop Wendigo Vue Plugin follow these steps:
1. Clone the repo or your fork
2. Execute `npm install` (node 8.12 or superior needed)
3. Execute `npm test` to run the tests
  * Execute `npm run lint` to run the code linter

After making your changes and before doing any pull request, please make sure that `npm test` and `npm run lint` are running without errors.


# Troubleshooting

## VueNotFoundError: Vue not detected.
This error will be thrown if you try to execute an action or assertion in a page that doesn't uses Vue. Make sure that the page you've opened uses Vue, if so, this may be caused by your built if Vue is in production mode, try to run the tests with development mode and fill an [issue](https://github.com/angrykoala/wendigo-vue-plugin/issues) detailing your built, error and tests.

Please, check the [troubleshooting page](https://github.com/angrykoala/wendigo#troubleshooting) of Wendigo and make sure your problem is not described there or in any issue before filling [one](https://github.com/angrykoala/wendigo-vue-plugin/issues).

# License

Wendigo Vue Plugin is maintained by @angrykoala under GPL-3.0 License
