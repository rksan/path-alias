[![Coverage Status](https://coveralls.io/repos/github/rksan/path-aliase/badge.svg?branch=main)](https://coveralls.io/github/rksan/path-aliase?branch=main)

# path-alias

任意の config file にある path-alias プロパティを読み込み、絶対パスに解決する手助けをします。

例えば、 `babel.config`の`alias`プロパティは、相対パスでの記述が推奨されますが、同パスを記述するであろう`vue.config`の`alias`プロパティは絶対パスで記述しないと正常に動作しない場合があります。

こうした場合、２種類の config file を開発者が管理する必要がありますが、そのうち何処に設定していたのか忘れてしまうことが多々あります。

そこで、module の pash aliase を任意の別ファイルで管理し、相対パスと絶対パスを相互に変換できるプラグインがあったら便利だなぁと`path-alias`を作成しました。

# インストール

> TODO : 未定(2022/11 現在)

# 使用方法

## 1. config file の作成

まず任意のファイルとして`aliases.json`を作成します。
ファイルの名前も任意です。

次に`babel.config`が保持するであろう`alias`プロパティを記述します。内容も任意です。

```./aliase.json
{
  "root": [".", "./src"],
  "alias": {
    "~": "."
    "@": "./src"
  }
}
```

## 2. プラグインへの読み込み

以下、例として、`babel.config`と`vue.config`での使用方法を説明します。([@babel-plugin-module-resolver](https://github.com/tleunen/babel-plugin-module-resolver)の利用が前提)

### `babe.config.js`

```javascript
// 本モジュールの読み込み
const pathAliase = require("path-alias");

// 参照する config の変更
pathAliases.setConfig({
  // アプリケーションルートパス
  appRootPath: __dirname,
  // 任意の config file がある、アプリケーションルートパスからの相対パス
  config: "./aliases.json".
});

// 相対パスのまま参照
const config = pathAliases.toJSON();

// babel.config に割当する
module.exports = {
  ...

  "plugins": [
    ["module-resolver", {
      "root": config.root,
      "alias": config.alias // { "~", "@" }
    }]
  ]

  ...
}
```

### `vue.config.js`

```javascript
// 本モジュールの読み込み
const pathAliase = require("path-alias");

// 設定の変更
pathAliases.setConfig({
  // アプリケーションルートパス
  appRootPath: __dirname,
  // 任意の config file がある、アプリケーションルートパスからの相対パス
  config: "./aliases.json".
});

// 絶対パスへ解決
const config = pathAliases.resolve();

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  ...
  configureWebpack: (config) => {
    config = {
      resolve: {
        alias: :config.alias
    };

    return config;
    }
  },
  ...
});
```

# 更新履歴

## v0.0.2

- package name を変更

## v.0.0.0

- 新規
