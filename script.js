const roomDescriptionElement = document.getElementById("roomtext");
const optionsButtonsElement = document.getElementById("action-buttons");

let state = {};

function startGame() {
  state = {};
  showRoomText(1);
}

// Function to show the current room and current room options
function showRoomText(roomTextIndex) {
  const roomNode = roomText.find((roomText) => roomText.id === roomTextIndex); // map through array and get the object by ID
  roomDescriptionElement.innerText = roomNode.text; // set the room description to the current room

  //reset the button state when entering a new room
  while (optionsButtonsElement.firstChild) {
    optionsButtonsElement.removeChild(optionsButtonsElement.firstChild);
  }

  //set the action buttons
  roomNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionsButtonsElement.appendChild(button);
    }
  });
}

//return the option for the onclick event --- look this up
function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

//perform the action when the action button is pressed
function selectOption(option) {
  const nextNodeId = option.nextText;
  if (nextNodeId <= 0) {
    // if the action buttons' value is less than 1 restart the game from the beginning
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showRoomText(nextNodeId);
}

// an array with all the options for each room
const roomText = [
  {
    id: 1,
    text: "You have arrived at the entrance to the kings tomb. There are many pillars of marble down the center of this long ornate hallway. There is a hallway to the west and a hallway to the east. There is also a door to the north.",
    options: [
      {
        text: "go north",
        nextText: 2,
      },
      {
        text: "go east",
        nextText: 4,
      },
      {
        text: "go west",
        nextText: 3,
      },
    ],
  },
  {
    id: 2,
    text: "You are in a large room , there is a room to the south",
    options: [
      {
        text: "go south",
        nextText: 1,
      },
    ],
  },
  {
    id: 3,
    text: "You go down the hall to the west and there is a door that leads into a small room. In the room there is a small table with a key on it.",
    options: [
      {
        text: "go east",
        nextText: 1,
      },
    ],
  },
  {
    id: 4,
    text: "You go down the hall to the east and there is a door that leads into a large room. In the room you find the body of of the king holding a sword. It looks like there is a slot to put in a key!",
    options: [
      {
        text: "go west",
        nextText: 1,
      },
    ],
  },
];
