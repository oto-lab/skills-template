# Agent Skills source repository template

**English** | [日本語](README.ja.md)

Use this template to create a public `otnc/skills_<name>` repository that can be included in [otnc/agent-skills](https://github.com/otnc/agent-skills).

## Start a repository

1. Copy the template into a new repository. Replace `example-skill` in the folder name, the `name` field in `SKILL.md`, and the install commands in this file. Update the package name and description in `package.json`. If the repository name differs from the skill name, use the repository name in the install command and the skill name with `--skill`.
2. Replace `[year]` and `[author]` in `LICENSE` with the copyright year and holder. Set the `author` field in `package.json` to the package author.
3. Write the skill in `skills/<name>/SKILL.md`. In `description`, specify what the skill does and when agents should use it. Add `references/`, `scripts/`, or `assets/` inside the skill directory when the instructions need them. Keep files used by a skill inside its directory so it works when installed on its own.
4. Replace the README content in `base/README.base.md` with usage instructions for the new skill. Run the commands below and commit the generated READMEs and lockfile.

```sh
npm install
npm run docs:build
npm run check
```

Use the Node.js version in `.node-version` for development. After the initial setup, use `npm ci` to install dependencies from the lockfile.

## Install

After publishing the source repository on GitHub, install the skill directly or from the collection after it syncs.

```sh
npx skills@latest add otnc/skills_example-skill --skill example-skill
npx skills@latest add otnc/agent-skills --skill example-skill
```

## Release

For later releases, run `npm version patch --no-git-tag-version` or select another version bump. Push the changes to the default branch. Run **Actions → release → Run workflow** on that branch and enter the `package.json` version without the leading `v`, for example `0.1.0`. The workflow runs the same checks as CI, confirms the version matches `package.json`, and publishes a GitHub Release with a `v<version>` tag and notes from the commit history.

The [aggregation workflow](https://github.com/otnc/agent-skills/blob/main/CONTRIBUTING.md) discovers public `otnc/skills_*` repositories after a stable release is published.

## License

[MIT](LICENSE)
