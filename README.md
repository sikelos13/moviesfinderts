
## Moviesfinder-project

This is an end-to-end search dashboard for education purposes.Build with create-react-app and typescript template and for the backend node.js.

## Build With

* [NodeJs](https://nodejs.org/en/)
* [Material UI](https://material-ui.com/)
* [Create-react-app with Typescript template](https://create-react-app.dev/docs/adding-typescript/)

### Prerequisites

The project is running on nodeJs.


If you want to run in development mode then:

```
cd moviesfinderts

npm install
npm start
```

## How it Works

Run the app with `npm run start` . The server listens to :8000 port and frontend at :3000. 
For storing data we are using a in-memory MongoDB that you can connect with mongodb://localhost:27017/movieFinder 
The user can navigate through the navigation bar and search for movies and save them to its bookmarks.

### Features implemented
* Search field with debounce for searching movies
* Show details button for redirecting to details page of the selected movie.
* Add to favorites button
* Remove from favorites button with on fly deletation from the list
* User can edit it's own account settings.

## How We built the Scripting/Parsing Tool.

We worked on plain with typescript ,loadash, sass and node.js .For styling we followed Material Ui theme guidelines and for our REST we used Node.js.

## License

Copyright © 2020, Released under AUEB License.
