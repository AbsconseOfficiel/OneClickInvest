'use strict';

// Utilitaires
const formatNumber = (value) => {
  const M = 1_000_000;
  const K = 1_000;
  
  if (value >= M) return `${(value / M).toFixed(2)} M`;
  if (value >= K) return `${(value / K).toFixed(0)} K`;
  return `${value}`;
};

class UIManager {
  static initializeScrollEffects() {
    const sections = document.querySelectorAll('.section-scroll');
    if (!sections.length) return;

    sections.forEach(section => {
      section.style.willChange = 'opacity, transform, filter';
    });

    const updateAnimations = () => {
      const triggerPoint = window.innerHeight * 0.75;
      const viewportCenter = window.innerHeight / 2;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        let progress = (rect.top - triggerPoint) / (window.innerHeight - triggerPoint);
        progress = 1 - Math.min(1, Math.max(0, progress));

        const opacity = Math.pow(progress, 2);
        const translateY = 40 * (1 - progress);
        const scale = 0.96 + 0.04 * progress;
        const blur = 4 * (1 - progress);

        const distanceFromCenter = rect.top - viewportCenter;
        const parallaxOffset = distanceFromCenter * 0.03;
        const totalTranslateY = translateY + parallaxOffset;

        section.style.opacity = opacity.toFixed(2);
        section.style.transform = `translateY(${totalTranslateY}px) scale(${scale.toFixed(3)})`;
        section.style.filter = `blur(${blur.toFixed(1)}px)`;
      });

      requestAnimationFrame(updateAnimations);
    };

    updateAnimations();
  }

  static initializeFinancialCalculator() {
    const calculateFinancials = (value) => {
      document.querySelectorAll('.slider-sync').forEach(slider => {
        slider.value = value;
        
        const card = slider.closest('.rounded-2xl');
        if (!card) return;

        const elements = {
          setupCost: card.querySelector('.setup-cost'),
          performanceRate: card.querySelector('.performance-rate'),
          maintenanceRate: card.querySelector('.maintenance-rate'),
          price: card.querySelector('.text-4xl'),
          brutValue: card.querySelector('.brut-value')
        };

        if (!Object.values(elements).every(Boolean)) return;

        const setupCost = parseFloat(elements.setupCost.dataset.value) || 0;
        const performanceRate = parseFloat(elements.performanceRate.dataset.value) || 0;
        const maintenanceRate = parseFloat(elements.maintenanceRate.dataset.value) || 0;
        const price = parseFloat(value);

        const performanceCost = (performanceRate / 100) * price;
        const maintenanceCost = (maintenanceRate / 100) * price;
        const totalCost = setupCost + performanceCost + maintenanceCost;
        const remainingFunds = price - totalCost;

        elements.setupCost.textContent = `${formatNumber(setupCost)} €`;
        elements.performanceRate.textContent = `${performanceRate}% (${formatNumber(performanceCost)} €)`;
        elements.maintenanceRate.textContent = `${maintenanceRate}% (${formatNumber(maintenanceCost)} €)`;
        elements.price.textContent = `${formatNumber(remainingFunds)} €`;
        elements.brutValue.textContent = `${formatNumber(price)} €`;
      });
    };

    document.querySelectorAll('.slider-sync').forEach(slider => {
      slider.addEventListener('input', (event) => {
        calculateFinancials(parseInt(event.target.value, 10));
      });
    });

    calculateFinancials(5_000_000);
  }

  static initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (!menuToggle || !mobileMenu || !menuIcon) return;

    menuToggle.addEventListener('click', () => {
      const isMenuOpen = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuIcon.classList.toggle('rotate-45', !isMenuOpen);
      menuIcon.classList.toggle('rotate-0', isMenuOpen);
    });

    const menuBackground = mobileMenu.querySelector('.background');
    if (menuBackground) {
      menuBackground.style.filter = 'blur(10px)';
    }

    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.transition = 'transform 0.3s ease';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
      });
    });
  }

  static initializeStatistics() {
    const animateStat = (stat) => {
      const targetValue = parseInt(stat.dataset.value, 10);
      const suffix = stat.textContent.replace(/[0-9]/g, '');
      let currentValue = 0;
      const durationFactor = 1 + (targetValue / 100);

      const updateValue = () => {
        currentValue += targetValue / (durationFactor * 45);
        
        if (currentValue >= targetValue) {
          stat.textContent = `${targetValue}${suffix}`;
          return;
        }
        
        stat.textContent = `${Math.ceil(currentValue)}${suffix}`;
        requestAnimationFrame(updateValue);
      };

      updateValue();
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-value').forEach(stat => {
      observer.observe(stat);
    });
  }

  static initializeFAQ() {
    const toggleAnswer = (element) => {
      const allAnswers = document.querySelectorAll('.py-4 p');
      
      allAnswers.forEach(answer => {
        if (answer !== element.nextElementSibling && !answer.classList.contains('hidden')) {
          answer.style.maxHeight = '0';
          setTimeout(() => answer.classList.add('hidden'), 500);
        }
      });

      const answer = element.nextElementSibling;
      if (!answer) return;

      if (answer.classList.contains('hidden')) {
        answer.classList.remove('hidden');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      } else {
        answer.style.maxHeight = '0';
        setTimeout(() => answer.classList.add('hidden'), 500);
      }
    };

    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => toggleAnswer(question));
    });
  }

  static initializeSocialLinks() {
    document.querySelectorAll('.flex a').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || 
          href.startsWith('tel:') || href.startsWith('/')) return;

      try {
        const url = new URL(!href.startsWith('http') ? `https://${href}` : href);
        if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(url.hostname) && 
            !url.hostname.startsWith('www.')) {
          url.hostname = `www.${url.hostname}`;
        }
        link.setAttribute('href', url.toString());
      } catch (error) {
        console.error(`URL invalide : ${href}`, error);
      }
    });
  }

  static initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 200,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  static initializePopup() {
    const popup = document.getElementById('popup');
    const closeButton = document.getElementById('close-popup');
    const popupContent = document.getElementById('popup-content');

    if (!popup || !closeButton || !popupContent) return;

    document.querySelectorAll('.open-popup').forEach(button => {
      button.addEventListener('click', () => {
        const content = button.getAttribute('data-content');
        if (content) {
          popupContent.innerHTML = content;
          popup.classList.remove('hidden');
        }
      });
    });

    closeButton.addEventListener('click', () => {
      popup.classList.add('hidden');
    });

    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.add('hidden');
      }
    });
  }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
  UIManager.initializeScrollEffects();
  UIManager.initializeFinancialCalculator();
  UIManager.initializeMobileMenu();
  UIManager.initializeStatistics();
  UIManager.initializeFAQ();
  UIManager.initializeSocialLinks();
  UIManager.initializeSmoothScroll();
  UIManager.initializePopup();
});