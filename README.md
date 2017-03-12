# Status Board

A Electron application that displays a status board to display various pieces of information, much like [Panic's Status Board](https://panic.com/statusboard/).

### Packaging

You can package Status Board by running the following commands based on your target system:

* `npm run package:osx` will package for MacOS X x64
* `npm run package:win` will package for Windows x64
* `npm run package:linux` will package for Linux x64
* `npm run package` will package all the above

All packages are stored in the `bin` directory that gets created during the build process.

To learn more about distributing, please read the [Application Distribution](http://electron.atom.io/docs/tutorial/application-distribution/) documentation from Electron.

### Development

Status Board is built with [Angular 2](https://angular.io/) using Typescript. The main application starts in `app/app.ts`.

To build the application you can run one of these commands:

* `npm run build` will build the application
* `npm run election` will build the application and start electron
* `npm run watch` will watch the directory for changes and re-build the application

## License

[MIT License](LICENSE.txt)
