/**
 * Fimysolutions Search Page JavaScript
 * Ce fichier gère toutes les fonctionnalités interactives de la page de recherche
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les données de recherche
    initSearchData();
    
    // Initialiser les filtres
    initFilters();
    
    // Initialiser le tri
    initSorting();
    
    // Initialiser la pagination
    initPagination();
    
    // Initialiser la modale de détail
    initDetailModal();
});

/**
 * Initialise les données de recherche
 */
function initSearchData() {
    // Vérifier si des données de recherche existent déjà
    if (!localStorage.getItem('fimysolutions_search_data')) {
        // Créer des données de recherche de démonstration
        const demoData = generateDemoData();
        
        // Enregistrer les données de recherche
        localStorage.setItem('fimysolutions_search_data', JSON.stringify(demoData));
    }
    
    // Charger les résultats initiaux
    loadSearchResults();
}

/**
 * Génère des données de recherche de démonstration
 */
function generateDemoData() {
    // Catégories disponibles
    const categories = ['accommodation', 'dining', 'spa', 'activities', 'packages'];
    
    // Villes disponibles
    const cities = [
        'Montréal', 'Québec', 'Beauport', 'Laval', 'Gatineau', 
        'Sherbrooke', 'Trois-Rivières', 'Saguenay', 'Lévis', 'Longueuil'
    ];
    
    // Noms d'hôtels
    const hotelNames = [
        'Hôtel Le Magnifique', 'Grand Hôtel Royal', 'Château des Étoiles',
        'Résidence du Lac', 'Auberge du Vieux Port', 'Hôtel Élégance'
    ];
    
    // Noms de restaurants
    const restaurantNames = [
        'La Table Gourmande', 'Le Bistro Français', 'L\'Assiette Dorée',
        'Saveurs du Terroir', 'Le Gourmet Raffiné', 'La Bonne Fourchette'
    ];
    
    // Noms de spas
    const spaNames = [
        'Spa Sérénité', 'Oasis de Bien-être', 'Évasion Zen',
        'Spa des Sens', 'Harmonie Spa', 'Détente Absolue'
    ];
    
    // Noms d'activités
    const activityNames = [
        'Aventure en Plein Air', 'Excursion Nature', 'Découverte Culturelle',
        'Expérience Adrénaline', 'Visite Guidée', 'Atelier Créatif'
    ];
    
    // Noms de forfaits
    const packageNames = [
        'Escapade Romantique', 'Week-end Détente', 'Séjour Découverte',
        'Forfait Tout Inclus', 'Expérience Complète', 'Évasion Luxe'
    ];
    
    // Inclusions possibles
    const possibleInclusions = [
        'Accueil personnalisé',
        'Bouteille de vin de bienvenue',
        'Petit-déjeuner continental',
        'Accès au spa',
        'Stationnement gratuit',
        'Wi-Fi haut débit',
        'Service en chambre',
        'Accès à la piscine',
        'Accès au centre de fitness',
        'Dégustation de produits locaux',
        'Visite guidée',
        'Transport local inclus',
        'Cocktail de bienvenue',
        'Accès VIP aux installations',
        'Cadeau souvenir'
    ];
    
    // Conditions possibles
    const possibleTerms = [
        'Réservation 48h à l\'avance requise',
        'Non remboursable',
        'Valable tous les jours sauf jours fériés',
        'Non cumulable avec d\'autres offres',
        'Pourboire non inclus',
        'Supplément en haute saison',
        'Carte-cadeau valable 1 an',
        'Réservation sous réserve de disponibilité',
        'Annulation possible jusqu\'à 24h avant',
        'Taxe de séjour non incluse',
        'Carte d\'identité requise',
        'Âge minimum requis: 18 ans',
        'Tenue correcte exigée',
        'Animaux non admis',
        'Supplément pour services additionnels'
    ];
    
    // Générer des expériences pour chaque catégorie
    let experiences = [];
    
    // Générer des hôtels
    for (let i = 0; i < hotelNames.length; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 300) + 200; // 200-500 $ CA
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const ratingCount = Math.floor(Math.random() * 100) + 10; // 10-110
        
        // Sélectionner des inclusions aléatoires
        const inclusions = [];
        const inclusionCount = Math.floor(Math.random() * 3) + 3; // 3-5 inclusions
        for (let j = 0; j < inclusionCount; j++) {
            const inclusion = possibleInclusions[Math.floor(Math.random() * possibleInclusions.length)];
            if (!inclusions.includes(inclusion)) {
                inclusions.push(inclusion);
            }
        }
        
        // Sélectionner des conditions aléatoires
        const terms = [];
        const termCount = Math.floor(Math.random() * 3) + 2; // 2-4 conditions
        for (let j = 0; j < termCount; j++) {
            const term = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            if (!terms.includes(term)) {
                terms.push(term);
            }
        }
        
        experiences.push({
            id: `hotel-${i + 1}`,
            title: hotelNames[i],
            category: 'accommodation',
            categoryText: 'Hébergement',
            location: city,
            price: price,
            rating: parseFloat(rating),
            ratingCount: ratingCount,
            description: `Profitez d'un séjour inoubliable à ${hotelNames[i]}, situé au cœur de ${city}. Notre établissement offre des chambres élégantes, un service attentionné et toutes les commodités pour rendre votre séjour parfait.`,
            image: `https://source.unsplash.com/random/800x600/?hotel,luxury,room&sig=${i}`,
            images: [
                `https://source.unsplash.com/random/800x600/?hotel,luxury,room&sig=${i}`,
                `https://source.unsplash.com/random/800x600/?hotel,lobby&sig=${i+100}`,
                `https://source.unsplash.com/random/800x600/?hotel,restaurant&sig=${i+200}`,
                `https://source.unsplash.com/random/800x600/?hotel,pool&sig=${i+300}`
            ],
            includes: inclusions,
            terms: terms,
            partner: {
                name: hotelNames[i],
                logo: `https://source.unsplash.com/random/100x100/?hotel,logo&sig=${i}`,
                description: `${hotelNames[i]} est un établissement de prestige offrant une expérience hôtelière exceptionnelle depuis plus de 15 ans.`
            },
            validity: 365,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // 0-30 jours
        });
    }
    
    // Générer des restaurants
    for (let i = 0; i < restaurantNames.length; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 150) + 100; // 100-250 $ CA
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const ratingCount = Math.floor(Math.random() * 100) + 20; // 20-120
        
        // Sélectionner des inclusions aléatoires
        const inclusions = [];
        const inclusionCount = Math.floor(Math.random() * 3) + 3; // 3-5 inclusions
        for (let j = 0; j < inclusionCount; j++) {
            const inclusion = possibleInclusions[Math.floor(Math.random() * possibleInclusions.length)];
            if (!inclusions.includes(inclusion)) {
                inclusions.push(inclusion);
            }
        }
        
        // Sélectionner des conditions aléatoires
        const terms = [];
        const termCount = Math.floor(Math.random() * 3) + 2; // 2-4 conditions
        for (let j = 0; j < termCount; j++) {
            const term = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            if (!terms.includes(term)) {
                terms.push(term);
            }
        }
        
        experiences.push({
            id: `restaurant-${i + 1}`,
            title: restaurantNames[i],
            category: 'dining',
            categoryText: 'Restauration',
            location: city,
            price: price,
            rating: parseFloat(rating),
            ratingCount: ratingCount,
            description: `Découvrez une expérience gastronomique exceptionnelle à ${restaurantNames[i]}. Notre chef talentueux vous propose une cuisine raffinée mettant en valeur les produits locaux et de saison.`,
            image: `https://source.unsplash.com/random/800x600/?restaurant,food&sig=${i}`,
            images: [
                `https://source.unsplash.com/random/800x600/?restaurant,food&sig=${i}`,
                `https://source.unsplash.com/random/800x600/?restaurant,interior&sig=${i+100}`,
                `https://source.unsplash.com/random/800x600/?restaurant,wine&sig=${i+200}`,
                `https://source.unsplash.com/random/800x600/?restaurant,dessert&sig=${i+300}`
            ],
            includes: inclusions,
            terms: terms,
            partner: {
                name: restaurantNames[i],
                logo: `https://source.unsplash.com/random/100x100/?restaurant,logo&sig=${i}`,
                description: `${restaurantNames[i]} est un établissement gastronomique reconnu pour sa cuisine créative et son ambiance chaleureuse.`
            },
            validity: 365,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // 0-30 jours
        });
    }
    
    // Générer des spas
    for (let i = 0; i < spaNames.length; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 100) + 150; // 150-250 $ CA
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const ratingCount = Math.floor(Math.random() * 80) + 15; // 15-95
        
        // Sélectionner des inclusions aléatoires
        const inclusions = [];
        const inclusionCount = Math.floor(Math.random() * 3) + 3; // 3-5 inclusions
        for (let j = 0; j < inclusionCount; j++) {
            const inclusion = possibleInclusions[Math.floor(Math.random() * possibleInclusions.length)];
            if (!inclusions.includes(inclusion)) {
                inclusions.push(inclusion);
            }
        }
        
        // Sélectionner des conditions aléatoires
        const terms = [];
        const termCount = Math.floor(Math.random() * 3) + 2; // 2-4 conditions
        for (let j = 0; j < termCount; j++) {
            const term = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            if (!terms.includes(term)) {
                terms.push(term);
            }
        }
        
        experiences.push({
            id: `spa-${i + 1}`,
            title: spaNames[i],
            category: 'spa',
            categoryText: 'Spa & Bien-être',
            location: city,
            price: price,
            rating: parseFloat(rating),
            ratingCount: ratingCount,
            description: `Offrez-vous un moment de détente absolue à ${spaNames[i]}. Nos soins professionnels et notre environnement paisible vous permettront de vous évader du stress quotidien.`,
            image: `https://source.unsplash.com/random/800x600/?spa,wellness&sig=${i}`,
            images: [
                `https://source.unsplash.com/random/800x600/?spa,wellness&sig=${i}`,
                `https://source.unsplash.com/random/800x600/?spa,massage&sig=${i+100}`,
                `https://source.unsplash.com/random/800x600/?spa,sauna&sig=${i+200}`,
                `https://source.unsplash.com/random/800x600/?spa,relaxation&sig=${i+300}`
            ],
            includes: inclusions,
            terms: terms,
            partner: {
                name: spaNames[i],
                logo: `https://source.unsplash.com/random/100x100/?spa,logo&sig=${i}`,
                description: `${spaNames[i]} est un havre de paix dédié au bien-être et à la relaxation, offrant des soins de qualité dans un cadre exceptionnel.`
            },
            validity: 365,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // 0-30 jours
        });
    }
    
    // Générer des activités
    for (let i = 0; i < activityNames.length; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 100) + 50; // 50-150 $ CA
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const ratingCount = Math.floor(Math.random() * 70) + 10; // 10-80
        
        // Sélectionner des inclusions aléatoires
        const inclusions = [];
        const inclusionCount = Math.floor(Math.random() * 3) + 3; // 3-5 inclusions
        for (let j = 0; j < inclusionCount; j++) {
            const inclusion = possibleInclusions[Math.floor(Math.random() * possibleInclusions.length)];
            if (!inclusions.includes(inclusion)) {
                inclusions.push(inclusion);
            }
        }
        
        // Sélectionner des conditions aléatoires
        const terms = [];
        const termCount = Math.floor(Math.random() * 3) + 2; // 2-4 conditions
        for (let j = 0; j < termCount; j++) {
            const term = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            if (!terms.includes(term)) {
                terms.push(term);
            }
        }
        
        experiences.push({
            id: `activity-${i + 1}`,
            title: activityNames[i],
            category: 'activities',
            categoryText: 'Activités & Loisirs',
            location: city,
            price: price,
            rating: parseFloat(rating),
            ratingCount: ratingCount,
            description: `Vivez une expérience unique avec ${activityNames[i]} à ${city}. Que vous soyez amateur d'aventure ou de découverte culturelle, cette activité vous laissera des souvenirs mémorables.`,
            image: `https://source.unsplash.com/random/800x600/?activity,adventure&sig=${i}`,
            images: [
                `https://source.unsplash.com/random/800x600/?activity,adventure&sig=${i}`,
                `https://source.unsplash.com/random/800x600/?activity,outdoor&sig=${i+100}`,
                `https://source.unsplash.com/random/800x600/?activity,fun&sig=${i+200}`,
                `https://source.unsplash.com/random/800x600/?activity,experience&sig=${i+300}`
            ],
            includes: inclusions,
            terms: terms,
            partner: {
                name: activityNames[i],
                logo: `https://source.unsplash.com/random/100x100/?activity,logo&sig=${i}`,
                description: `${activityNames[i]} propose des expériences uniques et mémorables pour tous les âges et tous les goûts.`
            },
            validity: 365,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // 0-30 jours
        });
    }
    
    // Générer des forfaits
    for (let i = 0; i < packageNames.length; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        const price = Math.floor(Math.random() * 300) + 300; // 300-600 $ CA
        const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0-5.0
        const ratingCount = Math.floor(Math.random() * 60) + 5; // 5-65
        
        // Sélectionner des inclusions aléatoires
        const inclusions = [];
        const inclusionCount = Math.floor(Math.random() * 3) + 4; // 4-6 inclusions
        for (let j = 0; j < inclusionCount; j++) {
            const inclusion = possibleInclusions[Math.floor(Math.random() * possibleInclusions.length)];
            if (!inclusions.includes(inclusion)) {
                inclusions.push(inclusion);
            }
        }
        
        // Sélectionner des conditions aléatoires
        const terms = [];
        const termCount = Math.floor(Math.random() * 3) + 2; // 2-4 conditions
        for (let j = 0; j < termCount; j++) {
            const term = possibleTerms[Math.floor(Math.random() * possibleTerms.length)];
            if (!terms.includes(term)) {
                terms.push(term);
            }
        }
        
        experiences.push({
            id: `package-${i + 1}`,
            title: packageNames[i],
            category: 'packages',
            categoryText: 'Forfait combiné',
            location: city,
            price: price,
            rating: parseFloat(rating),
            ratingCount: ratingCount,
            description: `Offrez-vous une expérience complète avec notre ${packageNames[i]} à ${city}. Ce forfait combine hébergement, restauration et activités pour un séjour sans souci.`,
            image: `https://source.unsplash.com/random/800x600/?vacation,package&sig=${i}`,
            images: [
                `https://source.unsplash.com/random/800x600/?vacation,package&sig=${i}`,
                `https://source.unsplash.com/random/800x600/?hotel,luxury&sig=${i+100}`,
                `https://source.unsplash.com/random/800x600/?restaurant,gourmet&sig=${i+200}`,
                `https://source.unsplash.com/random/800x600/?activity,leisure&sig=${i+300}`
            ],
            includes: inclusions,
            terms: terms,
            partner: {
                name: `Agence ${packageNames[i]}`,
                logo: `https://source.unsplash.com/random/100x100/?travel,logo&sig=${i}`,
                description: `Agence ${packageNames[i]} est spécialisée dans la création d'expériences sur mesure combinant le meilleur de la région.`
            },
            validity: 365,
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // 0-30 jours
        });
    }
    
    // Ajouter des expériences spécifiques à Beauport
    const beauportExperiences = [
        {
            id: 'beauport-hotel-1',
            title: 'Hôtel Vue sur Fleuve',
            category: 'accommodation',
            categoryText: 'Hébergement',
            location: 'Beauport',
            price: 275,
            rating: 4.7,
            ratingCount: 86,
            description: 'Profitez d\'un séjour exceptionnel à l\'Hôtel Vue sur Fleuve, situé dans le quartier historique de Beauport. Notre établissement offre une vue imprenable sur le fleuve Saint-Laurent et un accès facile aux attractions locales.',
            image: 'https://source.unsplash.com/random/800x600/?hotel,river&sig=1001',
            images: [
                'https://source.unsplash.com/random/800x600/?hotel,river&sig=1001',
                'https://source.unsplash.com/random/800x600/?hotel,room&sig=1002',
                'https://source.unsplash.com/random/800x600/?hotel,breakfast&sig=1003',
                'https://source.unsplash.com/random/800x600/?hotel,terrace&sig=1004'
            ],
            includes: [
                'Chambre avec vue sur le fleuve',
                'Petit-déjeuner gourmet',
                'Accès au spa et à la piscine',
                'Stationnement gratuit',
                'Wi-Fi haut débit'
            ],
            terms: [
                'Réservation 48h à l\'avance requise',
                'Annulation gratuite jusqu\'à 24h avant l\'arrivée',
                'Carte-cadeau valable 1 an',
                'Supplément en haute saison'
            ],
            partner: {
                name: 'Hôtel Vue sur Fleuve',
                logo: 'https://source.unsplash.com/random/100x100/?hotel,logo&sig=1001',
                description: 'L\'Hôtel Vue sur Fleuve est un établissement 4 étoiles offrant une expérience hôtelière de qualité à Beauport depuis 2010.'
            },
            validity: 365,
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'beauport-restaurant-1',
            title: 'La Table de Beauport',
            category: 'dining',
            categoryText: 'Restauration',
            location: 'Beauport',
            price: 195,
            rating: 4.8,
            ratingCount: 124,
            description: 'La Table de Beauport vous propose une expérience gastronomique mettant en valeur les produits locaux du Québec. Notre chef étoilé crée des plats innovants qui raviront vos papilles.',
            image: 'https://source.unsplash.com/random/800x600/?restaurant,gourmet&sig=2001',
            images: [
                'https://source.unsplash.com/random/800x600/?restaurant,gourmet&sig=2001',
                'https://source.unsplash.com/random/800x600/?restaurant,chef&sig=2002',
                'https://source.unsplash.com/random/800x600/?restaurant,wine&sig=2003',
                'https://source.unsplash.com/random/800x600/?restaurant,dessert&sig=2004'
            ],
            includes: [
                'Menu dégustation 5 services',
                'Accord mets et vins',
                'Café et mignardises',
                'Service personnalisé',
                'Table réservée pour 2 personnes'
            ],
            terms: [
                'Réservation 72h à l\'avance requise',
                'Non remboursable',
                'Valable tous les jours sauf jours fériés',
                'Pourboire non inclus'
            ],
            partner: {
                name: 'La Table de Beauport',
                logo: 'https://source.unsplash.com/random/100x100/?restaurant,logo&sig=2001',
                description: 'La Table de Beauport est un restaurant gastronomique reconnu pour sa cuisine créative et son engagement envers les produits locaux.'
            },
            validity: 365,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'beauport-spa-1',
            title: 'Spa Cascade de Beauport',
            category: 'spa',
            categoryText: 'Spa & Bien-être',
            location: 'Beauport',
            price: 225,
            rating: 4.9,
            ratingCount: 92,
            description: 'Le Spa Cascade de Beauport vous invite à une expérience de détente absolue. Niché dans un environnement naturel exceptionnel, notre spa offre des soins haut de gamme et des installations modernes.',
            image: 'https://source.unsplash.com/random/800x600/?spa,waterfall&sig=3001',
            images: [
                'https://source.unsplash.com/random/800x600/?spa,waterfall&sig=3001',
                'https://source.unsplash.com/random/800x600/?spa,massage&sig=3002',
                'https://source.unsplash.com/random/800x600/?spa,sauna&sig=3003',
                'https://source.unsplash.com/random/800x600/?spa,pool&sig=3004'
            ],
            includes: [
                'Accès aux bains thermaux',
                'Massage relaxant de 60 minutes',
                'Soin du visage personnalisé',
                'Accès au sauna et hammam',
                'Thé et collation santé'
            ],
            terms: [
                'Réservation 48h à l\'avance requise',
                'Annulation possible jusqu\'à 24h avant',
                'Carte-cadeau valable 1 an',
                'Âge minimum requis: 18 ans'
            ],
            partner: {
                name: 'Spa Cascade de Beauport',
                logo: 'https://source.unsplash.com/random/100x100/?spa,logo&sig=3001',
                description: 'Le Spa Cascade de Beauport est un centre de bien-être premium offrant une expérience spa complète dans un cadre naturel exceptionnel.'
            },
            validity: 365,
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'beauport-activity-1',
            title: 'Excursion Chutes de Montmorency',
            category: 'activities',
            categoryText: 'Activités & Loisirs',
            location: 'Beauport',
            price: 120,
            rating: 4.6,
            ratingCount: 78,
            description: 'Découvrez les majestueuses Chutes de Montmorency lors d\'une excursion guidée au départ de Beauport. Cette activité combine randonnée, histoire locale et vues spectaculaires.',
            image: 'https://source.unsplash.com/random/800x600/?waterfall,montmorency&sig=4001',
            images: [
                'https://source.unsplash.com/random/800x600/?waterfall,montmorency&sig=4001',
                'https://source.unsplash.com/random/800x600/?hiking,nature&sig=4002',
                'https://source.unsplash.com/random/800x600/?quebec,landscape&sig=4003',
                'https://source.unsplash.com/random/800x600/?bridge,mountain&sig=4004'
            ],
            includes: [
                'Transport aller-retour depuis Beauport',
                'Guide local expérimenté',
                'Accès au parc et aux installations',
                'Collation et bouteille d\'eau',
                'Photos souvenirs numériques'
            ],
            terms: [
                'Réservation 24h à l\'avance requise',
                'Annulation gratuite jusqu\'à 48h avant',
                'Activité soumise aux conditions météorologiques',
                'Équipement de marche recommandé'
            ],
            partner: {
                name: 'Aventures Beauport',
                logo: 'https://source.unsplash.com/random/100x100/?adventure,logo&sig=4001',
                description: 'Aventures Beauport organise des excursions et activités de plein air mettant en valeur les trésors naturels de la région.'
            },
            validity: 365,
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'beauport-package-1',
            title: 'Week-end Découverte de Beauport',
            category: 'packages',
            categoryText: 'Forfait combiné',
            location: 'Beauport',
            price: 495,
            rating: 4.8,
            ratingCount: 45,
            description: 'Profitez d\'un week-end complet pour découvrir tous les charmes de Beauport et ses environs. Ce forfait tout inclus combine hébergement, gastronomie et activités pour une expérience inoubliable.',
            image: 'https://source.unsplash.com/random/800x600/?quebec,cityscape&sig=5001',
            images: [
                'https://source.unsplash.com/random/800x600/?quebec,cityscape&sig=5001',
                'https://source.unsplash.com/random/800x600/?hotel,luxury&sig=5002',
                'https://source.unsplash.com/random/800x600/?restaurant,dinner&sig=5003',
                'https://source.unsplash.com/random/800x600/?tour,sightseeing&sig=5004'
            ],
            includes: [
                '2 nuits à l\'Hôtel Vue sur Fleuve',
                'Petits-déjeuners gourmets',
                'Dîner à La Table de Beauport',
                'Excursion aux Chutes de Montmorency',
                'Accès au Spa Cascade',
                'Transport local inclus'
            ],
            terms: [
                'Réservation 1 semaine à l\'avance requise',
                'Disponibilité selon calendrier',
                'Carte-cadeau valable 1 an',
                'Supplément en haute saison',
                'Pourboires non inclus'
            ],
            partner: {
                name: 'Tourisme Beauport',
                logo: 'https://source.unsplash.com/random/100x100/?tourism,logo&sig=5001',
                description: 'Tourisme Beauport est l\'organisme officiel de promotion touristique de la région, offrant des forfaits exclusifs pour découvrir toutes les facettes de Beauport.'
            },
            validity: 365,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
    ];
    
    // Ajouter les expériences de Beauport à la liste
    experiences = experiences.concat(beauportExperiences);
    
    return experiences;
}

/**
 * Initialise les filtres
 */
function initFilters() {
    // Initialiser les filtres de catégorie
    document.querySelectorAll('input[name="category"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            loadSearchResults();
        });
    });
    
    // Initialiser la recherche par localisation
    const locationSearch = document.getElementById('location-search');
    const locationSearchBtn = document.getElementById('location-search-btn');
    
    locationSearchBtn.addEventListener('click', function() {
        loadSearchResults();
    });
    
    locationSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            loadSearchResults();
        }
    });
    
    // Initialiser les tags de localisation populaires
    document.querySelectorAll('.location-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const location = this.getAttribute('data-location');
            locationSearch.value = location;
            
            // Retirer la classe active de tous les tags
            document.querySelectorAll('.location-tag').forEach(t => t.classList.remove('active'));
            
            // Ajouter la classe active au tag cliqué
            this.classList.add('active');
            
            loadSearchResults();
        });
    });
    
    // Initialiser les sliders de prix
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const priceMinValue = document.getElementById('price-min-value');
    const priceMaxValue = document.getElementById('price-max-value');
    const rangeProgress = document.querySelector('.range-slider-progress');
    
    // Mettre à jour les valeurs affichées
    priceMin.addEventListener('input', function() {
        priceMinValue.textContent = `${this.value} $ CA`;
        updateRangeProgress();
        
        // S'assurer que min <= max
        if (parseInt(priceMin.value) > parseInt(priceMax.value)) {
            priceMax.value = priceMin.value;
            priceMaxValue.textContent = `${priceMax.value} $ CA`;
        }
    });
    
    priceMax.addEventListener('input', function() {
        priceMaxValue.textContent = `${this.value} $ CA`;
        updateRangeProgress();
        
        // S'assurer que max >= min
        if (parseInt(priceMax.value) < parseInt(priceMin.value)) {
            priceMin.value = priceMax.value;
            priceMinValue.textContent = `${priceMin.value} $ CA`;
        }
    });
    
    priceMin.addEventListener('change', loadSearchResults);
    priceMax.addEventListener('change', loadSearchResults);
    
    function updateRangeProgress() {
        const min = parseInt(priceMin.value);
        const max = parseInt(priceMax.value);
        const minPos = (min / parseInt(priceMin.max)) * 100;
        const maxPos = (max / parseInt(priceMax.max)) * 100;
        
        rangeProgress.style.left = `${minPos}%`;
        rangeProgress.style.width = `${maxPos - minPos}%`;
    }
    
    // Initialiser les filtres d'évaluation
    document.querySelectorAll('input[name="rating"]').forEach(radio => {
        radio.addEventListener('change', function() {
            loadSearchResults();
        });
    });
    
    // Initialiser le bouton de réinitialisation des filtres
    document.getElementById('reset-filters').addEventListener('click', function() {
        // Réinitialiser les filtres de catégorie
        document.querySelectorAll('input[name="category"]').forEach(checkbox => {
            checkbox.checked = true;
        });
        
        // Réinitialiser la recherche par localisation
        locationSearch.value = '';
        document.querySelectorAll('.location-tag').forEach(tag => tag.classList.remove('active'));
        
        // Réinitialiser les sliders de prix
        priceMin.value = 0;
        priceMax.value = 1000;
        priceMinValue.textContent = '0 $ CA';
        priceMaxValue.textContent = '1000 $ CA';
        updateRangeProgress();
        
        // Réinitialiser les filtres d'évaluation
        document.querySelector('input[name="rating"][value="any"]').checked = true;
        
        // Recharger les résultats
        loadSearchResults();
    });
    
    // Initialiser la barre de progression du slider
    updateRangeProgress();
}

/**
 * Initialise le tri
 */
function initSorting() {
    const sortBy = document.getElementById('sort-by');
    
    sortBy.addEventListener('change', function() {
        loadSearchResults();
    });
}

/**
 * Initialise la pagination
 */
function initPagination() {
    const prevButton = document.querySelector('.pagination-prev');
    const nextButton = document.querySelector('.pagination-next');
    
    prevButton.addEventListener('click', function() {
        if (!this.disabled) {
            const currentPage = parseInt(document.querySelector('.pagination-current').textContent);
            if (currentPage > 1) {
                loadSearchResults(currentPage - 1);
            }
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (!this.disabled) {
            const currentPage = parseInt(document.querySelector('.pagination-current').textContent);
            const totalPages = parseInt(document.querySelector('.pagination-total').textContent);
            if (currentPage < totalPages) {
                loadSearchResults(currentPage + 1);
            }
        }
    });
}

/**
 * Initialise la modale de détail
 */
function initDetailModal() {
    // Fermer la modale lorsqu'on clique sur le bouton de fermeture
    document.querySelector('.modal-close').addEventListener('click', function() {
        document.getElementById('experience-detail-modal').style.display = 'none';
    });
    
    // Fermer la modale lorsqu'on clique en dehors
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('experience-detail-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Initialiser le bouton d'achat
    document.getElementById('modal-buy-button').addEventListener('click', function() {
        alert('Cette fonctionnalité sera disponible prochainement !');
    });
    
    // Initialiser le bouton de sauvegarde
    document.getElementById('modal-save-button').addEventListener('click', function() {
        this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg>
            Sauvegardé
        `;
        this.classList.add('saved');
    });
}

/**
 * Charge les résultats de recherche
 */
function loadSearchResults(page = 1) {
    // Récupérer les données de recherche
    const searchData = JSON.parse(localStorage.getItem('fimysolutions_search_data') || '[]');
    
    // Appliquer les filtres
    let filteredResults = filterResults(searchData);
    
    // Appliquer le tri
    filteredResults = sortResults(filteredResults);
    
    // Mettre à jour le compteur de résultats
    document.getElementById('results-count').textContent = `${filteredResults.length} expérience${filteredResults.length > 1 ? 's' : ''} trouvée${filteredResults.length > 1 ? 's' : ''}`;
    
    // Pagination
    const resultsPerPage = 9;
    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
    
    // Mettre à jour la pagination
    document.querySelector('.pagination-current').textContent = page;
    document.querySelector('.pagination-total').textContent = totalPages > 0 ? totalPages : 1;
    
    // Activer/désactiver les boutons de pagination
    document.querySelector('.pagination-prev').disabled = page <= 1;
    document.querySelector('.pagination-next').disabled = page >= totalPages || totalPages === 0;
    
    // Calculer les résultats pour la page actuelle
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;
    const pageResults = filteredResults.slice(startIndex, endIndex);
    
    // Afficher les résultats
    displayResults(pageResults);
    
    // Initialiser les cartes de résultats
    initResultCards();
}

/**
 * Filtre les résultats selon les critères sélectionnés
 */
function filterResults(results) {
    // Récupérer les catégories sélectionnées
    const selectedCategories = [];
    document.querySelectorAll('input[name="category"]:checked').forEach(checkbox => {
        selectedCategories.push(checkbox.value);
    });
    
    // Récupérer la localisation
    const location = document.getElementById('location-search').value.trim().toLowerCase();
    
    // Récupérer la plage de prix
    const minPrice = parseInt(document.getElementById('price-min').value);
    const maxPrice = parseInt(document.getElementById('price-max').value);
    
    // Récupérer l'évaluation minimale
    let minRating = 0;
    const ratingFilter = document.querySelector('input[name="rating"]:checked').value;
    if (ratingFilter === '4plus') {
        minRating = 4;
    } else if (ratingFilter === '3plus') {
        minRating = 3;
    }
    
    // Filtrer les résultats
    return results.filter(result => {
        // Filtrer par catégorie
        if (selectedCategories.length > 0 && !selectedCategories.includes(result.category)) {
            return false;
        }
        
        // Filtrer par localisation
        if (location && !result.location.toLowerCase().includes(location)) {
            return false;
        }
        
        // Filtrer par prix
        if (result.price < minPrice || result.price > maxPrice) {
            return false;
        }
        
        // Filtrer par évaluation
        if (result.rating < minRating) {
            return false;
        }
        
        return true;
    });
}

/**
 * Trie les résultats selon le critère sélectionné
 */
function sortResults(results) {
    const sortBy = document.getElementById('sort-by').value;
    
    switch (sortBy) {
        case 'price-asc':
            return results.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return results.sort((a, b) => b.price - a.price);
        case 'rating':
            return results.sort((a, b) => b.rating - a.rating);
        case 'newest':
            return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'relevance':
        default:
            // Pour la pertinence, on peut combiner plusieurs critères
            return results.sort((a, b) => {
                // Priorité à la localisation si une recherche est effectuée
                const location = document.getElementById('location-search').value.trim().toLowerCase();
                if (location) {
                    const aMatch = a.location.toLowerCase().includes(location);
                    const bMatch = b.location.toLowerCase().includes(location);
                    
                    if (aMatch && !bMatch) return -1;
                    if (!aMatch && bMatch) return 1;
                }
                
                // Ensuite, on trie par évaluation
                return b.rating - a.rating;
            });
    }
}

/**
 * Affiche les résultats dans la grille
 */
function displayResults(results) {
    const resultsGrid = document.getElementById('results-grid');
    const emptyResults = document.getElementById('empty-results');
    
    // Vider la grille
    resultsGrid.innerHTML = '';
    
    // Vérifier s'il y a des résultats
    if (results.length === 0) {
        resultsGrid.style.display = 'none';
        emptyResults.style.display = 'block';
        return;
    }
    
    // Afficher les résultats
    resultsGrid.style.display = 'grid';
    emptyResults.style.display = 'none';
    
    // Ajouter chaque résultat à la grille
    results.forEach(result => {
        const resultCard = document.createElement('div');
        resultCard.className = 'result-card';
        resultCard.setAttribute('data-id', result.id);
        
        // Générer les étoiles pour l'évaluation
        const stars = '★'.repeat(Math.floor(result.rating)) + '☆'.repeat(5 - Math.floor(result.rating));
        
        resultCard.innerHTML = `
            <div class="result-image">
                <img src="${result.image}" alt="${result.title}">
                <div class="result-category">${result.categoryText}</div>
                <div class="result-save">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                </div>
            </div>
            <div class="result-content">
                <div class="result-location">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                    </svg>
                    ${result.location}
                </div>
                <h3 class="result-title">${result.title}</h3>
                <div class="result-rating">
                    <span class="stars">${stars}</span>
                    <span class="rating-count">(${result.ratingCount})</span>
                </div>
                <div class="result-price">${result.price} $ CA</div>
            </div>
        `;
        
        resultsGrid.appendChild(resultCard);
    });
}

/**
 * Initialise les cartes de résultats
 */
function initResultCards() {
    // Ajouter un événement de clic sur chaque carte
    document.querySelectorAll('.result-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            showExperienceDetail(id);
        });
    });
    
    // Ajouter un événement de clic sur les boutons de sauvegarde
    document.querySelectorAll('.result-save').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Empêcher le clic de se propager à la carte
            
            // Changer l'icône et la classe
            if (this.classList.contains('saved')) {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>
                `;
                this.classList.remove('saved');
            } else {
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                `;
                this.classList.add('saved');
            }
        });
    });
}

/**
 * Affiche les détails d'une expérience
 */
function showExperienceDetail(id) {
    // Récupérer les données de recherche
    const searchData = JSON.parse(localStorage.getItem('fimysolutions_search_data') || '[]');
    
    // Trouver l'expérience correspondante
    const experience = searchData.find(item => item.id === id);
    
    if (experience) {
        // Mettre à jour le titre de la modale
        document.getElementById('modal-title').textContent = experience.title;
        
        // Mettre à jour l'image principale
        document.getElementById('modal-main-image').src = experience.image;
        
        // Mettre à jour les miniatures
        const thumbnailsContainer = document.getElementById('modal-thumbnails');
        thumbnailsContainer.innerHTML = '';
        
        experience.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail${index === 0 ? ' active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="Miniature ${index + 1}">`;
            
            thumbnail.addEventListener('click', function() {
                // Mettre à jour l'image principale
                document.getElementById('modal-main-image').src = image;
                
                // Mettre à jour la classe active
                document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Mettre à jour les informations de l'expérience
        document.getElementById('modal-experience-title').textContent = experience.title;
        document.getElementById('modal-location').querySelector('span').textContent = experience.location;
        
        // Générer les étoiles pour l'évaluation
        const stars = '★'.repeat(Math.floor(experience.rating)) + '☆'.repeat(5 - Math.floor(experience.rating));
        document.getElementById('modal-rating').querySelector('.stars').textContent = stars;
        document.getElementById('modal-rating').querySelector('.rating-count').textContent = `(${experience.ratingCount} avis)`;
        
        document.getElementById('modal-price').textContent = `${experience.price} $ CA`;
        document.getElementById('modal-description').textContent = experience.description;
        
        // Mettre à jour les inclusions
        const includesList = document.getElementById('modal-includes');
        includesList.innerHTML = '';
        
        experience.includes.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            includesList.appendChild(li);
        });
        
        // Mettre à jour les conditions
        const termsList = document.getElementById('modal-terms');
        termsList.innerHTML = '';
        
        experience.terms.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            termsList.appendChild(li);
        });
        
        // Mettre à jour les informations du partenaire
        document.getElementById('modal-partner-logo').src = experience.partner.logo;
        document.getElementById('modal-partner-name').textContent = experience.partner.name;
        document.getElementById('modal-partner-description').textContent = experience.partner.description;
        
        // Réinitialiser le bouton de sauvegarde
        const saveButton = document.getElementById('modal-save-button');
        saveButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
            </svg>
            Sauvegarder
        `;
        saveButton.classList.remove('saved');
        
        // Afficher la modale
        document.getElementById('experience-detail-modal').style.display = 'flex';
    }
}
