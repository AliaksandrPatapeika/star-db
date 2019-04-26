const teamsArray = ['1', '2', '3', '4', '5', '6'];
const totalDays = teamsArray.length - 1;
const gamesPerDay = teamsArray.length / 2;
// console.log(totalDays);
// console.log(gamesPerDay);
let totalGames = [];

for (let i = 0; i < teamsArray.length; i++) {
  for (let j = i + 1; j < teamsArray.length; j++) {
    totalGames.push([teamsArray[i], teamsArray[j]]);
  }
}

// console.log(totalMatches);

// const pair = [];
// const res = [];

function randItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let days = [];
let res = [];

function createDay(game) {
  // console.log(days);
  const [a, b] = game;
  // console.log(a, b);

  let superTest = [];
  days.forEach((day) => {
    console.log(day);
    let test = day.find((team) => {
      console.log(team);
      return team === a || team === b;
    });
    console.log(test);

    superTest.push(test);

  });

  console.log(superTest);

  if (!superTest.find((el) => {
    console.log(el);
    return el !== undefined;
  })) {

    days.push(game);

    const idx = totalGames.indexOf(game);
    totalGames.splice(idx, 1);

      if (days.length === gamesPerDay) {
        res.push(days);
        days = [];
      }
  }

}

function pairTransform(arr) {
  console.log(arr);
  return arr.join(' - ');
}

while (totalGames.length) {
  const game = randItem(totalGames);
  // const idx = totalGames.indexOf(game);
  createDay(game);
  // totalGames.splice(idx, 1);
}

 res = res.map((days) => {
  return days.map((game) => {
    console.log(game);
   return pairTransform(game);
  });
});

console.log(res);