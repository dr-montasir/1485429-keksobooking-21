module.exports = {
  entry: [
    "./js/constants.js",
    "./js/debounce.js",
    "./js/load.js",
    "./js/filters.js",
    "./js/dialog.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/move.js",
    "./js/popup.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
};
