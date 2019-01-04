RESOURCES_DIR = dist/mac/MultiApp.app/Contents/Resources

clean:
	rm -rf dist
	rm -rf about/build
	rm -rf settings/build
	rm -rf common/static

depends:
	yarn

build:
	yarn workspace @multi-app/about run build
	yarn workspace @multi-app/settings run build

package: clean depends build
	yarn run package:mac
	yarn run asar pack about/build $(RESOURCES_DIR)/about.asar
	yarn run asar pack settings/build $(RESOURCES_DIR)/settings.asar
