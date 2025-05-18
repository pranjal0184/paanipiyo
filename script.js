const targetDisplay = document.getElementById('waterTarget');
const remainingDisplay = document.getElementById('leftLiters');
const fillLevel = document.getElementById('fillLevel');
const glassGrid = document.getElementById('glassGrid');
const modal = document.getElementById('congratsModal');
const closeModal = document.getElementById('closeModal');

let totalLiters = 2;
const cupVolume = 0.25;
let cups = [];

function init() {
  updateUI();
  document.getElementById('increase').addEventListener('click', () => adjustGoal(1));
  document.getElementById('decrease').addEventListener('click', () => adjustGoal(-1));
  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

function adjustGoal(delta) {
  const newGoal = totalLiters + delta * cupVolume;
  if (newGoal >= 1 && newGoal <= 8) {
    totalLiters = parseFloat(newGoal.toFixed(2));
    updateUI();
  }
}

function updateUI() {
  targetDisplay.innerText = totalLiters;
  renderCups();
  updateMeter();
}

function renderCups() {
  glassGrid.innerHTML = '';
  cups = [];
  const cupCount = totalLiters / cupVolume;
  for (let i = 0; i < cupCount; i++) {
    const cup = document.createElement('div');
    cup.classList.add('glass');
    cup.innerText = '250ml';
    cup.addEventListener('click', () => toggleCup(i));
    cups.push(cup);
    glassGrid.appendChild(cup);
  }
}

function toggleCup(index) {
  for (let i = 0; i < cups.length; i++) {
    if (i <= index) {
      cups[i].classList.add('filled');
    } else {
      cups[i].classList.remove('filled');
    }
  }
  updateMeter();
}

function updateMeter() {
  const filledCount = cups.filter(c => c.classList.contains('filled')).length;
  const totalCups = cups.length;
  const filledRatio = filledCount / totalCups;

  fillLevel.style.height = `${filledRatio * 100}%`;
  const remaining = totalLiters - (filledCount * cupVolume);
  remainingDisplay.innerText = `${remaining.toFixed(2)}L`;

  if (filledCount === totalCups) {
    showCongratulations();
  }
}

function showCongratulations() {
  modal.classList.remove('hidden');
}

init();
