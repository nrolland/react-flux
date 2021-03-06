This directory contains three example applications.

# Todo Example

This is the simpler of the two examples, and you should start here.  The design
is copied pretty much exactly from the [flux todo
example](https://github.com/facebook/flux/tree/master/examples/flux-todomvc).
It uses the same actions, same views, and produces the same DOM, so the design
overview from the flux repository covers this example application as well.

When reading the code for the example application, you should start with `TodoStore.hs`.  Next, look
at `TodoDispatcher.hs` and `TodoViews.hs`.  Finally, you can look at `TodoComponents.hs` and
`Main.hs` and `NodeMain.hs`.

### Build

To build, you must pass the `-fexample` flag to cabal.

~~~
cabal configure -fexample
cabal build
~~~

### TODO in the browser

A result of this build is a file `dist/build/todo/todo.jsexe/all.js`.  There is a file
`example/todo/todo-dev.html` which loads this `all.js` file directly from the `dist` directory, so you
can open `todo-dev.html` after building.

But to deploy a react-flux application, you should minimize it since the size of `all.js` is 1.8
mebibytes.  To do so, there is a `Makefile` which calls closure.  So if you have closure installed
on your path, you can execute

~~~
cd example/todo
make
~~~

This produces a file `js-build/todo.min.js` which is only 500 kibibytes which when compressed with
gzip is 124 kibibytes.  You can then open `example/todo/todo.html` which loads this minimized javascript.

### TODO in node

`NodeMain.hs` is a separate main module which instead of rendering the TODO example application into the DOM,
it renders it to a string and then displays it.  To execute this, run

~~~
cd example/todo
npm install react@0.13.3
node run-in-node.js
~~~

### Testing

Finally, you might be interested to look at
[test/spec/TodoSpec.hs](https://bitbucket.org/wuzzeb/react-flux/src/tip/test/spec/TodoSpec.hs) as it
contains an [hspec-webdriver](https://hackage.haskell.org/package/hspec-webdriver) spec for the TODO
example application.

# PureCSS

The second example application shows building a [responsive side
menu](http://purecss.io/layouts/side-menu/) using [PureCSS](http://purecss.io/).  A similar
technique with slightly different CSS classes can be used to create any of the menu
[layouts](http://purecss.io/layouts/).  The code is ogranzied as:

* `NavStore.hs` contains a store which stores the current page being viewed and a boolean if the
  responsive side menu is open or closed.
* `Dispatcher.hs` contains a function `changePageTo` which allows changing the page.  In a larger
  application, `Dispatcher.hs` should also contain functions to dispatch to the other stores
  containing the actual page data.
* `PageViews.hs` contains the actual page content.  In a real application, each page should probably
  be split into its own module and be a controller view for the content store.
* `App.hs` contains the layout for the entire application, with the navigation bar and header.
* `Main.hs` renders the application into the DOM.

It is also built with `-fexample`.  It uses the browser [history
API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) which does not work if you open `index.html` directly from the filesystem.  Instead, the index.html file must be served.

~~~
cabal configure -fexample
cabal build
cd example/purecss-side-menu
ln -s ../../dist/build/purecss-side-menu/purecss-side-menu.jsexe/all.js purecss-side-menu.js
python3 -m http.server 8000
~~~

Then open your browser to `localhost:8000`.

# Routing Example

The third example application shows routing with the [web-routes](https://hackage.haskell.org/package/web-routes) package.
It is also built by passing `-fexample` to cabal.

~~~
cabal configure -fexample
cabal build
cd example/routing
firefox route-example.html
~~~
