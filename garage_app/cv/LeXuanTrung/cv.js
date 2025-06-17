const toggle = document.getElementById('themeSwitch');
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('darkmode');
  });


  function focusBannerEdit() {
    const name = document.querySelector(".Profile h1");
    const role = document.querySelector(".Profile h2");
    if (name && role) {
      name.focus();
      setTimeout(() => role.focus(), 500);
    }
  }
