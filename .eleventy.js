module.exports = function(eleventyConfig) {
  // Copiar assets sem processar
  eleventyConfig.addPassthroughCopy("src/assets");

  // Filtro de data formatada em PT-BR
  eleventyConfig.addFilter("dateFormat", (date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "long", year: "numeric"
    });
  });

  // Ordenar posts por data (mais novo primeiro)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
