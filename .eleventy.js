const cleanCSS = require("clean-css");
const fs = require("fs");
const directoryOutputPlugin = require("@11ty/eleventy-plugin-directory-output");
const handlebars = require("handlebars");
const juice = require('juice');
const helpers = require('./lib/hbs-custom-helpers');
const htmlmin = require('html-minifier');

module.exports = function(eleventyConfig) {
  require('dotenv').config();
  eleventyConfig.setLibrary("hbs", handlebars);
  eleventyConfig.setQuietMode(true);
  eleventyConfig.addPlugin(directoryOutputPlugin);
  eleventyConfig.addGlobalData('env', process.env);
 
   // Install handlebars helpers
   Object.keys(helpers).forEach((key) => {
    eleventyConfig.addHandlebarsHelper(key, helpers[key])
  });

  // Inline CSS
  eleventyConfig.addFilter("cssmin", code => {
    return new cleanCSS({}).minify(code).styles;
  });

  //Inline CSS into the style attribute.
  eleventyConfig.addNunjucksAsyncFilter("htmlEmail", (raw, cb) => {
    cb(null, juice(raw, {
      applyStyleTags: true,
      removeStyleTags: true,
      preserveMediaQueries: true,
      preserveImportant: true,
      preserveFontFaces: true }));
  });

  // Set server option with Eleventy built-in live reload
  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: true,
    port: 8080,
    watch: [`${process.env.SRC}/src/scss/${process.env.PROJECT}`, `${process.env.SRC}/src/${process.env.PROJECT}`],
    showAllHosts: false,
    showVersion: false,
    files: `${process.env.DEST}/emails/${process.env.PROJECT}`
  });

  // Minify html output
  eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        caseSensitive: true,
        collapseWhitespace: false,
        removeComments: false,  
        useShortDoctype: false,
        minifyCSS: true
      });
    }

    return content;
  });

  // Eleventy configuration
  return {
    dir: {
        input: `emails/${process.env.PROJECT}`,
        includes: process.env.INCLUDES,
        output: `${process.env.DEST}/${process.env.PROJECT}`
    },
    // Files read by Eleventy, add as needed
    templateFormats: ["hbs", "njk", "md", "txt"],
    htmlTemplateEngine: "hbs",
    passthroughFileCopy: true
  };
};
