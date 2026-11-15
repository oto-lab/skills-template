# Agent Skills source repository template

[English](README.md) | **日本語**

[otnc/agent-skills](https://github.com/otnc/agent-skills) に収録する公開リポジトリ `otnc/skills_<name>` のテンプレートです。

## リポジトリの作成

1. テンプレートを新しいリポジトリにコピーします。スキルのフォルダ名、`SKILL.md` の `name`、このファイルのインストール例にある `example-skill` を置き換えます。`package.json` のパッケージ名と説明も更新します。リポジトリ名とスキル名が違う場合は、インストール元にリポジトリ名、`--skill` にスキル名を指定してください。
2. `LICENSE` の `[year]` と `[author]` を著作権表示の年と権利者名に置き換えます。`package.json` の `author` にはパッケージの著者名を設定します。
3. `skills/<name>/SKILL.md` にスキルを書きます。`description` には、何ができて、どんな依頼で使うかを書きます。手順で参照する資料やスクリプト、素材があれば、スキルのフォルダ内に `references/`、`scripts/`、`assets/` を作ります。スキルを単体でインストールしても動くよう、必要なファイルは同じフォルダ内に置きます。
4. `base/README.base.md` を新しいスキルの使い方に合わせて書き換えます。以下のコマンドを実行し、生成した README とロックファイルをコミットします。

```sh
npm install
npm run docs:build
npm run check
```

開発には `.node-version` に記載した Node.js を使います。初回のセットアップ後は、`npm ci` でロックファイルどおりに依存関係をインストールできます。

## インストール

GitHub で配布元リポジトリを公開したら、そこから直接インストールできます。`agent-skills` に同期されたあとは、集約先からもインストールできます。

```sh
npx skills@latest add otnc/skills_example-skill --skill example-skill
npx skills@latest add otnc/agent-skills --skill example-skill
```

## リリース

次回以降のリリースでは、`npm version patch --no-git-tag-version` などでバージョンを更新します。変更をデフォルトブランチにプッシュし、そのブランチを選んで **Actions → release → Run workflow** を開きます。`version` には `package.json` と同じ値を `v` を付けずに入力します。初回なら `0.1.0` です。CI と同じチェックが通り、入力値が `package.json` と一致したら、`v<version>` タグとコミット履歴から作ったリリースノートを付けて GitHub Release を公開します。

公開の `otnc/skills_*` リポジトリは、安定版リリースの公開後に [agent-skills の同期処理](https://github.com/otnc/agent-skills/blob/main/CONTRIBUTING.ja.md) で検出されます。

## License

[MIT](LICENSE)
