A GHCJS binding to [React](https://facebook.github.io/react/) based on the
[Flux](https://facebook.github.io/flux/) design.  The flux design pushes state and complicated logic
out of the view, allowing the rendering functions and event handlers to be pure Haskell functions.
When combined with React's composable components and the one-way flow of data, React, Flux, and
GHCJS work very well together.

# Docs

The [haddocks](https://hackage.haskell.org/package/react-flux) contain the documentation.

# Build

I am currently using the latest git version of GHCJS with GHC 7.10.2.  To compile and build, I use:

~~~
echo "compiler: ghcjs" > cabal.config
cabal configure
cabal build
~~~

# TODO Example Application

The source contains an [example TODO
application](https://bitbucket.org/wuzzeb/react-flux/src/tip/example/).

~~~
cabal configure -fexample
cabal build
cd example
make
firefox todo.html
~~~

If you don't have closure installed, you can open `example/todo-dev.html`.

# Test Suite

To run the test suite, first you must build both the example application and the test-client.  (The
test-client is a react-flux application which contains everything not contained in the todo
example.)

~~~
echo "compiler: ghcjs" > cabal.config
cabal configure -fexample -ftest-client
cabal build
cd example
make
~~~

The above builds the TODO application, compresses it with closure, and builds the test client.
Next, install [selenium-server-standalone](http://www.seleniumhq.org/download/) (also from
[npm](https://www.npmjs.com/package/selenium-server-standalone-jar)).  Then, build the
[hspec-webdriver](https://hackage.haskell.org/package/hspec-webdriver) test suite using GHC (not
GHCJS).  I use stack for this, although you can use cabal too if you like.

~~~
cd test/spec
stack build
~~~

Finally, start selenium-server-standalone and execute the test suite.  It must be started from the
`test/spec` directory, otherwise it does not find the correct javascript files.

~~~
.stack-work/dist/x86_64-linux/Cabal-1.22.4.0/build/react-flux-spec/react-flux-spec
~~~

# Other Projects

It differes significantly from the other two react bindings,
[react-haskell](https://github.com/joelburget/react-haskell) and
[ghcjs-react](https://github.com/fpco/ghcjs-react).  In particular, the major difference is how
events are handled.  In the Flux design, the state is moved out out of the view and then handlers
produce actions which transform the state.  Thus there is a one-way flow of data from the store into
the view.  In contrast, react-haskell and ghcjs-react both have event signals propagaing up the
react component tree, transforming state at each node.  In particular, react-haskell with its InSig
and OutSig have the signals propagate up the tree and optionally transform state at each node and
change the type of the signal.
