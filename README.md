
# Route Management with `react-map-gl`

This is a turborepo monorepo with several projects:

* `apps/dronemap` - the CRA webapp to host a SPA for the UI. 
* `apps/api` - the api to serve map POI data
* `packages/types` - shared models
* `scripts/datagen` - script to generate POI data

## To Run

Requires `pnpm` and `turbo`. Install using your favorite method. 

* https://turbo.build/
* https://pnpm.io/

`pnpm install && turbo run dev` should be enough to run (but you might want to cross your fingers :)

View [http://localhost:3000](http://localhost:3000) in your browser to see the generated data in a mapbox+deck.gl map. From there, you can zoom+pan the map, as well as classify the POIs using the sidebar or by interacting with the map elements. This only gets saved in browser memory.

I also created a canned map using some of my favorite running routes :) [http://localhost:3000?canned=true](http://localhost:3000?canned=true) will enable you to see those.

[http://localhost:5000/docs/](http://localhost:5000/docs/) serves up the swagger docs for the api.
