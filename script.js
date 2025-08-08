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

  if (end <= now) {
    document.getElementById('countdown').textContent = `You fasted for ${hours}h ${minutes}m. Great job!`;
    updateProgress(end, start, end);
    updateBenefits(start);
    return;
  }

  updateCountdown(end);
  setInterval(() => updateCountdown(end), 1000);
  updateProgress(now, start, end);
  updateBenefits(start);
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
  const total = end - start;
  const done = now - start;
  const percent = Math.min((done / total) * 100, 100);
  document.getElementById('progress-bar').style.width = `${percent}%`;
}

function updateBenefits(startTime = null) {
  const benefits = [
    { hour: 8, title: "Blood sugar stabilizes", details: "Insulin levels begin to normalize, improving metabolic health and reducing cravings." },
    { hour: 12, title: "Fat burning begins", details: "The body depletes glycogen stores and starts breaking down fat for energy." },
    { hour: 16, title: "Ketosis begins", details: "The liver produces ketones from fat, which the brain and muscles use for energy." },
    { hour: 18, title: "Human growth hormone increases", details: "HGH increases up to 5x, helping with fat loss and muscle retention." },
    { hour: 24, title: "Autophagy starts", details: "Cells begin cleaning out damaged components, reducing inflammation and aging risk." },
    { hour: 36, title: "Deeper cellular repair", details: "Repair processes accelerate; the body recycles old immune cells and enhances function." },
    { hour: 48, title: "Immune system reset", details: "Stem cell regeneration begins and the immune system undergoes a powerful reset." },
  ];

  let html = "<strong>Fasting Timeline:</strong><ul>";
  benefits.forEach(b => {
    let prefix = `${b.hour}h`;
    if (startTime) {
      const benefitTime = new Date(startTime.getTime() + b.hour * 3600000);
      prefix = benefitTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    html += `<li><b>${prefix} – ${b.title}:</b> ${b.details}</li>`;
  });
  html += "</ul>";

  document.getElementById('benefits').innerHTML = html;
}

// Show default benefit list on page load
document.addEventListener('DOMContentLoaded', () => {
  updateBenefits(); 
});
