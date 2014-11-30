# WeAreRoots.org

> The sources of the [http://weareroots.org](http://weareroots.org) website.

## Install & Use

```shell
git clone git@github.com:WeAreRoots/weareroots.org.git
cd weareroots.org
npm install && bower install
grunt build
grunt
```

Note: You need Python 2 for the node-gyp dependency.
In case of bcrypt, node-gyp, or Python version error, run `export PYTHON=python2` before `npm install`, with python2 pointing to the binary file of Python 2.


### Create required localhost entries

Because weareroots.org uses multiple hostnames on the same Node instance you need to edit your `/etc/hosts` file and add two new entries, so as you can access the two pre-existing cities:

```
127.0.0.1 ath.localhost
127.0.0.1 skg.localhost
```

## Shell Control

* `grunt` Boot up the application for development workflow, it will:
  * Launch the databases (Mongo & Redis).
  * Launch the Node.js Application.
  * Watch for changes on the SASS files, compile and livereload.
  * Watch for changes on the frontend files (JS, templates, css, images, static assets) and livereload.
  * Watch for changes on the backend files and relaunch the Node.js App.
  * Open the browser on the launched web service.
* `grunt start` Will start the databases (Mongo & Redis).
* `node .` Will launch the Node.js Application.
* `npm test` Will run all test suites (BDD, TDD, lint).
* `grunt sass:main` Compile main website (wearetech.io) styles.
* `grunt sass:city` Compile city website (city.wearetech.io) styles.

## License

Copyright (c) 2014 Thanasis Polychronakis, [Contributors](https://github.com/WeAreRoots/weareroots.org/graphs/contributors). Licensed under the [Mozilla Public License](LICENSE).
