function sortPlayers() {
    var playerArray = []
    var parseData = JSON.parse(localStorage.getItem("userdata"));
    for (let i = 0; i < parseData.length; i++) {
        playerArray.push({
            name: parseData[i].userId,
            score: parseData[i].highscore

        })


    };
    playerArray.sort((a, b) => b.score - a.score);
    return playerArray;

};
let players = sortPlayers()

function userPos() {
    document.getElementById("h2LeaderboardText").innerText = "Your current rank is: " + (players.findIndex(x => x.name === checkIfLoggedIn()) + 1);
    

}

const newTable = document.createElement("table");
newTable.innerHTML = "<thead><th>Rank</th><th>Player</th><th>Highscore</th></thead>";
for(player of players){
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

const target = document.getElementById('target');
target.appendChild(newTable);