# Tiny Blog

## Usage

### Setting up JWT Token

`server` requires a JWT token for authentication.

Generate a `JWT_SECRET` using `openssl`.

```sh
openssl rand -base64 32
```

Create a `.env` file in `server` and save the generated token as an environment variable. For example:

```env
JWT_SECRET="Ifg720wYyjE8bWmi69LnjvnmMbDxa6ZjOAIK0eGJLm0="
```

### Running the project

Make sure you have Just and Docker installed.

```sh
just dev
```

If you do not have Just, you can directly run the command in the `Justfile`

```sh
docker compose -f compose.override.yml -f compose.dev.yml up --build
```

## Testing

Testing is not automated but the server endpoints can be tested using the given Postman Collection.
