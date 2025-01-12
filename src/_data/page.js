const axios = require('axios');
require('dotenv').config();
const apiBaseURL = process.env.API_BASE_URL;

// Fonction pour vérifier si l'API Strapi est prête
async function waitForAPIReady(url, maxRetries = 25, delayMs = 500) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        console.log("✅ L'API Strapi est prête.");
        return true;
      }
    } catch (error) {
      console.warn(`⚠️ Tentative ${attempt} : L'API n'est pas encore prête.`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw new Error("❌ L'API Strapi n'est pas prête après plusieurs tentatives.");
}

// Fonction pour récupérer les données de la page
async function getPageData(status = 'published') {
  try {
    const apiURL = `${apiBaseURL}/api/pages`;
    const config = {
      params: {
        populate: [
          'sections.steps.steps',
          'sections.cards.button',
          'sections.questions.questions',
          'sections.stats.stats',
          'sections.backgroundImage',
          'sections.button',
          'sections.steps.icon',
          'sections.cards.image',
          'sections.priceCards',
          'sections.founders',
          'sections.founders.social',
          'sections.founders.image',
          'sections.cards.popup',
        ],
        status: status,
      },
    };

    await waitForAPIReady(apiURL);

    const response = await axios.get(apiURL, config);
    const pageData = response.data?.data?.[0] || null;

    const headerResponse = await axios.get(`${apiBaseURL}/api/header`, {
      params: {
        populate: '*',
        status: status
      }
    });
    const headerData = headerResponse.data?.data?.link || [];

    if (!pageData || !headerData) {
      console.warn(`⚠️ Aucune donnée trouvée pour le statut: ${status}.`);
    }

    return {
      sections: pageData?.sections,
      header: headerData
    };
  } catch (error) {
    console.error(`❌ Erreur lors de la récupération des données (${status}):`, error.message);
    return {
      sections: [],
      header: null
    };
  }
}

// Récupère à la fois les données published et draft
module.exports = async function () {
  const publishedData = await getPageData('published');
  const draftData = await getPageData('draft');
  
  console.log("✅ Données publiées récupérées :", publishedData);
  console.log("✅ Données brouillon récupérées :", draftData);
  
  return {
    published: publishedData,
    draft: draftData,
  };
};
