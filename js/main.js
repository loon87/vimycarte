// JavaScript principal pour le site Fimysolutions

document.addEventListener('DOMContentLoaded', function() {
    // Animation des éléments au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialisation des animations
    document.querySelectorAll('.category-card, .experience-card, .testimonial-card, .feature-icon').forEach(el => {
        el.classList.add('animate-fade-in');
        el.style.opacity = 0;
    });

    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', animateOnScroll);
    
    // Déclencher une fois au chargement
    animateOnScroll();

    // Gestion du changement de langue
    const languageLinks = document.querySelectorAll('.dropdown-menu .dropdown-item');
    languageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // La navigation est gérée par les liens href, pas besoin de code supplémentaire
            // Ce bloc est prévu pour des fonctionnalités futures comme le stockage de la préférence
            localStorage.setItem('preferredLanguage', this.textContent.trim());
        });
    });

    // Validation des formulaires
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Exemple simple de validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && !validateEmail(emailInput.value)) {
                alert('Veuillez entrer une adresse email valide.');
                return;
            }
            
            // Simulation d'envoi de formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Envoyé !';
                submitButton.disabled = true;
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    if (emailInput) emailInput.value = '';
                }, 2000);
            }
        });
    });

    // Fonction de validation d'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
