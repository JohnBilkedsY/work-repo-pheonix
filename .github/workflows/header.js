const events = {
      '6-2025': [5, 12],
      '7-2025': [8, 20]
    };

    const meetings = {
      '6-2025': [10, 22],
      '7-2025': [4, 18]
    };

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    const minYear = currentYear - 5;
    let filterType = 'none';  // Start with no highlights

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    function populateDropdowns() {
      const monthSelect = document.getElementById('monthSelect');
      const yearSelect = document.getElementById('yearSelect');

      monthSelect.innerHTML = '';
      monthNames.forEach((m, idx) => {
        let option = document.createElement('option');
        option.value = idx;
        option.text = m;
        if (idx === currentMonth) option.selected = true;
        monthSelect.appendChild(option);
      });

      yearSelect.innerHTML = '';
      for (let y = currentYear - 5; y <= currentYear + 5; y++) {
        let option = document.createElement('option');
        option.value = y;
        option.text = y;
        if (y === currentYear) option.selected = true;
        yearSelect.appendChild(option);
      }
    }

    function generateCalendar(month, year) {
      const calendarBody = document.getElementById('calendarBody');
      calendarBody.innerHTML = '';

      document.getElementById('monthSelect').value = month;
      document.getElementById('yearSelect').value = year;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      let date = 1;
      for (let i = 0; i < 6; i++) {
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
          let cell = document.createElement('td');

          if (i === 0 && j < firstDay) {
            cell.innerHTML = '';
          } else if (date > daysInMonth) {
            cell.innerHTML = '';
          } else {
            cell.innerHTML = date;

            const eventKey = `${month + 1}-${year}`;
            const isEvent = events[eventKey]?.includes(date);
            const isMeeting = meetings[eventKey]?.includes(date);

            // Apply filter based coloring
            if (filterType === 'event' && isEvent) {
              cell.classList.add('event');
            } else if (filterType === 'meeting' && isMeeting) {
              cell.classList.add('meeting');
            } else if (filterType === 'all') {
              if (isEvent) cell.classList.add('event');
              if (isMeeting) cell.classList.add('meeting');
            }

            // Always show today if in current month/year
            let today = new Date();
            if (date === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()) {
              cell.classList.add('today');
            }

            date++;
          }

          row.appendChild(cell);
        }

        calendarBody.appendChild(row);
      }
     updateButtonStates();

    }

    function prevMonth() {
  if (currentMonth === 0) {
    if (currentYear === minYear) return; // Prevent going back beyond minYear
    currentMonth = 11;
    currentYear--;
  } else {
    currentMonth--;
  }
  generateCalendar(currentMonth, currentYear);
  updateButtonStates();
}



 function nextMonth() {
      currentMonth++;
      if (currentMonth > 11) {
         currentMonth = 0;
         currentYear++;
       }
       generateCalendar(currentMonth, currentYear);
     }

    function jumpTo() {
      currentMonth = parseInt(document.getElementById('monthSelect').value);
      currentYear = parseInt(document.getElementById('yearSelect').value);
      generateCalendar(currentMonth, currentYear);
    }

    // Initialize
    populateDropdowns();
    generateCalendar(currentMonth, currentYear);

    function updateButtonStates() {
  const prevBtn = document.querySelector('button[onclick="prevMonth()"]');
  if (currentYear === minYear && currentMonth === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
}

