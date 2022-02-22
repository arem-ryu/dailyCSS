//select all require element
const dropArea = document.querySelector('.drag-area');
const dragText = dropArea.querySelector('header');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('input');

let file; //global variable and use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the  button then the input also clicked
};
//()=> 형식으로하면 this가 달라짐
input.addEventListener('change', function () {
  file = this.files[0];
  dropArea.classList.add('active');
  showFile();
});

//if user Drag  file over DropArea
dropArea.addEventListener('dragover', (event) => {
  event.preventDefault(); //prevent from default behavior
  dropArea.classList.add('active');
  dragText.textContent = 'Release to Upload File';
});
//if user leave dragged file from DropArea
dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('active');
  dragText.textContent = 'Drag & Drop to Upload File';
});

//if user drop file on drag DropArea
dropArea.addEventListener('drop', (event) => {
  //이것을 호출하지 않으면 함수 내부의 구문이 실행되지 않음
  event.preventDefault(); //prevent from default behavior
  // console.log('File is dropped on DragArea');
  // dropArea.classList.remove('active');
  //getting user select file nad [0] means if user select multiple files then select only the first one
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile() {
  let fileType = file.type;

  console.log(fileType);

  let vaildExtentions = ['image/png', 'image/jpg', 'image/jpeg']; //adding some vaild image extentions in array
  if (vaildExtentions.includes(fileType)) {
    console.log('img File');
    //if user select file is an image file
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result; // passing user file source in FileURL variable
      let imgTag = `<img src="${fileURL}" alt="">`; // creating img tag passing user selected file source inseide src attribte
      dropArea.innerHTML = imgTag; //adding that create img tag inside drop Area
    };
    fileReader.readAsDataURL(file);
  } else {
    console.log('this is not an img file');
    dropArea.classList.remove('active');
    alert('this is not an image file');
  }
}
