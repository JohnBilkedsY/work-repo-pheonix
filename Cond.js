function hide(){
    document.getElementById('hidden').style.display ="none";
}

function show(){
    document.getElementById('hidden').style.display ="block";
}
document.getElementById('hidden').style.display ="none";

// Family Photo
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    if(this.files[0].size > 3145728) {
        alert("File is too big! Upload below 3mb");
        this.value = "";
    }
    
    else if(file) {
        const reader = new FileReader();
        
        reader.addEventListener("load", function (e) {
            const readerTarget = e.target;
            
            const img = document.createElement("img");
            img.src = readerTarget.result;
            img.classList.add("picture__img");
            
            pictureImage.innerHTML = "";
            pictureImage.appendChild(img);
        });
        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxt;
    }
    
});


// Children Table

let serialNumber = 1;
function addRow() {
  if(serialNumber<2){  
  const tableBody = document.getElementById("ftab").getElementsByTagName("tbody")[0];

  const row = tableBody.insertRow();
  const rowIndex = serialNumber;

  row.innerHTML = `
    <td>${serialNumber++}</td>
    <td><input type="text" class="form-control" name="child_name[]"></td>
    <td><input type="date" class="form-control" name="child_dob[]"></td>
    <td>
      <select class="form-select" name="child_gender[]">
        <option hidden value="">-- select --</option>
        <option value="Boy">Boy</option>
        <option value="Girl">Girl</option>
      </select>
    </td>
    <td>
      <select class="form-select" name="child_status[]">
        <option hidden value="">-- select --</option>
        <option value="married">Married</option>
        <option value="unmarried">Unmarried</option>
      </select>
    </td>
    <td>
      <button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(this)">Delete</button>
      <button type="button" class="btn btn-success btn-sm"  >Submit</button> <!-- onclick="save()" -->
    </td>
  `;
}}

function deleteRow(button){
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
  renumberRows();

}

function renumberRows(){
const rows=document.querySelectorAll("#ftab tbody tr");
 serialNumber=1;
rows.forEach(row=>{
row.cells[0].innerText = serialNumber++;
});
}