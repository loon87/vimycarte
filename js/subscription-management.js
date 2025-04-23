/**
 * Fimysolutions Subscription Management JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives de l'interface de gestion des abonnements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les modales
    initModals();
    
    // Initialiser les formulaires
    initForms();
    
    // Initialiser les actions sur les forfaits
    initPlanActions();
    
    // Initialiser les animations du graphique
    initChartAnimations();
});

/**
 * Initialise les modales
 */
function initModals() {
    // Boutons qui ouvrent les modales
    const changePlanBtn = document.getElementById('change-plan-btn');
    const editPaymentBtn = document.getElementById('edit-payment-btn');
    const editAddressBtn = document.getElementById('edit-address-btn');
    
    // Modales
    const changePlanModal = document.getElementById('change-plan-modal');
    const editPaymentModal = document.getElementById('edit-payment-modal');
    const editAddressModal = document.getElementById('edit-address-modal');
    
    // Boutons de fermeture des modales
    const closeButtons = document.querySelectorAll('.close-modal');
    const cancelPlanChangeBtn = document.getElementById('cancel-plan-change');
    const cancelPaymentEditBtn = document.getElementById('cancel-payment-edit');
    const cancelAddressEditBtn = document.getElementById('cancel-address-edit');
    
    // Ouvrir la modale de changement de forfait
    if (changePlanBtn && changePlanModal) {
        changePlanBtn.addEventListener('click', function() {
            openModal(changePlanModal);
        });
    }
    
    // Ouvrir la modale de modification des informations de paiement
    if (editPaymentBtn && editPaymentModal) {
        editPaymentBtn.addEventListener('click', function() {
            openModal(editPaymentModal);
        });
    }
    
    // Ouvrir la modale de modification de l'adresse de facturation
    if (editAddressBtn && editAddressModal) {
        editAddressBtn.addEventListener('click', function() {
            openModal(editAddressModal);
        });
    }
    
    // Fermer les modales avec les boutons de fermeture
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Fermer les modales avec les boutons d'annulation
    if (cancelPlanChangeBtn) {
        cancelPlanChangeBtn.addEventListener('click', function() {
            closeModal(changePlanModal);
        });
    }
    
    if (cancelPaymentEditBtn) {
        cancelPaymentEditBtn.addEventListener('click', function() {
            closeModal(editPaymentModal);
        });
    }
    
    if (cancelAddressEditBtn) {
        cancelAddressEditBtn.addEventListener('click', function() {
            closeModal(editAddressModal);
        });
    }
    
    // Fermer les modales en cliquant en dehors du contenu
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains('active')) {
            closeModal(e.target);
        }
    });
}

/**
 * Ouvre une modale
 */
function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
    }
}

/**
 * Ferme une modale
 */
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurer le défilement du body
    }
}

/**
 * Initialise les formulaires
 */
function initForms() {
    // Formulaire de paiement
    const paymentForm = document.getElementById('payment-form');
    const savePaymentBtn = document.getElementById('save-payment');
    
    if (paymentForm && savePaymentBtn) {
        savePaymentBtn.addEventListener('click', function() {
            // Simuler la sauvegarde des informations de paiement
            this.textContent = 'Enregistrement...';
            this.disabled = true;
            
            setTimeout(() => {
                // Simuler une réponse réussie
                showNotification('Informations de paiement mises à jour avec succès', 'success');
                
                // Mettre à jour l'affichage des informations de carte
                updateCardDisplay();
                
                // Fermer la modale
                closeModal(document.getElementById('edit-payment-modal'));
                
                // Restaurer le bouton
                this.textContent = 'Enregistrer';
                this.disabled = false;
            }, 1500);
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
    
    // Formulaire d'adresse
    const addressForm = document.getElementById('address-form');
    const saveAddressBtn = document.getElementById('save-address');
    
    if (addressForm && saveAddressBtn) {
        saveAddressBtn.addEventListener('click', function() {
            // Simuler la sauvegarde de l'adresse
            this.textContent = 'Enregistrement...';
            this.disabled = true;
            
            setTimeout(() => {
                // Simuler une réponse réussie
                showNotification('Adresse de facturation mise à jour avec succès', 'success');
                
                // Mettre à jour l'affichage de l'adresse
                updateAddressDisplay();
                
                // Fermer la modale
                closeModal(document.getElementById('edit-address-modal'));
                
                // Restaurer le bouton
                this.textContent = 'Enregistrer';
                this.disabled = false;
            }, 1500);
        });
    }
}

/**
 * Met à jour l'affichage des informations de carte
 */
function updateCardDisplay() {
    const cardNumber = document.getElementById('card-number').value;
    const cardExpiry = document.getElementById('card-expiry').value;
    
    if (cardNumber && cardExpiry) {
        // Extraire les 4 derniers chiffres de la carte
        const lastFourDigits = cardNumber.replace(/\s/g, '').slice(-4);
        
        // Mettre à jour l'affichage
        const cardNumberDisplay = document.querySelector('.card-number');
        const cardExpiryDisplay = document.querySelector('.card-expiry');
        
        if (cardNumberDisplay) {
            cardNumberDisplay.textContent = '•••• •••• •••• ' + lastFourDigits;
        }
        
        if (cardExpiryDisplay) {
            cardExpiryDisplay.textContent = 'Expire: ' + cardExpiry;
        }
    }
}

/**
 * Met à jour l'affichage de l'adresse
 */
function updateAddressDisplay() {
    const companyName = document.getElementById('company-name').value;
    const addressLine1 = document.getElementById('address-line1').value;
    const addressLine2 = document.getElementById('address-line2').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const postalCode = document.getElementById('postal-code').value;
    const country = document.getElementById('country').value;
    
    // Construire l'adresse formatée
    let formattedAddress = companyName + '<br>';
    formattedAddress += addressLine1 + '<br>';
    
    if (addressLine2) {
        formattedAddress += addressLine2 + '<br>';
    }
    
    formattedAddress += city + ', ' + province + ' ' + postalCode + '<br>';
    formattedAddress += country;
    
    // Mettre à jour l'affichage
    const addressDisplay = document.querySelector('.billing-address address');
    if (addressDisplay) {
        addressDisplay.innerHTML = formattedAddress;
    }
}

/**
 * Initialise les actions sur les forfaits
 */
function initPlanActions() {
    const selectPlanButtons = document.querySelectorAll('.select-plan');
    
    selectPlanButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.plan-card').querySelector('h3').textContent;
            const planPrice = this.closest('.plan-card').querySelector('.plan-price').textContent;
            const commissionRate = this.closest('.plan-card').querySelector('.commission-rate').textContent;
            
            // Simuler la sélection d'un forfait
            const changePlanModal = document.getElementById('change-plan-modal');
            
            // Désactiver tous les boutons
            selectPlanButtons.forEach(btn => {
                btn.disabled = true;
                btn.textContent = 'Sélection...';
            });
            
            setTimeout(() => {
                // Simuler une réponse réussie
                showNotification(`Forfait ${planName} sélectionné avec succès. Votre abonnement sera mis à jour à la prochaine période de facturation.`, 'success');
                
                // Mettre à jour l'affichage du forfait actuel
                updateCurrentPlan(planName, planPrice, commissionRate);
                
                // Fermer la modale
                closeModal(changePlanModal);
                
                // Restaurer les boutons
                selectPlanButtons.forEach(btn => {
                    btn.disabled = false;
                    btn.textContent = 'Sélectionner';
                });
            }, 1500);
        });
    });
}

/**
 * Met à jour l'affichage du forfait actuel
 */
function updateCurrentPlan(planName, planPrice, commissionRate) {
    const planNameDisplay = document.querySelector('.plan-name');
    const planPriceDisplay = document.querySelector('.plan-details .plan-price');
    const commissionRateDisplay = document.querySelector('.plan-commission');
    const userPlanDisplay = document.querySelector('.user-plan');
    
    if (planNameDisplay) {
        planNameDisplay.textContent = planName;
    }
    
    if (planPriceDisplay) {
        planPriceDisplay.textContent = planPrice;
    }
    
    if (commissionRateDisplay) {
        commissionRateDisplay.textContent = commissionRate;
    }
    
    if (userPlanDisplay) {
        userPlanDisplay.textContent = planName;
    }
}

/**
 * Initialise les animations du graphique
 */
function initChartAnimations() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    // Animer les barres du graphique
    chartBars.forEach(bar => {
        // Stocker la hauteur finale
        const finalHeight = bar.style.height;
        
        // Commencer à zéro
        bar.style.height = '0%';
        
        // Animer jusqu'à la hauteur finale
        setTimeout(() => {
            bar.style.transition = 'height 1s ease-out';
            bar.style.height = finalHeight;
        }, 300);
    });
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
