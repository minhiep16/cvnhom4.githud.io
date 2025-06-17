// Khởi tạo GSAP và ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Kiểm tra DOM elements
const canvas = document.getElementById('bg-canvas');
const modal = document.getElementById('project-modal');
const projectLinks = document.querySelectorAll('.project-link');
const closeModal = document.querySelector('.modal .close');
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');

// Three.js 3D Background
if (canvas && typeof THREE !== 'undefined') {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Tạo particle system
  const particleCount = 1000;
  const particlesGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 100; // x
    positions[i + 1] = (Math.random() - 0.5) * 100; // y
    positions[i + 2] = (Math.random() - 0.5) * 100; // z
    colors[i] = 0.13; // R (34/255)
    colors[i + 1] = 0.83; // G (211/255)
    colors[i + 2] = 0.84; // B (214/255)
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  });

  const particles = new THREE.Points(particlesGeometry, particleMaterial);
  scene.add(particles);

  camera.position.z = 30;

  // Tương tác chuột
  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    particles.rotation.y += 0.002;
    particles.rotation.x += 0.001;
    camera.position.x += (mouseX * 10 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 10 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
  }
  animate();

  // Xử lý resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Chuyển đổi chế độ sáng/tối
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeToggle.querySelector('i').classList.toggle('fa-moon');
      themeToggle.querySelector('i').classList.toggle('fa-sun');
      const newColors = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        if (document.body.classList.contains('dark-theme')) {
          newColors[i] = 0.08; // R (20/255)
          newColors[i + 1] = 0.39; // G (100/255)
          newColors[i + 2] = 0.47; // B (120/255)
        } else {
          newColors[i] = 0.13; // R (34/255)
          newColors[i + 1] = 0.83; // G (211/255)
          newColors[i + 2] = 0.84; // B (214/255)
        }
      }
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(newColors, 3));
    });
  }
} else {
  console.error('Canvas hoặc Three.js không khả dụng.');
}

// Hiệu ứng quả lắc cho biểu tượng
gsap.to('.pendulum-icon', {
  rotation: 15,
  transformOrigin: 'top center',
  repeat: -1,
  yoyo: true,
  duration: 1.2,
  ease: 'power1.inOut'
});

// Hiệu ứng stagger cho các nút liên hệ
gsap.from('.btn', {
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power2.out',
  delay: 0.5
});

// Hiệu ứng hover nhóm nút liên hệ
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn, index) => {
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, { scale: 1.2, duration: 0.3, ease: 'power2.out' });
    buttons.forEach((otherBtn, otherIndex) => {
      if (otherIndex !== index) {
        gsap.to(otherBtn, { scale: 0.9, duration: 0.3, ease: 'power2.out' });
      }
    });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(buttons, { scale: 1, duration: 0.3, ease: 'power2.out' });
  });
});

// Hiệu ứng progress bar
gsap.utils.toArray('.group-item > div').forEach(item => {
  gsap.to(item.querySelector('.kn'), {
    width: item.dataset.width,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 80%',
    }
  });
});

// Hiệu ứng scroll reveal cho section
gsap.utils.toArray('section').forEach(section => {
  gsap.fromTo(section, {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    }
  });
});

// Modal dự án
if (modal && projectLinks && closeModal) {
  projectLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      gsap.fromTo('.modal-content', {
        opacity: 0,
        scale: 0.8
      }, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    });
  });

  closeModal.addEventListener('click', () => {
    gsap.to('.modal-content', {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      gsap.to('.modal-content', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });

  // Đóng modal bằng phím Esc
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      gsap.to('.modal-content', {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          modal.style.display = 'none';
          modal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });
} else {
  console.error('Một hoặc nhiều phần tử DOM không tìm thấy.');
}

// Hamburger menu
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.textContent = nav.classList.contains('active') ? '×' : '☰';
  });
}

  // Typing Effect
    const typingText = document.getElementById('typing-text');
    const typingSubtext = document.getElementById('typing-subtext');
    const texts = ['Xin chào', 'Tôi là Nông Hoàng Minh Hiệp' ];
    let index = 0, charIndex = 0;

    function type() {
        if (!typingText) return;
        if (charIndex < texts[index].length) {
            typingText.textContent += texts[index].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                charIndex = 0;
                typingText.textContent = '';
                index = (index + 1) % texts.length;
                if (index === 0 && typingSubtext) {
                    typingSubtext.textContent = '';
                } else if (typingSubtext) {
                    typingSubtext.textContent = '';
                }
                type();
            }, 2000);
        }
    }
    setTimeout(type, 500);
