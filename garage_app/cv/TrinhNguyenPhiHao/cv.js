// === Hàm lặp hiệu ứng gõ chữ cho mô tả (có thể gọi ở mọi nơi) ===
function loopTypeEffect(element, texts, delay = 2000) {
  let index = 0;

  function showNext() {
    element.classList.remove("typing-text");
    void element.offsetWidth;
    element.classList.add("typing-text");

    element.textContent = texts[index];
    index = (index + 1) % texts.length;

    setTimeout(showNext, delay);
  }

  showNext();
}

// Khởi tạo hiệu ứng particles
particlesJS('particles-js', {
  particles: {
    number: { value: 100 },
    color: { value: '#ffffff' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: { value: 0.5, random: true, anim: { enable: false } },
    size: { value: 3, random: true, anim: { enable: false } },
    line_linked: {
      enable: true, distance: 150, color: '#ffffff', opacity: 0.7, width: 1.5
    },
    move: { enable: true, speed: 2, direction: 'none', out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' }
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.4 } },
      push: { particles_nb: 4 }
    }
  },
  retina_detect: true
});

const switchToggle = document.getElementById("switch");

function updateParticleColor(theme) {
  const color = theme === "light" ? "#999999" : "#ffffff";
  if (window.pJSDom && window.pJSDom[0]) {
    const pJS = window.pJSDom[0].pJS;
    pJS.particles.line_linked.color = color;
    pJS.particles.color.value = color;
    pJS.fn.particlesRefresh();
  }
}

// Hàm typewriter đơn giản
function typeEffect(element, text, speed = 100, callback = null) {
  let i = 0;
  element.textContent = "";
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) {
      callback();
    }
  }
  typing();
}

window.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "light") {
    document.body.classList.add("light-mode");
    switchToggle.checked = true;
    updateParticleColor("light");
  }

  const nameEl = document.getElementById("typed-name");
  const descEl = document.getElementById("typed-desc");

  typeEffect(nameEl, "Trịnh Nguyễn Phi Hào", 100, () => {
    const descTexts = [
      "Lập trình viên",
      "Thiết kế giao diện",
      "Sáng tạo web",
      "Yêu thích hiệu ứng CSS",
      "Đam mê lập trình Front-End"
    ];
    setTimeout(() => {
      loopTypeEffect(descEl, descTexts, 2500);
    }, 500);
  });

  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar, index) => {
    const percent = bar.getAttribute("data-percent");
    setTimeout(() => {
      bar.style.width = percent;
    }, index * 200);
  });
});

switchToggle.addEventListener("change", () => {
  const isLight = switchToggle.checked;
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
  updateParticleColor(isLight ? "light" : "dark");
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden-section'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => observer.observe(section));
});

document.getElementById('editCVBtn').addEventListener('click', () => {
  document.getElementById('editPopup').style.display = 'flex';
  document.querySelectorAll('#editPopup input, #editPopup textarea').forEach(e => e.value = '');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('editPopup').style.display = 'none';
});

document.getElementById('saveBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const updateIfFilled = (selector, value, prefix = '') => {
    if (value) document.querySelector(selector).innerText = prefix + value;
  };
  const setHrefIfFilled = (selector, value) => {
    if (value) document.querySelector(selector).href = value;
  };

  const newName = document.getElementById('nameInput').value.trim();
  const newDesc = document.getElementById('careerInput').value.trim();

  updateIfFilled('#typed-name', newName);
  setHrefIfFilled('.facebook', document.getElementById('facebookInput').value.trim());
  setHrefIfFilled('.github', document.getElementById('githubInput').value.trim());
  setHrefIfFilled('.tiktok', document.getElementById('tiktokInput').value.trim());
  setHrefIfFilled('.instagram', document.getElementById('instagramInput').value.trim());
  updateIfFilled('#phone-display', document.getElementById('phoneInput').value.trim());
  updateIfFilled('#birthday-display', document.getElementById('birthdayInput').value.trim(), 'Ngày sinh: ');
 const newAddress = document.getElementById('addressInput').value.trim();
if (newAddress !== "") {
  const addressEl = document.getElementById("address-display");
  addressEl.textContent = newAddress;

  const encodedAddress = encodeURIComponent(newAddress);
  addressEl.href = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
}
  updateIfFilled('#about p', document.getElementById('aboutInput').value.trim());
  updateIfFilled('#career p', newDesc);

  const hobbies = document.getElementById('hobbyInput').value.trim();
  if (hobbies) {
    const list = hobbies.split(',').map(x => x.trim());
    const container = document.querySelector('.hobby-grid');
    container.innerHTML = '';
    list.forEach(hobby => {
      const box = document.createElement('div');
      box.className = 'hobby-box';
      box.innerText = hobby;
      container.appendChild(box);
    });
  }

  const skills = document.getElementById('skillInput').value.trim();
  if (skills) {
    const list = skills.split(',').map(x => x.trim());
    const container = document.querySelector('#skills');
    container.querySelectorAll('.skill').forEach(e => e.remove());
    list.forEach(s => {
      const [name, percent] = s.split(':').map(x => x.trim());
      if (name && percent) {
        const div = document.createElement('div');
        div.className = 'skill';
        div.innerHTML = `
          <span>${name}</span>
          <div class="progress">
            <div class="progress-bar" data-percent="${percent}%"></div>
            <span class="percent">${percent}%</span>
          </div>
        `;
        container.appendChild(div);
      }
    });

    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar, index) => {
      const percent = bar.getAttribute("data-percent");
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = percent;
      }, index * 200);
    });
  }

  const projects = document.getElementById('projectInput').value.trim();
  if (projects) {
    const list = projects.split('\n').map(x => x.trim()).filter(x => x.includes(':'));
    const container = document.querySelector('.project-list');
    container.innerHTML = '';
    list.forEach(p => {
      const [title, desc] = p.split(':').map(x => x.trim());
      if (title && desc) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
        container.appendChild(card);
      }
    });
  }

  const avatarFile = document.getElementById('avatarFile').files[0];
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const dataURL = e.target.result;
      document.querySelectorAll('img.avatar, img.nav-avatar').forEach(img => {
        img.src = dataURL;
      });
    };
    reader.readAsDataURL(avatarFile);
  }

  const certValue = document.getElementById('certInput').value.trim();
  if (certValue) {
    document.querySelector('#certificates p').innerText = certValue;
  }

  document.getElementById('editPopup').style.display = 'none';
  const msg = document.getElementById('saveMessage');
  msg.style.display = 'block';
  setTimeout(() => msg.style.display = 'none', 2000);
});

const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  toggleBtn.textContent = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
});

// chuyển cuộc gọi
function updatePhoneNumber(newNumber) {
  document.getElementById("phone-display").innerText = newNumber;
  document.getElementById("phone-link").href = `tel:${newNumber}`;
}
