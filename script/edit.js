'use strict';

const idInput = document.getElementById("input-id");
const submitBtn = document.getElementById("submit-btn");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBody = document.getElementById('tbody');
const editForm = document.getElementById('container-form');

// render bảng thông tin pets có sẵn trong local storage.
renderTableData(petArr)

// tạo function này để yêu cầu người dùng nhập vào các thông tin bắc buộc.
let require_form_filled = ()=> {
      nameInput.required = true;
      ageInput.required = true;
      typeInput.required = true;
      weightInput.required = true;
      lengthInput.required = true;
      breedInput.required = true;
}

// function check range value for pets weight, long, and age
let check_range_value_check =(value, min, max, name_type) => {
      if(value >= min && value <= max) {
            return true;
      }
      else {
            alert(`${name_type} must be between ${min} and ${max}!`);
            return false;
      };
}

// function check pet's type
function check_type(data) {
      if (data.type == 'Select Type') {
            alert('Please select Type!');
            return false;
      }
      else return true;
}

// function check breed
let check_breed = (data)=>{
      if(data.breed == 'Select Breed'){
            alert('Please select Breed!');
            return false;
      }
      else return true;
}

// Validate function for the form
let validate = (data) => {
      if(check_range_value_check(data.age, 1, 15, 'Age')
      && check_range_value_check(data.weight, 1, 15, 'Weight')
      && check_range_value_check(data.length, 1, 100, 'Length') 
      && check_breed(data) && check_type(data) ){
      return true;
      }
      else {
            return false;
      }
}

// render table data for petArr
function renderTableData(petArr) {
      const green_circle = 'bi-check-circle-fill';
      const red_circle = 'bi-x-circle-fill'
      tableBody.innerHTML = '';
      for(let i = 0; i< petArr.length; i++) {

            const row = document.createElement('tr');
            row.innerHTML = `<th scope="row">${petArr[i].id}</th>
            <td>${petArr[i].name}</td>
            <td>${petArr[i].age}</td>
            <td>${petArr[i].type}</td>
            <td>${petArr[i].weight} kg</td>
            <td>${petArr[i].length} cm</td>
            <td>${petArr[i].breed}</td>
           
            <td>
            <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
            </td>
            <td><i class="bi ${petArr[i].vaccinnated? green_circle: red_circle}"></i></td>
            <td><i class="bi ${petArr[i].dewormed? green_circle: red_circle}"></i></td>
            <td><i class="bi ${petArr[i].sterilized? green_circle: red_circle}"></i></td>
            <td>${petArr[i].date}</td>
            <td><button type="button" class="btn btn-warning" onclick="startEditPet('${petArr[i].id }')">Edit</button>
            </td>`
            tableBody.appendChild(row);
      }
      
}

// clear input
function clearInput() {
      idInput.value = '';
      nameInput.value = '';
      ageInput.value = '';
      typeInput.value = 'Select Type';
      weightInput.value = '';
      lengthInput.value = '';
      colorInput.value = '#000000';
      breedInput.value = 'Select Breed';
      vaccinatedInput.checked = false;
      dewormedInput.checked = false;
      sterilizedInput.checked = false;
}


// format date to get dd/mm/yyyy
function formatDate(date) {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
}
const currentDate = new Date(); 

// logic for submit button
let submit_infor_handle = function(e) {
      require_form_filled();

      // display alert if user didn't fill in any input or selection.
      if (!document.querySelector('form').checkValidity()) {
            // Prevent form submission if not valid
            e.preventDefault();
            // Handle the case where the form is not valid (e.g., display an error message)
            alert('Please fill out all required fields.');
            return;
        }

      const data = {
            id: idInput.value,
            name: nameInput.value,
            age: parseInt(ageInput.value),
            type: typeInput.value,
            weight: parseInt(weightInput.value),
            length: parseInt(lengthInput.value),
            color: colorInput.value,
            breed: breedInput.value,
            vaccinnated: vaccinatedInput.checked,
            dewormed: dewormedInput.checked,
            sterilized: sterilizedInput.checked,
            date: formatDate(currentDate),
      }
    if(validate(data)) {
      // find the index of the pet which was edited
      let index = petArr.findIndex(petItem => {
           return petItem.id == idInput.value;
      })
      // replace the old data by new data
      petArr[index] = data;
      saveToStorage('petArr', (petArr));
      clearInput();
	renderTableData(petArr);
    }
}
submitBtn.addEventListener('click', submit_infor_handle);

function renderBreed() {
      breedInput.innerHTML = '';
      // filter to get array of breed dogs, or breed cats
    const breedTypeName =  breedArr.filter(breedElement => {
           return typeInput.value === breedElement.breed_type;
      })

      // render the Word 'Select Breed'
      const option = document.createElement('option');
      option.textContent = 'Select Breed';
      breedInput.appendChild(option);
      // render breed of pets type
      for(let i= 0; i < breedTypeName.length; i++){
            const option = document.createElement('option');
            option.textContent = breedTypeName[i].breed_name;
            breedInput.appendChild(option);
            console.log('value for breed after click', breedInput.value);
      }
}
typeInput.addEventListener('click', renderBreed);

// function edit pets
function startEditPet(petId){
      editForm.style.display = 'block';
      for(let i = 0; i < petArr.length; i++){
            if(petArr[i].id === petId) {
                  idInput.value = petArr[i].id;
                  nameInput.value = petArr[i].name;
                  ageInput.value = petArr[i].age;
                  typeInput.value = petArr[i].type;
                  weightInput.value = petArr[i].weight;
                  lengthInput.value = petArr[i].length;
                  colorInput.value = petArr[i].color;
                  // breedInput.value = petArr[i].breed;
                  breedInput.innerHTML = `<option>${petArr[i].breed}<option>`;
                  vaccinatedInput.checked = petArr[i].vaccinnated;
                  dewormedInput.checked = petArr[i].dewormed;
                  sterilizedInput.checked = petArr[i].sterilized;
            }
      }
}
