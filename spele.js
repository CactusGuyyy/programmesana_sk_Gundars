let shots = 0;
let shotsPerClick = 1;
let holeChance = 0.01;
let hioMultiplier = 10;
let clubLevel = 1;
let rebirthCount = 0;

let clubCost = 150;
let chanceCost = 200;
let lessonsCost = 100;
let cartCost = 400;

let rebirthCosts = [1000000, 10000000, 50000000];

let eventActive = false;
let eventAccepted = false;
let eventClicks = 0;
let eventTimer = 30;
let eventInterval;
let currentEventMaxTime = 30;
let currentEventReward = 25;

let autoClickerInterval = null;

const worldClubs = [
  ["Koka nūja", "Dzelzs nūja", "Sudraba nūja", "Zelta nūja", "Platīna nūja", "Dimanta nūja"],
  ["Smaragda nūja", "Rubīna nūja", "Safīra nūja", "Obsidiāna nūja", "Kvarca nūja", "Kosmiskā nūja"],
  ["Neon nūja", "Lāzera nūja", "Plazmas nūja", "Kibernētiskā nūja", "Kvantus nūja", "Singularitātes nūja"],
  ["Magmas nūja", "Meteora nūja", "Tektoniskā nūja", "Kodol nūja", "Nemirstības nūja", "Dieva nūja"]
];

const worldClubImages = [
  ["Koks", "Dzelzs", "Sudrabs", "Zelts", "Platina", "Dimants"],
  ["Smaragds", "Rubins", "Safirs", "Obsidians", "Kvarcs", "Kosmoss"],
  ["Neons", "Lazers", "Plazma", "Kiber", "Kvanti", "Singularitate"],
  ["Magma", "Meteors", "Tektonika", "Kodols", "Nemirstiba", "Dievs"]
];

function swing() {
  let earned = shotsPerClick;

  if (Math.random() < holeChance) {
    earned = shotsPerClick * hioMultiplier;
    showPopup("HOLE IN ONE! +" + Math.floor(earned), "#facc15");
  } else {
    showPopup("+" + earned, "#ffffff");
  }

  shots += earned;
  updateUI();
}

function buyClub() {
  if (clubLevel >= 6) return;

  if (shots >= clubCost) {
    shots -= clubCost;
    clubLevel++;
    hioMultiplier += 2.5;
    clubCost = Math.floor(clubCost * 2.5);
    updateUI();
  } else {
    alert("Nepietiek punktu!");
  }
}

function buyChance() {
  if (shots >= chanceCost) {
    shots -= chanceCost;
    holeChance += 0.02;
    chanceCost = Math.floor(chanceCost * 1.4);
    updateUI();
  } else {
    alert("Nepietiek punktu!");
  }
}

function buyLessons() {
  if (shots >= lessonsCost) {
    shots -= lessonsCost;
    shotsPerClick += 1;
    lessonsCost = Math.floor(lessonsCost * 1.4);
    updateUI();
  } else {
    alert("Nepietiek punktu!");
  }
}

function buyCart() {
  if (shots >= cartCost) {
    shots -= cartCost;
    shotsPerClick += 5;
    cartCost = Math.floor(cartCost * 1.4);
    updateUI();
  } else {
    alert("Nepietiek punktu!");
  }
}

function doRebirth() {
  if (rebirthCount >= 3) return;

  if (shots >= rebirthCosts[rebirthCount]) {
    rebirthCount++;
    shots = 0;
    
    clubLevel = 1;
    clubCost = 150;
    chanceCost = 200;
    lessonsCost = 100;
    cartCost = 400;
    hioMultiplier = 10;

    const gameZone = document.getElementById("gameZone");

    if (rebirthCount === 1) {
      shotsPerClick = 10;
      holeChance = 0.03;
      gameZone.style.backgroundImage = "url('https://placehold.co/1920x1080?text=Smaragda+Lauki+Fons')";
      document.getElementById("worldTitle").innerText = "Smaragda Lauki (Rebirth 1)";
    } else if (rebirthCount === 2) {
      shotsPerClick = 50;
      holeChance = 0.06;
      gameZone.style.backgroundImage = "url('https://placehold.co/1920x1080?text=Neon+Nakts+Fons')";
      document.getElementById("worldTitle").innerText = "Neon Nakts Kūrorts (Rebirth 2)";
    } else if (rebirthCount === 3) {
      shotsPerClick = 250;
      holeChance = 0.10;
      gameZone.style.backgroundImage = "url('https://placehold.co/1920x1080?text=Vulkaniskais+Fons')";
      document.getElementById("worldTitle").innerText = "Vulkāniskais Čempionāts (Rebirth 3)";
    }

    startAutoclicker();
    updateUI();
    alert("Tu esi pārdzimis jaunā pasaulē! Visi uzlabojumi un nūju līmeņi atiestatīti!");
  }
}

function startAutoclicker() {
  if (autoClickerInterval) clearInterval(autoClickerInterval);
  autoClickerInterval = setInterval(() => {
    shots += shotsPerClick;
    updateUI();
  }, 500);
}

function updateUI() {
  document.getElementById("shots").innerText = Math.floor(shots);
  document.getElementById("chance").innerText = (holeChance * 100).toFixed(2) + "%";
  document.getElementById("perClick").innerText = shotsPerClick;

  let currentClubList = worldClubs[rebirthCount];
  let currentImgList = worldClubImages[rebirthCount];

  let currentName = currentClubList[clubLevel - 1] || "Maksimālā nūja";
  document.getElementById("clubName").innerText = `${currentName} (Lvl ${clubLevel})`;

  let textLabel = currentImgList[clubLevel - 1] || "Maks";
  document.getElementById("clubPic").src = `https://placehold.co/80x80?text=${textLabel}`;

  const btnClub = document.getElementById("btnClub");
  if (clubLevel >= 6) {
    btnClub.innerText = "Maksimālais līmenis";
    btnClub.disabled = true;
    btnClub.style.background = "#4b5563";
    btnClub.style.cursor = "not-allowed";
  } else {
    btnClub.innerText = "Uzlabot nūju - " + clubCost;
    btnClub.disabled = false;
    btnClub.style.background = "#84cc16";
    btnClub.style.cursor = "pointer";
  }

  document.getElementById("btnChance").innerText = "Pirkt - " + chanceCost;
  document.getElementById("btnLessons").innerText = "Pirkt - " + lessonsCost;
  document.getElementById("btnCart").innerText = "Pirkt - " + cartCost;

  const rebirthBtn = document.getElementById("rebirthBtn");
  if (rebirthCount >= 3) {
    rebirthBtn.disabled = true;
    rebirthBtn.innerText = "Maksimālā Pasaule";
    rebirthBtn.classList.remove("ready");
  } else {
    let nextCost = rebirthCosts[rebirthCount];
    rebirthBtn.innerText = `Rebirth (${(nextCost / 1000000).toFixed(0)}M)`;
    if (shots >= nextCost) {
      rebirthBtn.disabled = false;
      rebirthBtn.classList.add("ready");
    } else {
      rebirthBtn.disabled = true;
      rebirthBtn.classList.remove("ready");
    }
  }
}

function showPopup(text, color) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = text;
  popup.style.color = color;
  
  popup.style.left = (window.innerWidth / 2 + 100) + "px";
  popup.style.top = (window.innerHeight / 2 - 50) + "px";

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 1000);
}

function triggerEvent() {
  if (eventActive) return;
  eventActive = true;
  eventAccepted = false;
  eventClicks = 0;
  eventTimer = currentEventMaxTime;

  document.getElementById("eventStatus").innerText = "Gatavs izaicinājumam!";
  document.getElementById("eventTime").innerText = `Laiks: ${eventTimer}s`;
  document.getElementById("eventBonus").innerText = `Balva: +${currentEventReward}`;
  document.getElementById("eventBtn").innerText = "PIEŅEMT";
  document.getElementById("eventBox").style.display = "flex";
}

function handleEventClick() {
  if (!eventActive) return;

  if (!eventAccepted) {
    eventAccepted = true;
    document.getElementById("eventBtn").innerText = "SPIED ĀTRI!";
    document.getElementById("eventStatus").innerText = "Klikšķi: 0/100";
    
    eventInterval = setInterval(() => {
      eventTimer--;
      document.getElementById("eventTime").innerText = `Laiks: ${eventTimer}s`;

      if (eventTimer <= 0) {
        endEvent(false);
      }
    }, 1000);
  } else {
    eventClicks++;
    document.getElementById("eventStatus").innerText = `Klikšķi: ${eventClicks}/100`;

    if (eventClicks >= 100) {
      endEvent(true);
    }
  }
}

function endEvent(success) {
  clearInterval(eventInterval);
  eventActive = false;
  document.getElementById("eventBox").style.display = "none";

  if (success) {
    shotsPerClick += currentEventReward;
    currentEventMaxTime = Math.max(5, currentEventMaxTime - 10);
    currentEventReward += 100;
    updateUI();
    alert("Izaicinājums izpildīts! Nākamais būs ātrāks un vērtīgāks!");
  } else {
    currentEventMaxTime = 30;
    currentEventReward = 25;
    alert("Laiks beidzās! Izaicinājuma grūtība atiestatīta.");
  }

  setTimeout(triggerEvent, 60000);
}

setTimeout(triggerEvent, 30000);
updateUI();