let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let events = {};

const calendar = document.getElementById('calendar');
const miniCalendar = document.getElementById('miniCalendar');
const eventList = document.getElementById('events');
const currentMonthYear = document.getElementById('currentMonthYear');
const currentMonthYearRight = document.getElementById('currentMonthYearRight');
const currentMonthYearMiddle = document.getElementById('currentMonthYearMiddle');
const modal = document.getElementById('eventDialog');
const span = document.getElementsByClassName('close')[0];

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

document.getElementById('prevMonth').onclick = () => changeMonth(-1);
document.getElementById('nextMonth').onclick = () => changeMonth(1);
document.getElementById('prevMonthRight').onclick = () => changeMonth(-1);
document.getElementById('nextMonthRight').onclick = () => changeMonth(1);
document.getElementById('prevMonthMiddle').onclick = () => changeMonth(-1);
document.getElementById('nextMonthMiddle').onclick = () => changeMonth(1);

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }
    updateCalendar();
}

function updateCalendar() {
    const monthYearText = `${monthNames[currentMonth]} ${currentYear}`;
    currentMonthYear.textContent = monthYearText;
    currentMonthYearRight.textContent = monthYearText;
    currentMonthYearMiddle.textContent = monthYearText;
    generateMiniCalendar(currentYear, currentMonth);
    generateMainCalendar(currentYear, currentMonth);
}

function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function generateMiniCalendar(year, month) {
    miniCalendar.innerHTML = '';
    const days = daysInMonth(year, month);
    for (let i = 1; i <= days; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.dataset.date = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        dayDiv.textContent = i;
        dayDiv.onclick = () => selectDate(dayDiv.dataset.date);
        miniCalendar.appendChild(dayDiv);
    }
}

function generateMainCalendar(year, month) {
    calendar.innerHTML = '';
    const days = daysInMonth(year, month);
    for (let i = 1; i <= days; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.dataset.date = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        dayDiv.innerHTML = `<span class="date">${i}</span><div class="events"></div>`;
        dayDiv.onclick = (event) => openEventForm(event, dayDiv.dataset.date);
        calendar.appendChild(dayDiv);
        // Display any events for this date
        displayEventsInDayBox(dayDiv.dataset.date, dayDiv);
    }
}

function addEvent() {
    const eventDate = document.getElementById('eventDate').value;
    const eventTitle = document.getElementById('eventTitle').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventDescription = document.getElementById('eventDescription').value;

    if (eventDate && eventTitle && eventTime) {
        const event = {
            title: eventTitle,
            time: eventTime,
            description: eventDescription
        };

        if (!events[eventDate]) {
            events[eventDate] = [];
        }
        events[eventDate].push(event);

        displayEvents(eventDate);
        modal.style.display = 'none'; 
        updateCalendar();
    } else {
        alert('Please fill in all fields');
    }
}

function displayEvents(date) {
    const dayEvents = events[date] || [];
    eventList.innerHTML = dayEvents.map(event => `<li><strong>${event.time}</strong>: ${event.title} - ${event.description}</li>`).join('');
}

function displayEventsInDayBox(date, dayDiv) {
    const dayEvents = events[date] || [];
    const eventsDiv = dayDiv.querySelector('.events');
    eventsDiv.innerHTML = dayEvents.map(event => `<div class="event"><strong>${event.time}</strong>: ${event.title}</div>`).join('');
}

function selectDate(date) {
    document.querySelectorAll('#miniCalendar .day').forEach(day => day.classList.remove('selected'));
    document.querySelector(`[data-date="${date}"]`).classList.add('selected');
    displayEvents(date);
}

function openEventForm(event, date) {
    modal.style.display = 'block';
    document.getElementById('eventDate').value = date;
}

updateCalendar();