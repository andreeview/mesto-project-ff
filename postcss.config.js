const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    // cssnano при подключении нужно передать объект опций
    // { preset: default } = использовать стандартные настройки минификации
    cssnano({ preset: 'default' })
  ]
};
