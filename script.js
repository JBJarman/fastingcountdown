let intervalId;

function calculateFast() {
  // Clear any existing timer
  clearInterval(intervalId);

  const startValue = document.getElementById('start-time').value;
  const endValue = document.getElementById('end-time').value;
  if (!startValue || !endValue) {
    alert("Please enter valid start and end times.");
    return;
  }

  const [startHour, startMinute] = startValue.split(':').map(Number);
  const [endHour, endMinute] = endValue.split(':').map(Number);

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute);
  let end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute);

  if (end <= start) {
    // If end time is earlier than start time, it means the fast crosses midnight
    end = new Date(end.getTime() + 24 * 60 * 60 * 1000);
  }

  const msDiff = end - start;
  const hours = Math.floor(msDiff / 1000 / 60 / 60);
  const minutes = Math.floor((msDiff / 1000 / 60) % 60);
  document.getElementById('duration').textContent = `Total Fast: ${hours}h ${minutes}m`;

  const now = new Date();

  if (end <= now) {
    document.getElementById('countdown').textContent = 'You fasted for ';
    updateProgress(end, start, end);
    updateBenefits(start);
    document.getElementById('reset-btn').style.display = 'inline-block';
    return;
  }

  updateCountdown(end);
  updateProgress(now, start, end);
  updateBenefits(start);
  document.getElementById('reset-btn').style.display = 'inline-block';

  intervalId = setInterval(() => {
    const current = new Date();
    updateCountdown(end);
    updateProgress(current, start, end);
  }, 1000);
}

function updateCountdown(end) {
  const now = new Date();
  const remaining = end - now;

  if (remaining <= 0) {
    document.getElementById('countdown').textContent = "Fast Complete!";
    clearInterval(intervalId);
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
    { hour: 12, title: "Fat burning begins", details: "The body depletes glucose stores and starts breaking down fat for energy." },
    { hour: 16, title: "Ketosis begins", details: "The liver produces ketone bodies from fat, which the brain and muscles use for energy." },
    { hour: 18, title: "Human growth hormone increases", details: "HGH levels increase up to 5x, helping with fat loss and muscle retention." },
    { hour: 24, title: "Autophagy starts", details: "Cellular autophagy begins to clear damaged components, reducing inflammation and aging risk." },
    { hour: 36, title: "Deeper cellular repair", details: "Detoxification processes accelerate; the body recycles old immune cells and enhances function." }
  ];

  const now = new Date();
  let referenceStart = null;
  if (startTime instanceof Date) {
    referenceStart = startTime;
  } else {
    const startVal = document.getElementById('start-time').value;
    if (startVal) {
      const [hStart, mStart] = startVal.split(':').map(Number);
      const base = new Date();
      referenceStart = new Date(base.getFullYear(), base.getMonth(), base.getDate(), hStart, mStart);
    } else {
      referenceStart = now;
    }
  }

  const msElapsed = now - referenceStart;
  const hoursElapsed = msElapsed / 1000 / 60 / 60;

  const benefitsList = document.getElementById('benefits-list');
  benefitsList.innerHTML = '';
  benefits.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.hour}h: ${item.title} – ${item.details}`;
    if (hoursElapsed >= item.hour) {
      li.style.fontWeight = 'bold';
    }
    benefitsList.appendChild(li);
  });
}

document.getElementById('start-btn').addEventListener('click', calculateFast);

document.getElementById('reset-btn').addEventListener('click', () => {
  clearInterval(intervalId);
  document.getElementById('duration').textContent = '';
  document.getElementById('countdown').textContent = '';
  document.getElementById('progress-bar').style.width = '0%';
  document.getElementById('reset-btn').style.display = 'none';
  document.getElementById('benefits-list').innerHTML = '';
});
