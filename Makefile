RESOURCES_DIR = dist/mac/MultiApp.app/Contents/Resources

clean:
	rm -rf dist
	rm -rf about/build about/web
	rm -rf settings/build settings/web
	rm -rf common/static

depends:
	yarn

build:
	yarn workspace @multi-app/about run build
	mv about/build about/web
	yarn workspace @multi-app/settings run build
	mv settings/build settings/web

package-common:
	yarn run package:mac

package-about:
	yarn run asar pack about dist/mac/MultiApp.app/Contents/Resources/about.asar

package-settings:
	yarn run asar pack settings dist/mac/MultiApp.app/Contents/Resources/settings.asar

package: clean depends build
	make package-common
	make package-about
	make package-settings
