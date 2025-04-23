/**
 * Fimysolutions Payment Processing JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives du processus de paiement
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser le processus de paiement
    initPaymentProcess();
    
    // Initialiser la sélection des forfaits
    initPlanSelection();
    
    // Initialiser les méthodes de paiement
    initPaymentMethods();
    
    // Initialiser la validation du formulaire
    initFormValidation();
});

/**
 * Initialise le processus de paiement en étapes
 */
function initPaymentProcess() {
    const steps = ['plan', 'payment', 'confirmation'];
    let currentStepIndex = 0;
    
    const prevStepBtn = document.getElementById('prev-step');
    const nextStepBtn = document.getElementById('next-step');
    
    // Mettre à jour l'affichage des étapes
    function updateSteps() {
        // Mettre à jour les classes des étapes
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active', 'completed');
            
            if (index < currentStepIndex) {
                step.classList.add('completed');
            } else if (index === currentStepIndex) {
                step.classList.add('active');
            }
        });
        
        // Mettre à jour le contenu visible
        document.querySelectorAll('.payment-step-content').forEach((content, index) => {
            content.classList.remove('active');
            if (index === currentStepIndex) {
                content.classList.add('active');
            }
        });
        
        // Mettre à jour les boutons de navigation
        prevStepBtn.disabled = currentStepIndex === 0;
        
        if (currentStepIndex === steps.length - 1) {
            nextStepBtn.style.display = 'none';
        } else {
            nextStepBtn.style.display = 'block';
            
            // Mettre à jour le texte du bouton selon l'étape
            if (currentStepIndex === 0) {
                nextStepBtn.textContent = 'Continuer vers le paiement';
            } else if (currentStepIndex === 1) {
                nextStepBtn.textContent = 'Payer maintenant';
            }
        }
    }
    
    // Passer à l'étape suivante
    function goToNextStep() {
        if (currentStepIndex < steps.length - 1) {
            // Valider l'étape actuelle avant de passer à la suivante
            if (validateCurrentStep()) {
                currentStepIndex++;
                updateSteps();
                window.scrollTo(0, 0);
            }
        }
    }
    
    // Revenir à l'étape précédente
    function goToPrevStep() {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updateSteps();
            window.scrollTo(0, 0);
        }
    }
    
    // Valider l'étape actuelle
    function validateCurrentStep() {
        if (currentStepIndex === 0) {
            // Valider la sélection du forfait
            const selectedPlan = document.querySelector('.plan-card.selected');
            if (!selectedPlan) {
                showNotification('Veuillez sélectionner un forfait pour continuer.', 'error');
                return false;
            }
            return true;
        } else if (currentStepIndex === 1) {
            // Valider le formulaire de paiement
            return validatePaymentForm();
        }
        
        return true;
    }
    
    // Ajouter les écouteurs d'événements pour les boutons de navigation
    if (nextStepBtn) {
        nextStepBtn.addEventListener('click', function() {
            if (currentStepIndex === 1) {
                // Simuler le traitement du paiement
                processPayment();
            } else {
                goToNextStep();
            }
        });
    }
    
    if (prevStepBtn) {
        prevStepBtn.addEventListener('click', goToPrevStep);
    }
}

/**
 * Initialise la sélection des forfaits
 */
function initPlanSelection() {
    const planButtons = document.querySelectorAll('.select-plan');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe selected de tous les forfaits
            document.querySelectorAll('.plan-card').forEach(card => {
                card.classList.remove('selected');
            });
            
            // Ajouter la classe selected au forfait sélectionné
            this.closest('.plan-card').classList.add('selected');
            
            // Mettre à jour le récapitulatif
            updateOrderSummary(this);
            
            // Activer le bouton suivant
            document.getElementById('next-step').disabled = false;
        });
    });
}

/**
 * Met à jour le récapitulatif de la commande
 */
function updateOrderSummary(selectedButton) {
    const planName = selectedButton.closest('.plan-card').querySelector('h3').textContent;
    const planPrice = selectedButton.getAttribute('data-price') + ' $ CA';
    const planCommission = selectedButton.getAttribute('data-commission') + '%';
    
    // Mettre à jour le récapitulatif
    document.getElementById('selected-plan-name').textContent = planName;
    document.getElementById('selected-plan-price').textContent = planPrice;
    document.getElementById('selected-plan-commission').textContent = planCommission;
    document.getElementById('total-amount').textContent = planPrice;
    
    // Mettre à jour également la page de confirmation
    document.getElementById('confirmed-plan-name').textContent = planName;
    document.getElementById('order-amount').textContent = planPrice;
}

/**
 * Initialise les méthodes de paiement
 */
function initPaymentMethods() {
    const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]');
    const creditCardForm = document.getElementById('credit-card-form');
    const paypalForm = document.getElementById('paypal-form');
    
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // Masquer tous les formulaires
            creditCardForm.classList.remove('active');
            paypalForm.classList.remove('active');
            
            // Afficher le formulaire correspondant à la méthode sélectionnée
            if (this.value === 'credit-card') {
                creditCardForm.classList.add('active');
            } else if (this.value === 'paypal') {
                paypalForm.classList.add('active');
            }
        });
    });
    
    // Formater automatiquement le numéro de carte
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    // Formater automatiquement la date d'expiration
    const cardExpiryInput = document.getElementById('card-expiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                this.value = value.substring(0, 2) + '/' + value.substring(2, 4);
            } else {
                this.value = value;
            }
        });
    }
}

/**
 * Initialise la validation du formulaire
 */
function initFormValidation() {
    const paymentForm = document.getElementById('payment-form');
    
    if (paymentForm) {
        // Ajouter des validations personnalisées pour les champs
        const cardNumberInput = document.getElementById('card-number');
        const cardExpiryInput = document.getElementById('card-expiry');
        const cardCvcInput = document.getElementById('card-cvc');
        
        if (cardNumberInput) {
            cardNumberInput.addEventListener('blur', function() {
                validateCardNumber(this);
            });
        }
        
        if (cardExpiryInput) {
            cardExpiryInput.addEventListener('blur', function() {
                validateCardExpiry(this);
            });
        }
        
        if (cardCvcInput) {
            cardCvcInput.addEventListener('blur', function() {
                validateCardCVC(this);
            });
        }
    }
}

/**
 * Valide le numéro de carte
 */
function validateCardNumber(input) {
    const value = input.value.replace(/\s/g, '');
    
    // Vérifier la longueur (la plupart des cartes ont 16 chiffres)
    if (value.length < 13 || value.length > 19) {
        showInputError(input, 'Le numéro de carte doit contenir entre 13 et 19 chiffres.');
        return false;
    }
    
    // Vérifier que tous les caractères sont des chiffres
    if (!/^\d+$/.test(value)) {
        showInputError(input, 'Le numéro de carte ne doit contenir que des chiffres.');
        return false;
    }
    
    // Algorithme de Luhn (vérification de la validité du numéro de carte)
    let sum = 0;
    let shouldDouble = false;
    
    for (let i = value.length - 1; i >= 0; i--) {
        let digit = parseInt(value.charAt(i));
        
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    
    if (sum % 10 !== 0) {
        showInputError(input, 'Numéro de carte invalide.');
        return false;
    }
    
    clearInputError(input);
    return true;
}

/**
 * Valide la date d'expiration
 */
function validateCardExpiry(input) {
    const value = input.value;
    
    // Vérifier le format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(value)) {
        showInputError(input, 'Format invalide. Utilisez MM/AA.');
        return false;
    }
    
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Obtenir les 2 derniers chiffres de l'année
    const currentMonth = currentDate.getMonth() + 1; // Les mois commencent à 0
    
    // Vérifier que le mois est valide (1-12)
    if (parseInt(month) < 1 || parseInt(month) > 12) {
        showInputError(input, 'Mois invalide.');
        return false;
    }
    
    // Vérifier que la date n'est pas dans le passé
    if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        showInputError(input, 'La carte a expiré.');
        return false;
    }
    
    clearInputError(input);
    return true;
}

/**
 * Valide le code CVC
 */
function validateCardCVC(input) {
    const value = input.value;
    
    // Vérifier que le CVC contient uniquement des chiffres
    if (!/^\d+$/.test(value)) {
        showInputError(input, 'Le CVC ne doit contenir que des chiffres.');
        return false;
    }
    
    // Vérifier la longueur (3-4 chiffres)
    if (value.length < 3 || value.length > 4) {
        showInputError(input, 'Le CVC doit contenir 3 ou 4 chiffres.');
        return false;
    }
    
    clearInputError(input);
    return true;
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
 * Valide le formulaire de paiement complet
 */
function validatePaymentForm() {
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    let isValid = true;
    
    // Valider les champs communs
    const requiredFields = [
        'billing-name',
        'billing-email',
        'billing-address',
        'billing-city',
        'billing-province',
        'billing-postal'
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
    const emailField = document.getElementById('billing-email');
    if (emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        showInputError(emailField, 'Adresse email invalide.');
        isValid = false;
    }
    
    // Valider les champs spécifiques à la carte de crédit
    if (paymentMethod === 'credit-card') {
        const cardFields = [
            { id: 'card-number', validator: validateCardNumber },
            { id: 'card-expiry', validator: validateCardExpiry },
            { id: 'card-cvc', validator: validateCardCVC },
            { id: 'card-name', validator: field => {
                if (!field.value.trim()) {
                    showInputError(field, 'Ce champ est requis.');
                    return false;
                }
                clearInputError(field);
                return true;
            }}
        ];
        
        cardFields.forEach(field => {
            const input = document.getElementById(field.id);
            if (!field.validator(input)) {
                isValid = false;
            }
        });
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
 * Traite le paiement
 */
function processPayment() {
    if (validatePaymentForm()) {
        // Désactiver les boutons pendant le traitement
        const prevStepBtn = document.getElementById('prev-step');
        const nextStepBtn = document.getElementById('next-step');
        
        prevStepBtn.disabled = true;
        nextStepBtn.disabled = true;
        nextStepBtn.textContent = 'Traitement en cours...';
        
        // Simuler un délai de traitement
        setTimeout(() => {
            // Générer un numéro de commande aléatoire
            const orderNumber = 'FS-' + new Date().toISOString().slice(0, 10).replace(/-/g, '-') + '-' + Math.floor(1000 + Math.random() * 9000);
            document.getElementById('order-number').textContent = orderNumber;
            
            // Mettre à jour la date
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('order-date').textContent = today.toLocaleDateString('fr-FR', options);
            
            // Mettre à jour la méthode de paiement
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            if (paymentMethod === 'credit-card') {
                const cardNumber = document.getElementById('card-number').value;
                const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
                document.getElementById('payment-method').textContent = 'Carte de crédit (se terminant par ' + lastFourDigits + ')';
            } else {
                document.getElementById('payment-method').textContent = 'PayPal';
            }
            
            // Passer à l'étape de confirmation
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index < 2) {
                    step.classList.add('completed');
                } else if (index === 2) {
                    step.classList.add('active');
                }
            });
            
            document.querySelectorAll('.payment-step-content').forEach((content, index) => {
                content.classList.remove('active');
                if (index === 2) {
                    content.classList.add('active');
                }
            });
            
            // Masquer les boutons de navigation
            prevStepBtn.style.display = 'none';
            nextStepBtn.style.display = 'none';
            
            // Faire défiler vers le haut
            window.scrollTo(0, 0);
        }, 2000);
    }
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
            
            input.error {
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
