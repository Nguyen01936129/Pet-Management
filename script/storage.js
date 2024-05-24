'use strict';
const side_bar_act = document.getElementById('sidebar');
// add animation to pages
side_bar_act.addEventListener('click', function(){
      side_bar_act.classList.toggle('active');
});

if(!getFromStorage('petArr')) {
      saveToStorage('petArr', []);
}
if(!getFromStorage('pet_ID')) {
      saveToStorage('pet_ID', []);
}
if(!getFromStorage('healthy_pets')) {
      saveToStorage('healthy_pets', []);
}

if(!getFromStorage('breedArr')){
      saveToStorage('breedArr', []);
}

// save values to localStorage
function saveToStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
}

// take value from localStorage
function getFromStorage(key) {
      return localStorage.getItem(key);
}

// // lấy thông tin của breed trong localstorage
const breedArr = JSON.parse(getFromStorage("breedArr"));

// // lấy thông tin thú cưng khỏe mạnh trong localStorage
const healthy_pets = JSON.parse(getFromStorage("healthy_pets"));

// lấy thông tin thú cưng trong localStorage
const petArr = JSON.parse(getFromStorage("petArr"));

/* lấy pet_ID của thú cưng trong local storage.
pet_ID để lưu trữ id của các pets để check id các pet có trùng không.
*/
const pet_ID =JSON.parse(getFromStorage("pet_ID"));


