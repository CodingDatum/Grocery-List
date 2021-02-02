var shoppingLists = ["grocery-list"];
var shoppingList = [];
const soundEffect1 = new Audio("sounds/wee.mp3");
var currentShoppingList = "grocery-list";

//EVENT LISTENER FOR "ADD TO LIST" SUBMIT BUTTON
document.getElementById("submit-to-shopping-list").addEventListener("click", addToList);

//EVENT LISTENER FOR SUBMIT BUTTON FOR CREATING NEW CATEGORIES
document.getElementById("shopping-list-button-submit").addEventListener("click", addButton);

//EVENT LISTENER FOR THE NEWLY CREATED BUTTONS
document.getElementById("shopping-list-buttons").addEventListener("click", displayList);


// EVENT LISTENER FOR CHECK BUTTONS
document.addEventListener("click", function(event){

    var currentItem = event.target;

    if(currentItem.classList[0] === "check-button"){
        currentItem.parentElement.parentElement.classList.toggle("list-item-checked");
    }
});

//EVENT LISTENER FOR TRASH BUTTON
document.addEventListener("click", function(event){
    // event.preventDefault();
    var currentItem = event.target;
    var childToRemove = currentItem.parentElement.parentElement; // grabs the entire div

    if(currentItem.classList[0] === "delete-button"){
        removeListItem(childToRemove);
        var thisList = childToRemove.parentElement;
        
        if(thisList.id === "grocery-list" && document.querySelectorAll(".shopping-category").length > 0){
        var otherId = childToRemove.firstChild.id.slice(0, -1);

            document.getElementById(otherId).remove();
            for(let i = 0 ; i<shoppingList.length; i++){
                if(shoppingList[i]===otherId){
                    shoppingList.splice(i,1);
                };
            };
        };
    };

// YOU CANT FIND THE ID OF THE LI FROM THE "ALL" GROCERY LIST BECAUSE WE NEVER ASSIGNED ONE!!!!!
// 💥💥💥💥💥🎉🎆✨🎆✨✨✔✔✔✔✔✔✔🎁🎁🎁🎁🎁🎁👍👍👍👍👍👍👍👍👍👍👍👍👍👍

});

document.getElementById("email-submit").onclick = function(){
    let emailVersion = ""
    for (let i = 0 ; i < shoppingList.length; i++){
        emailVersion = emailVersion + (shoppingList[i] + "%0D%0A")
    }
    sendEmail(emailVersion);
}

function sendEmail(list){
    var mailtoAddress = document.getElementById("email").value;
    document.getElementById("email-submit").href = "mailto:" + mailtoAddress + "?subject=Groceries&body=" + list;
    document.getElementById("email").value = "";
}

function removeListItem(item){

    // animate list item
    item.style.transition = "1s ease all";
    item.classList.add("deleted-item");
    soundEffect1.play();

    setTimeout(function(){
        //remove entirely
        var parent = item.parentElement;
        removeFromArray(item);
        parent.removeChild(item);

    }, 1000);

}

function removeFromArray(item){

    var itemToDelete = item.firstChild.id;
    console.log(itemToDelete);
    for(let i = 0 ; i<shoppingList.length; i++){
        if(shoppingList[i]===itemToDelete){
            shoppingList.splice(i,1);
        };
    };

}

function addToList(event){
    event.preventDefault();

    //will eventually need to pass this through 👇👇👇👇👇 as an argument when the function is called
    var itemToAdd = document.getElementById("shopping-list-input").value;
    
    var newListItem = document.createElement("li");
    newListItem.id = changeToId(itemToAdd);
    var listContainer = document.createElement("div");

    
    listContainer.classList.add("list-item-container");

    var deleteButton = document.createElement("img");
    deleteButton.src = "images/trash.png";
    deleteButton.classList.add("delete-button");

    var checkButton = document.createElement("img");
    checkButton.src = "images/check.png";
    checkButton.classList.add("check-button");

    newListItem.innerText = itemToAdd;
    newListItem.append(checkButton);
    newListItem.append(deleteButton);

    listContainer.append(newListItem);

    document.getElementById(currentShoppingList).appendChild(listContainer);
    shoppingList.push(itemToAdd);

    document.getElementById("shopping-list-form").reset();
    document.getElementById("shopping-list-form").focus();
}

function addButton(event){
    event.preventDefault();
    var buttonName = document.getElementById("shopping-list-button-input").value;
    var newButton = document.createElement("button");
    newButton.classList.add("shopping-category");
    newButton.classList.add("button");
    newButton.classList.add("btn-outline-success");
    newButton.innerHTML = buttonName;
    buttonName = changeToId(buttonName);
    newButton.id = buttonName;
    document.getElementById("shopping-list-buttons").appendChild(newButton);
    document.getElementById("shopping-list-button-input").value = "";

    //and create a new UL to represent this category
    var newList = document.createElement("ul");
    newList.classList.add("shopping-category-list");
    newList.id = buttonName + "-list";
    newList.style.display = "none";
    shoppingLists.push(newList.id);
    
    document.getElementById("shopping-list-container").append(newList);
    document.getElementById("shopping-list-input").focus();
    var finalTitle = buttonName.toUpperCase();
    document.getElementById("shopping-list-type").innerHTML = "<h3>" + finalTitle + ":</h3>";
    currentShoppingList = newList.id;
    for(let i = 0; i < shoppingLists.length; i++){
        document.getElementById(shoppingLists[i]).style.display = "none";
    }
    document.getElementById(currentShoppingList).style.display = "block";
}

function displayList(event){
    var clickedButton = event.target.id;
    if(clickedButton === "grocery"){
        // Make a function that clears the original list and One that adds every item in the array shoppingList
        //clear the parent element list id = grocery-list
        clearFullList();
        createFullList();
        currentShoppingList = "grocery-list";
    };

    var clickedButtonListId = "#" + clickedButton + "-list";
    var clickedButtonTitle = clickedButton.toUpperCase();
    var finalTitle = clickedButtonTitle.replace("-" , ' ');
    document.getElementById("shopping-list-type").innerHTML = "<h3>" + finalTitle + ":</h3>";
    for ( let i = 0; i<shoppingLists.length; i++){
        var choosingList = shoppingLists[i];
        var choiceList = "#" + choosingList;
        if(choiceList !== clickedButtonListId){
            document.querySelector(choiceList).style.display = "none";
        }else{
            document.querySelector(choiceList).style.display = "block";
            currentShoppingList = choosingList;
        };

    };

}

function changeToId(name){
    var newName = name.toLowerCase();
    var newestName = newName.replace(/\s+/g, "-");
    return newestName;
}

function clearFullList(){
    var mainList = document.getElementById("grocery-list");
    while(mainList.firstChild){
        mainList.removeChild(mainList.firstChild);
    };
    mainList.style.display = "block";
}

function createFullList(){
    var mainList = document.getElementById("grocery-list");
    //go through shopping list list and add to list, you already have a function for it!
    for(let i = 0; i<shoppingList.length; i++){
        var itemToAdd = shoppingList[i];
        
        var newListItem = document.createElement("li");
        var listContainer = document.createElement("div");
        
        listContainer.classList.add("list-item-container");
        
        var deleteButton = document.createElement("img");
        deleteButton.src = "images/trash.png";
        deleteButton.classList.add("delete-button");
        
        var checkButton = document.createElement("img");
        checkButton.src = "images/check.png";
        checkButton.classList.add("check-button");
        
        newListItem.innerText = itemToAdd;

        // THIS IS WHAT NEEDS TO BE ADDED or something like it, THEN when you go to see if the two id's match you can just remove
        // the last character or index or wtv (in this case the number 2) so that they can match!
        newListItem.id = itemToAdd + "2";
        newListItem.append(checkButton);
        newListItem.append(deleteButton);
        
        listContainer.append(newListItem);
        
        document.getElementById("grocery-list").appendChild(listContainer);
        
        document.getElementById("shopping-list-form").reset();
        
    };

}

