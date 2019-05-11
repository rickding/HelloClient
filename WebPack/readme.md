# webpack
https://segmentfault.com/a/1190000006178770
https://github.com/Val-Zhang/webpack-demo

npm init

cnpm i -g webpack
cnpm i webpack webpack-cli webpack-dev-server -D
cnpm i babel-core babel-loader babel-preset-env babel-preset-react -D
cnpm i babel-preset-es2015 babel-plugin-transform-decorators-legacy -D

cnpm install --save-dev @babel/preset-react @babel/preset-flow @babel/preset-typescript @babel/core @babel/cli @babel/preset-env
cnpm install --save @babel/polyfill

cnpm i react react-dom react-redux redux moment -S
cnpm i style-loader css-loader postcss-loader autoprefixer -D
cnpm i html-webpack-plugin babel-plugin-react-transform react-transform-hmr -D

cnpm i extract-text-webpack-plugin clean-webpack-plugin -D

cnpm install
npm start

npm run build

cnpm install -g serve
serve -s dist -p 3000
