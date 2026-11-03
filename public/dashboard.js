document.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('gymbrothers_user_data') || '{}');

    // Fill Metrics from localStorage
    document.getElementById('metric-weight-current').textContent = userData.weightCurrent || '91.0';
    document.getElementById('metric-weight-goal').textContent = userData.weightGoal || '75.0';

    // TODO: Fetch actual workout counts from backend
    document.getElementById('metric-workouts').textContent = '3 / 4';

    // Progress calculation (Simple logic: % of goal reached relative to start)
    // In a real app, this would be (startWeight - currentWeight) / (startWeight - goalWeight)
    const startWeight = 95.0; // Example starting weight
    const current = parseFloat(userData.weightCurrent) || 91.0;
    const goal = parseFloat(userData.weightGoal) || 75.0;

    if (startWeight && current && goal) {
        const totalNeeded = startWeight - goal;
        const achieved = startWeight - current;
        const progress = Math.round((achieved / totalNeeded) * 100);
        document.getElementById('metric-progress').textContent = `+${progress}%`;
    }

    // Initialize Weight Chart
    const ctx = document.getElementById('weightChart').getContext('2d');

    const chartData = {
        '4w': {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
            data: [92, 90.5, 88, 83.5],
        },
        '8w': {
            labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
            data: [95, 94, 93, 91, 90, 88, 86, 83.5],
        },
        '3m': {
            labels: ['Mês 1', 'Mês 2', 'Mês 3'],
            data: [95, 89, 83.5],
        }
    };

    let currentPeriod = '4w';

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(204, 255, 0, 0.4)');
    gradient.addColorStop(1, 'rgba(204, 255, 0, 0)');

    const weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData[currentPeriod].labels,
            datasets: [{
                label: 'Peso (kg)',
                data: chartData[currentPeriod].data,
                borderColor: '#ccff00',
                backgroundColor: gradient,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ccff00',
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    min: 80,
                    max: 95,
                    ticks: {
                        stepSize: 5,
                        color: '#a0a0a0',
                        font: { family: 'Lato' }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#a0a0a0',
                        font: { family: 'Lato' }
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Handle Period Change
    document.getElementById('chart-period').addEventListener('change', (e) => {
        const period = e.target.value;
        weightChart.data.labels = chartData[period].labels;
        weightChart.data.datasets[0].data = chartData[period].data;
        weightChart.update();
    });
});
