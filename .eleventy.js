const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Instance de markdown-it avec support HTML
  const md = markdownIt({ html: true });

  // Filtre personnalisé pour convertir Markdown en HTML avec Tailwind
  eleventyConfig.addNunjucksFilter("markdownToHtml", (content) => {
    // Convertir le Markdown en HTML
    let html = md.render(content);

    // Appliquer des classes Tailwind à certaines balises
    html = html.replace(/<h1>/g, '<h1 class="font-display text-4xl text-white">');
    html = html.replace(/<h2>/g, '<h2 class="font-display text-2xl mt-14 mb-4 max-w-[35rem] text-white">');
    html = html.replace(/<ul>/g, '<ul class="list-disc pl-5">'); // Listes à puces
    html = html.replace(/<ol>/g, '<ol class="list-decimal pl-5">'); // Listes numérotées
    html = html.replace(/<li>/g, '<li class="py-1">'); // Éléments de liste
    html = html.replace(/<strong>/g, '<strong class="font-semibold">');
    html = html.replace(/<em>/g, '<em class="italic">');
    html = html.replace(/<del>/g, '<del class="line-through">');
    html = html.replace(/<p>/g, '<p class="mb-4">');

    // Ajout d'une classe Tailwind au <u>
    html = html.replace(/<u>/g, '<u class="underline">');
    html = html.replace(/<\/u>/g, '</u>');

    // Styliser les citations
    html = html.replace(/<blockquote>/g, '<blockquote class="border-l-4 border-custom-blue pl-4 italic">');
    html = html.replace(/<\/blockquote>/g, '</blockquote>');

    // Styliser les liens
    html = html.replace(/<a /g, '<a class="hover:text-white transition underline-offset-4 underline" ');

    return html;
  });

  // Copie des fichiers nécessaires
  eleventyConfig.addPassthroughCopy("src/assets/styles.css");
  eleventyConfig.addPassthroughCopy("public/uploads/**/*");

  // Ajout du filtre sortBy pour trier les tableaux par clé
  eleventyConfig.addNunjucksFilter("sortBy", (array, key) => {
    if (!Array.isArray(array)) return [];
    return array.sort((a, b) => (a[key] || 0) - (b[key] || 0));
  });

  return {
    dir: {
      input: "src", // Dossier d'entrée
      output: "_site", // Dossier de sortie
    },
    dataTemplateEngine: "njk",
  };
};
