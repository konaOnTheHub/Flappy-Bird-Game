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



const newTable = document.createElement("table");
newTable.innerHTML = "<thead><th>Player</th><th>Score</th></thead>";
for(player of players){
    const newRow = document.createElement("tr");
    const tdPlayer = document.createElement("td");
    const tdScore = document.createElement("td");
    tdPlayer.textContent = player.name;
    tdScore.textContent = player.score;    
    newRow.appendChild(tdPlayer);
    newRow.appendChild(tdScore);
    newTable.appendChild(newRow);
}

const target = document.getElementById('target');
target.appendChild(newTable);