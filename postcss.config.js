if (process.env.NODE_ENV === 'production') {
  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano: {},
    }
  }
} else {
  module.exports = {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    }
  }
}