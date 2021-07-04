let pageInterval = 10
var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",
    true
);


req.send();

req.onload = function () {
    // Fetcting JSON data...!
    jsonData = JSON.parse(this.response);


    //Create Row function
    function createRowEle(appendEle, ele, data){
        var row = document.createElement('tr');
        for(let i=0;i<data.length;i++){
            var rowEle = document.createElement(ele);
            rowEle.innerHTML = data[i];
            row.append(rowEle);
        }
        appendEle.append(row);
    }

    //Create button function
    function createButton(value = '') {
        var button = document.createElement('button')
        button.setAttribute('class', 'btn btn-light btn-outline-dark')
        button.innerHTML = value;
        buttonDiv.append(button);
    }

    function pageClick(pageNum) {
        var start = pageNum * 10 - 10;
        var end = (pageNum * 10) > jsonData.length ? jsonData.length : pageNum * 10;
        if (document.getElementById('tbody'))
            document.getElementById('tbody').remove();
        createTable(start, end);
    }

    function createTable(start = 0, end = 10) {
        var tbody = document.createElement("tbody");
        tbody.setAttribute('id', 'tbody')
        table.append(tbody);
        for (let i = start; i < end; i++) {
            createRowEle(tbody, "td", [
                jsonData[i].id,
                jsonData[i].name,
                jsonData[i].email,
            ]);
        }
    }

    //Heading
    var heading = document.createElement('h3');
    heading.innerText = "PAGINATION"

    //Creating table
    var table = document.createElement('table')
    table.className = 'table table-bordered';
    var thead = document.createElement('thead');
    createRowEle(thead, 'th', ['ID','NAME','EMAIL'] )
    table.append(thead);
    
    createTable(0, 10)

    document.body.append(heading,table);


    //Creating buttons for pagination
    let buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('class', 'btn-group')
    let firstButton = createButton('First')
    let previousButton = createButton('Previous')
    for (let i = 1; i <= pageInterval; i++) {
        createButton(i)
    }
    document.body.append(buttonDiv);

    //Setting up button function
    var buttonFunc = document.getElementsByClassName('btn')
    console.log("buttonFunc"+buttonFunc)
    let page = 0;
    for(let i= 0;i<buttonFunc.length;i++){
        buttonFunc[i].onclick = function(){
            if(this.textContent === 'First'){
                page= 1;
                pageClick(1);
            }
            else if(this.textContent === 'Previous'){
                if(page != 1){
                    page = page -1;
                    pageClick(page);
                }
            }
            else{
                page = this.textContent
                pageClick(page)
            }
        }
    }

    
}
