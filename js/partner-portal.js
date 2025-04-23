// JavaScript pour le portail partenaire et le système de commission

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire d'ajout d'expérience
    const experienceForm = document.getElementById('experienceForm');
    const saveExperienceBtn = document.getElementById('saveExperience');
    const commissionTypeSelect = document.getElementById('commissionType');
    const negotiatedCommissionField = document.getElementById('negotiatedCommissionField');
    const publicationStatusSelect = document.getElementById('publicationStatus');
    const scheduledPublicationField = document.getElementById('scheduledPublicationField');

    // Afficher/masquer le champ de commission négociée
    if (commissionTypeSelect) {
        commissionTypeSelect.addEventListener('change', function() {
            if (this.value === 'negotiated') {
                negotiatedCommissionField.classList.remove('d-none');
            } else {
                negotiatedCommissionField.classList.add('d-none');
            }
        });
    }

    // Afficher/masquer le champ de date de publication programmée
    if (publicationStatusSelect) {
        publicationStatusSelect.addEventListener('change', function() {
            if (this.value === 'schedule') {
                scheduledPublicationField.classList.remove('d-none');
            } else {
                scheduledPublicationField.classList.add('d-none');
            }
        });
    }

    // Gestion de la soumission du formulaire
    if (saveExperienceBtn) {
        saveExperienceBtn.addEventListener('click', function() {
            // Vérification de la validité du formulaire
            if (experienceForm && !experienceForm.checkValidity()) {
                // Déclencher la validation HTML5
                experienceForm.reportValidity();
                return;
            }

            // Simuler l'enregistrement de l'expérience
            showToast('Expérience enregistrée avec succès!', 'success');
            
            // Fermer le modal après un court délai
            setTimeout(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('addExperienceModal'));
                if (modal) {
                    modal.hide();
                }
                
                // Réinitialiser le formulaire
                if (experienceForm) {
                    experienceForm.reset();
                }
                
                // Rediriger vers la liste des expériences (simulation)
                // window.location.reload();
            }, 1500);
        });
    }

    // Système de calcul de commission
    setupCommissionCalculator();
});

// Fonction pour afficher un toast de notification
function showToast(message, type = 'info') {
    // Créer l'élément toast s'il n'existe pas déjà
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'position-fixed bottom-0 end-0 p-3';
        toastContainer.style.zIndex = '5';
        document.body.appendChild(toastContainer);
    }
    
    // Générer un ID unique pour ce toast
    const toastId = 'toast-' + Date.now();
    
    // Déterminer la classe de couleur en fonction du type
    let bgClass = 'bg-info';
    if (type === 'success') bgClass = 'bg-success';
    if (type === 'warning') bgClass = 'bg-warning';
    if (type === 'error') bgClass = 'bg-danger';
    
    // Créer le HTML du toast
    const toastHtml = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Ajouter le toast au conteneur
    document.getElementById('toast-container').innerHTML += toastHtml;
    
    // Initialiser et afficher le toast
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
    toast.show();
    
    // Supprimer le toast du DOM après qu'il soit caché
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

// Configuration du calculateur de commission
function setupCommissionCalculator() {
    // Vérifier si nous sommes sur la page des paramètres ou des analyses
    const commissionCalculator = document.getElementById('commissionCalculator');
    if (!commissionCalculator) return;

    // Récupérer les éléments du calculateur
    const experiencePriceInput = document.getElementById('calculatorPrice');
    const monthlySalesInput = document.getElementById('calculatorSales');
    const commissionRateInput = document.getElementById('calculatorCommission');
    const subscriptionFeeInput = document.getElementById('calculatorSubscription');
    const calculateBtn = document.getElementById('calculateCommission');
    const resultContainer = document.getElementById('commissionResults');

    // Ajouter l'écouteur d'événement au bouton de calcul
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Récupérer les valeurs
            const price = parseFloat(experiencePriceInput.value) || 0;
            const sales = parseInt(monthlySalesInput.value) || 0;
            const commissionRate = parseFloat(commissionRateInput.value) || 15;
            const subscriptionFee = parseFloat(subscriptionFeeInput.value) || 99;

            // Calculer les résultats
            const totalRevenue = price * sales;
            const commissionAmount = totalRevenue * (commissionRate / 100);
            const netRevenue = totalRevenue - commissionAmount - subscriptionFee;
            const effectiveRate = ((commissionAmount + subscriptionFee) / totalRevenue) * 100;

            // Afficher les résultats
            resultContainer.innerHTML = `
                <div class="card border-0 shadow-sm mt-4">
                    <div class="card-body">
                        <h5 class="card-title mb-4">Résultats du calcul</h5>
                        
                        <div class="row mb-2">
                            <div class="col-8">Chiffre d'affaires mensuel total :</div>
                            <div class="col-4 text-end fw-bold">${totalRevenue.toFixed(2)} $</div>
                        </div>
                        
                        <div class="row mb-2">
                            <div class="col-8">Commission Fimysolutions (${commissionRate}%) :</div>
                            <div class="col-4 text-end fw-bold">${commissionAmount.toFixed(2)} $</div>
                        </div>
                        
                        <div class="row mb-2">
                            <div class="col-8">Abonnement mensuel :</div>
                            <div class="col-4 text-end fw-bold">${subscriptionFee.toFixed(2)} $</div>
                        </div>
                        
                        <div class="row pt-2 border-top">
                            <div class="col-8 fw-bold">Revenu net pour votre entreprise :</div>
                            <div class="col-4 text-end fw-bold">${netRevenue.toFixed(2)} $</div>
                        </div>
                        
                        <div class="row mt-3">
                            <div class="col-8">Taux effectif (commission + abonnement) :</div>
                            <div class="col-4 text-end">${effectiveRate.toFixed(2)}%</div>
                        </div>
                    </div>
                </div>
                
                <div class="alert alert-info mt-3">
                    <i class="fas fa-info-circle me-2"></i> 
                    En passant au forfait Élite (commission 10%), votre revenu net serait de 
                    <strong>${(totalRevenue - (totalRevenue * 0.1) - 199).toFixed(2)} $</strong>.
                </div>
            `;
        });
    }
}

// Système de gestion des paiements et commissions
class CommissionSystem {
    constructor() {
        this.commissionRates = {
            essential: 0.20, // 20%
            premium: 0.15,   // 15%
            elite: 0.10      // 10%
        };
        this.subscriptionFees = {
            essential: 49,
            premium: 99,
            elite: 199
        };
    }

    // Calculer la commission pour une vente
    calculateCommission(saleAmount, partnerPlan, negotiatedRate = null) {
        // Utiliser le taux négocié s'il est fourni et valide
        let commissionRate = this.commissionRates[partnerPlan];
        if (negotiatedRate !== null && negotiatedRate >= 0.10 && negotiatedRate <= 0.20) {
            commissionRate = negotiatedRate;
        }
        
        return saleAmount * commissionRate;
    }

    // Calculer le paiement net pour un partenaire
    calculateNetPayment(totalSales, partnerPlan, negotiatedRate = null) {
        const commission = this.calculateCommission(totalSales, partnerPlan, negotiatedRate);
        const subscriptionFee = this.subscriptionFees[partnerPlan];
        
        return totalSales - commission - subscriptionFee;
    }

    // Générer un rapport de commission
    generateCommissionReport(partnerId, startDate, endDate) {
        // Cette fonction serait implémentée pour récupérer les données réelles de la base de données
        // Pour l'instant, nous retournons des données simulées
        return {
            partnerId: partnerId,
            partnerName: "Restaurant L'Étoile",
            period: {
                start: startDate,
                end: endDate
            },
            plan: "premium",
            sales: [
                { id: "sale1", date: "2025-04-01", amount: 150, commission: 22.5 },
                { id: "sale2", date: "2025-04-03", amount: 150, commission: 22.5 },
                { id: "sale3", date: "2025-04-07", amount: 150, commission: 22.5 },
                { id: "sale4", date: "2025-04-12", amount: 150, commission: 22.5 },
                { id: "sale5", date: "2025-04-18", amount: 150, commission: 22.5 },
                { id: "sale6", date: "2025-04-22", amount: 150, commission: 22.5 }
            ],
            summary: {
                totalSales: 900,
                totalCommission: 135,
                subscriptionFee: 99,
                netPayment: 666
            }
        };
    }

    // Traiter un paiement à un partenaire
    processPartnerPayment(partnerId, amount, paymentMethod) {
        // Cette fonction serait implémentée pour effectuer le paiement réel
        // Pour l'instant, nous simulons un paiement réussi
        const paymentId = "pmt_" + Date.now();
        const paymentDate = new Date().toISOString();
        
        return {
            success: true,
            paymentId: paymentId,
            partnerId: partnerId,
            amount: amount,
            method: paymentMethod,
            date: paymentDate,
            status: "completed"
        };
    }
}

// Initialiser le système de commission global
const commissionSystem = new CommissionSystem();

// Exporter le système de commission pour une utilisation dans d'autres scripts
window.Fimysolutions = window.Fimysolutions || {};
window.Fimysolutions.commissionSystem = commissionSystem;
