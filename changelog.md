# v0.5.3

- Moved logging of app version from +page.svelte into +layout.svelte

# v0.5.2

- Fixed missing semicolon in addRedirects.cjs

# v0.5.1

- Fixed incorrect injected code in addRedirects.cjs

# v0.5.0

- Implemented .env files
- Fixed redirects not redirecting at all
- Updated .gitattributes

# v0.4.1

- Fixed infinite redirect issue
- Updated .gitattributes
- Reordered prebuild script

# v0.4.0

- Implemented option for autoUpdateWindowHash when using HashManager.fromWindow();
- Implemented route checking in hash from root path
- Fixed syntax error in redirects
- Updated .gitattributes

# v0.3.1

- Fixed redirects
- Disabled GitHub language inference from detecting language in build/

# v0.3.0

- Implemented redirects for all routes for compatibility with GitHub Pages
- Changed Svelte base path to always be "/Melvor-Map-Maker", even when in development

# v0.2.6

- Fixed missing base paths before certain image links
- Updated deploy script to not build the app before deployment

# v0.2.5

- Implemented base paths before every single link

# v0.2.4

- Opted out of Jekyll building for GitHub pages

# v0.2.3

- Changed base path to "/Melvor-Map-Maker" when built with production for compatibility with GitHub Pages

# v0.2.2

- Implemented deploy script
- Changed app.html to index.html for compatibility with GitHub Pages

# v0.2.1

- Added build folder to repository

# v0.2.0

- Implemented error pages

# v0.1.0

- Implemented File Generator Stage 3
- Implemented text directing user to preview image in File Generator Stage 1
- Fixed File Generator toolbar items from changing colour when not hovered over
- Updated image resize function to support absolute resizing
- Updated map image preview modal
- Updated File Generator Stage 2 error messages

# v0.0.5

- Implemented map image preview modal animations
- Implemented change log - will actually version things properly now 😭
- Implemented forced resize of map image to multiple of 8
- Implemented File Generator Stage 2
- Fixed File Generator stage advancing
- Removed hashing of form stage in File Generator
- Reorganised stylesheets

# v0.0.4

- Implemented icon credits in Readme
- Implemented map image preview
- Fixed HashManager and its tests
- Refactored File Generator code
- Refactored stylesheets

# v0.0.3

- Implemented better logging
- Updated eslint config
- Updated package.json scripts
- Removed initial comments
- Linted files

# v0.0.2

- Implemented File Generator Stage 1
- Implemented HashManager class
- Implemented tests for HashManager
- Implemented clamp util
- Implemented Navigation Bar
- Updated Prettier config
- Updated Svelte config
- Updated Vite config
- Updated Readme
- Replaced favicon.png with favicon.ico

# v0.0.1

- Initial Commit
