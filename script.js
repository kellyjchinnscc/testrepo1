// const url = "https://www.mikecaines.com/3inarow/puzzle.php" // randomized
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

    for(let i = 0; i < 10; i++) // outer loop creating rows and appending each row to the table
    {
        let shipPiecesArray = ["0-0", "0-1", "0-2", "0-3", "0-4", "0-5", "0-6", "0-7", "0-8", "0-9", "3-1", "4-1", "5-1", "6-1", "7-1"]
        let gameRows = document.createElement('tr'); // creating rows
        gameTable.appendChild(gameRows); // appending to the table

        for(let j = 0; j < 10; j++) // inner loop creating each game cell
        {
            let gameCell = document.createElement('td'); // creating each cell
            gameCell.id = i + "-" + j; // creating unique ID's for each cell
            gameCell.className = "unusedCoordinate"
            gameCell.style.backgroundColor = "darkblue"; // setting the default colour for each cell
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
                    gameCell.innerHTML = "X";
                    gameCell.style.backgroundColor = "red";
                    hitMissMessage.innerHTML = "Hit!"
                    gameCell.className = "usedCoordinate";
                    missileCount = missileCount - 1;
                    hitCount = hitCount + 1;
                    // missileCountDiv.innerHTML = `You now have ${missileCount} missiles left!`
                }
                else if(!shipPiecesArray.includes(gameCell.id))
                {
                    gameCell.innerHTML = "O"
                    gameCell.style.backgroundColor = "white"
                    hitMissMessage.innerHTML = "Miss.."
                    gameCell.className = "usedCoordinate";
                    missileCount = missileCount - 1;
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
                if(hitCount == 15) // WIN CONDITION
                {
                    hitMissMessage.innerHTML = ''
                    missileCountDiv.innerHTML = `You sank all ships! Ayy!!`
                }
                else if(missileCount === 0 && hitCount !== 15) // LOSE CONDITION
                {
                    missileCountDiv.innerHTML = `You've used up all of your missles and you didn't sink everything. Sorry mate!`
                    hitMissMessage.innerHTML = '';
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
