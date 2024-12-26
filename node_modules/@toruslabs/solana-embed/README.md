# Solana Embed (by Web3Auth)

[![npm version](https://badge.fury.io/js/%40toruslabs%2Fsolana-embed.svg)](https://badge.fury.io/js/%40toruslabs%2Fsolana-embed)
![npm](https://img.shields.io/npm/dw/@toruslabs/solana-embed)
[![minzip](https://img.shields.io/bundlephobia/minzip/@toruslabs/solana-embed?label=%22%22)](https://bundlephobia.com/result?p=@toruslabs/solana-embed)

> [Web3Auth](https://web3auth.io) is where passwordless auth meets non-custodial key infrastructure for Web3 apps and wallets. By aggregating OAuth (Google, Twitter, Discord) logins, different wallets and innovative Multi Party Computation (MPC) - Web3Auth provides a seamless login experience to every user on your application.

## 📖 Documentation

Checkout the official [Torus Documentation for Solana Embed](https://docs.tor.us/solana-wallet/api-reference/installation) to get started.

## 🔗 Installation

```shell
npm install --save @toruslabs/solana-embed
```

## ⚡ Quick Start

### Get your Client ID from Web3Auth Dashboard

Hop on to the [Web3Auth Dashboard](https://dashboard.web3auth.io/) and create a new Torus Wallet project. Use the Client ID of the project to start your integration.

![Web3Auth Dashboard - Torus Wallets](https://user-images.githubusercontent.com/6962565/187207779-9420f4ad-17e8-43fa-b578-0bc64f50e4d3.png)

## Initialize & Login

```ts
import Torus from "@toruslabs/solana-embed";

const torus = new Torus();
await torus.init({
  buttonPosition: "top-left", // default: bottom-left
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  showTorusButton: false, // default: true
  whitelabel: {
    theme: { isDark: true, colors: { torusBrand1: "#00a8ff" } },
    logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
    logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
    topupHide: true,
  },
});
await torus.login();
```

## 🩹 Examples

Checkout the examples `Solana Embed` in our [example directory.](https://github.com/torusresearch/solana-embed/tree/main/examples/vue-app)

## 🌐 Demo

Checkout the [Web3Auth Demo](https://demo-solana.tor.us/) to see how `Solana Embed` can be used in your application.

## 💬 Troubleshooting and Discussions

- Have a look at our [GitHub Discussions](https://github.com/Web3Auth/Web3Auth/discussions?discussions_q=sort%3Atop) to see if anyone has any questions or issues you might be having.
- Checkout our [Troubleshooting Documentation Page](https://web3auth.io/docs/troubleshooting) to know the common issues and solutions
- Join our [Discord](https://discord.gg/web3auth) to join our community and get private integration support or help with your integration.

## Introduction

This module generates the javascript to include in a DApp via a script tag.
It creates an iframe that loads the Torus page and sets up communication streams between
the iframe and the DApp javascript context.

## Features

- Typescript compatible. Includes Type definitions

## Installation

### Bundling

This module is distributed in 3 formats

- `esm` build `dist/torus.esm.js` is es6 format
- `commonjs` build `dist/torus.cjs.js` in es5 format
- `umd` build `dist/torus.umd.min.js` in es5 format without polyfilling corejs minified

By default, the appropriate format is used for your specified usecase
You can use a different format (if you know what you're doing) by referencing the correct file

The cjs build is not polyfilled with core-js.
It is upto the user to polyfill based on the browserlist they target

### Directly in Browser

CDN's serve the non-core-js polyfilled version by default. You can use a different

jsdeliver

```js
<script src="https://cdn.jsdelivr.net/npm/@toruslabs/solana-embed"></script>
```

unpkg

```js
<script src="https://unpkg.com/@toruslabs/solana-embed"></script>
```

### Tips for NUXT

This is a plugin that works [only on the client side](https://nuxtjs.org/guide/plugins/#client-side-only). So please register it as a ssr-free plugin.

## Usage

Please refer to the [examples](examples) folder for details on usage using dynamic import.

## Rehydration

Torus uses `window.sessionStorage` to store user details.

So, if the user reloads the page, all his data would be rehydrated and the user doesn't need to log in.

The samples provided in the [examples](examples) folder illustrate the above case.

## Build

Ensure you have a `Node.JS` development environment setup:

```
git clone https://github.com/torusresearch/solana-embed.git
cd solana-embed
npm install
npm run build
```

To run tests:

```
npm run test:e2e:headful
npm run test:build-embed
```

entry-point: `index.js`

## Requirements

- This package requires a peer dependency of `@babel/runtime`
- Node 18+

## License

`solana-embed` is [MIT Licensed](LICENSE)
