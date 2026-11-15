# Agent Skills source repository template

:::kiritan{locale=en}
Use this template to create a public `otnc/skills_<name>` repository that can be included in [otnc/agent-skills](https://github.com/otnc/agent-skills).
:::

:::kiritan{locale=ja}
[otnc/agent-skills](https://github.com/otnc/agent-skills) に収録する公開リポジトリ `otnc/skills_<name>` のテンプレートです。
:::

:::kiritan{locale=en}
## Start a repository

1. Copy the template into a new repository. Replace `example-skill` in the folder name, the `name` field in `SKILL.md`, and the install commands in this file. Update the package name and description in `package.json`. If the repository name differs from the skill name, use the repository name in the install command and the skill name with `--skill`.
2. Replace `[year]` and `[author]` in `LICENSE` with the copyright year and holder. Set the `author` field in `package.json` to the package author.
3. Write the skill in `skills/<name>/SKILL.md`. In `description`, specify what the skill does and when agents should use it. Add `references/`, `scripts/`, or `assets/` inside the skill directory when the instructions need them. Keep files used by a skill inside its directory so it works when installed on its own.
4. Replace the README content in `base/README.base.md` with usage instructions for the new skill. Run the commands below and commit the generated READMEs and lockfile.
:::

:::kiritan{locale=ja}
## リポジトリの作成

1. テンプレートを新しいリポジトリにコピーします。スキルのフォルダ名、`SKILL.md` の `name`、このファイルのインストール例にある `example-skill` を置き換えます。`package.json` のパッケージ名と説明も更新します。リポジトリ名とスキル名が違う場合は、インストール元にリポジトリ名、`--skill` にスキル名を指定してください。
2. `LICENSE` の `[year]` と `[author]` を著作権表示の年と権利者名に置き換えます。`package.json` の `author` にはパッケージの著者名を設定します。
3. `skills/<name>/SKILL.md` にスキルを書きます。`description` には、何ができて、どんな依頼で使うかを書きます。手順で参照する資料やスクリプト、素材があれば、スキルのフォルダ内に `references/`、`scripts/`、`assets/` を作ります。スキルを単体でインストールしても動くよう、必要なファイルは同じフォルダ内に置きます。
4. `base/README.base.md` を新しいスキルの使い方に合わせて書き換えます。以下のコマンドを実行し、生成した README とロックファイルをコミットします。
:::

```sh
npm install
npm run docs:build
npm run check
```

:::kiritan{locale=en}
Use the Node.js version in `.node-version` for development. After the initial setup, use `npm ci` to install dependencies from the lockfile.
:::

:::kiritan{locale=ja}
開発には `.node-version` に記載した Node.js を使います。初回のセットアップ後は、`npm ci` でロックファイルどおりに依存関係をインストールできます。
:::

:::kiritan{locale=en}
## Install

After publishing the source repository on GitHub, install the skill directly or from the collection after it syncs.
:::

:::kiritan{locale=ja}
## インストール

GitHub で配布元リポジトリを公開したら、そこから直接インストールできます。`agent-skills` に同期されたあとは、集約先からもインストールできます。
:::

```sh
npx skills@latest add otnc/skills_example-skill --skill example-skill
npx skills@latest add otnc/agent-skills --skill example-skill
```

:::kiritan{locale=en}
## Release

For later releases, run `npm version patch --no-git-tag-version` or select another version bump. Push the changes to the default branch. Run **Actions → release → Run workflow** on that branch and enter the `package.json` version without the leading `v`, for example `0.1.0`. The workflow runs the same checks as CI, confirms the version matches `package.json`, and publishes a GitHub Release with a `v<version>` tag and notes from the commit history.

The [aggregation workflow](https://github.com/otnc/agent-skills/blob/main/CONTRIBUTING.md) discovers public `otnc/skills_*` repositories after a stable release is published.
:::

:::kiritan{locale=ja}
## リリース

次回以降のリリースでは、`npm version patch --no-git-tag-version` などでバージョンを更新します。変更をデフォルトブランチにプッシュし、そのブランチを選んで **Actions → release → Run workflow** を開きます。`version` には `package.json` と同じ値を `v` を付けずに入力します。初回なら `0.1.0` です。CI と同じチェックが通り、入力値が `package.json` と一致したら、`v<version>` タグとコミット履歴から作ったリリースノートを付けて GitHub Release を公開します。

公開の `otnc/skills_*` リポジトリは、安定版リリースの公開後に [agent-skills の同期処理](https://github.com/otnc/agent-skills/blob/main/CONTRIBUTING.ja.md) で検出されます。
:::

## License

[MIT](LICENSE)
