// GAME OBJECTS
const game = {
    cards: [
        {
          name: "Bulbasaur",
          damage: 60
        }, {
          name: "Caterpie",
          damage: 40
        }, {
          name: "Charmander",
          damage: 60
        }, {
          name: "Clefairy",
          damage: 50
        }, {
          name: "Jigglypuff",
          damage: 60
        }, {
          name: "Mankey",
          damage: 30
        }, {
          name: "Meowth",
          damage: 60
        }, {
          name: "Nidoran - female",
          damage: 60
        }, {
          name: "Nidoran - male",
          damage: 50
        }, {
          name: "Oddish",
          damage: 40
        }, {
          name: "Pidgey",
          damage: 50
        }, {
          name: "Pikachu",
          damage: 50
        }, {
          name: "Poliwag",
          damage: 50
        }, {
          name: "Psyduck",
          damage: 60
        }, {
          name: "Rattata",
          damage: 30
        }, {
          name: "Squirtle",
          damage: 60
        }, {
          name: "Vulpix",
          damage: 50
        }, {
          name: "Weedle", 
          damage: 40
        }
      ],
    cardsPlayed: [],
    cardsLeft: [
      {
        name: "Bulbasaur",
        damage: 60
      }, {
        name: "Caterpie",
        damage: 40
      }, {
        name: "Charmander",
        damage: 60
      }, {
        name: "Clefairy",
        damage: 50
      }, {
        name: "Jigglypuff",
        damage: 60
      }, {
        name: "Mankey",
        damage: 30
      }, {
        name: "Meowth",
        damage: 60
      }, {
        name: "Nidoran - female",
        damage: 60
      }, {
        name: "Nidoran - male",
        damage: 50
      }, {
        name: "Oddish",
        damage: 40
      }, {
        name: "Pidgey",
        damage: 50
      }, {
        name: "Pikachu",
        damage: 50
      }, {
        name: "Poliwag",
        damage: 50
      }, {
        name: "Psyduck",
        damage: 60
      }, {
        name: "Rattata",
        damage: 30
      }, {
        name: "Squirtle",
        damage: 60
      }, {
        name: "Vulpix",
        damage: 50
      }, {
        name: "Weedle", 
        damage: 40
      }
    ],
    playerScore: 0,
    computerScore: 0,
    playerRoundWins: 0,
    computerRoundWins: 0,
    roundTotal: 3,
    currentRound: 0,
    status: "gameOn",
    dealThree() {
        // Our output array variable
        const cardArr = [];
        // Check if there are enough cards
        if (this.cardsLeft.length < 3) {
            this.status = "gameOver"
            console.log("Sorry, there are not enough cards left! The game has ended.");
            return;
        }
        // Return cards for both players using random index 0-17 and take them from the array
        for (let i=0;i<3;i++) {
            let randIndex = Math.floor(Math.random()*(this.cardsLeft.length));
            cardArr.push(this.cardsLeft[randIndex]);
            // Remove the pushed card from the cardsLeft array and push to cards played
            this.cardsPlayed.push(this.cardsLeft[randIndex]);
            this.cardsLeft.splice(randIndex,1);
        }
        // Now return all the cards chosen for the players
        return cardArr;
    }
}

const player1 = {
    score: 0,
    roundsWon: 0,
    cardHistory: [],
    cardsInHand: [],
    pickCard (index){
        // Put the chosen card into history. Remove the card from hand. Return the card from history.
        this.cardHistory.push(this.cardsInHand[index]);
        this.cardsInHand.splice(index,1,{});
    },
    dealCards (cardArr) {
        // PUSH CARDS INTO HAND AFTER DELETING ALL EMPTY OBJECTS
        this.cardsInHand = [];
        this.cardsInHand.push(cardArr[0]);
        this.cardsInHand.push(cardArr[1]);
        this.cardsInHand.push(cardArr[2]);
    },
    scoreUp(){
        this.score ++;
    }
}

const computer = {
    score: 0,
    roundsWon: 0,
    cardHistory: [],
    cardsInHand: [],
    cardsAvailable: [0,1,2],
    pickCard (index){
        // CHOSEN CARD -> HISTORY. (-) CARD FROM HAND. RETURN CARD FROM HISTORY.
        // HANDLE THE CASE WHERE RANDOM NUMBER IS A NULL INDEX
        this.cardsAvailable.splice(this.cardsAvailable.indexOf(index),1);
        this.cardHistory.push(this.cardsInHand[index]);
        this.cardsInHand.splice(index,1,{});
    },
    dealCards (cardArr) {
        // PUSH CARDS INTO HAND AFTER DELETING ALL EMPTY OBJECTS
        this.cardsInHand = [];
        this.cardsAvailable = [0,1,2];
        this.cardsInHand.push(cardArr[0]);
        this.cardsInHand.push(cardArr[1]);
        this.cardsInHand.push(cardArr[2]);
    },
    scoreUp(){
        this.score++;
    }
}

// START THE GAME. DEAL CARDS.
player1.dealCards(game.dealThree());
computer.dealCards(game.dealThree());
dealToDOM();

// ADD CLICK LISTENER TO PLAYER CARDS
$(itm45).on('click', function(event){
    playThisCard(0);
});
$(itm46).on('click', function(event){
    playThisCard(1);
});
$(itm47).on('click', function(event){
    playThisCard(2);
});

// MANIPULATE THE DOM WITH THE NEW CARDS DEALT
function dealToDOM(){
    for (let i=0;i<3;i++){
        let card = document.getElementsByClassName("compCard")[i];
        let desc = document.createElement("H3");
        let desc2 = document.createElement("H4");
        desc.className = "name";
        let desc3 = document.createElement("H3");
        let desc4 = document.createElement("H4");
        desc4.className = "damage";
        card.appendChild(desc).innerText=`Name:`;
        card.appendChild(desc2).innerText=`${computer.cardsInHand[i].name}`;
        card.appendChild(desc3).innerText=`Damage: ${computer.cardsInHand[i].damage}`;
        card.appendChild(desc4).innerText=`${computer.cardsInHand[i].damage}`;
        let card2 = document.getElementsByClassName("playCard")[i];
        let desc5 = document.createElement("H3");
        let desc6 = document.createElement("H4");
        desc6.className = "name";
        let desc7 = document.createElement("H3");
        let desc8 = document.createElement("H4");
        desc8.className = "damage";
        card2.appendChild(desc5).innerText=`Name:`;
        card2.appendChild(desc6).innerText=`${player1.cardsInHand[i].name}`;
        card2.appendChild(desc7).innerText=`Damage:`;
        card2.appendChild(desc8).innerText=`${player1.cardsInHand[i].damage}`;
    }
}

function winningCard(playDmg,compDmg) {

    // CHECK TO SEE WHO WINS AND GIVE THEM POINTS
    if (playDmg > compDmg){
        player1.scoreUp();
        console.log("You win.");
    } else if (compDmg > playDmg){
        computer.scoreUp();
        console.log("You lost.");
    } else {
        console.log("You tied!");
    }
    ;
}

function moveToGameBoard(indexOfHand,playerObject) {

    // CHECK IF PLAYER OR COMPUTER
    let card = "";
    let card2 = "";
    if (playerObject == player1) {
        card = document.getElementsByClassName("playPlay")[0];
        card2 = document.getElementsByClassName("playCard")[indexOfHand];
    } else if (playerObject == computer) {
        card = document.getElementsByClassName("compPlay")[0];
        card2 = document.getElementsByClassName("compCard")[indexOfHand];
    } else {
        return;
    };
    let desc = document.createElement("H1");
    let desc2 = document.createElement("H3");
    desc2.className = "name";
    let desc3 = document.createElement("H1");
    let desc4 = document.createElement("H3");
    desc4.className = "damage";
    card.appendChild(desc).innerText=`Name: `;
    card.appendChild(desc2).innerText=`${playerObject.cardsInHand[indexOfHand].name}`;
    card.appendChild(desc3).innerText=`Damage: `;
    card.appendChild(desc4).innerText=`${playerObject.cardsInHand[indexOfHand].damage}`;

    // DELETE PLAYER/COMPUTER CARD
    card2.innerText="";
}

// WHEN USER CLICKS, PLAY CARD
function playThisCard(index){

    // PICK RANDOM CARD FOR COMPUTER
    let random = computer.cardsAvailable[Math.floor(Math.random()*computer.cardsAvailable.length)];

    // PULL CARD VALUES
    let playDmg = player1.cardsInHand[index].damage;
    let compDmg = computer.cardsInHand[random].damage;

    // CHECK IF THE CARD HAS ALREADY BEEN CHOSEN
    if (document.getElementsByClassName("playCard")[index].innerText==""){
        return;
    };

    // CHECK WINNER (THIS UPDATES SCORE)
    winningCard(playDmg,compDmg);

    // MANIPULATE DOM BY MOVING PLAYER/COMPUTER CARD TO GAME BOARD
    moveToGameBoard(index,player1);
    moveToGameBoard(random,computer);
    
    // NOW REMOVE FROM GAME BOARD
    let card = document.getElementsByClassName("compPlay")[0];
    let card2 = document.getElementsByClassName("playPlay")[0];
    card.innerText="";
    card2.innerText="";

    // UPDATE THE PLAYER CARD ARRAYS
    player1.pickCard(index);
    computer.pickCard(random);

    // RESET GAME BOARD AFTER THREE PLAYS
    if (computer.cardsAvailable.length == 0 && !(game.cardsLeft.length < 6)) {

        // DEAL CARDS
        player1.dealCards(game.dealThree());
        computer.dealCards(game.dealThree());
        dealToDOM();

        // REFRESH SCORES
        game.currentRound ++;
        if (computer.score > player1.score){
            computer.roundsWon ++;
        } else if (player1.score > computer.score) {
            player1.roundsWon ++;
        } else {
            // NOTHING
        }
        computer.score = 0;
        player1.score = 0;

    } else if (game.cardsLeft.length < 6 && (computer.cardsAvailable.length == 0)) {

        // REFRESH SCORES (Repetitive, I know... :/)
        game.currentRound ++;
        if (computer.score > player1.score){
            computer.roundsWon ++;
        } else if (player1.score > computer.score) {
            player1.roundsWon ++;
        } else {
            // NOTHING
        }
        computer.score = 0;
        player1.score = 0;

        // NO CARDS? GAME OVER! DECIDE WHO WON!
        game.currentRound = 0;
        game.status = "gameOver";
        console.log("The Game Is Over!");
        $(".itm31").text("NEW GAME");

        if (player1.roundsWon > computer.roundsWon) {
          console.log("You won more rounds! Congrats!");
        } else if (computer.roundsWon > player1.roundsWon){
          console.log("Haha, the computer won!");
        } else {
          console.log("I guess you tied? That was anti-climactic...");
        }
    };

    // UPDATE THE PREVIOUSLY PLAYED CARDS BASED ON CARD HISTORY
    updateSidebar();

    // UPDATE SCORE
    updateScore();

    // CONSOLE LOG VALUES
    console.log(`Player hand is now: ${player1.cardsInHand[0].name}, ${player1.cardsInHand[1].name}, ${player1.cardsInHand[2].name}`);
    console.log(`Computer hand is now: ${computer.cardsInHand[0].name}, ${computer.cardsInHand[1].name}, ${computer.cardsInHand[2].name}`);
    console.log(`${game.status}`);
}

// UPDATE PREVIOUSLY PLAYED CARDS BASED ON HISTORY
function updateSidebar(){
    for (let i=0;i<player1.cardHistory.length;i++){
        if (i>=4){
            return;
        } else {

            // UPDATE COMPUTER SIDE
            let compHistCards = computer.cardHistory.length;            
            let compPrevCard = computer.cardHistory[compHistCards-1-i];    
            let compPrevCardHtml = document.getElementsByClassName("compUsed")[3-i];
            let h3 = document.createElement("H4");
            let h32 = document.createElement("H4");
            compPrevCardHtml.innerHTML="";
            compPrevCardHtml.appendChild(h3).innerText = compPrevCard.name;
            compPrevCardHtml.appendChild(h32).innerText = compPrevCard.damage;

            // UPDATE PLAYER SIDE
            let playHistCards = player1.cardHistory.length;               
            let playPrevCard = player1.cardHistory[playHistCards-1-i];     
            let playPrevCardHtml = document.getElementsByClassName("playUsed")[i];
            let h33 = document.createElement("H4");
            let h34 = document.createElement("H4");
            playPrevCardHtml.innerHTML="";
            playPrevCardHtml.appendChild(h33).innerText = playPrevCard.name;
            playPrevCardHtml.appendChild(h34).innerText = playPrevCard.damage;
            
        }
    };
}

// UPDATE THE SCORE AFTER EACH PLAY TO THE DOM
function updateScore() {
    document.getElementById("compScore").innerText = `Computer: ${computer.score}`;
    document.getElementById("playScore").innerText = `Player1: ${player1.score}`;
    document.getElementById("compRounds").innerText = `Computer: ${computer.roundsWon}`;
    document.getElementById("playRounds").innerText = `Player1: ${player1.roundsWon}`;

    game.playerScore = player1.score;
    game.computerScore = computer.score;
    game.playerRoundWins = player1.roundsWon;
    game.computerRoundWins = computer.roundsWon;
}

// NEW GAME THAT IS CALLED WHEN BUTTON IS CLICKED
$(".itm31").on('click', function(event){
  // RESET GAME ARRAY AND PLAYER ARRAYS
  game.cardsLeft = game.cards;
  player1.cardHistory = [];
  player1.cardsInHand = [];
  computer.cardsInHand = [];
  computer.cardHistory = [];
  computer.roundsWon = 0;
  player1.roundsWon = 0;
  computer.cardsAvailable = [0,1,2];
  player1.dealCards(game.dealThree());
  computer.dealCards(game.dealThree());
  dealToDOM();
  $(".playUsed").empty();
  $(".compUsed").empty();
});