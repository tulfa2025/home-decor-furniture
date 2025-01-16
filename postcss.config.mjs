/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'Safari >= 10',
        'iOS >= 10',
        'last 2 versions'
      ]
    }
  },
};

export default config;
