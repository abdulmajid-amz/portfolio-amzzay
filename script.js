// ===================================
// ANIMASI GSAP SCROLLTRIGGER (FADE-IN UP)
// ===================================
gsap.registerPlugin(ScrollTrigger);
const animateElements = document.querySelectorAll('#about .image, #about .title, #project h2, #project p, #project .slider-container, #mini-game h2, #mini-game p, #mini-game a, #contact h2, #contact p, #contact .group');
animateElements.forEach((el) => {
  gsap.from(el, {
    y: 60,                
    opacity: 0,           
    duration: 1.2,        
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",   
      toggleActions: "play none none reverse" 
    }
  });
});
// DOM Navbar
const menuNav = document.querySelector('#menu-navbar');
const navbarNav = document.querySelector('.navbar-nav');
// Logika navbar
if (menuNav && navbarNav) {
  menuNav.addEventListener('click', (e) => {
    navbarNav.classList.toggle('active');
    menuNav.classList.toggle('active');
    e.preventDefault(); 
  });
  document.addEventListener('click', function (e) {
    if (!menuNav.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove('active');
      menuNav.classList.remove('active');
    }
  });
}
// ===================================
// LOGIKA DARK MODE & ANIMASI OVERLAY
// ===================================
const themeBtn = document.querySelector('#theme-navbar');
const themeIcon = document.querySelector('#theme-navbar ion-icon');
// 1. Cek status tema yang tersimpan di localStorage saat halaman dimuat
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('darkmode');
  // Ubah icon menjadi partly-sunny jika halaman dimuat dengan darkmode
  if (themeIcon) {
    themeIcon.setAttribute('name', 'partly-sunny');
  }
}
// 2. Event Listener saat tombol "ubah tema" diklik dengan efek tirai
if (themeBtn) {
  // Buat elemen overlay tirai secara dinamis
  const overlay = document.createElement('div');
  overlay.className = 'theme-overlay';
  document.body.appendChild(overlay);
  themeBtn.addEventListener('click', (e) => {
    e.preventDefault();    
    // Tentukan warna target berdasarkan status mode saat ini
    const isDark = document.body.classList.contains('darkmode');
    const targetBg = isDark ? '#fafafa' : '#171717';    
    overlay.style.setProperty('--bg-target', targetBg);
    overlay.style.top = '0';
    overlay.style.bottom = 'auto';
    overlay.classList.remove('slide-out');
    overlay.classList.add('slide-down');
    // Ubah tema tepat saat tirai menutupi layar penuh (sesuai durasi transisi 0.6s atau 600ms di style.css)
    setTimeout(() => {
      // Perbaikan class: menggunakan 'darkmode' (tanpa strip)
      document.body.classList.toggle('darkmode');     
      const isDarkModeActive = document.body.classList.contains('darkmode');
      // Ubah ikon tema sesuai status saat ini
      if (themeIcon) {
        if (isDarkModeActive) {
          themeIcon.setAttribute('name', 'partly-sunny');
        } else {
          themeIcon.setAttribute('name', 'cloudy-night');
        }
      }      
      // Simpan pilihan user ke localStorage setelah tema berubah
      if (isDarkModeActive) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }      
      // Gulirkan tirai keluar ke bawah
      overlay.style.top = 'auto';
      overlay.style.bottom = '0';
      overlay.classList.remove('slide-down');
      overlay.classList.add('slide-out');
    }, 600);
  });
}
// ===================================
// ANIMASI TYPING EFFECT (SECTION ABOUT)
// ===================================
const typingElement = document.querySelector('.typing');
// Daftar kata/peran yang ingin ditampilkan bergantian
const words = ["frontend development", "web designer", "ui/ux enthusiast", "freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
function typeEffect() {
  if (!typingElement) return;
  const currentWord = words[wordIndex];
  if (isDeleting) {
    // Menghapus karakter satu per satu
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Mengetik karakter satu per satu
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }
  // Kecepatan ketik (mengetik: 100ms, menghapus: 50ms)
  let typeSpeed = isDeleting ? 50 : 100;
  // Jika kata sudah selesai diketik seluruhnya
  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000; // Tahan selama 2 detik sebelum mulai menghapus
    isDeleting = true;
  } 
  // Jika kata sudah selesai dihapus seluruhnya
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length; // Pindah ke kata berikutnya
    typeSpeed = 500; // Jeda singkat sebelum mengetik kata baru
  }
  setTimeout(typeEffect, typeSpeed);
}
// Jalankan animasi saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    typeEffect();
  }
});
const images = document.querySelectorAll('.slide img');
const zoomOverlay = document.getElementById('zoomOverlay');
const zoomedImg = document.getElementById('zoomedImg');
const judulGambar = document.getElementById('judulGambar');
const deskripsiGambar = document.getElementById('deskripsiGambar');
const closeBtn = document.getElementById('closeBtn');
const navbarElements = document.querySelector('.navbar');
images.forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        zoomedImg.src = img.src;
        zoomedImg.alt = img.alt;
        judulGambar.textContent = img.dataset.judul;
        deskripsiGambar.textContent = img.dataset.deskripsi;
        zoomOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (navbarElements) {
            navbarElements.style.visibility = 'hidden';
            navbarElements.style.pointerEvents = 'none'; // Menonaktifkan interaksi saat tersembunyi
        }
    });
});
function closeZoom() {
    zoomOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    if (navbarElements) {
        navbarElements.style.visibility = 'visible';
        navbarElements.style.pointerEvents = 'auto'; // Mengembalikan interaksi
    }
}
closeBtn.addEventListener('click', closeZoom);
zoomOverlay.addEventListener('click', (e) => {
    if (e.target === zoomOverlay) closeZoom();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
        closeZoom();
    }
});
//form & sweetAlert
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".group");
  if (form) {
    form.addEventListener("submit", async function(event) {
      // Mencegah browser redirect ke halaman JSON
      event.preventDefault(); 
      const formData = new FormData(form);
      try {
        const response = await fetch("https://formsubmit.co/ajax/kenalmajid@gmail.com", {
          method: "POST",
          headers: {
            "Accept": "application/json"
          },
          body: formData
        });
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Berhasil!",
            text: "Pesan berhasil dikirim."
          });
          form.reset();
        } else {
          throw new Error("Gagal mengirim pesan");
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat mengirim pesan."
        });
      }
    });
  }
});