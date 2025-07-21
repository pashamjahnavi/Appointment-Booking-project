function toggleForm(type) {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (type === 'login') {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  } else {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }
}

function proceed(event) {
  event.preventDefault();
  document.querySelector('.auth-page').classList.add('hidden');
  document.getElementById('main-content').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.querySelector('.booking-form');
  const serviceSelect = document.getElementById('service-select');
  const addressInput = document.getElementById('service-address');

  const addressMap = {
    doctor: "City Clinic, 1st Cross, Hyderabad",
    salon: "Gloww Salon, Banjara Hills, Hyderabad",
    repair: "Fixit Services, Ameerpet, Hyderabad"
  };

  // Update address when service changes
  serviceSelect.addEventListener('change', function () {
    const selected = this.value;
    addressInput.value = addressMap[selected] || '';
  });

  // Handle form submit
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('input[placeholder="Full Name"]').value;
    const email = this.querySelector('input[placeholder="Email Address"]').value;
    const service = this.querySelector('select').value;
    const address = document.getElementById('service-address').value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelector('input[type="time"]').value;

    const appointment = { name, email, service, address, date, time };
    localStorage.setItem('lastAppointment', JSON.stringify(appointment));

    alert(`✅ Appointment Booked for ${service} at ${address} on ${date} at ${time}`);

    scheduleReminder(date, time, service);
    this.reset();
  });
});

function scheduleReminder(date, time, service) {
  const reminderTime = new Date(`${date}T${time}`);
  const now = new Date();

  const delay = reminderTime - now - 10 * 60 * 1000; // 10 mins before

  if (delay > 0) {
    setTimeout(() => {
      if (Notification.permission === 'granted') {
        new Notification('⏰ Reminder', {
          body: `Your ${service} appointment is in 10 minutes!`,
        });
      }
    }, delay);
  } else {
    console.log('Reminder time is too close or past.');
  }
}

// Ask for notification permission when site loads
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}
