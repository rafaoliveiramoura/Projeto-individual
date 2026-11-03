document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.diet-plan-card');
    const radioGroup = document.querySelector('.diet-plans-grid');

    function selectPlan(cardElement) {
        // Remove selection from all
        cards.forEach(card => {
            card.classList.remove('selected');
            card.setAttribute('aria-checked', 'false');
        });

        // Add selection to target
        cardElement.classList.add('selected');
        cardElement.setAttribute('aria-checked', 'true');

        // Save to localStorage
        const planId = cardElement.dataset.plan;
        localStorage.setItem('dietaObjetivo', planId);

        // TODO: Integration with backend to load the specific plan details (modal or new page)
        console.log(`Plan selected: ${planId}`);
    }

    // Initial Selection Logic based on Quiz data
    function determineInitialPlan() {
        try {
            const userData = JSON.parse(localStorage.getItem('gymbrothers_user_data') || '{}');
            const current = parseFloat(userData.weightCurrent);
            const goal = parseFloat(userData.weightGoal);

            if (!isNaN(current) && !isNaN(goal)) {
                if (goal < current) return 'emagrecer';
                if (goal > current) return 'ganhar-massa';
            }
        } catch (e) {
            console.error('Error reading quiz data for diet selection:', e);
        }
        return 'manter'; // Default per reference
    }

    const initialPlan = determineInitialPlan();

    // Event Listeners
    cards.forEach(card => {
        // Select on card click
        card.addEventListener('click', () => selectPlan(card));

        // Select on button click (prevent double trigger)
        const btn = card.querySelector('.btn-view-plan');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            selectPlan(card);
        });

        // Keyboard support
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectPlan(card);
            }
        });
    });

    // Apply initial selection
    const targetCard = Array.from(cards).find(c => c.dataset.plan === initialPlan);
    if (targetCard) {
        selectPlan(targetCard);
    }
});
