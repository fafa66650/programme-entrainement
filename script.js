
const data = {
  "Semaine 1": [
    { date: "Lundi 19 mai", jour: "Jour 1", type: "Cuisses & Fessiers", exos: [
      "Squats sumo (3x12-15)", "Fentes marchées (3x10 par jambe)", "Hip thrust (3x15)",
      "Jump squats (3x10-12)", "Skaters (3x30s)", "Sprint/Corde (5x30s)"
    ]},
    { date: "Mercredi 21 mai", jour: "Jour 2", type: "Abdos & Gainage", exos: [
      "Planche dynamique (3x30s)", "Crunchs jambes (3x20)", "Mountain climbers (3x45s)",
      "Russian twists (3x20)", "Gainage superman (2x30s)", "Corde (1min entre tours)"
    ]},
    { date: "Vendredi 23 mai", jour: "Jour 3", type: "Full Body", exos: [
      "Burpees modifiés (3x10)", "Squat + curl (3x12)", "Pompes (3x10-12)",
      "Soulevés de terre (3x12)", "Rowing élastique (3x12)", "Gainage tirage (2x30s)"
    ]},
    { date: "Dimanche 25 mai", jour: "Jour 4", type: "Glutes & Cardio", exos: [
      "Squat pulse + jump (3x10+10)", "Fente arrière (3x10)", "Pont fessier (3x15)",
      "Planche commando (3x30s)", "Toe touches (3x20)", "Corde HIIT (10x30s/15s)"
    ]}
  ]
};

const container = document.getElementById("programmeContainer");
const selector = document.getElementById("weekSelector");
const storageKey = "trainingProgress";

function loadSelector() {
  Object.keys(data).forEach(week => {
    const option = document.createElement("option");
    option.value = week;
    option.textContent = week;
    selector.appendChild(option);
  });
  selector.addEventListener("change", () => renderWeek(selector.value));
}

function renderWeek(week) {
  container.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
  data[week].forEach((day, dIndex) => {
    const div = document.createElement("div");
    div.className = "jour";
    div.innerHTML = `
      <div class="date">${day.date} - ${day.jour}</div>
      <div class="type">${day.type}</div>
      <ul>
        ${day.exos.map((exo, i) => `
          <li>
            <input type="checkbox" id="${week}-${dIndex}-${i}" ${saved[`${week}-${dIndex}-${i}`] ? "checked" : ""}>
            ${exo}
          </li>
        `).join("")}
      </ul>
    `;
    container.appendChild(div);
  });

  document.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => {
      saved[cb.id] = cb.checked;
      localStorage.setItem(storageKey, JSON.stringify(saved));
    });
  });
}

function resetProgress() {
  if (confirm("Tout réinitialiser ?")) {
    localStorage.removeItem(storageKey);
    renderWeek(selector.value);
  }
}

loadSelector();
renderWeek("Semaine 1");
