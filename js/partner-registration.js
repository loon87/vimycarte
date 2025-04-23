/**
 * Fimysolutions Partner Registration JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives du processus d'inscription des partenaires
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le formulaire d'inscription
    initRegistrationForm();
    
    // Initialiser la sélection des forfaits
    initPlanSelection();
});

/**
 * Initialise le formulaire d'inscription
 */
function initRegistrationForm() {
    const registrationForm = document.getElementById('partner-registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valider le formulaire
            if (validateRegistrationForm()) {
                // Simuler l'envoi du formulaire
                submitRegistrationForm();
            }
        });
        
        // Ajouter des validations en temps réel pour certains champs
        const emailField = document.getElementById('contact-email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                validateEmail(this);
            });
        }
        
        const phoneField = document.getElementById('contact-phone');
        if (phoneField) {
            phoneField.addEventListener('blur', function() {
                validatePhone(this);
            });
        }
        
        // Formater automatiquement le numéro de téléphone
        if (phoneField) {
            phoneField.addEventListener('input', function() {
                formatPhoneNumber(this);
            });
        }
    }
}

/**
 * Initialise la sélection des forfaits depuis la section des forfaits
 */
function initPlanSelection() {
    const planButtons = document.querySelectorAll('.plan-footer .btn');
    const planSelect = document.getElementById('selected-plan');
    
    if (planButtons.length > 0 && planSelect) {
        planButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Déterminer le forfait sélectionné
                const planCard = this.closest('.plan-card');
                const planName = planCard.querySelector('h3').textContent;
                
                // Mettre à jour le sélecteur de forfait dans le formulaire
                if (planName.includes('Essentiel')) {
                    planSelect.value = 'essential';
                } else if (planName.includes('Professionnel')) {
                    planSelect.value = 'professional';
                } else if (planName.includes('Premium')) {
                    planSelect.value = 'premium';
                }
                
                // Faire défiler jusqu'au formulaire
                document.getElementById('registration-form').scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }
}

/**
 * Valide le formulaire d'inscription complet
 */
function validateRegistrationForm() {
    let isValid = true;
    
    // Valider les champs obligatoires
    const requiredFields = [
        'business-name',
        'business-type',
        'business-category',
        'business-address',
        'business-city',
        'business-province',
        'business-postal',
        'contact-first-name',
        'contact-last-name',
        'contact-position',
        'contact-email',
        'contact-phone',
        'selected-plan',
        'business-description'
    ];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showInputError(field, 'Ce champ est requis.');
            isValid = false;
        } else {
            clearInputError(field);
        }
    });
    
    // Valider l'email
    const emailField = document.getElementById('contact-email');
    if (emailField.value.trim() && !validateEmail(emailField)) {
        isValid = false;
    }
    
    // Valider le téléphone
    const phoneField = document.getElementById('contact-phone');
    if (phoneField.value.trim() && !validatePhone(phoneField)) {
        isValid = false;
    }
    
    // Valider qu'au moins un service est sélectionné
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]:checked');
    if (serviceCheckboxes.length === 0) {
        const checkboxGroup = document.querySelector('.checkbox-group');
        showInputError(checkboxGroup, 'Veuillez sélectionner au moins un service.');
        isValid = false;
    } else {
        clearInputError(document.querySelector('.checkbox-group'));
    }
    
    // Valider les conditions générales
    const termsCheckbox = document.getElementById('terms-checkbox');
    if (!termsCheckbox.checked) {
        showInputError(termsCheckbox, 'Vous devez accepter les conditions générales.');
        isValid = false;
    } else {
        clearInputError(termsCheckbox);
    }
    
    if (!isValid) {
        showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
    }
    
    return isValid;
}

/**
 * Valide une adresse email
 */
function validateEmail(input) {
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showInputError(input, 'Adresse email invalide.');
        return false;
    }
    
    clearInputError(input);
    return true;
}

/**
 * Valide un numéro de téléphone
 */
function validatePhone(input) {
    const value = input.value.replace(/\D/g, '');
    
    if (value.length < 10) {
        showInputError(input, 'Numéro de téléphone invalide.');
        return false;
    }
    
    clearInputError(input);
    return true;
}

/**
 * Formate un numéro de téléphone
 */
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        formattedValue = '(';
        formattedValue += value.substring(0, 3);
        
        if (value.length >= 3) {
            formattedValue += ') ';
            formattedValue += value.substring(3, 6);
        }
        
        if (value.length >= 6) {
            formattedValue += '-';
            formattedValue += value.substring(6, 10);
        }
    }
    
    input.value = formattedValue;
}

/**
 * Affiche une erreur pour un champ de formulaire
 */
function showInputError(input, message) {
    // Supprimer l'erreur existante si elle existe
    clearInputError(input);
    
    // Ajouter la classe d'erreur
    input.classList.add('error');
    
    // Créer et ajouter le message d'erreur
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insérer le message après l'input
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

/**
 * Supprime l'erreur d'un champ de formulaire
 */
function clearInputError(input) {
    // Supprimer la classe d'erreur
    input.classList.remove('error');
    
    // Supprimer le message d'erreur s'il existe
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.parentNode.removeChild(errorElement);
    }
}

/**
 * Soumet le formulaire d'inscription
 */
function submitRegistrationForm() {
    // Désactiver le bouton de soumission
    const submitButton = document.getElementById('submit-registration');
    submitButton.disabled = true;
    submitButton.textContent = 'Traitement en cours...';
    
    // Simuler un délai de traitement
    setTimeout(() => {
        // Récupérer l'email pour la confirmation
        const emailField = document.getElementById('contact-email');
        document.getElementById('confirmation-email').textContent = emailField.value;
        
        // Masquer le formulaire et afficher le message de succès
        document.getElementById('partner-registration-form').style.display = 'none';
        document.querySelector('.registration-sidebar').style.display = 'none';
        document.getElementById('registration-success').style.display = 'block';
        
        // Faire défiler vers le haut
        window.scrollTo(0, 0);
        
        // Rediriger vers la page de connexion après un délai
        setTimeout(() => {
            // Stocker les informations dans le localStorage pour la simulation
            storePartnerInfo();
            
            // Rediriger vers la page de connexion
            window.location.href = 'business-portal.html';
        }, 5000);
    }, 2000);
}

/**
 * Stocke les informations du partenaire dans le localStorage pour la simulation
 */
function storePartnerInfo() {
    const partnerInfo = {
        businessName: document.getElementById('business-name').value,
        businessType: document.getElementById('business-type').value,
        contactName: document.getElementById('contact-first-name').value + ' ' + document.getElementById('contact-last-name').value,
        contactEmail: document.getElementById('contact-email').value,
        plan: document.getElementById('selected-plan').value,
        registrationDate: new Date().toISOString(),
        isActive: true
    };
    
    localStorage.setItem('fimysolutions_partner', JSON.stringify(partnerInfo));
    
    // Définir l'état de connexion
    localStorage.setItem('fimysolutions_partner_logged_in', 'true');
}

/**
 * Affiche une notification à l'utilisateur
 */
function showNotification(message, type = 'info') {
    // Vérifier si un conteneur de notification existe déjà
    let notificationContainer = document.querySelector('.notification-container');
    
    // Créer le conteneur s'il n'existe pas
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Ajouter des styles pour les notifications
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
            }
            
            .notification {
                padding: 15px 20px;
                margin-bottom: 10px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                animation: slideIn 0.3s ease-out forwards;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification.info {
                background-color: #d1ecf1;
                color: #0c5460;
            }
            
            .notification.success {
                background-color: #d4edda;
                color: #155724;
            }
            
            .notification.error {
                background-color: #f8d7da;
                color: #721c24;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                font-size: 1.2rem;
                margin-left: 10px;
            }
            
            .error-message {
                color: #dc3545;
                font-size: 0.85rem;
                margin-top: 5px;
            }
            
            input.error, select.error, textarea.error {
                border-color: #dc3545;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Ajouter le contenu de la notification
    const content = document.createElement('div');
    content.textContent = message;
    notification.appendChild(content);
    
    // Ajouter un bouton de fermeture
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function() {
        closeNotification(notification);
    });
    notification.appendChild(closeButton);
    
    // Ajouter la notification au conteneur
    notificationContainer.appendChild(notification);
    
    // Fermer automatiquement la notification après 5 secondes
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

/**
 * Ferme une notification avec animation
 */
function closeNotification(notification) {
    notification.style.animation = 'slideOut 0.3s ease-in forwards';
    
    // Supprimer la notification après l'animation
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}
