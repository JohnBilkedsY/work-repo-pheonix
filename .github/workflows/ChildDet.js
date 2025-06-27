
let serialNumber = 1;

function addRow(){
    if(serialNumber<10){
    const tableBody = document.getElementById("ftab").getElementsByTagName("tbody")[0];

    const row = tableBody.insertRow();

    row.innerHTML = 
    '<td>' + serialNumber++ + '</td>' +
    '<td><input type="text" class="tabinputs"></td>' +
    '<td><input type="date" class="tabinputs"></td>' +
    '<td><select class="tabinputs"><option value="-1" hidden>-- select --</option><option value="Boy">Boy</option><option value="Girl">Girl</option></select></td>'+
    '<td><select class="tabinputs"><option value="-1" hidden>-- select --</option><option value="alive">alive</option><option value="dead">dead</option></select></td>' +
    '<td><button onclick="deleteRow(this)" class="tab-button">Delete</button></td>';
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
