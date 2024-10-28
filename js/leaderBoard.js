
//Sorts the user objects from localstorage based on their highscores in descending order
function sortPlayers() {
    let playerArray = []
    let parseData = JSON.parse(localStorage.getItem("userdata"));
    //We do this by populating playerArray with .push using a simple for loop
    for (let i = 0; i < parseData.length; i++) {
        playerArray.push({
            name: parseData[i].userId,
            score: parseData[i].highscore

        })


    };
    //Then using a simple sort function on the array
    playerArray.sort((a, b) => b.score - a.score);
    //Return the sorted array
    return playerArray;

};

//Assign sorted array of objects to variable
let players = sortPlayers()


//Function that gets the current user's rank in relation to other user's highscores
function userPos() {
    //Since we already sorted players based on their highscores we can use .findIndex() + 1 to determine the current user's rank.
    document.getElementById("h2LeaderboardText").innerText = "Your current leaderboard position is: " + (players.findIndex(x => x.name === checkIfLoggedIn()) + 1);


}


//Leaderboard
const newTable = document.createElement("table");
newTable.innerHTML = "<thead><th id='rankTh'>Rank</th><th>Player</th><th>Highscore</th></thead>";
//Populate table with a simple for loop going through each object of the already sorted players variable
for (player of players) {
    const newRow = document.createElement("tr");
    const tdRank = document.createElement("td");
    const tdPlayer = document.createElement("td");
    const tdScore = document.createElement("td");
    tdRank.textContent = (players.indexOf(player)) + 1;
    tdPlayer.textContent = player.name;
    tdScore.textContent = player.score;
    newRow.appendChild(tdRank);
    newRow.appendChild(tdPlayer);
    newRow.appendChild(tdScore);
    newTable.appendChild(newRow);
}
//Push newTable to div
const target = document.getElementById('target');
target.appendChild(newTable);