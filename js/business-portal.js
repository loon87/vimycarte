/**
 * Fimysolutions Business Portal JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives du portail d'entreprise
 */

document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est connecté
    checkLoginStatus();
    
    // Initialiser le formulaire de connexion
    initLoginForm();
    
    // Initialiser les onglets du tableau de bord
    initDashboardTabs();
    
    // Initialiser la création de cartes-cadeaux
    initCardCreation();
    
    // Initialiser les modales
    initModals();
});

/**
 * Vérifie si l'utilisateur est connecté
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('fimysolutions_partner_logged_in') === 'true';
    
    if (isLoggedIn) {
        // Récupérer les informations du partenaire
        const partnerInfo = JSON.parse(localStorage.getItem('fimysolutions_partner') || '{}');
        
        // Mettre à jour l'interface avec les informations du partenaire
        document.getElementById('business-name-display').textContent = partnerInfo.businessName || 'Entreprise partenaire';
        
        // Afficher le tableau de bord et masquer la section de connexion
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('dashboard-section').style.display = 'block';
        
        // Mettre à jour les informations du compte
        updateAccountInfo(partnerInfo);
        
        // Charger les cartes-cadeaux existantes
        loadExistingCards();
    }
}

/**
 * Initialise le formulaire de connexion
 */
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Pour la démo, accepter n'importe quelle combinaison email/mot de passe
            // Dans une vraie application, il faudrait vérifier les identifiants
            
            // Créer un partenaire de démo si aucun n'existe
            if (!localStorage.getItem('fimysolutions_partner')) {
                const demoPartner = {
                    businessName: "Hôtel Le Magnifique",
                    businessType: "hotel",
                    contactName: "Marie Dupont",
                    contactEmail: email,
                    plan: "professional",
                    registrationDate: new Date().toISOString(),
                    isActive: true
                };
                
                localStorage.setItem('fimysolutions_partner', JSON.stringify(demoPartner));
            }
            
            // Définir l'état de connexion
            localStorage.setItem('fimysolutions_partner_logged_in', 'true');
            
            // Recharger la page pour afficher le tableau de bord
            window.location.reload();
        });
    }
    
    // Initialiser le bouton de déconnexion
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Supprimer l'état de connexion
            localStorage.removeItem('fimysolutions_partner_logged_in');
            
            // Recharger la page pour afficher la section de connexion
            window.location.reload();
        });
    }
}

/**
 * Initialise les onglets du tableau de bord
 */
function initDashboardTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Récupérer l'onglet à afficher
            const tabId = this.getAttribute('data-tab');
            
            // Masquer tous les onglets
            document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));
            
            // Afficher l'onglet correspondant
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

/**
 * Met à jour les informations du compte
 */
function updateAccountInfo(partnerInfo) {
    // Mettre à jour les informations de l'entreprise
    document.getElementById('account-business-name').textContent = partnerInfo.businessName || '-';
    
    // Convertir le type d'établissement en texte lisible
    let businessType = '-';
    switch (partnerInfo.businessType) {
        case 'hotel':
            businessType = 'Hôtel';
            break;
        case 'restaurant':
            businessType = 'Restaurant';
            break;
        case 'spa':
            businessType = 'Spa & Bien-être';
            break;
        case 'activity':
            businessType = 'Activité & Loisir';
            break;
        case 'other':
            businessType = 'Autre';
            break;
    }
    document.getElementById('account-business-type').textContent = businessType;
    
    // Mettre à jour les informations de contact
    document.getElementById('account-contact-name').textContent = partnerInfo.contactName || '-';
    document.getElementById('account-contact-email').textContent = partnerInfo.contactEmail || '-';
    
    // Formater la date d'inscription
    let registrationDate = '-';
    if (partnerInfo.registrationDate) {
        const date = new Date(partnerInfo.registrationDate);
        registrationDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    document.getElementById('account-registration-date').textContent = registrationDate;
    
    // Mettre à jour les informations du forfait
    let planName = '-';
    let planPrice = '-';
    let planCommission = '-';
    
    switch (partnerInfo.plan) {
        case 'essential':
            planName = 'Forfait Essentiel';
            planPrice = '39,99 $ CA / mois';
            planCommission = '20%';
            break;
        case 'professional':
            planName = 'Forfait Professionnel';
            planPrice = '79,99 $ CA / mois';
            planCommission = '15%';
            break;
        case 'premium':
            planName = 'Forfait Premium';
            planPrice = '149,99 $ CA / mois';
            planCommission = '10%';
            break;
    }
    
    document.getElementById('account-plan-name').textContent = planName;
    document.getElementById('account-plan-price').textContent = planPrice;
    document.getElementById('account-plan-commission').textContent = planCommission;
}

/**
 * Initialise la création de cartes-cadeaux
 */
function initCardCreation() {
    const createCardButton = document.getElementById('create-card-button');
    
    if (createCardButton) {
        createCardButton.addEventListener('click', function() {
            // Ouvrir la modale de création de carte-cadeau
            document.getElementById('card-creation-modal').style.display = 'flex';
        });
    }
    
    // Initialiser le formulaire de création de carte-cadeau
    const cardCreationForm = document.getElementById('card-creation-form');
    
    if (cardCreationForm) {
        cardCreationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valider le formulaire
            if (validateCardForm()) {
                // Afficher la prévisualisation
                showCardPreview();
            }
        });
    }
    
    // Initialiser le bouton de confirmation de création
    const confirmCardButton = document.getElementById('confirm-card-creation');
    
    if (confirmCardButton) {
        confirmCardButton.addEventListener('click', function() {
            // Créer la carte-cadeau
            createGiftCard();
        });
    }
}

/**
 * Valide le formulaire de création de carte-cadeau
 */
function validateCardForm() {
    let isValid = true;
    
    // Valider les champs obligatoires
    const requiredFields = [
        'card-title',
        'card-category',
        'card-description',
        'card-price',
        'card-validity',
        'card-image',
        'card-includes',
        'card-terms'
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
    
    // Valider le prix
    const priceField = document.getElementById('card-price');
    if (priceField.value && parseFloat(priceField.value) <= 0) {
        showInputError(priceField, 'Le prix doit être supérieur à 0.');
        isValid = false;
    }
    
    // Valider la validité
    const validityField = document.getElementById('card-validity');
    if (validityField.value && parseInt(validityField.value) < 30) {
        showInputError(validityField, 'La validité doit être d\'au moins 30 jours.');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Veuillez corriger les erreurs dans le formulaire.', 'error');
    }
    
    return isValid;
}

/**
 * Affiche la prévisualisation de la carte-cadeau
 */
function showCardPreview() {
    // Récupérer les valeurs du formulaire
    const title = document.getElementById('card-title').value;
    const category = document.getElementById('card-category').value;
    const description = document.getElementById('card-description').value;
    const price = document.getElementById('card-price').value;
    const validity = document.getElementById('card-validity').value;
    const image = document.getElementById('card-image').value;
    const includes = document.getElementById('card-includes').value;
    const terms = document.getElementById('card-terms').value;
    
    // Mettre à jour la prévisualisation
    document.getElementById('preview-title').textContent = title;
    
    // Convertir la catégorie en texte lisible
    let categoryText = '';
    switch (category) {
        case 'accommodation':
            categoryText = 'Hébergement';
            break;
        case 'dining':
            categoryText = 'Restauration';
            break;
        case 'spa':
            categoryText = 'Spa & Bien-être';
            break;
        case 'activities':
            categoryText = 'Activités & Loisirs';
            break;
        case 'packages':
            categoryText = 'Forfait combiné';
            break;
    }
    document.getElementById('preview-category').textContent = categoryText;
    
    document.getElementById('preview-price').textContent = `${price} $ CA`;
    document.getElementById('preview-validity').textContent = `Valable ${validity} jours`;
    document.getElementById('preview-description').textContent = description;
    document.getElementById('preview-image').src = image;
    
    // Mettre à jour les inclusions
    const includesList = document.getElementById('preview-includes');
    includesList.innerHTML = '';
    
    includes.split('\n').forEach(item => {
        if (item.trim()) {
            const li = document.createElement('li');
            li.textContent = item.trim();
            includesList.appendChild(li);
        }
    });
    
    // Mettre à jour les conditions
    const termsList = document.getElementById('preview-terms');
    termsList.innerHTML = '';
    
    terms.split('\n').forEach(item => {
        if (item.trim()) {
            const li = document.createElement('li');
            li.textContent = item.trim();
            termsList.appendChild(li);
        }
    });
    
    // Fermer la modale de création
    document.getElementById('card-creation-modal').style.display = 'none';
    
    // Ouvrir la modale de prévisualisation
    document.getElementById('card-preview-modal').style.display = 'flex';
}

/**
 * Crée une nouvelle carte-cadeau
 */
function createGiftCard() {
    // Récupérer les valeurs du formulaire
    const title = document.getElementById('card-title').value;
    const category = document.getElementById('card-category').value;
    const description = document.getElementById('card-description').value;
    const price = document.getElementById('card-price').value;
    const validity = document.getElementById('card-validity').value;
    const image = document.getElementById('card-image').value;
    const includes = document.getElementById('card-includes').value;
    const terms = document.getElementById('card-terms').value;
    
    // Créer l'objet carte-cadeau
    const giftCard = {
        id: Date.now().toString(),
        title,
        category,
        description,
        price,
        validity,
        image,
        includes: includes.split('\n').filter(item => item.trim()),
        terms: terms.split('\n').filter(item => item.trim()),
        createdAt: new Date().toISOString(),
        status: 'active'
    };
    
    // Récupérer les cartes-cadeaux existantes
    let giftCards = JSON.parse(localStorage.getItem('fimysolutions_gift_cards') || '[]');
    
    // Ajouter la nouvelle carte-cadeau
    giftCards.push(giftCard);
    
    // Enregistrer les cartes-cadeaux
    localStorage.setItem('fimysolutions_gift_cards', JSON.stringify(giftCards));
    
    // Fermer la modale de prévisualisation
    document.getElementById('card-preview-modal').style.display = 'none';
    
    // Réinitialiser le formulaire
    document.getElementById('card-creation-form').reset();
    
    // Afficher une notification
    showNotification('Carte-cadeau créée avec succès !', 'success');
    
    // Mettre à jour l'affichage des cartes-cadeaux
    loadExistingCards();
}

/**
 * Charge les cartes-cadeaux existantes
 */
function loadExistingCards() {
    // Récupérer les cartes-cadeaux
    const giftCards = JSON.parse(localStorage.getItem('fimysolutions_gift_cards') || '[]');
    
    // Mettre à jour les statistiques
    document.querySelector('.dashboard-stats .stat-value').textContent = giftCards.length;
    
    // Vérifier s'il y a des cartes-cadeaux
    if (giftCards.length > 0) {
        // Masquer l'état vide
        document.getElementById('empty-cards').style.display = 'none';
        
        // Afficher la grille de cartes-cadeaux
        const cardsGrid = document.getElementById('cards-grid');
        cardsGrid.style.display = 'grid';
        cardsGrid.innerHTML = '';
        
        // Ajouter chaque carte-cadeau à la grille
        giftCards.forEach(card => {
            // Convertir la catégorie en texte lisible
            let categoryText = '';
            switch (card.category) {
                case 'accommodation':
                    categoryText = 'Hébergement';
                    break;
                case 'dining':
                    categoryText = 'Restauration';
                    break;
                case 'spa':
                    categoryText = 'Spa & Bien-être';
                    break;
                case 'activities':
                    categoryText = 'Activités & Loisirs';
                    break;
                case 'packages':
                    categoryText = 'Forfait combiné';
                    break;
            }
            
            // Créer l'élément de carte-cadeau
            const cardElement = document.createElement('div');
            cardElement.className = 'gift-card';
            cardElement.innerHTML = `
                <div class="gift-card-image">
                    <img src="${card.image}" alt="${card.title}">
                </div>
                <div class="gift-card-content">
                    <h3 class="gift-card-title">${card.title}</h3>
                    <div class="gift-card-category">${categoryText}</div>
                    <div class="gift-card-price">${card.price} $ CA</div>
                    <div class="gift-card-actions">
                        <button class="btn btn-sm btn-outline edit-card" data-id="${card.id}">Modifier</button>
                        <button class="btn btn-sm btn-outline view-card" data-id="${card.id}">Voir</button>
                    </div>
                </div>
            `;
            
            cardsGrid.appendChild(cardElement);
        });
        
        // Initialiser les boutons d'action
        initCardActions();
    } else {
        // Afficher l'état vide
        document.getElementById('empty-cards').style.display = 'block';
        document.getElementById('cards-grid').style.display = 'none';
    }
}

/**
 * Initialise les boutons d'action des cartes-cadeaux
 */
function initCardActions() {
    // Initialiser les boutons de modification
    document.querySelectorAll('.edit-card').forEach(button => {
        button.addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            editGiftCard(cardId);
        });
    });
    
    // Initialiser les boutons de visualisation
    document.querySelectorAll('.view-card').forEach(button => {
        button.addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            viewGiftCard(cardId);
        });
    });
}

/**
 * Modifie une carte-cadeau existante
 */
function editGiftCard(cardId) {
    // Récupérer les cartes-cadeaux
    const giftCards = JSON.parse(localStorage.getItem('fimysolutions_gift_cards') || '[]');
    
    // Trouver la carte-cadeau à modifier
    const card = giftCards.find(card => card.id === cardId);
    
    if (card) {
        // Remplir le formulaire avec les valeurs de la carte-cadeau
        document.getElementById('card-title').value = card.title;
        document.getElementById('card-category').value = card.category;
        document.getElementById('card-description').value = card.description;
        document.getElementById('card-price').value = card.price;
        document.getElementById('card-validity').value = card.validity;
        document.getElementById('card-image').value = card.image;
        document.getElementById('card-includes').value = card.includes.join('\n');
        document.getElementById('card-terms').value = card.terms.join('\n');
        
        // Ouvrir la modale de création
        document.getElementById('card-creation-modal').style.display = 'flex';
    }
}

/**
 * Affiche une carte-cadeau existante
 */
function viewGiftCard(cardId) {
    // Récupérer les cartes-cadeaux
    const giftCards = JSON.parse(localStorage.getItem('fimysolutions_gift_cards') || '[]');
    
    // Trouver la carte-cadeau à afficher
    const card = giftCards.find(card => card.id === cardId);
    
    if (card) {
        // Mettre à jour la prévisualisation
        document.getElementById('preview-title').textContent = card.title;
        
        // Convertir la catégorie en texte lisible
        let categoryText = '';
        switch (card.category) {
            case 'accommodation':
                categoryText = 'Hébergement';
                break;
            case 'dining':
                categoryText = 'Restauration';
                break;
            case 'spa':
                categoryText = 'Spa & Bien-être';
                break;
            case 'activities':
                categoryText = 'Activités & Loisirs';
                break;
            case 'packages':
                categoryText = 'Forfait combiné';
                break;
        }
        document.getElementById('preview-category').textContent = categoryText;
        
        document.getElementById('preview-price').textContent = `${card.price} $ CA`;
        document.getElementById('preview-validity').textContent = `Valable ${card.validity} jours`;
        document.getElementById('preview-description').textContent = card.description;
        document.getElementById('preview-image').src = card.image;
        
        // Mettre à jour les inclusions
        const includesList = document.getElementById('preview-includes');
        includesList.innerHTML = '';
        
        card.includes.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            includesList.appendChild(li);
        });
        
        // Mettre à jour les conditions
        const termsList = document.getElementById('preview-terms');
        termsList.innerHTML = '';
        
        card.terms.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            termsList.appendChild(li);
        });
        
        // Modifier les boutons de la modale
        document.getElementById('confirm-card-creation').style.display = 'none';
        document.querySelector('.modal-back').style.display = 'none';
        
        // Ouvrir la modale de prévisualisation
        document.getElementById('card-preview-modal').style.display = 'flex';
    }
}

/**
 * Initialise les modales
 */
function initModals() {
    // Fermer les modales lorsqu'on clique sur le bouton de fermeture
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            // Fermer la modale parente
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Fermer les modales lorsqu'on clique sur le bouton d'annulation
    document.querySelectorAll('.modal-cancel').forEach(button => {
        button.addEventListener('click', function() {
            // Fermer la modale parente
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Retourner à l'édition depuis la prévisualisation
    document.querySelector('.modal-back').addEventListener('click', function() {
        // Fermer la modale de prévisualisation
        document.getElementById('card-preview-modal').style.display = 'none';
        
        // Ouvrir la modale de création
        document.getElementById('card-creation-modal').style.display = 'flex';
    });
    
    // Fermer les modales lorsqu'on clique en dehors
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
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
