document.addEventListener("DOMContentLoaded", function() {
    // Fetch and display employees
    fetchEmployees();

    // Event listener for form submission (Add Employee)
    document.getElementById("addForm").addEventListener("submit", function(event) {
        event.preventDefault();
        addEmployee();
    });
});

// Function to fetch and display employees
function fetchEmployees() {
    fetch('https://helpful-data-413612.el.r.appspot.com/employee')
    .then(response => response.json())
    .then(data => {
        const employeeData = document.getElementById("employeeData");
        employeeData.innerHTML = '';
        data.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.PersonID}</td>
                <td>${employee.FirstName}</td>
                <td>${employee.LastName}</td>
                <td>${employee.Address}</td>
                <td>${employee.City}</td>
                <td>
                    <button onclick="editEmployee(${employee.PersonID})">Edit</button>
                    <button onclick="deleteEmployee(${employee.PersonID})">Delete</button>
                </td>
            `;
            employeeData.appendChild(row);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Function to add a new employee
function addEmployee() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;

    const data = {
        FirstName: firstName,
        LastName: lastName,
        Address: address,
        City: city
    };

    fetch('https://helpful-data-413612.el.r.appspot.com/employee/addone', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchEmployees(); // Refresh employee table after adding
    })
    .catch(error => console.error('Error:', error));
}

// Function to edit an employee
// function editEmployee(personID) {
//     // Find the row corresponding to the employee to be edited
//     const row = document.querySelector(`tr[${personID}]`);
//     if (!row) {
//         console.error('Row not found');
//         return;
//     }

//     // Get existing data from the row
//     const firstName = row.querySelector('td:nth-child(2)').innerText;
//     const lastName = row.querySelector('td:nth-child(3)').innerText;
//     const address = row.querySelector('td:nth-child(4)').innerText;
//     const city = row.querySelector('td:nth-child(5)').innerText;

//     // Create input fields with existing data
//     row.innerHTML = `
//         <td>${personID}</td>
//         <td><input type="text" value="${firstName}"></td>
//         <td><input type="text" value="${lastName}"></td>
//         <td><input type="text" value="${address}"></td>
//         <td><input type="text" value="${city}"></td>
//         <td>
//             <button onclick="saveEdit(${personID})">Save</button>
//             <button onclick="cancelEdit(${personID}, '${firstName}', '${lastName}', '${address}', '${city}')">Cancel</button>
//         </td>
//     `;
// }

// // Function to save edited employee data
// function saveEdit(personID) {
//     const row = document.querySelector(`tr[data-id="${personID}"]`);
//     if (!row) {
//         console.error('Row not found');
//         return;
//     }

//     const firstName = row.querySelector('td:nth-child(2) input').value;
//     const lastName = row.querySelector('td:nth-child(3) input').value;
//     const address = row.querySelector('td:nth-child(4) input').value;
//     const city = row.querySelector('td:nth-child(5) input').value;

//     const data = {
//         id: personID,
//         FirstName: firstName,
//         LastName: lastName,
//         Address: address,
//         City: city
//     };

//     fetch('https://helpful-data-413612.el.r.appspot.com/employee/update', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//         fetchEmployees(); // Refresh employee table after editing
//     })
//     .catch(error => console.error('Error:', error));
// }

// // Function to cancel editing an employee
// function cancelEdit(personID, firstName, lastName, address, city) {
//     const row = document.querySelector(`tr[data-id="${personID}"]`);
//     if (!row) {
//         console.error('Row not found');
//         return;
//     }

//     // Restore original data
//     row.innerHTML = `
//         <td>${personID}</td>
//         <td>${firstName}</td>
//         <td>${lastName}</td>
//         <td>${address}</td>
//         <td>${city}</td>
//         <td>
//             <button onclick="editEmployee(${personID})">Edit</button>
//             <button onclick="deleteEmployee(${personID})">Delete</button>
//         </td>
//     `;
// }


// Function to edit an employee
function editEmployee(personID) {
    console.log(firstName)
    const newFirstName = prompt("Enter new First Name:");
    const newLastName = prompt("Enter new Last Name:");
    const newAddress = prompt("Enter new Address:");
    const newCity = prompt("Enter new City:");

    const data = {
        FirstName: newFirstName,
        LastName: newLastName,
        Address: newAddress,
        City: newCity,
        id: personID
    };

    fetch(`https://helpful-data-413612.el.r.appspot.com/employee/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchEmployees(); // Refresh employee table after editing
    })
    .catch(error => console.error('Error:', error));
}

// Function to delete an employee
function deleteEmployee(personID) {
    fetch(`https://helpful-data-413612.el.r.appspot.com/employee/delete/${personID}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        fetchEmployees(); // Refresh employee table after deleting
    })
    .catch(error => console.error('Error:', error));
}


// Function to search for employees
function searchEmployees() {
    const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();

    // Fetch all employees
    fetch('https://helpful-data-413612.el.r.appspot.com/employee')
    .then(response => response.json())
    .then(data => {
        const filteredEmployees = data.filter(employee => {
            // Check if the search query matches any field in the employee data
            return (
                employee.FirstName.toLowerCase().includes(searchQuery) ||
                employee.LastName.toLowerCase().includes(searchQuery) ||
                employee.Address.toLowerCase().includes(searchQuery) ||
                employee.City.toLowerCase().includes(searchQuery)
            );
        });

        // Display the filtered employees
        displayEmployees(filteredEmployees);
    })
    .catch(error => console.error('Error:', error));
}

// Function to display filtered employees in the table
function displayEmployees(employees) {
    const employeeData = document.getElementById("employeeData");
    employeeData.innerHTML = '';

    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.PersonID}</td>
            <td>${employee.FirstName}</td>
            <td>${employee.LastName}</td>
            <td>${employee.Address}</td>
            <td>${employee.City}</td>
            <td>
                <button onclick="editEmployee(${employee.PersonID})">Edit</button>
                <button onclick="deleteEmployee(${employee.PersonID})">Delete</button>
            </td>
        `;
        employeeData.appendChild(row);
    });
}
