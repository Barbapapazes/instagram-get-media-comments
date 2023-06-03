# Instagram Get Media Comments

> Script used to get comments from Instagram posts.

## Install dependencies

```bash
pnpm install --frozen-lockfile
```

## Setup environment variables

```bash
cp .env.example .env
```

You can get the access token using the [Graph Explorer tool](https://developers.facebook.com/tools/explorer/).

### Find the media id

1. Get your Instagram ID through the Meta Business Suite.
2. Get your media ID using `/<instagram_id>/media` endpoint.
3. Add it to the `.env` file.

And _voilà_!

## Usage

```bash
pnpm start
```

## License

[MIT](LICENSE) © [Barbapapazes](https://github.com/Barbapapazes)
