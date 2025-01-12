document.addEventListener("DOMContentLoaded", () => {
  // Fonction de formatage des nombres
  const formatNumber = (value) => {
    const M = 1_000_000;
    const K = 1_000;
    if (value >= M) return `${(value / M).toFixed(2)} M`;
    if (value >= K) return `${(value / K).toFixed(0)} K`;
    return `${value}`;
  };

  // Synchroniser et calculer les valeurs
  const synchronizeAndCalculate = (value) => {
    document.querySelectorAll(".slider-sync").forEach((slider) => {
      slider.value = value;

      const card = slider.closest(".rounded-2xl");
      const elements = {
        setupCostElement: card.querySelector(".setup-cost"),
        performanceRateElement: card.querySelector(".performance-rate"),
        maintenanceRateElement: card.querySelector(".maintenance-rate"),
        priceElement: card.querySelector(".text-4xl"),
        brutValueElement: card.querySelector(".brut-value"),
      };

      const setupCost = parseFloat(elements.setupCostElement.dataset.value) || 0;
      const performanceRate = parseFloat(elements.performanceRateElement.dataset.value) || 0;
      const maintenanceRate = parseFloat(elements.maintenanceRateElement.dataset.value) || 0;
      const price = parseFloat(value);

      const performanceCost = (performanceRate / 100) * price;
      const maintenanceCost = (maintenanceRate / 100) * price;
      const totalCost = setupCost + performanceCost + maintenanceCost;
      const remainingFunds = price - totalCost;

      // Mettre à jour les valeurs affichées
      elements.setupCostElement.textContent = `${formatNumber(setupCost)} €`;
      elements.performanceRateElement.textContent = `${performanceRate}% (${formatNumber(performanceCost)} €)`;
      elements.maintenanceRateElement.textContent = `${maintenanceRate}% (${formatNumber(maintenanceCost)} €)`;
      elements.priceElement.textContent = `${formatNumber(remainingFunds)} €`;
      elements.brutValueElement.textContent = `${formatNumber(price)} €`;
    });
  };

  // Initialiser les sliders
  document.querySelectorAll(".slider-sync").forEach((slider) => {
    slider.addEventListener("input", (event) => {
      synchronizeAndCalculate(parseInt(event.target.value, 10));
    });
  });

  // Appel initial pour synchroniser avec une valeur par défaut
  synchronizeAndCalculate(5_000_000); // Valeur par défaut

  // Ouvrir et fermer la pop-up
  const togglePopup = (content = '') => {
    const popup = document.getElementById("popup");
    const popupContent = document.getElementById("popup-content");

    if (content) {
      popupContent.innerHTML = content; // Injecte le contenu dynamique
      popup.classList.remove("hidden"); // Affiche la pop-up
    } else {
      popup.classList.add("hidden"); // Cache la pop-up
    }
  };

  // Rendre les fonctions accessibles globalement pour onclick
  window.openPopup = (content) => togglePopup(content);
  window.closePopup = () => togglePopup();
  
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const stats = document.querySelectorAll(".stat-value");

  function animateStat(stat) {
    const targetValue = parseInt(stat.dataset.value, 10);
    const suffix = stat.textContent.replace(/[0-9]/g, "");
    let currentValue = 0;
    const maxDuration = 3000; // Durée maximale en ms
    const durationFactor = 1 + (targetValue / 100); // Facteur pour ajuster la durée en fonction de la valeur

    function updateValue() {
      currentValue += targetValue / (durationFactor * 45);
      if (currentValue >= targetValue) {
        stat.textContent = targetValue + suffix;
      } else {
        stat.textContent = Math.ceil(currentValue) + suffix; // Rondir le nombre
        requestAnimationFrame(updateValue);
      }
    }

    const duration = Math.min(maxDuration, targetValue * 50); // Ajuster la durée en fonction de la valeur
    updateValue(); // Démarrer l'animation immédiatement
  }

  const observerOptions = {
    root: null,
    threshold: 0.5, // Lancer à 50% ou plus visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStat(entry.target);
        observer.unobserve(entry.target); // Stop observer après l’animation
      }
    });
  }, observerOptions);

  stats.forEach((stat) => observer.observe(stat));
});

function toggleAnswer(element) {
  const allAnswers = document.querySelectorAll(".py-4 p");
  
  // Ferme toutes les réponses ouvertes sauf celle sur laquelle on clique
  allAnswers.forEach(answer => {
    if (answer !== element.nextElementSibling && !answer.classList.contains("hidden")) {
      answer.style.maxHeight = "0"; // Animation de rabattement
      setTimeout(() => {
        answer.classList.add("hidden"); // Cache après l'animation
      }, 500); // Temps pour permettre l'animation avant de cacher
    }
  });

  const answer = element.nextElementSibling; // La réponse correspondante à la question cliquée

  // Si la réponse est cachée, on l'ouvre, sinon on la ferme
  if (answer.classList.contains("hidden")) {
    answer.classList.remove("hidden");
    answer.style.maxHeight = answer.scrollHeight + "px"; // Animation de déploiement
  } else {
    answer.style.maxHeight = "0"; // Animation de rabattement
    setTimeout(() => {
      answer.classList.add("hidden"); // Cache après l'animation
    }, 500); // Temps pour permettre l'animation avant de cacher
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const socialLinks = document.querySelectorAll('.flex a');

  socialLinks.forEach(link => {
      let href = link.getAttribute('href');

      if (!href) return;

      // Ignorer les liens qui commencent par #, mailto:, tel: ou qui sont des chemins relatifs
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('/')) {
          return;
      }

      try {
          let url;

          // Si l'URL commence sans le protocole, ajouter https:// par défaut
          if (!href.startsWith('http://') && !href.startsWith('https://')) {
              url = new URL('https://' + href);  // Ajouter https:// pour garantir que l'URL est complète
          } else {
              url = new URL(href);  // Si déjà complet, on crée l'objet URL
          }

          // Vérifier si l'URL contient un domaine valide (ex: example.com)
          const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
          if (domainPattern.test(url.hostname) && !url.hostname.startsWith('www.')) {
              // Ajouter www. si ce n'est pas déjà présent
              url.hostname = 'www.' + url.hostname;
          }

          link.setAttribute('href', url.toString());
      } catch (error) {
          // Gérer les erreurs d'URL invalide
          console.error(`URL invalide : ${href}`, error);
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // Récupérer l'année actuelle et l'afficher dans l'élément avec l'ID 'current-year'
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;
});

document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner tous les liens d'ancrage
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Empêche le comportement de défilement par défaut

      // Obtenir l'élément cible
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Scroll vers l'élément cible avec décalage
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Décalage de 80px pour le menu fixe
          behavior: 'smooth' // Activation du défilement fluide
        });
      }
    });
  });
});