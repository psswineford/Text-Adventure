const roomDescriptionElement = document.getElementById("roomtext");
const optionsButtonsElement = document.getElementById("action-buttons");
const characterTypeElement = document.getElementById("characterType");
const characterHPElement = document.getElementById("characterHP");
const characterACElement = document.getElementById("characterAC");
const characterAttackElement = document.getElementById("characterAttack");
const characterItemElement = document.getElementById("characterItems");


let state = {};

function startGame() {
  state = {};
  showRoomText(1);
  showCharacterDetails(1);
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
      button.classList.add("button-74");
      button.addEventListener("click", () => selectOption(option));
      optionsButtonsElement.appendChild(button);
    }
  });
}

//Checking to see if the character has the required item to show options.  If false return null.
function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

//perform the action when the action button is pressed
function selectOption(option) {
//let characterJewel = false;
//let characterSword = false;
  const updateItem = option.itemText;
  const nextNodeId = option.nextText;
  if (nextNodeId <= 0) {
    // if the action buttons' value is less than 1 restart the game from the beginning
    return startGame();
  }
  state = Object.assign(state, option.setState);
  updateCharacterItems(updateItem);
  showRoomText(nextNodeId);
}

//show character details in the details window
function showCharacterDetails(characterSelect) {
  const characterSelected = character.find((character) => character.type === characterSelect); // map through character array and get the object by type
  characterTypeElement.innerText = characterSelected.characterType;
  characterHPElement.innerText = characterSelected.characterHP; 
  characterACElement.innerText = characterSelected.characterAC;
  characterAttackElement.innerText = characterSelected.characterAttack;
  characterItemElement.innerText = characterSelected.characterItem;
}

//update character items shows in the character window
function updateCharacterItems(item) {
  if(item === "Ring") {
    characterItemElement.innerText = "Ring";
  }
  if(item === "Jewel") {
    characterItemElement.innerText = "Jewel";
  }
  if(item === "Sword") {
    characterItemElement.innerText = "Sword";
  }
}

// an array with all the options for each room
const roomText = [
  {
    id: 1,
    text: "After climbing down a set of stairs you enter a long hall that is about 40 feet in length. Seven marble pillars run down the middle of this hall stretching up to the vast ceiling.  The middle column has cracked in half and has fallen to the side making it a struggle to get to the end of the hall. The silence in this once ornate hall is eerie. You make your way to the end of the hall and find a door to the north and hallways that go off to the east and the west.",
    options: [
      {
        text: "go north",
        nextText: 3,
      },
      {
        text: "go east",
        nextText: 4,
      },
      {
        text: "go west",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "You make your way west down the hallway and through a door at the end.  You find yourself in what appears to be an old study.  Cobwebs and dust cover the room and an overwhelming smell of mildew assaults your senses.  Book cases line the room and in the corner sits a table with various materials on it.",
    options: [
      {
        text: "go east",
        nextText: 1,
      },
      {
        text: "Search the table",
        nextText: 5,
      },
      {
        text: "Search the Bookshelves",
        nextText: 6,
      },
    ],
  },
  {
    id: 3,
    text: "You go north into a room.  You find a living room with several ornate tables and couches.  An empty fireplace sits at the end of the room.  This looks like a cozy room to sit and get comfortable in, or it would if everything wasn’t covered in ages of dust.  ",
    options: [
      {
        text: "go south",
        nextText: 1,
      },
      {
        text: "Sit on the couch",
        nextText: 7,
      },
      {
        text: "Inspect the fireplace",
        nextText: 8,
      },
    ],
  },
  {
    id: 4,
    text: "You go east down the corridor entering the door at the far end.  You enter a room where you see several stone statues and a throne at the end.  On the throne is the skeleton of the old king.  In his hand is a great sword.  It is the treasure you seek!",
    options: [
      {
        text: "go west",
        nextText: 1,
      },
      {
        text: "Inspect the crown",
        nextText: 10,
      },
    ],
  },
  {
    id: 5,
    text: "Searching the table you find a small ring in it.  Looking at the ring you see the symbol of the king on it. You pick it up and put it in your pocket.",
    options: [
      {
        text: "Return",
        nextText: 2,
      },
      {
        text: "Take the ring",
        setState: {ring: true},
        itemText: "Ring",
        nextText: 2,
      },
    ],

  },
  {
    id: 6,
    text: "You pull on several books but find nothing of interest, until you finally find one that seems stuck.  Pulling on it you hear a faint clicking sound and one of the bookshelves slides open.  A skeleton comes out from an alcove behind the book case and attacks!",
    options: [
      {
        text: "Return",
        nextText: 2,
      },
    ],
  },
  {
    id: 7,
    text: "You sit down on the couch and instantly regret it as you are now covered in dust.  You begin to sneeze and cough as the dust puffs up into the air around you.",
    options: [
      {
        text: "Return",
        nextText: 1,
      },
      {
        text: "Inspect the fireplace",
        nextText: 8,
      },
    ],
  },
  {
    id: 8,
    text: "Looking at the mantle you see a circular shaped hole with a symbol of the king in it.",
    options: [
      {
        text: "Return",
        nextText: 3,
      },
      {
        text: "Insert the ring",
        requiredState: (currentState) => currentState.ring,
        nextText: 9,
      },
    ],
  },
  {
    id: 9,
    text: "You insert the ring and hear a satisfying snap as it fits into place.  A small jewel falls into the fireplace and you pick it up.",
    options: [
      {
        text: "go south",
        setState: {ring: false, jewel: true},
        itemText: "Jewel",
        nextText: 1,
      },
    ],
  },
  {
    id: 10,
    text: "This is an ornate gold crown with 3 jewels encased in the front. You notice that one of the jewels is missing.",
    options: [
      {
        text: "Return",
        nextText: 4,
      },
      {
        text: "Insert the Jewel",
        requiredState: (currentState) => currentState.jewel,
        nextText: 11,
      },
    ],
  },
  {
    id: 11,
    text: "You insert the jewel into the crown. You see the skeleton loosen his grip on the sword.",
    options: [
      {
        text: "Return",
        nextText: 4,
      },
      {
        text: "Take the sword",
        setState: {jewel: false, sword: true},
        itemText: "Sword",
        nextText: 12,
      },
    ],
  },
  {
    id: 12,
    text: "You take the sword, it feels light in your hands!  As you hold it you hear a voice echo throughout the chamber:  You must earn that sword from me!  You look in horror as the skeleton of the king rises out of his chair and lunges forward to attack!",
    options: [
      {
        text: "Fight the king",
        nextText: 13,
      },
    ],
  },
  {
    id: 13,
    text: "You defeat the king and run from the ruins and back into the world.  Sword in hand you look for your next adventure!",
    options: [
      {
        text: "Restart the game",
        nextText: -1,
      },
    ],
  },
];


//base character stats
let character = [
  {
    type: 1,
    characterType: "Knight",
    characterHP: 20,
    characterAC: 15,
    characterAttack: 5,
    characterItem: "none",
  }
];

//base monster stats
let monster = [
  {
    monsterHP: 10,
    monsterAC: 10,
    monsterAttack: 2,
  }
]

