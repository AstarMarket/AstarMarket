# demo/ui

## 開発環境

- Node.js（nodenv を想定していますが、`.node-version`の Node.js があれば何でも良いです）
- Yarn
- Docker

```shell
$ nodenv install
$ yarn
$ yarn dev
# 別タブ
$ docker compose up
```

http://localhost:3000 が立ち上がります。

### Prisma

Prisma 関連でよく使うコマンドをまとめます。

```shell
# データの確認
$ npx prisma studio

# マイグレーション
$ npx prisma migrate dev

# スキーマファイルのフォーマット（VSCode の拡張機能があれば、使う機会はほぼないです）
$ npx prisma format
```

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
  },
  "eslint.workingDirectories": ["./ui"]
}
```
