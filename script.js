// PRELOADER
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }, 1000);
});

// ANIMATED COUNTERS
const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  let current = 0;
  const increment = target / 50;
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
};

const observerOptions = { threshold: 0.5 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// STICKY NAVBAR + SMOOTH SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10, 10, 10, 0.98)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
  }
});

document.querySelectorAll('.nav-link, .consult-btn').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('navLinks')?.classList.remove('active');
      }
    }
  });
});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    document.getElementById('navLinks').classList.toggle('active');
  });
}

// PORTFOLIO DATA
const projects = [
  { name: "Modern Glass Villa", category: "Luxury Villas", size: "60x80", location: "Hyderabad", images: ["https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=600", "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=400" },
  { name: "Contemporary Residence", category: "Modern Houses", size: "45x50", location: "Qasimabad", images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=400" },
  { name: "2D Floor Plan - 3 Bedroom", category: "2D Plans", size: "30x40", location: "Latifabad", images: ["https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=400" },
  { name: "3D Elevation - Luxury Home", category: "3D Elevations", size: "50x70", location: "Hyderabad", images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=400" },
  { name: "Minimalist Modern House", category: "Modern Houses", size: "40x60", location: "Hyderabad", images: ["https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&w=400" },
  { name: "Mediterranean Villa", category: "Luxury Villas", size: "80x100", location: "Gulistan-e-Sajjad", images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=400" }
];

function renderPortfolio(filter = "all") {
  const grid = document.getElementById('portfolioGrid');
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="portfolio-item" data-name="${p.name}" data-size="${p.size}" data-location="${p.location}" data-images='${JSON.stringify(p.images)}'>
      <div class="portfolio-img" style="background-image: url('${p.img}');"></div>
      <div class="portfolio-info">
        <h3>${p.name}</h3>
        <p>${p.size} | ${p.location}</p>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
      const name = item.dataset.name;
      const size = item.dataset.size;
      const location = item.dataset.location;
      const images = JSON.parse(item.dataset.images);
      const modal = document.getElementById('projectModal');
      document.getElementById('modalBody').innerHTML = `
        <h2 style="color:#d4af37">${name}</h2>
        <p><strong>Plot Size:</strong> ${size}</p>
        <p><strong>Location:</strong> ${location}</p>
        <div style="margin-top:20px">
          <img src="${images[0]}" style="width:100%; border-radius:12px; margin-bottom:10px;">
          <p style="color:#999">Premium architectural design</p>
        </div>
      `;
      modal.style.display = 'flex';
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPortfolio(btn.dataset.filter);
  });
});
renderPortfolio();

// COMPARE SLIDER (2D to 3D)
const slider = document.getElementById('compareSlider');
const overlay = document.getElementById('compareOverlay');
let isDragging = false;

slider.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const rect = document.querySelector('.compare-image').getBoundingClientRect();
  let x = e.clientX - rect.left;
  x = Math.min(Math.max(x, 0), rect.width);
  const percent = (x / rect.width) * 100;
  overlay.style.width = percent + '%';
  slider.style.left = percent + '%';
});

// TESTIMONIAL SLIDER
let currentTesti = 0;
const testiSlider = document.getElementById('testimonialSlider');
const testiCards = document.querySelectorAll('.testimonial-card');
const prevTesti = document.getElementById('prevTesti');
const nextTesti = document.getElementById('nextTesti');

function updateTestiSlider() {
  testiSlider.style.transform = `translateX(-${currentTesti * 100}%)`;
}
nextTesti.addEventListener('click', () => {
  currentTesti = (currentTesti + 1) % testiCards.length;
  updateTestiSlider();
});
prevTesti.addEventListener('click', () => {
  currentTesti = (currentTesti - 1 + testiCards.length) % testiCards.length;
  updateTestiSlider();
});

// FORM SUBMIT TO WHATSAPP
document.getElementById('designForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const plotSize = document.getElementById('plotSize').value;
  const city = document.getElementById('city').value;
  const requirements = document.getElementById('requirements').value;
  const message = `Hello Thar Dream Architects! I need a design quote.%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Plot Size:* ${plotSize}%0A*City:* ${city}%0A*Requirements:* ${requirements}`;
  window.open(`https://wa.me/923350284710?text=${message}`, '_blank');
});

// DOWNLOAD SAMPLE DESIGN
document.getElementById('downloadSample').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Sample design PDF would download here. In production, provide actual PDF.');
});

// MODAL CLOSE
document.querySelector('.close-modal').addEventListener('click', () => {
  document.getElementById('projectModal').style.display = 'none';
});
window.onclick = (e) => {
  if (e.target === document.getElementById('projectModal')) {
    document.getElementById('projectModal').style.display = 'none';
  }
};

// SCROLL ANIMATIONS
const faders = document.querySelectorAll('.fade-up, .fade-right, .fade-left');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('appear');
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));
