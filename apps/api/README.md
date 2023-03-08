# `api`

This is an express + `tsoa` backend api.

We read from a file, transform the data in a service to GeoJson spec, and return those values in `tsoa` controllers.

`tsoa` is a great little library that codegens express routes behind the scenes. You get...

* Automatic swagger documentation / openapi spec
* Validation via `jsdoc`
* Authentication/authorization baked in
* Typed payloads

For a persistence layer my goto for typescript is `knex` and postgres.