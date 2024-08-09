const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    viewportHeight:768,
    viewportWidth: 1728,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
