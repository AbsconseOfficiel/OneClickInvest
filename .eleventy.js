module.exports = function(eleventyConfig) {

  // Copie les fichiers CSS générés dans le répertoire de sortie (_site)
  eleventyConfig.addPassthroughCopy("src/assets/styles.css");

  // Copie uniquement les images du dossier uploads sans inclure le dossier public
  eleventyConfig.addPassthroughCopy("public/uploads/**/*");

  // Ajout du filtre sortBy pour trier les tableaux par clé
  eleventyConfig.addNunjucksFilter("sortBy", (array, key) => {
    if (!Array.isArray(array)) return [];
    return array.sort((a, b) => (a[key] || 0) - (b[key] || 0));
  });

  return {
    dir: {
      input: "src",  // Dossier d'entrée
      output: "_site"  // Dossier de sortie
    },
    dataTemplateEngine: "njk"
  };
};
