'use strict';

const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');
const uploadFile = document.getElementById('input-file');

// function to save value to a file
function saveDataToFile() {
      let blob = new Blob([JSON.stringify(petArr)], { type: "text/plain;charset=utf-8" });
      saveAs(blob, 'newPetArr.JSON');
}
exportBtn.addEventListener('click', saveDataToFile);

// function to upload and read a file
function readUploadFile() {
      // store file to variable file
      const file = uploadFile.files[0];
      const reader = new FileReader();

      reader.onload = function(e) {
            const contents = e.target.result;
            // using try catch to catch error if the contens have something which is wrong
            try {
                  const dataArray = JSON.parse(contents);
                  saveToStorage('petArr', dataArray);
            }
            catch (error) {
                  console.error('error parsing JSON:', error);
            }
      }
      reader.readAsText(file);
}
importBtn.addEventListener('click', readUploadFile);