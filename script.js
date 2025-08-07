function calculateFast() {
  const start = new Date(document.getElementById('start-time').value);
  const end = new Date(document.getElementById('end-time').value);
  if (isNaN(start) || isNaN(end) || end <= start) {
    alert("Please enter valid start and end times.");
    return;
  }

  const msDiff = end - start;
  const hours = Math.floor(msDiff / 1000 / 60 / 60);
  const minutes = Math.floor((msDiff / 1000 / 60) % 60);
  document.getElementById('duration').textContent = `Total Fast: ${hours}h ${minutes}m`;

  const now = new Date();
  updateCountdown(end);
  setInterval(() => updateCountdown(end), 1000);

  updateProgress(now, start, end);
  showBenefits(hours);
}

function updateCountdown(end) {
  const now = new Date();
  const remaining = end - now;
  if (remaining <= 0) {
    document.getElementById('countdown').textContent = "Fast Complete!";
    return;
  }
  const h = Math.floor(remaining / 1000 / 60 / 60);
  const m = Math.floor((remaining / 1000 / 60) % 60);
  const s = Math.floor((remaining / 1000) % 60);
  document.getElementById('countdown').textContent = `Time Left: ${h}h ${m}m ${s}s`;
}

function updateProgress(now, start, end) {
  const progressBar = document.querySelector('#progress');
  const total = end - start;
  const done = now - start;
  const percent = Math.min((done / total) * 100, 100);
  progressBar.innerHTML = `<div style="position: absolute; left: 0; top: 0; height: 100%; width: ${percent}%; background: #28a745;"></div>`;
}

function showBenefits(hours) {
  const benefits = [
    { hour: 8, text: "Blood sugar stabilizes" },
    { hour: 12, text: "Insulin drops, fat burning starts" },
    { hour: 16, text: "Ketosis begins" },
    { hour: 18, text: "Human growth hormone increases" },
    { hour: 24, text: "Autophagy starts (cell cleanup)" },
    { hour: 36, text: "Deeper cellular repair" },
    { hour: 48, text: "Immune system reset & stem cell growth" },
  ];

  let html = "<strong>Benefits Unlocked:</strong><ul>";
  benefits.forEach(b => {
    if (hours >= b.hour) {
      html += `<li><b>${b.hour}h:</b> ${b.text}</li>`;
    }
  });
  html += "</ul>";

  const next = benefits.find(b => hours < b.hour);
  if (next) {
    html += `<p><em>Fast ${next.hour - hours} more hour(s) to reach: <b>${next.text}</b></em></p>`;
  } else {
    html += `<p><em>You've unlocked all major fasting benefits!</em></p>`;
  }

  document.getElementById('benefits').innerHTML = html;
}
