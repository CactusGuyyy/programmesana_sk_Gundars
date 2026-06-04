const shotsDisplay = document.getElementById("shots")
const chanceDisplay = document.getElementById("chance")
const perClickDisplay = document.getElementById("perClick")
const hioCornerNotice = document.getElementById("hioCornerNotice")
const worldTitle = document.getElementById("worldTitle")
const clickAreaZone = document.getElementById("clickAreaZone")
const clickInstruction = document.getElementById("clickInstruction")
const clubBtn = document.getElementById("clubBtn")

const lessonsDesc = document.getElementById("lessonsDesc")
const cartDesc = document.getElementById("cartDesc")
const autoDesc = document.getElementById("autoDesc")

const btnChance = document.getElementById("btnChance")
const btnLessons = document.getElementById("btnLessons")
const btnCart = document.getElementById("btnCart")
const btnAuto = document.getElementById("btnAuto")
const rebirthBtn = document.getElementById("rebirthBtn")

let amount = 0
let bonus = 1 

let holeInOneChance = 0 
let holeInOneCost = 500
let holeInOnePower = 10 

let lessonsCost = 100
let cartCost = 400

let autoPoints = 0
let autoCost = 300

let rebirthCost = 5000
let rebirthMultiplier = 1
let rebirthCount = 0

let gameEnded = false

function parbauditPogas() {
    if (gameEnded) return 

    if (amount >= lessonsCost) {
        btnLessons.className = "active-btn"
    } else {
        btnLessons.className = "disabled-btn"
    }
    lessonsDesc.innerHTML = "+" + (1 * rebirthMultiplier) + " punkti par klikšķi"

    if (amount >= cartCost) {
        btnCart.className = "active-btn"
    } else {
        btnCart.className = "disabled-btn"
    }
    cartDesc.innerHTML = "+" + (5 * rebirthMultiplier) + " punkti par klikšķi"

    if (amount >= holeInOneCost) {
        btnChance.className = "active-btn"
    } else {
        btnChance.className = "disabled-btn"
    }

    if (rebirthCount >= 1) {
        autoDesc.innerHTML = "+" + (2 * rebirthMultiplier) + " punkti katru sekundi"
        if (amount >= autoCost) {
            btnAuto.className = "active-btn"
        } else {
            btnAuto.className = "disabled-btn"
        }
    } else {
        btnAuto.className = "disabled-btn"
        btnAuto.innerHTML = "Pieejams no Rebirth 1"
    }

    if (rebirthCount < 2) {
        if (amount >= rebirthCost) {
            rebirthBtn.className = "active-btn"
        } else {
            rebirthBtn.className = "disabled-btn"
        }
    }
}

// Pasīvie punkti katru sekundi
setInterval(() => {
    if (gameEnded) return
    if (autoPoints > 0) {
        amount += (autoPoints * rebirthMultiplier)
        shotsDisplay.innerHTML = amount
        parbauditPogas()
    }
}, 1000)

clubBtn.addEventListener("click", () => {
    if (gameEnded) return 

    let nejaussSkaitlis = Math.random() * 100
    let iegutiePunkti = 0

    if (nejaussSkaitlis < holeInOneChance) {
        iegutiePunkti = bonus * rebirthMultiplier * holeInOnePower
        amount += iegutiePunkti
        
        hioCornerNotice.style.display = "block"
        setTimeout(() => {
            hioCornerNotice.style.display = "none"
        }, 1500)
    } else {
        iegutiePunkti = bonus * rebirthMultiplier
        amount += iegutiePunkti
    }

    shotsDisplay.innerHTML = amount
    parbauditPogas()
})

btnLessons.addEventListener("click", () => {
    if (gameEnded || amount < lessonsCost) return
    amount -= lessonsCost
    bonus += 1 
    lessonsCost = lessonsCost * 2 
    
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    btnLessons.innerHTML = "Pirkt - " + lessonsCost
    parbauditPogas()
})

btnCart.addEventListener("click", () => {
    if (gameEnded || amount < cartCost) return
    amount -= cartCost
    bonus += 5 
    cartCost = cartCost * 2
    
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    btnCart.innerHTML = "Pirkt - " + cartCost
    parbauditPogas()
})

btnChance.addEventListener("click", () => {
    if (gameEnded || amount < holeInOneCost) return
    amount -= holeInOneCost
    holeInOneChance += 5 
    holeInOneCost = holeInOneCost * 2
    
    shotsDisplay.innerHTML = amount
    chanceDisplay.innerHTML = holeInOneChance + "%"
    btnChance.innerHTML = "Pirkt - " + holeInOneCost
    parbauditPogas()
})

btnAuto.addEventListener("click", () => {
    if (gameEnded || rebirthCount < 1 || amount < autoCost) return
    amount -= autoCost
    autoPoints += 2 
    autoCost = autoCost * 2
    
    shotsDisplay.innerHTML = amount
    btnAuto.innerHTML = "Pirkt - " + autoCost + " (Sekundē: +" + (autoPoints * rebirthMultiplier) + ")"
    parbauditPogas()
})

rebirthBtn.addEventListener("click", () => {
    if (gameEnded || amount < rebirthCost) return
    if (rebirthCount >= 2) return 

    rebirthCount += 1
    
    // OTRAIS REBIRTH -> SPĒLES BEIGAS
    if (rebirthCount === 2) {
        gameEnded = true 
        amount = "MAX"
        shotsDisplay.innerHTML = amount
        
        // Fons paliek violetais, kāds tas kļuva pie Rebirth 1
        clickAreaZone.style.background = "#3b0764" 
        worldTitle.innerHTML = "Pasaule: Čempiona fināls"
        clickInstruction.innerHTML = "APSVEICAM! TU PABEIDZI SPĒLI!"
        clickInstruction.style.color = "#facc15" 
        
        clubBtn.style.display = "none"

        btnLessons.className = "disabled-btn"
        btnCart.className = "disabled-btn"
        btnChance.className = "disabled-btn"
        btnAuto.className = "disabled-btn"
        
        rebirthBtn.className = "disabled-btn"
        rebirthBtn.innerHTML = "Spēle pabeigta!"
        
        alert("Apsveicam! Tu pabeidzi spēli un sasniedzi maksimālo līmeni!")
        return 
    }

    // Pirmais rebirth, fons pārvēršas par violeto
    amount = 0
    bonus = 1 
    holeInOneChance = 0
    autoPoints = 0 
    
    lessonsCost = 100
    cartCost = 400
    holeInOneCost = 500
    autoCost = 300
    
    rebirthMultiplier = rebirthMultiplier * 2 
    rebirthCost = rebirthCost * 2 
    
    shotsDisplay.innerHTML = amount
    perClickDisplay.innerHTML = bonus * rebirthMultiplier
    chanceDisplay.innerHTML = holeInOneChance + "%"
    
    btnLessons.innerHTML = "Pirkt - " + lessonsCost
    btnCart.innerHTML = "Pirkt - " + cartCost
    btnChance.innerHTML = "Pirkt - " + holeInOneCost
    rebirthBtn.innerHTML = "Rebirth (" + rebirthCost + ")"
    btnAuto.innerHTML = "Pirkt - " + autoCost
    
    worldTitle.innerHTML = "Pasaule: Rebirth zona Lvl 1"

    // Nomaina sākuma zaļo fonu uz violeto
    clickAreaZone.style.background = "#3b0764"

    parbauditPogas()
    alert("Pirmais Rebirth veikts! Fons nomainīts un tagad visi punkti nāk dubultā!")
})

parbauditPogas()