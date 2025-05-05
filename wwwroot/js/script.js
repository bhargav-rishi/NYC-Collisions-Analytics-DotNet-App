// Sample collision data
const collisionData = [
    {
        id: 1001,
        date: '2025-04-15',
        time: '08:30',
        borough: 'MANHATTAN',
        street: 'BROADWAY',
        zipCode: '10001',
        injuries: 2,
        fatalities: 0,
        factor: 'Driver Inattention/Distraction',
        vehicleType: 'Sedan'
    },
    {
        id: 1002,
        date: '2025-04-14',
        time: '17:45',
        borough: 'BROOKLYN',
        street: 'ATLANTIC AVE',
        zipCode: '11201',
        injuries: 1,
        fatalities: 0,
        factor: 'Failure to Yield Right-of-Way',
        vehicleType: 'SUV'
    },
    {
        id: 1003,
        date: '2025-04-16',
        time: '12:15',
        borough: 'QUEENS',
        street: 'QUEENS BLVD',
        zipCode: '11375',
        injuries: 3,
        fatalities: 1,
        factor: 'Unsafe Speed',
        vehicleType: 'Motorcycle'
    },
    {
        id: 1004,
        date: '2025-04-13',
        time: '21:30',
        borough: 'BRONX',
        street: 'GRAND CONCOURSE',
        zipCode: '10451',
        injuries: 0,
        fatalities: 0,
        factor: 'Traffic Control Disregarded',
        vehicleType: 'Truck'
    },
    {
        id: 1005,
        date: '2025-04-14',
        time: '14:20',
        borough: 'STATEN ISLAND',
        street: 'HYLAN BLVD',
        zipCode: '10305',
        injuries: 1,
        fatalities: 0,
        factor: 'Following Too Closely',
        vehicleType: 'Sedan'
    }
];

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for create page
    const createForm = document.getElementById('createForm');
    if (createForm) {
        createForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would send data to a server
            alert('Record created successfully!');
            
            // Reset the form
            createForm.reset();
        });
    }
    
    // Load table data for read page
    const collisionsTable = document.getElementById('collisionsTable');
    if (collisionsTable) {
        loadTableData(collisionData);
    }
    
    // Search and filter functionality for read page
    const searchInput = document.getElementById('searchInput');
    const boroughFilter = document.getElementById('boroughFilter');
    
    if (searchInput && boroughFilter) {
        searchInput.addEventListener('input', function() {
            filterTableData();
        });
        
        boroughFilter.addEventListener('change', function() {
            filterTableData();
        });
    }
    
    // CRUD form handlers
    setupCrudHandlers();
});

// Function to load table data
function loadTableData(data) {
    const tableBody = document.querySelector('#collisionsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.borough}</td>
            <td>${item.street}</td>
            <td>${item.injuries}</td>
            <td>${item.fatalities}</td>
            <td>${item.factor}</td>
            <td>
                <button class="action-btn edit-btn" data-id="${item.id}">Edit</button>
                <button class="action-btn delete-btn" data-id="${item.id}">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `update.html?id=${id}`;
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `delete.html?id=${id}`;
        });
    });
}

// Function to filter table data
function filterTableData() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const boroughValue = document.getElementById('boroughFilter').value;
    
    const filteredData = collisionData.filter(item => {
        const matchesSearch = 
            item.street.toLowerCase().includes(searchValue) || 
            item.factor.toLowerCase().includes(searchValue) ||
            item.id.toString().includes(searchValue);
            
        const matchesBorough = boroughValue === '' || item.borough === boroughValue;
        
        return matchesSearch && matchesBorough;
    });
    
    loadTableData(filteredData);
}

// Setup CRUD operation handlers
function setupCrudHandlers() {
    // Create form handling
    const createButton = document.querySelector('.primary-button');
    if (createButton && createButton.textContent === 'Create Record') {
        createButton.addEventListener('click', function(e) {
            if (document.getElementById('createForm').checkValidity()) {
                e.preventDefault();
                alert('New collision record created successfully!');
                document.getElementById('createForm').reset();
            }
        });
    }
    
    // Update form handling - populate form if on update page
    const urlParams = new URLSearchParams(window.location.search);
    const recordId = urlParams.get('id');
    
    if (recordId && window.location.pathname.includes('update.html')) {
        // Find the record in our dummy data
        const record = collisionData.find(item => item.id.toString() === recordId);
        
        if (record) {
            // Populate form fields if they exist
            if (document.getElementById('crashDate')) {
                document.getElementById('crashDate').value = record.date;
            }
            if (document.getElementById('crashTime')) {
                document.getElementById('crashTime').value = record.time;
            }
            if (document.getElementById('borough')) {
                document.getElementById('borough').value = record.borough;
            }
        }
    }
    
    // Delete confirmation handling
    if (window.location.pathname.includes('delete.html')) {
        const deleteButton = document.querySelector('.confirm-delete');
        if (deleteButton) {
            deleteButton.addEventListener('click', function() {
                alert('Record deleted successfully!');
                window.location.href = 'read.html';
            });
        }
    }
}
