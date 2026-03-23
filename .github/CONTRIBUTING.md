# Contributing Guide

Hello there! Thanks for your interest in contributing to Quacky. Before submitting your contribution, please take a moment to read through the following guide.

## Development Setup

You will need [Node.js](https://nodejs.org/) v24 or higher and [pnpm](https://pnpm.io).

After cloning the repository, run:

```sh
# install dependencies
pnpm install
# setup git hooks
pnpm simple-git-hooks
```

## Documentation

Quacky's documentation is built using [VitePress](https://vitepress.vuejs.org/), you can find the documentation in the `docs` folder.

You can `pnpm run docs` to boot up the Quacky's documentation site locally, with live reloading available.

```sh
pnpm run docs
```

After running the above command, visit http://localhost:5173 to view the site.
