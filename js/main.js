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
window.addEventListener("scroll", () => {
  mainNav.classList.toggle("scrolled", window.scrollY > 24);
});

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