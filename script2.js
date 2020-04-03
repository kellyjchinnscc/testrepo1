"use strict";

const localFile = "./sample.json"
fetch(localFile)
.then(function(response){return response.json()})
.then(function(json)
{
    console.log(json);
    let gameBoard = document.getElementById('theGameBoard') // grabbing the game board from the HTML
    
    // CREATING THE INTERFACE
    let gameTable = document.createElement('table'); 
    gameTable.setAttribute('align', 'center');
    gameBoard.appendChild(gameTable);


    let messageDiv = document.createElement('div')
    messageDiv.id = "messageDiv";
    document.body.appendChild(messageDiv);
    let hitMissMessage = document.createElement('h3')
    messageDiv.appendChild(hitMissMessage);


    let missileCount = 30;
    let missileCountDiv = document.createElement('h3');
    missileCountDiv.innerHTML = `You have ${missileCount} missiles remaining!`
    messageDiv.appendChild(missileCountDiv);

    let hitCount = 0;
    let shipPiecesArray = []

    let layOutOne = ["1-2", "1-3", "1-4", "3-0", "3-1", "3-2", "3-3", "5-0", "6-0", "7-0", "8-0", "9-0", "8-1", "9-1", "4-3", "4-4", "4-5"]
    let layOutTwo = ["0-0", "0-1", "0-2", "0-3", "0-4", "6-5", "7-5", "8-5", "1-1", "1-2", "3-1", "4-1", "5-1", "6-1", "7-1", "6-2", "7-2"]
    let layOutThree = ["3-3", "4-4", "5-5", "6-6", "7-7", "9-9", "8-9", "7-9", "1-1", "2-1", "3-1", "1-3", "1-4", "1-5", "1-6", "8-0", "9-0"]

    let randomNum = Math.floor(Math.random() * 3);
    if(randomNum === 1)
    {
        shipPiecesArray = layOutOne;
    }
    else if(randomNum === 2)
    {
        shipPiecesArray = layOutTwo
    }
    else
    {
        shipPiecesArray = layOutThree
    }

    for(let i = 0; i < 10; i++) // outer loop creating rows and appending each row to the table
    {
        let gameRows = document.createElement('tr'); // creating rows
        gameTable.appendChild(gameRows); // appending to the table

        for(let j = 0; j < 10; j++) // inner loop creating each game cell
        {
            let gameCell = document.createElement('td'); // creating each cell
            gameCell.id = i + "-" + j; // creating unique ID's for each cell
            gameCell.className = "unusedCoordinate"
            gameCell.style.backgroundColor = "skyblue"; // setting the default colour for each cell
            gameRows.appendChild(gameCell); // appending each cell to their respective row
            

            // ADDING CLICK FUNCTIONALITY TO EACH CELL!
            gameCell.addEventListener("click", function(e)
            {
                // Logic for Hits and Misses!
                if(gameCell.className === "usedCoordinate") // Validate if someone clicks a cell that's already used
                {
                    hitMissMessage.innerHTML = "You've chosen that coordinate already, choose another!"
                }
                else if(shipPiecesArray.includes(gameCell.id))
                {
                    // gameCell.innerHTML = "X";
                    gameCell.style.backgroundColor = "red";
                    hitMissMessage.innerHTML = "Hit!"
                    gameCell.className = "usedCoordinate";
                    missileCount = missileCount - 1;
                    hitCount = hitCount + 1;
                    let explosionIcon = document.createElement('img')
                    explosionIcon.setAttribute("src", "1476274.png")
                    explosionIcon.style.height = "30px";
                    explosionIcon.style.width = "30px";
                    gameCell.appendChild(explosionIcon)
                    // missileCountDiv.innerHTML = `You now have ${missileCount} missiles left!`
                }
                else if(!shipPiecesArray.includes(gameCell.id))
                {
                    // gameCell.innerHTML = "O"
                    gameCell.style.backgroundColor = "white"
                    hitMissMessage.innerHTML = "Miss.."
                    gameCell.className = "usedCoordinate";
                    missileCount = missileCount - 1;
                    let missIcon = document.createElement('img')
                    missIcon.setAttribute("src", "x.png")
                    missIcon.style.height = "30px";
                    missIcon.style.width = "30px";
                    gameCell.appendChild(missIcon)
                    // missileCountDiv.innerHTML = `You now have ${missileCount} missiles left!`
                }

                if(missileCount >= 0)
                {
                    missileCountDiv.innerHTML = `You now have ${missileCount} missiles left!`
                }
                else if(missileCount <= 0)
                {
                    missileCountDiv.innerHTML = `No More Missiles Left :(`
                    hitMissMessage.innerHTML = " "
                }
                // WIN/LOSE CONDITION
                if(hitCount == 17) // WIN CONDITION
                {
                    hitMissMessage.innerHTML = ''
                    missileCountDiv.innerHTML = `You sank all ships! Ayy!!`
                    gameTable.innerHTML = "";
                }
                else if(missileCount === 0 && hitCount !== 17) // LOSE CONDITION
                {
                    missileCountDiv.innerHTML = `You've used up all of your missles and you didn't sink everything. Sorry mate!`
                    hitMissMessage.innerHTML = '';
                    gameTable.innerHTML = "";
                }
            })
        }
    }

    let refreshButton = document.createElement('button')
    refreshButton.innerHTML = "Click Me To Reset The Game Board!"
    messageDiv.appendChild(refreshButton);
    refreshButton.addEventListener("click", function(e)
    {
        location.reload();
    })
});
