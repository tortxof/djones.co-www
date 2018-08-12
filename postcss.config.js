module.exports = ({ env }) => ({
  plugins: [
    env === 'production' ? require('cssnano')({ preset: 'default' }) : false
  ]
});
