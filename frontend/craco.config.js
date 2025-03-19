module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  devServer: {
    proxy: {
        "/api": {
            target: "http://backend:5000",
            changeOrigin: true,
            pathRewrite: { "^/api": "/api" },
        },
    },
  },
};
