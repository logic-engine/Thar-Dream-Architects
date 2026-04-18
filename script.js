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
  { name: "Contemporary Residence", category: "Modern Houses", size: "45x50", location: "Qasimabad", images: ["https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&w=600"], img: "https://images.pexels.com/ph
