'use strict';
const input_breed = document.getElementById('input-breed');
const select_breed_type = document.getElementById('input-type');
const submit_breed = document.getElementById('submit-btn');
const breed_table = document.getElementById('tbody');


breed_renderTabledata(breedArr);

// check breed input
let breed_check_input = (breed_data) =>{
      if(!breed_data.breed_name){
            alert('Enter value for breed');
            return false;
      }
      else return true;
}

// check type of breed
let breed_check_type = (breed_data) => {
      if(breed_data.breed_type === 'Select Type'){
            alert('Please select a type');
            return false;
      }
      else return true;
}
// validate breed
let breed_validate = (breed_data) => {
      if(breed_check_input(breed_data) && breed_check_type(breed_data)){
            return true
      }
      else return false;
}

// clear data after click submit button
let breed_clear_data = ()=> {
      input_breed.value = '';
      select_breed_type.value = 'Select Type';
}

// render breedArr
function breed_renderTabledata(breedArr) {
      // clear the old array infor to render
      breed_table.innerHTML = '';
      // render breedArr 
      for(let i = 0; i < breedArr.length; i++){
            const row = document.createElement('tr');
            row.innerHTML = `<th scope="row">${i+ 1}</th>
            <td>${breedArr[i].breed_name}</td>
            <td>${breedArr[i].breed_type}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteBreedData(${i})">Delete</button>
            </td>`
            breed_table.appendChild(row);
      }
}

// delete breed data
function deleteBreedData(index){
      if(confirm('Are you sure?')){
            for(let i =0; i < breedArr.length; i++){
                  if(i === index){
                        breedArr.splice(i, 1);
                        saveToStorage('breedArr', breedArr);
                        break;
                  }
            }
      }
      breed_renderTabledata(breedArr)
}
let breedHandle = () => {
      const breed_data = {
            breed_name : input_breed.value,
            breed_type: select_breed_type.value,
      }
      if(breed_validate(breed_data)){
            breedArr.push(breed_data);
            saveToStorage('breedArr', breedArr);
      }
      console.log(breedArr);
      breed_renderTabledata(breedArr);
      breed_clear_data();
}
submit_breed.addEventListener('click', breedHandle);
