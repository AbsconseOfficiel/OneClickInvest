'use strict';

const axios = require('axios');
require('dotenv').config();

class APIClient {
  constructor() {
    this.baseURL = process.env.API_BASE_URL;
    if (!this.baseURL) {
      throw new Error('API_BASE_URL non définie dans les variables d\'environnement');
    }

    this.defaultConfig = {
      timeout: 5000,
      headers: {
        'Accept': 'application/json'
      }
    };
  }

  static get POPULATE_FIELDS() {
    return [
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
      'sections.cards.popup'
    ];
  }

  async waitForAPIReady(maxRetries = 25, delayMs = 500) {
    const url = `${this.baseURL}/api/pages`;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.get(url, this.defaultConfig);
        if (response.status === 200) {
          console.log("✅ L'API Strapi est prête.");
          return true;
        }
      } catch (error) {
        if (attempt === maxRetries) {
          throw new Error(`❌ L'API Strapi n'est pas prête après ${maxRetries} tentatives.`);
        }
        console.warn(`⚠️ Tentative ${attempt}/${maxRetries} : L'API n'est pas encore prête.`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  async fetchPageData(status = 'published') {
    const config = {
      ...this.defaultConfig,
      params: {
        populate: APIClient.POPULATE_FIELDS,
        status
      }
    };

    try {
      await this.waitForAPIReady();

      const [pageResponse, headerResponse, footerResponse] = await Promise.all([
        axios.get(`${this.baseURL}/api/pages`, config),
        axios.get(`${this.baseURL}/api/header`, {
          ...this.defaultConfig,
          params: { populate: '*', status }
        }),
        axios.get(`${this.baseURL}/api/footer`, {
          ...this.defaultConfig,
          params: { populate: '*', status }
        })
      ]);

      const pageData = pageResponse.data?.data?.[0];
      const pageSlug = pageResponse.data?.data || [];
      const headerData = headerResponse.data?.data?.link || [];
      const footerData = footerResponse.data?.data?.link || [];

      if (!pageData || !headerData || !footerData) {
        console.warn(`⚠️ Données incomplètes pour le statut: ${status}`);
      }

      return {
        sections: pageData?.sections || [],
        header: headerData,
        footer: footerData,
        slug: pageSlug
      };
    } catch (error) {
      console.error(`❌ Erreur lors de la récupération des données (${status}):`, {
        message: error.message,
        status: error.response?.status,
        url: error.config?.url
      });

      return {
        sections: [],
        header: null,
        slug: []
      };
    }
  }

  async getAllData() {
    try {
      const [publishedData, draftData] = await Promise.all([
        this.fetchPageData('published'),
        this.fetchPageData('draft')
      ]);

      console.log("✅ Données récupérées avec succès");

      return {
        published: publishedData,
        draft: draftData
      };
    } catch (error) {
      console.error("❌ Erreur lors de la récupération des données:", error.message);
      throw error;
    }
  }
}

// Export d'une fonction factory pour créer une instance
module.exports = async function() {
  const client = new APIClient();
  return client.getAllData();
};