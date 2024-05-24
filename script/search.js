'use strict';

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBody = document.getElementById('tbody');
const findBtn = document.getElementById('find-btn');

renderTableData(petArr)

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
            <td>${petArr[i].date}</td>`
            tableBody.appendChild(row);
      }      
}
// render items in breed depend on pet's type
function renderBreedDependType() {
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
      if(typeInput.value !== 'Select Type'){
            for(let i= 0; i < breedTypeName.length; i++){
                  const option = document.createElement('option');
                  option.textContent = breedTypeName[i].breed_name;
                  breedInput.appendChild(option);
            }
      }
      else {
            for(let i = 0; i < breedArr.length; i++) {
                  const option = document.createElement('option');
                  option.innerText = breedArr[i].breed_name;
                  breedInput.appendChild(option);
            }
      }
}
  
typeInput.addEventListener('change', renderBreedDependType);

// render items for breed cell
function renderBreedAll(){
      breedInput.innerHTML = '';
       // render the Word 'Select Breed'
       const option = document.createElement('option');
       option.textContent = 'Select Breed';
       breedInput.appendChild(option);
      for(let i = 0; i < breedArr.length; i++) {
            const option = document.createElement('option');
            option.innerText = breedArr[i].breed_name;
            breedInput.appendChild(option);
      }
}
breedInput.addEventListener('onChange', renderBreedAll);
// gọi hàm renderBreedAll() để render breed
renderBreedAll();

// search function
function findPet(){
      let searchPet = Array.from(petArr);

      // search follow the input Id
      if(idInput.value){
            searchPet= searchPet.filter(searchPetItem => {
                  return searchPetItem.id.includes(idInput.value);
            })
      }
      console.log('search pet', searchPet)
      
      // // search follow the name
      if(nameInput.value) {
            console.log('name da dien', nameInput.value)
            searchPet = searchPet.filter(searchPetItem => {
                  return searchPetItem.name.includes(nameInput.value);
            })
      }

      // search follow the type
      if(typeInput.value !=='Select Type') {
            searchPet = searchPet.filter(searchPetItem => {
                  return searchPetItem.type === typeInput.value;
            })
      }
      
      // search follow breed
      if(breedInput.value !== 'Select Breed') {
            searchPet = searchPet.filter(searchPetItem => {
                  return searchPetItem.breed === breedInput.value;
            })
      }

      // search follow vaccinated
            searchPet = searchPet.filter(pet => pet.vaccinnated === vaccinatedInput.checked || (!pet.vaccinnated === ! vaccinatedInput.checked));

      // search follow Dewormed
      searchPet = searchPet.filter(pet => pet.dewormed === dewormedInput.checked || (!pet.dewormed && !dewormedInput.checked));

      // search follow Sterilized
      searchPet = searchPet.filter(pet => pet.sterilized === sterilizedInput.checked || (!pet.sterilized && !sterilizedInput.checked))
      
      renderTableData(searchPet);
  
}

findBtn.addEventListener('click', findPet);
