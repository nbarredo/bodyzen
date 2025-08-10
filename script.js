// Set copyright year
document.getElementById('y').textContent = new Date().getFullYear();

// Enhanced scroll reveal animation with section-by-section control
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -150px 0px'
  };

  // Individual element observer with staggered delays
  const elementObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 150);
      }
    });
  }, observerOptions);

  // Section-by-section observer with enhanced control
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Reveal the section itself first
        entry.target.classList.add('revealed');
        
        // Then reveal child elements with choreographed timing
        const serviceContent = entry.target.querySelector('.service-content');
        const serviceImage = entry.target.querySelector('.service-image');
        const features = entry.target.querySelectorAll('.service-features li');
        const cta = entry.target.querySelector('.service-cta');

        if (serviceContent) {
          setTimeout(() => serviceContent.classList.add('revealed'), 200);
        }
        
        if (serviceImage) {
          setTimeout(() => serviceImage.classList.add('revealed'), 400);
        }

        // Reveal features one by one
        features.forEach((feature, index) => {
          setTimeout(() => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
              feature.style.opacity = '1';
              feature.style.transform = 'translateY(0)';
            }, 50);
          }, 600 + (index * 100));
        });

        if (cta) {
          setTimeout(() => cta.classList.add('revealed'), 800 + (features.length * 100));
        }
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '0px 0px -100px 0px'
  });

  // Gallery and FAQ sections observer
  const contentObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        
        // Special handling for gallery images
        if (entry.target.classList.contains('gallery')) {
          const images = entry.target.querySelectorAll('img');
          images.forEach((img, index) => {
            setTimeout(() => {
              img.style.opacity = '0';
              img.style.transform = 'scale(0.9) translateY(30px)';
              img.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
              
              setTimeout(() => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1) translateY(0)';
              }, 50);
            }, index * 200);
          });
        }

        // Special handling for FAQ items
        if (entry.target.classList.contains('faq')) {
          const items = entry.target.querySelectorAll('details');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('revealed');
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observe different types of elements
  document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale').forEach(el => {
    elementObserver.observe(el);
  });

  document.querySelectorAll('.service-hero').forEach(el => {
    sectionObserver.observe(el);
  });

  document.querySelectorAll('.gallery, .faq').forEach(el => {
    contentObserver.observe(el);
  });
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector('.nav');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Enhanced smooth scroll for anchor links with snap behavior
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]:not(.clickable-card)').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        // Use native smooth scroll with snap behavior
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax effect for hero and services
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Hero floating elements
    const heroFloats = document.querySelectorAll('.hero-float');
    heroFloats.forEach((float, index) => {
      const speed = 0.3 + (index * 0.1);
      float.style.transform = `translateY(${scrolled * speed}px) rotate(var(--rotate))`;
    });

    // Service sections parallax
    const serviceHeros = document.querySelectorAll('.service-hero');
    serviceHeros.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        const offset = (window.innerHeight - rect.top) * 0.1;
        section.style.backgroundPosition = `center ${offset}px`;
      }
    });
  });
}

// Special navigation for hero cards
function initHeroCardNavigation() {
  document.querySelectorAll('.clickable-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Reduced highlight effect with immediate scroll
        card.style.transform = 'translateX(8px) translateY(-2px) scale(1.01)';
        card.style.boxShadow = '0 15px 40px rgba(58,160,143,.25)';
        
        // Immediate scroll with snap behavior
        setTimeout(() => {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Reset card styles quickly
          setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
          }, 300);
        }, 50); // Much reduced delay
      }
    });
  });
}

// Add section visibility indicator
function initSectionIndicator() {
  const sectionMap = [
    { id: 'hero', selector: '.hero' },
    { id: 'pedicuria', selector: '#pedicuria' },
    { id: 'masajes', selector: '#masajes' },
    { id: 'reflexologia', selector: '#reflexologia' },
    { id: 'espalda', selector: '#espalda' },
    { id: 'galeria', selector: '#galeria' },
    { id: 'faq', selector: '#faq' }
  ];

  // Create section indicators
  const indicatorContainer = document.createElement('div');
  indicatorContainer.className = 'section-indicators';
  
  sectionMap.forEach(({ id, selector }) => {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.setAttribute('data-section', id);
    indicator.setAttribute('title', id.charAt(0).toUpperCase() + id.slice(1));
    indicatorContainer.appendChild(indicator);
    
    // Add click functionality to indicators
    indicator.addEventListener('click', function() {
      const targetElement = document.querySelector(selector);
      if (targetElement) {
        // Add click effect
        indicator.style.transform = 'scale(1.5)';
        indicator.style.boxShadow = '0 0 30px rgba(58,160,143,0.6)';
        
        // Scroll to section with snap
        setTimeout(() => {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Reset indicator style
          setTimeout(() => {
            indicator.style.transform = '';
            indicator.style.boxShadow = '';
          }, 300);
        }, 100);
      }
    });
  });
  
  document.body.appendChild(indicatorContainer);

  // Observer for section indicators with improved detection
  const indicatorObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id || 'hero';
        
        // Remove active from all indicators
        document.querySelectorAll('.indicator').forEach(ind => {
          ind.classList.remove('active');
        });
        
        // Add active to current indicator
        const indicator = document.querySelector(`[data-section="${sectionId}"]`);
        if (indicator) {
          indicator.classList.add('active');
        }
      }
    });
  }, {
    threshold: 0.6,
    rootMargin: '0px 0px -20% 0px'
  });

  // Observe all sections
  sectionMap.forEach(({ selector }) => {
    const element = document.querySelector(selector);
    if (element) {
      indicatorObserver.observe(element);
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initScrollReveal();
  initNavbarScroll();
  initSmoothScroll();
  initParallax();
  initHeroCardNavigation();
  initSectionIndicator();
});