const shotsDisplay = document.getElementById("shots")
const chanceDisplay = document.getElementById("chance")
const perClickDisplay = document.getElementById("perClick")
const hioCornerNotice = document.getElementById("hioCornerNotice")
const worldTitle = document.getElementById("worldTitle")
const clickAreaZone = document.getElementById("clickAreaZone")
const clickInstruction = document.getElementById("clickInstruction")
const clubBtn = document.getElementById("clubBtn")
const golfBall = document.getElementById("golfBall")
const playField = document.querySelector(".play-field")

const rebirthProgressContainer = document.getElementById("rebirthProgressContainer")
const rebirthProgressBar = document.getElementById("rebirthProgressBar")
const rebirthText = document.getElementById("rebirthText")

const lessonsDesc = document.getElementById("lessonsDesc")
const cartDesc = document.getElementById("cartDesc")
const autoDesc = document.getElementById("autoDesc")

const btnChance = document.getElementById("btnChance")
const btnLessons = document.getElementById("btnLessons")
const btnCart = document.getElementById("btnCart")
const btnAuto = document.getElementById("btnAuto")

let amount = 0
let bonus = 50 

let holeInOneChance = 0 
let holeInOneCost = 200 
let holeInOnePower = 10 

let lessonsCost = 200 
let ballSpeedLevel = 1 

let cartCost = 700 
let ballDistanceLevel = 1 

let autoPoints = 0
let autoCost = 200 

let rebirthCost = 2500 
let rebirthMultiplier = 1
let rebirthCount = 0

let gameEnded = false
let isBallAnimating = false 

function parbauditPogas() {
    if (gameEnded) return 

    if (amount >= lessonsCost) { btnLessons.className = "active-btn" } else { btnLessons.className = "disabled-btn" }
    lessonsDesc.innerHTML = "+" + (10 * rebirthMultiplier) + " punkti"

    if (amount >= cartCost) { btnCart.className = "active-btn" } else { btnCart.className = "disabled-btn" }
    cartDesc.innerHTML = "+" + (25 * rebirthMultiplier) + " punkti"

    if (holeInOneChance >= 24) {
        btnChance.className = "disabled-btn"
        btnChance.innerHTML = "MAKSIMUMS (24%)"
    } else if (amount >= holeInOneCost) {
        btnChance.className = "active-btn"
    } else {
        btnChance.className = "disabled-btn"
    }

    if (rebirthCount >= 1) {
        autoDesc.innerHTML = "+" + (50 * rebirthMultiplier) + "/s"
        if (amount >= autoCost) { btnAuto.className = "active-btn" } else { btnAuto.className = "disabled-btn" }
    } else {
        btnAuto.className = "disabled-btn"
        btnAuto.innerHTML = "Rebirth 1"
    }

    if (rebirthCount < 2) {
        let procents = Math.floor((amount / rebirthCost) * 100)
        if (procents > 100) procents = 100 

        rebirthProgressBar.style.width = procents + "%"
        
        if (amount >= rebirthCost) {
            rebirthProgressContainer.className = "progress-container ready-to-rebirth"
            rebirthText.innerHTML = "REBIRTH GATAVS! (" + amount + " / " + rebirthCost + ")"
        } else {
            rebirthProgressContainer.className = "progress-container"
            rebirthText.innerHTML = "Rebirth: " + amount + " / " + rebirthCost
        }
    }
}

setInterval(() => {
    if (gameEnded) return
    if (autoPoints > 0) {
        amount += (autoPoints * rebirthMultiplier)
        shotsDisplay.innerHTML = amount
        parbauditPogas()
    }
}, 1000)

clubBtn.addEventListener("click", () => {
    if (gameEnded || isBallAnimating) return 

    isBallAnimating = true
    let nejaussSkaitlis = Math.random() * 100
    let isHoleInOne = nejaussSkaitlis < holeInOneChance
    let iegutiePunkti = 0

    golfBall.style.transition = "none" 
    golfBall.style.left = "0px"
    golfBall.style.transform = "scale(1)"
    golfBall.style.display = "block"

    let maxDistance = playField.clientWidth
    let targetLeft = 0

    if (isHoleInOne) {
        targetLeft = maxDistance - 25 // Nostājas tieši uz melnās bedrītes malas pa vidu
        iegutiePunkti = bonus * rebirthMultiplier * holeInOnePower
    } else {
        targetLeft = Math.min(maxDistance - 60, 40 + (ballDistanceLevel * 30))
        iegutiePunkti = bonus * rebirthMultiplier
    }

    setTimeout(() => {
        golfBall.style.transition = "left 0.4s ease-out"
        golfBall.style.left = targetLeft + "px"
    }, 10)

    setTimeout(() => {
        if (isHoleInOne) {
            hioCornerNotice.style.display = "block"
            golfBall.style.transition = "transform 0.2s ease"
            golfBall.style.transform = "scale(0)" 

            setTimeout(() => {
                golfBall.style.display = "none"
                hioCornerNotice.style.display = "none"
                isBallAnimating = false
            }, 200)
        } else {
            golfBall.style.display = "none"
            isBallAnimating = false
        }

        amount += iegutiePunkti
        shotsDisplay.innerHTML = amount
        parbauditPogas()
    }, 450)
})

btnLessons.addEventListener("click", () => {
    if (gameEnded || amount < lessonsCost) return
    amount -= lessonsCost
    bonus += 10; ballSpeedLevel += 1; lessonsCost = lessonsCost * 3 
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    btnLessons.innerHTML = "Pirkt - " + lessonsCost
    parbauditPogas()
})

btnCart.addEventListener("click", () => {
    if (gameEnded || amount < cartCost) return
    amount -= cartCost
    bonus += 25; ballDistanceLevel += 1; cartCost = cartCost * 3 
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    btnCart.innerHTML = "Pirkt - " + cartCost
    parbauditPogas()
})

btnChance.addEventListener("click", () => {
    if (gameEnded || amount < holeInOneCost || holeInOneChance >= 24) return
    amount -= holeInOneCost
    
    holeInOneChance += 3
    if (holeInOneChance > 24) holeInOneChance = 24 
    
    holeInOneCost = holeInOneCost * 3 
    shotsDisplay.innerHTML = amount
    chanceDisplay.innerHTML = holeInOneChance + "%"
    
    if (holeInOneChance >= 24) {
        btnChance.innerHTML = "MAKSIMUMS (24%)"
    } else {
        btnChance.innerHTML = "Pirkt - " + holeInOneCost
    }
    parbauditPogas()
})

btnAuto.addEventListener("click", () => {
    if (gameEnded || rebirthCount < 1 || amount < autoCost) return
    amount -= autoCost
    autoPoints += 50; autoCost = autoCost * 3 
    shotsDisplay.innerHTML = amount
    btnAuto.innerHTML = "Pirkt - " + autoCost
    parbauditPogas()
})

rebirthProgressContainer.addEventListener("click", () => {
    if (gameEnded || amount < rebirthCost) return
    if (rebirthCount >= 2) return 

    rebirthCount += 1
    
    if (rebirthCount === 2) {
        gameEnded = true
        amount = "MAX"
        shotsDisplay.innerHTML = amount
        clickAreaZone.style.background = "indigo" 
        worldTitle.innerHTML = "Fināls"
        clickInstruction.innerHTML = "TU UZVARĒJI! 🏆"
        clubBtn.style.display = "none"
        golfBall.style.display = "none"
        
        btnLessons.className = "disabled-btn"
        btnCart.className = "disabled-btn"
        btnChance.className = "disabled-btn"
        btnAuto.className = "disabled-btn"
        
        rebirthProgressBar.style.width = "100%"
        rebirthText.innerHTML = "Pabeigts!"
        alert("Apsveicam! Spēle pabeigta!")
        return 
    }

    amount = 0; bonus = 50; holeInOneChance = 0; autoPoints = 0; ballSpeedLevel = 1; ballDistanceLevel = 1;
    lessonsCost = 200; cartCost = 700; holeInOneCost = 200; autoCost = 200;
    
    rebirthMultiplier = rebirthMultiplier * 2 
    rebirthCost = rebirthCost * 3 
    
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    chanceDisplay.innerHTML = holeInOneChance + "%"
    
    btnLessons.innerHTML = "Pirkt - " + lessonsCost
    btnCart.innerHTML = "Pirkt - " + cartCost
    btnChance.innerHTML = "Pirkt - " + holeInOneCost
    btnAuto.innerHTML = "Pirkt - " + autoCost
    
    worldTitle.innerHTML = "Rebirth Lvl 1"
    clickAreaZone.style.background = "indigo"
    
    parbauditPogas()
})

perClickDisplay.innerHTML = bonus;
parbauditPogas()