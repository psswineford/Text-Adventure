let currentRoom = 1;
var actionBtn = 1;

function showRoom(currentRoom) {
    console.log("showrooms current is" + currentRoom)
    if(currentRoom == 1){
        buttonText = "go north";
        roomText = " You are in a small room, there is an exit to the north";
        
    }else if(currentRoom == 2) {
        buttonText = "go south";
        roomText = " You are in a small room, there is an exit to the south";
       
    };

    document.getElementById("roomtext").innerHTML = roomText;
    document.getElementById("action1").innerHTML = buttonText;
};

function startGame(currentRoom) {
    showRoom(currentRoom)
};


function actionButton(actionBtn) {

    console.log("current actionbutton is" + actionBtn);
    if(actionBtn == 1){
        actionBtn=2;
        showRoom(2);
        console.log("action button is now set to " + actionBtn)
        
    }else if(actionBtn == 2) {
        actionBtn=1;
        showRoom(1);
        console.log("action button is now set to " + actionBtn)
    }
}



// an array with all the options for each room
// const roomText = [
//   {
//     id: 1,
//     text: "You are in a small room , there is a room to the north",
//     options: [
//       {
//         text: "go north",
//         nextText: 2,
//       },
//     ],
//   },
//   {
//     id: 1,
//     text: "You are in a large room , there is a room to the south",
//     options: [
//       {
//         text: "go south",
//         nextText: 2,
//       },
//     ],
//   },
// ];
