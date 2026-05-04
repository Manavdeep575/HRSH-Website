function navigateTo(page) {
  const pages = {
    'home': '/index.html',
    'about': '/about.html',
    'services': '/services.html',
    'contact': '/contact.html',
    'svc-foundations': '/services/foundation.html',
    'svc-talent': '/services/talent_management.html',
    'svc-experience': '/services/employee_experience.html',
    'svc-fractional': '/services/fractional_leadership.html'
  };
  if (pages[page]) window.location.href = pages[page];
}

function toggleMobile() {
  document.getElementById("mobile-menu").classList.toggle("hidden");
}

document.getElementById("mobileToggle").addEventListener("click", toggleMobile);

const mainNav = document.getElementById("main-nav");
const isHomePage = window.location.pathname === '/' || 
                   window.location.pathname.endsWith('index.html');

if (isHomePage) {
  mainNav.classList.add("scrolled");
} else {
  window.addEventListener("scroll", () => {
    mainNav.classList.toggle("scrolled", window.scrollY > 24);
  });
}

function initObserver() {
  const els = document.querySelectorAll(".fade-up:not(.visible)");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  els.forEach((el) => obs.observe(el));
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("submitBtn");
  const ok = document.getElementById("formSuccess");
  const form = e.target;
  
  btn.textContent = "Sending…";
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      ok.classList.remove("hidden");
      form.reset();
      btn.innerHTML = "Send Message";
      btn.disabled = false;
      lucide.createIcons();
    } else {
      btn.textContent = "Something went wrong — try again";
      btn.disabled = false;
    }
  } catch (error) {
    btn.textContent = "Something went wrong — try again";
    btn.disabled = false;
  }
}


document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  initObserver();
});

// Set active nav link based on current page
(function() {
  const path = window.location.pathname;
  let currentPage = 'home';
  
  if (path.includes('about')) currentPage = 'about';
  else if (path.includes('contact')) currentPage = 'contact';
  else if (path.includes('foundation')) currentPage = 'services';
  else if (path.includes('talent')) currentPage = 'services';
  else if (path.includes('experience')) currentPage = 'services';
  else if (path.includes('fractional')) currentPage = 'services';
  else if (path.includes('services')) currentPage = 'services';

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
    }
  });
})();