# How to Release

## Prerequisites

GraphQL Metadata follows [semantic versioning](https://semver.org). Please ensure the release version you create follows this.

## Stable release

1. Create a new branch from master: `git checkout -b chore/release-x.x.x` (x.x.x represents the new version).
2. Change the [package.json](https://github.com/aerogear/graphql-metadata/blob/master/package.json#L3) version to the new version.
3. Create a commit: `chore(release): release version x.x.x`.
4. Push your branch and create a pull request to master.
5. Once merged, you can publish the release through [Git tagging](#git-tagging) or [GitHub](#releasing-through-github).

## Pre-release

If your a creating a pre-release, you do not need to update the `package.json`. To trigger a pre-release, append the version with `-xxx`; for example: `1.0.0-beta1`. You can do this by following the [Git tagging](#git-tagging) or [GitHub](#releasing-through-github) steps below.

## Git tagging

1. `git tag x.x.x` (x.x.x being the new version).
2. `git push origin x.x.x`.
3. Go to the release tag in GitHub and click _Edit tag_.
4. Update the _Release title_ to `x.x.x`.
5. If it is a pre-release, tick the _This is a pre-release_ checkbox.
6. In the description, add the release notes from the [CHANGELOG](./CHANGELOG.md).
7. The release workflow will be triggered. You can monitor progress in the [GitHub Actions view](https://github.com/aerogear/graphql-metadata/actions?query=workflow%3ACI).

See [Git tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging) for a complete guide on this process.

## Releasing through GitHub

1. Create a new release through the [releases](https://github.com/aerogear/graphql-metadata/releases) view.
2. Set the _Tag version_ to your release version: `x.x.x`.
3. Set the _Release title_ to your release version: `x.x.x`.
4. If it is a pre-release, tick the _This is a pre-release_ checkbox.
5. In the description, add the release notes from the [CHANGELOG](./CHANGELOG.md).

See [creating releases through GitHub](https://docs.github.com/en/enterprise/2.13/user/articles/creating-releases) for the official guide on this process.