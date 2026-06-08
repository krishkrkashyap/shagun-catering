const images = [
  'images/gallery/DSC00015.JPG',
  'images/gallery/DSC00069.JPG',
  'images/gallery/DSC00123.JPG',
  'images/gallery/DSC00158.JPG',
  'images/gallery/DSC00203.JPG',
  'images/gallery/DSC00259.JPG',
  'images/gallery/DSC00264.JPG',
  'images/gallery/DSC00298.JPG',
  'images/gallery/DSC00355.JPG',
  'images/gallery/_DSC0541.JPG',
  'images/gallery/_DSC0646.JPG',
  'images/gallery/_DSC0658.JPG',
  'images/gallery/_DSC0696.JPG',
  'images/gallery/_DSC0767.JPG',
  'images/gallery/_DSC0786.JPG',
  'images/gallery/IMG_20220110_181153.jpg',
  'images/gallery/IMG_20220110_182001.jpg',
  'images/gallery/IMG_20220110_182322.jpg',
  'images/gallery/IMG_20220110_182329.jpg',
  'images/gallery/IMG_20220110_183812.jpg',
  'images/gallery/IMG_9176.JPG',
  'images/gallery/IMG_9229.JPG',
  'images/gallery/IMG_9258.JPG',
  'images/gallery/IMG_9260.JPG',
  'images/gallery/IMG_9263.JPG',
  'images/gallery/IMG_9300.JPG',
  'images/gallery/IMG_9348.JPG',
  'images/gallery/IMG_9377.JPG',
  'images/gallery/IMG_9386.JPG',
  'images/gallery/IMG_9413.JPG',
  'images/gallery/IMG-20251223-WA0014.jpg',
  'images/gallery/IMG-20251223-WA0015.jpg',
  'images/gallery/IMG-20251223-WA0033.jpg',
  'images/gallery/IMG-20251223-WA0065.jpg',
  'images/gallery/IMG-20251223-WA0085.jpg',
  'images/gallery/IMG-20251223-WA0093.jpg',
  'images/gallery/MRB_3596.jpg',
  'images/gallery/MRB_3657.jpg',
  'images/gallery/MRB_3659.jpg',
  'images/gallery/MRB_3752.jpg',
  'images/gallery/MRB_3759.jpg',
  "images/gallery/WhatsApp Image 2022-11-23 at 9.51.32 PM (2).jpeg",
  "images/gallery/WhatsApp Image 2022-11-24 at 11.00.23 AM (2).jpeg",
  "images/gallery/WhatsApp Image 2022-11-24 at 11.04.15 AM (2).jpeg",
  "images/gallery/WhatsApp Image 2022-11-24 at 11.05.28 AM.jpeg",
  "images/gallery/WhatsApp Image 2022-11-24 at 11.05.32 AM (1).jpeg"
];

let currentSlide = 0;
let slideInterval;

const slideshow = document.getElementById('slideshow');

function ue(s) { return encodeURI(s); }

function initSlideshow() {
  images.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.style.backgroundImage = `url(${ue(src)})`;
    slideshow.appendChild(div);
  });
  startSlideshow();
}

function startSlideshow() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

function nextSlide() {
  const slides = slideshow.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'main-screen') {
    startSlideshow();
  } else {
    clearInterval(slideInterval);
  }
}

document.getElementById('download-packages').addEventListener('click', (e) => {
  e.preventDefault();
  const url = prompt('Paste Google Drive link for Catering Packages 2026:');
  if (url) {
    window.open(url, '_blank');
  }
});

document.getElementById('download-dessert').addEventListener('click', (e) => {
  e.preventDefault();
  const url = prompt('Paste Google Drive link for Dessert Bar Packages:');
  if (url) {
    window.open(url, '_blank');
  }
});

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  images.forEach((src, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.style.backgroundImage = `url(${ue(src)})`;
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
}

function openLightbox(index) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-content" src="${ue(images[index])}" />
    <div class="lightbox-nav">
      <span class="lightbox-prev">&lsaquo;</span>
      <span class="lightbox-next">&rsaquo;</span>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('active'), 10);

  let current = index;

  overlay.querySelector('.lightbox-close').addEventListener('click', () => {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    }
  });

  overlay.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current - 1 + images.length) % images.length;
    overlay.querySelector('.lightbox-content').src = ue(images[current]);
  });

  overlay.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    current = (current + 1) % images.length;
    overlay.querySelector('.lightbox-content').src = ue(images[current]);
  });
}

initSlideshow();
initGallery();
