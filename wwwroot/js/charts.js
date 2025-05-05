//Data visualization
document.addEventListener('DOMContentLoaded', function() {
    //Check for Viz page
    if (document.getElementById('boroughChart') && 
        document.getElementById('factorsChart') && 
        document.getElementById('timelineChart')) {
        
        renderBoroughChart();
        renderFactorsChart();
        renderTimelineChart();
    }
});

//Collisions by Borough (Bar)
function renderBoroughChart() {
    const ctx = document.getElementById('boroughChart').getContext('2d');
    //Dummy data
    const data = {
        labels: ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'],
        datasets: [{
            label: 'Number of Collisions',
            data: [450, 380, 320, 290, 140],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Collisions'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Borough'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `Collisions: ${context.raw}`;
                    }
                }
            }
        }
    };
    
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

//Contributing Factors (Pie)
function renderFactorsChart() {
    const ctx = document.getElementById('factorsChart').getContext('2d');
    //Dummy data
    const data = {
        labels: [
            'Driver Inattention', 
            'Failure to Yield', 
            'Unsafe Speed', 
            'Traffic Control Disregarded',
            'Following Too Closely',
            'Other'
        ],
        datasets: [{
            data: [35, 20, 15, 10, 8, 12],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 15,
                    padding: 15
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.raw}%`;
                    }
                }
            }
        }
    };
    
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: options
    });
}

//Injuries Over Time (Line)
function renderTimelineChart() {
    const ctx = document.getElementById('timelineChart').getContext('2d');
    //Dummy data
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Persons Injured',
                data: [120, 135, 150, 140, 160, 175, 190, 185, 170, 155, 145, 130],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Persons Killed',
                data: [8, 10, 7, 9, 12, 14, 11, 13, 10, 8, 7, 9],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of People'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Month (2025)'
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };
    
    new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
