//Sets the current number notation (from ad-notations.js)
currentNotation = new ADNotations.MixedScientificNotation()

//Sets variables and things that don't need to be saved
sinThing = 1
document.getElementById("button1").style.display = "block"

//Resets the game (makes the 'game' object blank and hides buttons & stuff)
function reset() {
	game = {
    oneTimeButtonsBought: [false, false, false, false, false, false, false, false],
    multiplier: new Decimal(1),

    dots: new Decimal(0),
    dotsPerClick: new Decimal(1),
    dotsPerSecond: new Decimal(0),
    dot2Cost: new Decimal(30),
    dot2Bought: new Decimal(0),
    dot4Cost: new Decimal(90),
    dot4Bought: new Decimal(0),

    dashes: new Decimal(0),
    dashesPerClick: new Decimal(1),
    dash2Cost: new Decimal(30),
    dash2Bought: new Decimal(0),
    dash3Cost: new Decimal(200),
    dash3Bought: new Decimal(0),

    backslashes: new Decimal(0),
    multiplierPower: new Decimal(1),
  }

  currentInfo = 0

  document.getElementById("infoTitle").innerHTML = ":)"
  document.getElementById("infoText").innerHTML = "Welcome to Unnamed Button Game!"

  document.getElementById("button2").style.display = "none"
  document.getElementById("button3").style.display = "none"
  document.getElementById("button4").style.display = "none"
  document.getElementById("button5").style.display = "none"
  document.getElementById("button6").style.display = "none"
  document.getElementById("button7").style.display = "none"
  document.getElementById("button8").style.display = "none"
  document.getElementById("button9").style.display = "none"
  document.getElementById("button10").style.display = "none"
  document.getElementById("button11").style.display = "none"
  document.getElementById("paintSplotch").style.display = "none"
  document.getElementById("button12").style.display = "none"
  document.getElementById("button13").style.display = "none"
  document.getElementById("button14").style.display = "none"
  document.getElementById("button15").style.display = "none"
  document.getElementById("button3").style.filter = ""
  document.getElementById("button5").style.filter = ""
  document.getElementById("button6").style.filter = ""
  document.getElementById("button7").style.filter = ""
  document.getElementById("button10").style.filter = ""
  document.getElementById("button11").style.filter = ""
  document.getElementById("stat3").style.display = "none"
  document.getElementById("stat4").style.display = "none"
  document.getElementById("stat5").style.display = "none"
  document.getElementById("stat6").style.display = "none"
}

//Checks if you want to reset
function resetConfirm() {
  if (confirm("Are you sure you want to hard reset? You will lose everything!")) {
    reset()
    save()
  }
}

//Opens and closes the option box
function optionBox() {
  if (document.getElementById("options").style.display != "block") {
    document.getElementById("options").style.display = "block"
    document.getElementById("optionsButton").style.borderRadius = "1.5vh 1.5vh 0 0"
    document.getElementById("optionsText").innerHTML = "▲"
  }
  else {
    document.getElementById("options").style.display = "none"
    document.getElementById("optionsText").innerHTML = "▼"
    document.getElementById("optionsButton").style.borderRadius = "1.5vh"
  }
}

function save() {
	localStorage.setItem("massivePP", JSON.stringify(game))
}

setInterval(save, 15000)

function exportGame() {
  save()
  let file = new Blob([btoa(JSON.stringify(game))], {type: "text/plain"})
  window.URL = window.URL || window.webkitURL
  let a = document.createElement("a")
  a.href = window.URL.createObjectURL(file)
  a.download = "UBG.txt"
  a.click()
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
  }
  else {
    alert("Invalid input.")
  }
}

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem("massivePP"))
	if (loadgame != null) {
		loadGame(loadgame)
	}
}

load()

function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
	if (typeof loadgame.oneTimeButtonsBought != "undefined") game.oneTimeButtonsBought = loadgame.oneTimeButtonsBought
  if (typeof loadgame.multiplier != "undefined") game.multiplier = new Decimal(loadgame.multiplier)
	if (typeof loadgame.dots != "undefined") game.dots = new Decimal(loadgame.dots)
  if (typeof loadgame.dotsPerClick != "undefined") game.dotsPerClick = new Decimal(loadgame.dotsPerClick)
  if (typeof loadgame.dotsPerSecond != "undefined") game.dotsPerSecond = new Decimal(loadgame.dotsPerSecond)
  if (typeof loadgame.dot2Cost != "undefined") game.dot2Cost = new Decimal(loadgame.dot2Cost)
  if (typeof loadgame.dot2Bought != "undefined") game.dot2Bought = new Decimal(loadgame.dot2Bought)
  if (typeof loadgame.dot4Cost != "undefined") game.dot4Cost = new Decimal(loadgame.dot4Cost)
  if (typeof loadgame.dot4Bought != "undefined") game.dot4Bought = new Decimal(loadgame.dot4Bought)

  if (typeof loadgame.dashes != "undefined") game.dashes = new Decimal(loadgame.dashes)
  if (typeof loadgame.dash2Cost != "undefined") game.dash2Cost = new Decimal(loadgame.dash2Cost)
  if (typeof loadgame.dash2Bought != "undefined") game.dash2Bought = new Decimal(loadgame.dash2Bought)
  if (typeof loadgame.dash3Cost != "undefined") game.dash3Cost = new Decimal(loadgame.dash3Cost)
  if (typeof loadgame.dash3Bought != "undefined") game.dash3Bought = new Decimal(loadgame.dash3Bought)

  if (typeof loadgame.backslashes != "undefined") game.backslashes = new Decimal(loadgame.backslashes)
  if (typeof loadgame.multiplierPower != "undefined") game.multiplierPower = new Decimal(loadgame.multiplierPower)

  //Shows and edits buttons based on progress when loading
  if (game.dots >= 15) {
    document.getElementById("button2").style.display = "block"
    document.getElementById("button3").style.display = "block"
  }
  if (game.oneTimeButtonsBought[0]) {
    document.getElementById("stat3").style.display = "block"
    document.getElementById("button4").style.display = "block"
    document.getElementById("button5").style.display = "block"
    document.getElementById("button3").style.filter = "invert(25%)"
  }
  if (game.oneTimeButtonsBought[1]) {
    document.getElementById("button5").style.filter = "invert(25%)"
    document.getElementById("button6").style.display = "block"
  }
  if (game.oneTimeButtonsBought[2]) {
    document.getElementById("button6").style.filter = "invert(25%)"
    document.getElementById("button7").style.display = "block"
  }
  if (game.oneTimeButtonsBought[3]) {
    document.getElementById("stat4").style.display = "block"
    document.getElementById("stat5").style.display = "block"
    document.getElementById("button7").style.filter = "invert(25%)"
    document.getElementById("button8").style.display = "block"
    document.getElementById("button9").style.display = "block"
  }
  if (game.dash2Bought > 0) {
    document.getElementById("button10").style.display = "block"
  }
  if (game.dash3Bought == 3) {
    document.getElementById("button10").style.filter = "invert(25%)"
    document.getElementById("button11").style.display = "block"
  }
  if (game.oneTimeButtonsBought[4]) {
    document.getElementById("button11").style.filter = "invert(25%)"
    document.getElementById("paintSplotch").style.display = "block"
    document.getElementById("button12").style.display = "block"
    document.getElementById("button13").style.display = "block"
  }
  if (game.backslashes > 0) {
    document.getElementById("stat6").style.display = "block"
  }
  if (game.oneTimeButtonsBought[5] == true) {
    document.getElementById("button13").style.filter = "invert(25%)"
    document.getElementById("button14").style.display = "block"
  }
  if (game.oneTimeButtonsBought[6] == true) {
    document.getElementById("button14").style.filter = "invert(25%)"
    document.getElementById("button15").style.display = "block"
  }
  if (game.oneTimeButtonsBought[7] == true) {
    document.getElementById("button15").style.filter = "invert(25%)"
  }
}

//Update (Performs 100 times a second)
function update() {
  sinThing += 0.002
  //Sets the position of the buttons
  document.getElementById("button1").style.left = (Math.sin(sinThing) * 15 + 50) + "vh"
  document.getElementById("button1").style.top  = (Math.sin(sinThing + Math.PI / 2) * 15 + 50) + "vh"
  document.getElementById("button2").style.left = (Math.sin(sinThing + Math.PI) * 15 + 50) + "vh"
  document.getElementById("button2").style.top  = (Math.sin(sinThing + Math.PI * 3 / 2) * 15 + 50) + "vh"
  document.getElementById("button3").style.left = (Math.sin(sinThing + Math.PI / 2 + 0.25) * 19 + 50) + "vh"
  document.getElementById("button3").style.top  = (Math.sin(sinThing+ Math.PI + 0.25) * 19 + 50) + "vh"
  document.getElementById("button4").style.left = (Math.sin(sinThing + Math.PI / 2) * 15 + 50) + "vh"
  document.getElementById("button4").style.top  = (Math.sin(sinThing + Math.PI) * 15 + 50) + "vh"
  document.getElementById("button5").style.left = (Math.sin(sinThing - 0.4) * 14 + 50) + "vh"
  document.getElementById("button5").style.top  = (Math.sin(sinThing + Math.PI / 2 - 0.4) * 14 + 50) + "vh"
  document.getElementById("button6").style.left = (Math.sin(sinThing - 0.75) * 14 + 50) + "vh"
  document.getElementById("button6").style.top  = (Math.sin(sinThing + Math.PI / 2 - 0.75) * 14 + 50) + "vh"
  document.getElementById("button7").style.left = (Math.sin(sinThing - 1.1) * 14 + 50) + "vh"
  document.getElementById("button7").style.top  = (Math.sin(sinThing + Math.PI / 2 - 1.1) * 14 + 50) + "vh"
  document.getElementById("button11").style.left = (Math.sin(sinThing - 1.8) * 14 + 50) + "vh"
  document.getElementById("button11").style.top  = (Math.sin(sinThing + Math.PI / 2 - 1.8) * 14 + 50) + "vh"

  document.getElementById("button8").style.left = (Math.sin(sinThing + Math.PI / 2 + 1) * 25 + 50) + "vh"
  document.getElementById("button8").style.top  = (Math.sin(sinThing + Math.PI + 1) * 25 + 50) + "vh"
  document.getElementById("button9").style.left = (Math.sin(sinThing + Math.PI / 2 + 1.25) * 25 + 50) + "vh"
  document.getElementById("button9").style.top  = (Math.sin(sinThing + Math.PI + 1.25) * 25 + 50) + "vh"
  document.getElementById("button10").style.left = (Math.sin(sinThing - 1.45) * 14 + 50) + "vh"
  document.getElementById("button10").style.top  = (Math.sin(sinThing + Math.PI / 2 - 1.45) * 14 + 50) + "vh"

  document.getElementById("button12").style.left = (Math.sin(sinThing) * 23 + 50) + "vh"
  document.getElementById("button12").style.top  = (Math.sin(sinThing + Math.PI / 2) * 23 + 50) + "vh"
  document.getElementById("paintSplotch").style.left = (Math.sin(sinThing) * 23 + 50) + "vh"
  document.getElementById("paintSplotch").style.top  = (Math.sin(sinThing + Math.PI / 2) * 23 + 50) + "vh"
  document.getElementById("button13").style.left = (Math.sin(sinThing - 0.55) * 21 + 50) + "vh"
  document.getElementById("button13").style.top  = (Math.sin(sinThing + Math.PI / 2 - 0.55) * 21 + 50) + "vh"
  document.getElementById("button14").style.left = (Math.sin(sinThing - 0.78) * 21 + 50) + "vh"
  document.getElementById("button14").style.top  = (Math.sin(sinThing + Math.PI / 2 - 0.78) * 21 + 50) + "vh"
  document.getElementById("button15").style.left = (Math.sin(sinThing - 1.01) * 21 + 50) + "vh"
  document.getElementById("button15").style.top  = (Math.sin(sinThing + Math.PI / 2 - 1.01) * 21 + 50) + "vh"

  //Performs calculations for certain variables
  if (game.dash3Bought > 0) {
    game.dotsPerClick = new Decimal(2).pow(game.dot2Bought).multiply(new Decimal(game.dashes.log10() + 1).pow(game.dash3Bought.add(1))).multiply(game.multiplier).multiply(2)
  }
  else if (game.oneTimeButtonsBought[2]) {
    game.dotsPerClick = new Decimal(2).pow(game.dot2Bought).multiply(game.dotsPerSecond.log10() + 1).multiply(game.multiplier).multiply(2)
  }
  else if (game.oneTimeButtonsBought[1]) {
    game.dotsPerClick = new Decimal(2).pow(game.dot2Bought).multiply(game.dotsPerSecond.log10() + 1).multiply(game.multiplier)
  }
  else {
    game.dotsPerClick = new Decimal(2).pow(game.dot2Bought).multiply(game.multiplier)
  }

  if (game.dash3Bought > 0) {
    game.dotsPerSecond = new Decimal(2).pow(game.dot4Bought).multiply(new Decimal(game.dashes.log10() + 1).pow(game.dash3Bought.add(1))).multiply(game.multiplier).multiply(5)
  }
  else if (game.oneTimeButtonsBought[2]) {
    game.dotsPerSecond = new Decimal(2).pow(game.dot4Bought).multiply(game.dotsPerClick.log10() + 1).multiply(game.multiplier).multiply(5)
  }
  else if (game.oneTimeButtonsBought[0]) {
    game.dotsPerSecond = new Decimal(2).pow(game.dot4Bought).multiply(game.multiplier).multiply(5)
  }

  game.dashesPerClick = new Decimal(2).pow(game.dash2Bought).multiply(game.multiplier)

  //Sets text and stuff
  document.getElementById("dots").innerHTML = currentNotation.format(game.dots, 2, 0)
  document.getElementById("dotsPerClick").innerHTML = currentNotation.format(game.dotsPerClick, 2, 0)
  document.getElementById("dotsPerSecond").innerHTML = currentNotation.format(game.dotsPerSecond, 2, 0)
  if (currentInfo == 1) {
    document.getElementById("dotsInfo").innerHTML = currentNotation.format(game.dots, 2, 0)
  }
  else if (currentInfo == 2) {
    document.getElementById("dot2Cost").innerHTML = currentNotation.format(game.dot2Cost, 2, 0)
  }
  else if (currentInfo == 4) {
    document.getElementById("dot4Cost").innerHTML = currentNotation.format(game.dot4Cost, 2, 0)
  }
  else if (currentInfo == 8) {
    document.getElementById("dashesInfo").innerHTML = currentNotation.format(game.dashes, 2, 0)
  }
  else if (currentInfo == 9) {
    document.getElementById("dash2Cost").innerHTML = currentNotation.format(game.dash2Cost, 2, 0)
  }
  else if (currentInfo == 10) {
    document.getElementById("dash3Cost").innerHTML = currentNotation.format(game.dash3Cost, 2, 0)
    document.getElementById("dash3Bought").innerHTML = currentNotation.format(game.dash3Bought, 2, 0)
  }
  else if (currentInfo == 12) {
    document.getElementById("multiplier").innerHTML = currentNotation.format(game.multiplier, 2, 0)
    document.getElementById("multiplierToGet").innerHTML = currentNotation.format(game.multiplier.add(new Decimal(game.dots.log10()).divide(2).pow(game.multiplierPower).floor()), 2, 0)
  }

  document.getElementById("dashes").innerHTML = currentNotation.format(game.dashes, 2, 0)
  document.getElementById("dashesPerClick").innerHTML = currentNotation.format(game.dashesPerClick, 2, 0)

  document.getElementById("backslashes").innerHTML = currentNotation.format(game.backslashes, 2, 0)
}

setInterval(update, 10)

function info(x) {
  //Changes the visible info in the center circle based on what button you're hovering over
  if (x==1) {
    currentInfo = 1
    document.getElementById("infoTitle").innerHTML = "Dot-1"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    if (game.dotsPerClick == 1) {
      document.getElementById("infoText").innerHTML = "Gives you 1 dot.<br>(You have <span id='dotsInfo'>" + currentNotation.format(game.dots, 2, 0) + "</span>)"
    }
    else {
      document.getElementById("infoText").innerHTML = "Gives you " + currentNotation.format(game.dotsPerClick, 2, 0) + " dots.<br>(You have <span id='dotsInfo'>" + currentNotation.format(game.dots, 2, 0) + "</span>)"
    }
  }
  else if (x==2) {
    currentInfo = 2
    document.getElementById("infoTitle").innerHTML = "Dot-2"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Doubles your dots per click. Costs <span id='dot2Cost'>" + currentNotation.format(game.dot2Cost, 2, 0) + "</span> dots."
  }
  else if (x==3) {
    currentInfo = 3
    document.getElementById("infoTitle").innerHTML = "Dot-3"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Gives you 5 dots per second and unlocks dot-4 & dot-5. Costs 40 dots."
  }
  else if (x==4) {
    currentInfo = 4
    document.getElementById("infoTitle").innerHTML = "Dot-4"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Doubles your dots per second. Costs <span id='dot4Cost'>" + currentNotation.format(game.dot4Cost, 2, 0) + "</span> dots."
  }
  else if (x==5) {
    currentInfo = 5
    document.getElementById("infoTitle").innerHTML = "Dot-5"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Multiplies your dots per click by log10(dots/s)+1. Costs 25.00 K dots."
  }
  else if (x==6) {
    currentInfo = 6
    document.getElementById("infoTitle").innerHTML = "Dot-6"
    document.getElementById("infoText").style.fontSize = "1.2vh"
    document.getElementById("infoText").innerHTML = "Multiplies your dots per second by log10(dots/click)+1 and doubles your dots per click. Costs 1.00 M dots."
  }
  else if (x==7) {
    currentInfo = 7
    document.getElementById("infoTitle").innerHTML = "Dot-7"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Unlock dashes. Costs 15.00 M dots."
  }
  else if (x==8) {
    currentInfo = 8
    document.getElementById("infoTitle").innerHTML = "Dash-1"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    if (game.dashesPerClick == 1) {
      document.getElementById("infoText").innerHTML = "Gives you 1 dash.<br>(You have <span id='dashesInfo'>" + currentNotation.format(game.dashes, 2, 0) + "</span>)"
    }
    else {
      document.getElementById("infoText").innerHTML = "Gives you " + currentNotation.format(game.dashesPerClick, 2, 0) + " dashes.<br>(You have <span id='dashesInfo'>" + currentNotation.format(game.dashes, 2, 0) + "</span>)"
    }
  }
  else if (x==9) {
    currentInfo = 9
    document.getElementById("infoTitle").innerHTML = "Dash-2"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Doubles your dashes per click. Costs <span id='dash2Cost'>" + currentNotation.format(game.dash2Cost, 2, 0) + "</span> dashes."
  }
  else if (x==10) {
    currentInfo = 10
    document.getElementById("infoTitle").innerHTML = "Dash-3"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Multuplies dots/s and dots/click by log10(dashes)+1. Costs <span id='dash3Cost'>" + currentNotation.format(game.dash3Cost, 2, 0) + "</span> dashes. (<span id='dash3Bought'>" + currentNotation.format(game.dash3Bought, 2, 0) + "</span>/3)"
  }
  else if (x==11) {
    currentInfo = 11
    document.getElementById("infoTitle").innerHTML = "Dot-8"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Unlock backslash. Costs 20.00 B dots."
  }
  else if (x==12) {
    currentInfo = 12
    document.getElementById("infoTitle").innerHTML = "Backslash"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Reset everything, but gain a dot/dash multiplier based on your dots.<br><span style='font-size: 1vh'><span id='multiplier'>" + currentNotation.format(game.multiplier, 2, 0) + "</span>x -> <span id='multiplierToGet'>" + currentNotation.format(game.multiplier.add(new Decimal(game.dots.log10()).divide(2).pow(game.multiplierPower).floor()), 2, 0) + "</span>x</span>"
  }
  else if (x==13) {
    currentInfo = 13
    document.getElementById("infoTitle").innerHTML = "Plus-1"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Squares multiplier gain from backslash. Costs 3 backslashes."
  }
  else if (x==14) {
    currentInfo = 14
    document.getElementById("infoTitle").innerHTML = "Plus-2"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Squares multiplier gain from backslash again. Costs 4 backslashes."
  }
  else if (x==15) {
    currentInfo = 15
    document.getElementById("infoTitle").innerHTML = "Plus-3"
    document.getElementById("infoText").style.fontSize = "1.5vh"
    document.getElementById("infoText").innerHTML = "Backslash no longer resets anything. Costs 1.00 Qt dots and<br>10.00 B dashes."
  }
}

//Adds dots per second to dots
function dotsUp() {
  game.dots = game.dots.add(game.dotsPerSecond / 20)
}

setInterval(dotsUp, 50)

//Lots and lots of button functions
//Dot upgrades
function dot1() {
  game.dots = game.dots.add(game.dotsPerClick)
  if (game.dots >= 15) {
    document.getElementById("button2").style.display = "block"
    document.getElementById("button3").style.display = "block"
  }
}

function dot2() {
  if (game.dots.greaterThanOrEqualTo(game.dot2Cost)) {
    game.dots = game.dots.subtract(game.dot2Cost)
    game.dot2Bought = game.dot2Bought.add(1)
    game.dot2Cost = (new Decimal(2.2).add(game.dot2Bought.multiply(0.05)).pow(game.dot2Bought).multiply(30)).floor()
  }
}

function dot3() {
  if (game.dots >= 40 && game.oneTimeButtonsBought[0] != true) {
    game.oneTimeButtonsBought[0] = true
    game.dots = game.dots.subtract(40)
    game.dotsPerSecond = new Decimal(5)
    document.getElementById("stat3").style.display = "block"
    document.getElementById("button4").style.display = "block"
    document.getElementById("button5").style.display = "block"
    document.getElementById("button3").style.filter = "invert(25%)"
  }
}

function dot4() {
  if (game.dots.greaterThanOrEqualTo(game.dot4Cost)) {
    game.dots = game.dots.subtract(game.dot4Cost)
    game.dot4Bought = game.dot4Bought.add(1)
    game.dot4Cost = (new Decimal(2.2).add(game.dot4Bought.multiply(0.05)).pow(game.dot4Bought).multiply(90)).floor()
  }
}

function dot5() {
  if (game.dots >= 25000 && game.oneTimeButtonsBought[1] != true) {
    game.oneTimeButtonsBought[1] = true
    game.dots = game.dots.subtract(25000)
    document.getElementById("button5").style.filter = "invert(25%)"
    document.getElementById("button6").style.display = "block"
  }
}

function dot6() {
  if (game.dots >= 1e6 && game.oneTimeButtonsBought[2] != true) {
    game.oneTimeButtonsBought[2] = true
    game.dots = game.dots.subtract(1e6)
    document.getElementById("button6").style.filter = "invert(25%)"
    document.getElementById("button7").style.display = "block"
  }
}

function dot7() {
  if (game.dots >= 1.5e7 && game.oneTimeButtonsBought[3] != true) {
    game.oneTimeButtonsBought[3] = true
    game.dots = game.dots.subtract(1.5e7)
    document.getElementById("button7").style.filter = "invert(25%)"
    document.getElementById("button8").style.display = "block"
    document.getElementById("button9").style.display = "block"
    document.getElementById("stat4").style.display = "block"
    document.getElementById("stat5").style.display = "block"
  }
}

function dot8() {
  if (game.dots >= 2e10 && game.oneTimeButtonsBought[4] != true) {
    game.oneTimeButtonsBought[4] = true
    game.dots = game.dots.subtract(2e10)
    document.getElementById("button11").style.filter = "invert(25%)"
    document.getElementById("paintSplotch").style.display = "block"
    document.getElementById("button12").style.display = "block"
    document.getElementById("button13").style.display = "block"
    if (game.oneTimeButtonsBought[5] == true) {
      document.getElementById("button14").style.display = "block"
    }
    if (game.oneTimeButtonsBought[6] == true) {
      document.getElementById("button15").style.display = "block"
    }
  }
}

//Dash upgrades
function dash1() {
  game.dashes = game.dashes.add(game.dashesPerClick)
}

function dash2() {
  if (game.dashes.greaterThanOrEqualTo(game.dash2Cost)) {
    game.dashes = game.dashes.subtract(game.dash2Cost)
    game.dash2Bought = game.dash2Bought.add(1)
    game.dash2Cost = (new Decimal(2).add(game.dash2Bought.multiply(0.15)).pow(game.dash2Bought).multiply(30)).floor()
    if (game.dash2Bought == 1) {
      document.getElementById("button10").style.display = "block"
    }
  }
}

function dash3() {
  if (game.dashes.greaterThanOrEqualTo(game.dash3Cost) && game.dash3Bought < 3) {
    game.dashes = game.dashes.subtract(game.dash3Cost)
    game.dash3Bought = game.dash3Bought.add(1)
    game.dash3Cost = (new Decimal(5).pow(game.dash3Bought).multiply(200)).floor()
  }
  if (game.dash3Bought == 3) {
    document.getElementById("button10").style.filter = "invert(25%)"
    document.getElementById("button11").style.display = "block"
  }
}

//Plus upgrades
function plus1() {
  if (game.backslashes >= 3 && game.oneTimeButtonsBought[5] != true) {
    game.oneTimeButtonsBought[5] = true
    game.backslashes = game.backslashes.subtract(3)
    game.multiplierPower = game.multiplierPower.multiply(2)
    document.getElementById("button13").style.filter = "invert(25%)"
    document.getElementById("button14").style.display = "block"
  }
}

function plus2() {
  if (game.backslashes >= 4 && game.oneTimeButtonsBought[6] != true) {
    game.oneTimeButtonsBought[6] = true
    game.backslashes = game.backslashes.subtract(4)
    game.multiplierPower = game.multiplierPower.multiply(2)
    document.getElementById("button14").style.filter = "invert(25%)"
    document.getElementById("button15").style.display = "block"
  }
}

function plus3() {
  if (game.dots >= 1e18 && game.dashes >= 1e10 && game.oneTimeButtonsBought[7] != true) {
    game.oneTimeButtonsBought[7] = true
    game.dots = game.dots.subtract(1e18)
    game.dashes = game.dashes.subtract(1e10)
    document.getElementById("button15").style.filter = "invert(25%)"
  }
}

//Backslash
function backslash() {
  if (game.oneTimeButtonsBought[7] != true) {
    if (confirm("Are you sure you want to backslash?")) {
      oneTimeTemp = game.oneTimeButtonsBought
      oneTimeTemp.fill(false, 0, 5)
      backslashesTemp = game.backslashes.add(1)
      multiplierTemp = game.multiplier.add(new Decimal(game.dots.log10()).divide(2).pow(game.multiplierPower).floor())
      multiplierPowerTemp = game.multiplierPower
      reset()
      game.oneTimeButtonsBought = oneTimeTemp
      game.multiplier = multiplierTemp
      game.backslashes = backslashesTemp
      game.multiplierPower = multiplierPowerTemp
      document.getElementById("stat6").style.display = "block"
    }
  }
  else {
    game.backslashes = game.backslashes.add(1)
    game.multiplier = game.multiplier.add(new Decimal(game.dots.log10()).divide(2).pow(game.multiplierPower).floor())
  }
}