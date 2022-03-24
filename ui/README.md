# demo/ui

## 開発環境

- Node.js（nodenv を想定していますが、`.node-version`の Node.js があれば何でも良いです）
- Yarn

```shell
$ cd ui
$ nodenv install
$ yarn
$ yarn dev
```

http://localhost:3000 が立ち上がります。

### エディターについて

VSCode を推奨します。推奨する拡張機能については、`../.vscode/extensions.json`を参照してください。

エディタの設定ファイル(`../.vscode/settings.json`)は各自の設定を考慮して Git による管理をしていません。拡張機能を実行する場合は、以下の設定を参考にしてください。

`../.vscode/settings.json`の設定例：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
