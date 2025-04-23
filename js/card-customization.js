/**
 * Fimysolutions Card Customization JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives de l'interface de personnalisation des cartes-cadeaux
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les onglets d'aperçu
    initPreviewTabs();
    
    // Initialiser les champs de formulaire avec mise à jour en temps réel
    initFormFields();
    
    // Initialiser les actions de prévisualisation
    initPreviewActions();
    
    // Initialiser les actions sur les cartes existantes
    initExistingCardsActions();
    
    // Initialiser le bouton de sauvegarde
    initSaveButton();
});

/**
 * Initialise les onglets d'aperçu (vue client/destinataire)
 */
function initPreviewTabs() {
    const previewTabs = document.querySelectorAll('.preview-tab');
    
    previewTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Retirer la classe active de tous les onglets
            previewTabs.forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            
            // Changer la vue de l'aperçu selon l'onglet
            const view = this.dataset.view;
            updateCardPreview(view);
        });
    });
}

/**
 * Met à jour l'aperçu de la carte-cadeau selon la vue sélectionnée
 */
function updateCardPreview(view) {
    const giftCard = document.querySelector('.gift-card');
    
    if (view === 'recipient') {
        // Simuler la vue destinataire (avec code QR, bouton de réservation, etc.)
        giftCard.classList.add('recipient-view');
        
        // Ajouter des éléments spécifiques à la vue destinataire
        const footer = giftCard.querySelector('.gift-card-footer');
        if (footer && !footer.querySelector('.recipient-actions')) {
            const recipientActions = document.createElement('div');
            recipientActions.className = 'recipient-actions';
            recipientActions.innerHTML = `
                <button class="btn btn-primary btn-small">Réserver maintenant</button>
                <div class="qr-code-placeholder">QR Code</div>
            `;
            footer.innerHTML = '';
            footer.appendChild(recipientActions);
        }
    } else {
        // Vue client (par défaut)
        giftCard.classList.remove('recipient-view');
        
        // Restaurer le pied de page original
        const footer = giftCard.querySelector('.gift-card-footer');
        if (footer) {
            footer.innerHTML = '<div class="gift-card-code">DEMO-1234-5678</div>';
        }
    }
}

/**
 * Initialise les champs de formulaire avec mise à jour en temps réel
 */
function initFormFields() {
    // Titre de la carte
    const cardTitleInput = document.getElementById('card-title');
    if (cardTitleInput) {
        cardTitleInput.addEventListener('input', function() {
            const cardTitle = document.querySelector('.gift-card-title');
            if (cardTitle) {
                cardTitle.textContent = this.value;
            }
        });
    }
    
    // Description de la carte
    const cardDescriptionInput = document.getElementById('card-description');
    if (cardDescriptionInput) {
        cardDescriptionInput.addEventListener('input', function() {
            const cardDescription = document.querySelector('.gift-card-description');
            if (cardDescription) {
                cardDescription.textContent = this.value;
            }
        });
    }
    
    // Prix de la carte
    const cardPriceInput = document.getElementById('card-price');
    if (cardPriceInput) {
        cardPriceInput.addEventListener('input', function() {
            const cardPrice = document.querySelector('.gift-card-price');
            if (cardPrice) {
                cardPrice.textContent = `${this.value} $ CA`;
            }
        });
    }
    
    // Validité de la carte
    const cardValidityInput = document.getElementById('card-validity');
    if (cardValidityInput) {
        cardValidityInput.addEventListener('input', function() {
            const validityText = document.querySelector('.gift-card-detail:nth-child(3) .detail-text');
            if (validityText) {
                const days = parseInt(this.value);
                if (days === 365) {
                    validityText.textContent = 'Valable 1 an';
                } else if (days > 365) {
                    const years = Math.floor(days / 365);
                    validityText.textContent = `Valable ${years} an${years > 1 ? 's' : ''}`;
                } else {
                    validityText.textContent = `Valable ${days} jour${days > 1 ? 's' : ''}`;
                }
            }
        });
    }
    
    // Catégorie de la carte
    const cardCategorySelect = document.getElementById('card-category');
    if (cardCategorySelect) {
        cardCategorySelect.addEventListener('change', function() {
            // Mettre à jour l'icône de catégorie dans l'aperçu
            const categoryIcon = document.querySelector('.gift-card-detail:first-child .detail-icon');
            if (categoryIcon) {
                switch(this.value) {
                    case 'restaurant':
                        categoryIcon.textContent = '🍽️';
                        break;
                    case 'hotel':
                        categoryIcon.textContent = '🏨';
                        break;
                    case 'spa':
                        categoryIcon.textContent = '💆';
                        break;
                    case 'activity':
                        categoryIcon.textContent = '🎯';
                        break;
                    default:
                        categoryIcon.textContent = '🎁';
                }
            }
        });
    }
}

/**
 * Initialise les actions de prévisualisation
 */
function initPreviewActions() {
    // Aperçu en plein écran
    const fullscreenButton = document.querySelector('.preview-actions .btn:first-child');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', function() {
            // Créer une fenêtre modale pour l'aperçu en plein écran
            const modal = document.createElement('div');
            modal.className = 'fullscreen-preview-modal';
            
            // Cloner la carte-cadeau pour l'aperçu
            const giftCardClone = document.querySelector('.gift-card').cloneNode(true);
            
            // Créer le contenu de la modale
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Aperçu de la carte-cadeau</h2>
                    <div class="fullscreen-card-container"></div>
                </div>
            `;
            
            // Ajouter la carte clonée à la modale
            modal.querySelector('.fullscreen-card-container').appendChild(giftCardClone);
            
            // Ajouter la modale au document
            document.body.appendChild(modal);
            
            // Ajouter des styles pour la modale
            const style = document.createElement('style');
            style.textContent = `
                .fullscreen-preview-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                
                .modal-content {
                    background-color: white;
                    padding: 30px;
                    border-radius: 8px;
                    max-width: 90%;
                    max-height: 90%;
                    overflow: auto;
                    position: relative;
                }
                
                .close-modal {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .fullscreen-card-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
                
                .fullscreen-card-container .gift-card {
                    width: 100%;
                    max-width: 600px;
                }
            `;
            document.head.appendChild(style);
            
            // Gérer la fermeture de la modale
            modal.querySelector('.close-modal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Fermer la modale en cliquant en dehors du contenu
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });
    }
    
    // Tester l'expérience client
    const testExperienceButton = document.querySelector('.preview-actions .btn:last-child');
    if (testExperienceButton) {
        testExperienceButton.addEventListener('click', function() {
            alert('Cette fonctionnalité vous permettrait de parcourir l\'expérience complète du client, de l\'achat à la personnalisation de la carte-cadeau.');
        });
    }
}

/**
 * Initialise les actions sur les cartes existantes
 */
function initExistingCardsActions() {
    // Boutons de modification
    const editButtons = document.querySelectorAll('.card-item-actions .btn:first-child');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardItem = this.closest('.card-item');
            const cardTitle = cardItem.querySelector('h4').textContent;
            alert(`Modification de la carte "${cardTitle}". Dans la version finale, cela chargerait les détails de cette carte dans le formulaire de personnalisation.`);
        });
    });
    
    // Boutons de duplication
    const duplicateButtons = document.querySelectorAll('.card-item-actions .btn:last-child');
    duplicateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cardItem = this.closest('.card-item');
            const cardTitle = cardItem.querySelector('h4').textContent;
            alert(`Duplication de la carte "${cardTitle}". Dans la version finale, cela créerait une copie de cette carte que vous pourriez modifier.`);
        });
    });
    
    // Carte "Ajouter nouvelle"
    const addNewCard = document.querySelector('.card-item.add-new');
    if (addNewCard) {
        addNewCard.addEventListener('click', function() {
            // Réinitialiser le formulaire
            document.getElementById('card-title').value = 'Nouvelle Expérience';
            document.getElementById('card-description').value = 'Description de votre nouvelle expérience.';
            document.getElementById('card-price').value = '100';
            document.getElementById('card-validity').value = '365';
            
            // Mettre à jour l'aperçu
            document.querySelector('.gift-card-title').textContent = 'Nouvelle Expérience';
            document.querySelector('.gift-card-description').textContent = 'Description de votre nouvelle expérience.';
            document.querySelector('.gift-card-price').textContent = '100 $ CA';
            
            // Faire défiler jusqu'au formulaire
            document.querySelector('.card-customization-section').scrollIntoView({ behavior: 'smooth' });
            
            // Simuler un focus sur le premier champ
            setTimeout(() => {
                document.getElementById('card-title').focus();
            }, 500);
        });
    }
}

/**
 * Initialise le bouton de sauvegarde
 */
function initSaveButton() {
    const saveButton = document.getElementById('save-card');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Simuler une sauvegarde
            this.textContent = 'Enregistrement...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Enregistré!';
                
                // Restaurer le bouton après 2 secondes
                setTimeout(() => {
                    this.textContent = 'Enregistrer';
                    this.disabled = false;
                    
                    // Afficher une notification de succès
                    showNotification('Carte-cadeau enregistrée avec succès!', 'success');
                }, 2000);
            }, 1500);
        });
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
