// ============================================================
//  MAISON FOLAKE — salon.js
// ============================================================


// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});


// ---- HAMBURGER MENU ----
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  menuOverlay.classList.toggle('open'); 
  // Lock/unlock background scroll to match the menu's open state
  document.body.classList.toggle('menu-open', mobileMenu.classList.contains('open'));

});

document.querySelectorAll('.mobile-link, .nav-cta, .menu-overlay').forEach(element => {
  element.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuOverlay.classList.remove('open')
  });
});



// ---- SERVICE FILTER (the new pattern) ----
const filterBtns    = document.querySelectorAll('.filter-btn');
const serviceCards   = document.querySelectorAll('.service-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter; // e.g. "hair", "spa", "all"

    // Update active button state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Loop through every card and decide whether to show or hide it
    serviceCards.forEach(card => {
      const category = card.dataset.category;
      const shouldShow = (filter === 'all' || category === filter);

      card.classList.toggle('hidden', !shouldShow);
    });
  });
});

 
// ---- EMAILJS INIT ----
// Initialize with your public key — do this once before any send calls
emailjs.init('h0ekK-33aRgPNd1SX');
 
 
// ---- BOOKING FORM ----
const bookForm    = document.getElementById('bookForm');
const formSuccess = document.getElementById('formSuccess');
 
// Restrict date picker to today or later
const dateInput = document.getElementById('bdate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);
 
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
 
  const btn = bookForm.querySelector('.btn-sage');
  btn.textContent = 'Sending…';
  btn.disabled = true;
 
  // Collect form values — keys match the generic template variables exactly
  const formData = {
    site_name:     'Maison Folake',
    client_name:   document.getElementById('name').value,
    client_contact:document.getElementById('contact').value,
    service:       document.getElementById('category').value,
    date:          document.getElementById('bdate').value,
    time:          document.getElementById('btime').value,
    guests:        document.getElementById('stylist').value || 'No preference',
    notes:         'N/A',
  };
 
  // Send the email using your service, template, and form data
  emailjs.send('service_wd8x0u4', 'template_akoauns', formData)
    .then(() => {
      // SUCCESS — email sent
      formSuccess.textContent = '✓ Booking received — we will confirm by phone or email shortly.';
      formSuccess.classList.add('show');
      btn.textContent = '✓ Booking Confirmed';
      btn.style.background = '#4a5a3e';
      bookForm.querySelectorAll('input, select').forEach(el => el.value = '');
    })
    .catch((error) => {
      // FAILED — show an error message instead of silent failure
      formSuccess.textContent = '✗ Something went wrong. Please call or WhatsApp us directly.';
      formSuccess.style.borderColor = '#c0392b';
      formSuccess.style.color = '#c0392b';
      formSuccess.classList.add('show');
      btn.textContent = 'Try Again';
      btn.disabled = false;
      console.error('EmailJS error:', error);
    });
});

// ---- WHATSAPP BOOKING BUTTON ----
const whatsappBtn = document.getElementById('whatsappBtn');

whatsappBtn.addEventListener('click', () => {
  const name     = document.getElementById('name').value;
  const contact  = document.getElementById('contact').value;
  const category = document.getElementById('category').value;
  const stylist  = document.getElementById('stylist').value || 'No preference';
  const date     = document.getElementById('bdate').value;
  const time     = document.getElementById('btime').value;

  const message =
`Hello Maison Folake! I'd like to book an appointment.

Name: ${name}
Contact: ${contact}
Service: ${category}
Preferred Stylist: ${stylist}
Date: ${date}
Time: ${time}

Please confirm my booking. Thank you!`;

  const url = `https://wa.me/2349168671007?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
});


// ---- SCROLL FADE-IN ----
const fadeTargets = document.querySelectorAll(
  '.service-card, .team-card, .experience-row, .step, .footer-col'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeTargets.forEach(el => fadeObserver.observe(el));


// ---- ACTIVE NAV HIGHLIGHT ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--sage)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));
