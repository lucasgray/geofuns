# `client`

Client depends on the swagger file generated in the `api` and generates a `fetch` based api client automatically. The smarter the swagger file, the smarter the resulting client. In our case, payload shapes are included.

Further refinement here could include authentication tokens, examples (which get baked into jsdoc), validation, and more.

## To Run

See `npm run build` and `npm run generate` - generate assumes the generate step of api has run (configured via turborepo), grabs the swagger spec and codegens against it. `run build` runs `tsc` for the consuming packages.

This will be automatically run during the turborepo pipeline.