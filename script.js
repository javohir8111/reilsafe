// ==== STATUS CHECK (temperatura bo‘yicha) ====
function getTemperatureStatus(temp) {
    if (temp < 45) return { status: '✅ Normal', class: 'normal' };
    if (temp <= 84) return { status: '⚠️ TRIVOGA-1', class: 'warning' };
    return { status: '🚨 TRIVOGA-2', class: 'alarm' };
}

// ==== MOCK DATA (stations.html uchun demo) ====
const mockTrains = [
    { id: 1, arrived: 'Yes', delayed: 'No', wheels: 48, hottestWheel: 'Front left, 78°C', passengers: 350, responsible: 'A. Ivanov' },
    { id: 2, arrived: 'Yes', delayed: '15 min', wheels: 52, hottestWheel: 'Rear right, 92°C', passengers: 420, responsible: 'B. Petrov' },
    { id: 3, arrived: 'No', delayed: 'On route', wheels: 60, hottestWheel: 'Middle left, 65°C', passengers: 500, responsible: 'C. Karimov' }
];

// ==== MODAL CREATOR ====
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'trainModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 id="trainTitle">Train Details</h3>
            <p><b>🚦 Status:</b> <span id="trainStatus"></span></p>
            <p><b>⚙️ Wheels:</b> <span id="trainWheels"></span></p>
            <p><b>🔥 Hottest Wheel:</b> <span id="trainHot"></span></p>
            <p><b>👥 Passengers:</b> <span id="trainPassengers"></span></p>
            <p><b>👨‍✈️ Responsible:</b> <span id="trainResponsible"></span></p>
            <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// ==== SHOW TRAIN DETAILS ====
function showTrainDetails(trainId) {
    const train = mockTrains.find(t => t.id === trainId);
    if (!train) return;

    let modal = document.getElementById('trainModal');
    if (!modal) modal = createModal();

    // Ma’lumotlarni joylashtirish
    document.getElementById('trainTitle').innerText = `🚆 Train ${train.id}`;
    document.getElementById('trainWheels').innerText = train.wheels;
    document.getElementById('trainHot').innerText = train.hottestWheel;
    document.getElementById('trainPassengers').innerText = train.passengers;
    document.getElementById('trainResponsible').innerText = train.responsible;

    // Temperaturani tekshirish
    const tempMatch = train.hottestWheel.match(/(\d+)/);
    if (tempMatch) {
        const { status, class: cssClass } = getTemperatureStatus(parseInt(tempMatch[1]));
        const statusEl = document.getElementById('trainStatus');
        statusEl.innerText = status;
        statusEl.className = cssClass;
    }

    modal.style.display = 'flex';
}

// ==== CLOSE MODAL ====
function closeModal() {
    const modal = document.getElementById('trainModal');
    if (modal) modal.style.display = 'none';
}

// ==== FILTER STATIONS ====
function filterStations(query) {
    const markers = document.querySelectorAll('.station-marker');
    markers.forEach(marker => {
        const name = marker.getAttribute('data-name') ? .toLowerCase() || '';
        marker.style.display = name.includes(query.toLowerCase()) ? '' : 'none';
    });
}