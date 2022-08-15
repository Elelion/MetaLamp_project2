## About project
The second project is a UI.
The project is divided into elements in accordance with the BEM methodology
(component UI layout).
<br>
<br>
I have used the following technologies here:
- <span style="color: saddlebrown"> pug </span>,
- <span style="color: indianred"> sass <span>,
- <span style="color: yellow"> JS </span>,
- <span style="color: deepskyblue"> WebPack </span>,
- <span style="color: green"> and best practices </span>,

### for SASS BUILD:
`sass ./src/styles.sass ./build/styles.css`

### for PUG BUILD:
`sudo npm install pug`

`sudo npm install pug-cli -g`

`pug index.pug`

### Others dependencies for WebPack:
`npm install --global yarn`

`sudo npm i sass-loader -g`

`sudo npm install --global yarn`

`yarn add html-webpack-template-pug`

`sudo yarn add copy-webpack-plugin`

For other dependencies see:
**/package.json**

### WebPack:
to build, run:

`npm run build`

### Local server:
and you can also run a local server:

`npx serve`
