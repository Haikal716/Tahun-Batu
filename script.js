// Clock logic
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedTime = now.toLocaleTimeString();
  document.getElementById("clock").textContent = formattedTime;

  // Check if it's midnight on January 1, 2025
  const targetDate = new Date('2025-01-01T00:00:00');
  if (now >= targetDate) {
    showNewYearMessage();
  }
}

// Show New Year Message
function showNewYearMessage() {
  document.getElementById("waitingMessage").style.display = "none";
  document.getElementById("newYearMessage").style.display = "block";
  updateBalloons();

  // Show the second message after a delay (e.g., 5 seconds)
  setTimeout(showProposalMessage, 5000);
}

// Show Proposal Message
function showProposalMessage() {
  const proposalMessage = document.createElement("h2");
  proposalMessage.textContent = "Sekarang mau gak jadi pacar aku?";
  proposalMessage.style.color = "#444";
  proposalMessage.style.marginTop = "20px";
  proposalMessage.style.fontSize = "20px";

  const newYearContainer = document.getElementById("newYearMessage");
  newYearContainer.appendChild(proposalMessage);
}

// Balloon animation
const canvas = document.getElementById("balloonCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balloons = [];

function createBalloon() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 100,
    size: Math.random() * 20 + 20,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    speed: Math.random() * 2 + 1
  };
}

function drawBalloon(balloon) {
  ctx.beginPath();
  ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
  ctx.fillStyle = balloon.color;
  ctx.fill();
  ctx.closePath();
}

function updateBalloons() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (balloons.length < 50) {
    balloons.push(createBalloon());
  }

  balloons.forEach((balloon, index) => {
    balloon.y -= balloon.speed;
    if (balloon.y + balloon.size < 0) {
      balloons.splice(index, 1);
    }
    drawBalloon(balloon);
  });

  requestAnimationFrame(updateBalloons);
}

// Initial setup
function initialize() {
  const now = new Date();
  const targetDate = new Date('2025-01-01T00:00:00');

  if (now >= targetDate) {
    showNewYearMessage();
  } else {
    document.getElementById("waitingMessage").style.display = "block";
    document.getElementById("newYearMessage").style.display = "none";
  }

  setInterval(updateClock, 1000);
}

initialize();
