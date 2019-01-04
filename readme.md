# Multi app electron

This is just a test to run multiple application with the same electron binary, to avoid shipping it twice.

I tested this on macos

## Run it

You need `node` and `yarn`

```
make package
# to open the about app
./dist/mac/MultiApp.app/Contents/MacOS/MultiApp --asar about
# to open the settings app
./dist/mac/MultiApp.app/Contents/MacOS/MultiApp --asar settings
```