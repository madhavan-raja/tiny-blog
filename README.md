# Tiny Blog

## Running the project

Make sure you have Just and Docker installed.

```sh
just dev
```

If you do not have Just, you can directly run the command in the `Justfile`

```sh
docker compose -f compose.override.yml -f compose.dev.yml up --build
```
