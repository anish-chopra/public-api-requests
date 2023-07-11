let employees = [];
        let employeeSection = document.getElementById("employeeSection");
        let selectedEmployee;
        let closeButton;
        let modalContainer = document.getElementById('modalContainer');
        let currentChild;
        let index;
        
        // Fetch the data from the API
        fetch('https://randomuser.me/api/?results=12')
            .then(response => response.json())
            .then(data => displayEmployees(data.results));


        // Function to display the Employees
            function displayEmployees(employeeData) {
                employees = employeeData;
                let employeeHTML = '';

                employees.forEach((employee, index) => {
                    let name = employee.name;
                    let email = employee.email;
                    let city = employee.location.city;
                    let picture = employee.picture;


                    employeeHTML += `
                        <div class="employeeContainer" data-index="${index}">
                            <img class="employeeImage" src="${picture.large}" />
                            <div class="employeeInfo">
                                <h2 class="employeeName" id="employeeName">${name.first} ${name.last}</h2>
                                <p class="employeeEmail" id="employeeEmail">${email}</p>
                                <p class="employeeLocation" id="employeeLocation">${city}</p>
                            </div>
                        </div>
                        `
                    });
                    employeeSection.innerHTML = employeeHTML;
                    console.log(employees)
                }

                // Funtion to display modal
            function displayModal(index) {
                let { name, dob, phone, email, location: { city, street, state, postcode}, picture } = employees[index];
                let date = new Date(dob.date);

                const modalHTML = `
                <div class='modalContent'>
                    <div class="modalCloseContainer">
                     <p id="modalClose" onClick="toggleModal()">X</p>
                     </div>
                    <img class="employeeImage" src="${picture.large}" />
                    <div class="text-container">
                        <h2 class="employeeName">${name.first} ${name.last}</h2>
                        <p class="employeeEmail">${email}</p>
                        <p class="address">${city}</p>
                        <div class="arrowContainer">
                       <p id="leftArrow" onClick='leftArrow()'>&#8592;</p>
                       <p id="rightArrow" onClick='rightArrow()'>&#8594;</p>
                       </div>
                        <hr />
                        <p class='phone'>${phone}</p>
                        <p class="address">${street.name}, ${state} ${postcode}</p>
                        <p class='birthday'>Birthday:
                        ${dob.date.substr(5,2)}/${dob.date.substr(8,2)}/${date.getFullYear()}</p>
                    </div>
                    </div>
                `;
                modalContainer.classList.toggle("showModal");
                modalContainer.innerHTML = modalHTML;
                
            }

            // Event Listener
            employeeSection.addEventListener('click', e => {

if (e.target !== employeeSection) {

const card = e.target.closest(".employeeContainer");
index = card.getAttribute('data-index');
displayModal(index);
}
});


        function windowOnClick(event) {
    if (event.target === modalContainer) {
        modalContainer.classList.toggle("showModal");
    }
}

// Toggle Modal Function
function toggleModal() {
    modalContainer.classList.toggle("showModal");
}

// Close Button in Modal
function XOnClick(event) {
    if (event.target === closeButton) {
        modalContainer.classList.toggle("showModal");
    }
}

// Event Listener
window.addEventListener("click", windowOnClick);


// Left Arrow Button in Modal
function leftArrow() {
    if (index >= 1) {
    console.log(index);
    modalContainer.classList.toggle("showModal");
    displayModal(index - 1);
    index = index - 1;
    if (index ==0) {
        document.getElementById('leftArrow').style.visibility = "hidden"
    }
}
}

// Right Arrow Button in Modal
function rightArrow() {
    if (index <= 10) {
    modalContainer.classList.toggle("showModal");
    displayModal(parseInt(index) + (+1));
    index = parseInt(index) + (+1)
    console.log(index)
    if (index ==11) {
        document.getElementById('rightArrow').style.visibility = "hidden"
    }
    
} 
}


//Employee Search
const employeeSearch = document.getElementById('employeeSearch');
employeeSearch.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();
    let nameOfEmployee = document.querySelectorAll('h2');
    nameOfEmployee.forEach(employee => {
        if (employee.textContent.toLowerCase().includes(currentValue)) {
            employee.parentNode.parentNode.style.display = 'flex';
        } else {
            employee.parentNode.parentNode.style.display = 'none';
        }
        });
    });