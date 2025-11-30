// Modern Photo Gallery JS
const IMAGES = [
  {id:1, file:'images/1.svg', title:'Misty Mountains', tags:['nature']},
  {id:2, file:'images/2.svg', title:'Evening City', tags:['urban']},
  {id:3, file:'images/3.svg', title:'Abstract Waves', tags:['abstract']},
  {id:4, file:'images/4.svg', title:'Golden Forest', tags:['nature']},
  {id:5, file:'images/5.svg', title:'Concrete Lines', tags:['urban','abstract']},
  {id:6, file:'images/6.svg', title:'Portrait Silhouette', tags:['people']},
  {id:7, file:'images/7.svg', title:'Sunset Sea', tags:['nature']},
  {id:8, file:'images/8.svg', title:'Color Burst', tags:['abstract']},
];

const gallery = document.getElementById('gallery');
const search = document.getElementById('search');
const filter = document.getElementById('filter');
const shuffleBtn = document.getElementById('shuffle');
const autoplay = document.getElementById('autoplay');

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbTitle = document.getElementById('lb-title');
const lbTags = document.getElementById('lb-tags');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const downloadBtn = document.getElementById('download');
const fullscreenBtn = document.getElementById('fullscreen');

let currentIndex = 0;
let playInterval = null;

// Render cards
function createCard(imgData, index) {
  const card = document.createElement('article');
  card.className = 'card';
  card.setAttribute('tabindex','0');
  card.dataset.index = index;

  const picture = document.createElement('img');
  picture.dataset.src = imgData.file; // lazy target
  picture.alt = imgData.title;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  const info = document.createElement('div');
  info.className = 'info';
  info.innerHTML = `<strong>${imgData.title}</strong><div style="margin-top:8px">${imgData.tags.map(t => '<span class="tag">'+t+'</span>').join('')}</div>`;

  card.appendChild(picture);
  card.appendChild(overlay);
  card.appendChild(info);

  // click to open lightbox
  card.addEventListener('click', ()=> openLightbox(index));
  card.addEventListener('keydown', (e)=> { if(e.key === 'Enter') openLightbox(index) });

  return card;
}

function renderImages(list){
  gallery.innerHTML='';
  list.forEach((img,i)=> gallery.appendChild(createCard(img,i)));
  lazyLoadInit();
}

// Lazy loading using IntersectionObserver
function lazyLoadInit(){
  const imgs = document.querySelectorAll('img[data-src]');
  const obs = new IntersectionObserver((entries, observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {rootMargin: '200px'});
  imgs.forEach(i=> obs.observe(i));
}

// Open lightbox
function openLightbox(index){
  const img = IMAGES[index];
  currentIndex = index;
  lbImg.src = img.file;
  lbTitle.textContent = img.title;
  lbTags.textContent = img.tags.join(' · ');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  downloadBtn.onclick = ()=> downloadImage(img);
}

// Close
function closeLightbox(){ lightbox.setAttribute('aria-hidden','true'); document.body.style.overflow=''; lbImg.src='';}

// Navigation
function showNext(){ currentIndex = (currentIndex+1)%IMAGES.length; openLightbox(currentIndex);}
function showPrev(){ currentIndex = (currentIndex-1+IMAGES.length)%IMAGES.length; openLightbox(currentIndex);}

// Download image (works for same-origin assets)
function downloadImage(img){
  const a = document.createElement('a');
  a.href = img.file;
  a.download = img.title.replace(/\s+/g,'-')+'.svg';
  a.click();
}

// Fullscreen toggle
fullscreenBtn.addEventListener('click', async ()=>{
  try{
    if(!document.fullscreenElement) await lightbox.requestFullscreen();
    else await document.exitFullscreen();
  }catch(e){console.warn(e)}
});

// Event listeners
closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);
document.addEventListener('keydown', (e)=>{
  if(lightbox.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'Escape') closeLightbox();
  }
});

// Search + filter
function applyFilters(){
  const q = search.value.trim().toLowerCase();
  const tag = filter.value;
  const filtered = IMAGES.filter(i=>{
    const matchesQ = i.title.toLowerCase().includes(q) || i.tags.join(' ').includes(q);
    const matchesTag = tag === 'all' ? true : i.tags.includes(tag);
    return matchesQ && matchesTag;
  });
  renderImages(filtered);
}

search.addEventListener('input', applyFilters);
filter.addEventListener('change', applyFilters);

// Shuffle
shuffleBtn.addEventListener('click', ()=>{
  for(let i=IMAGES.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [IMAGES[i], IMAGES[j]] = [IMAGES[j], IMAGES[i]];
  }
  applyFilters();
});

// Autoplay slideshow: open first and then rotate
autoplay.addEventListener('change', ()=>{
  if(autoplay.checked){
    let i = 0;
    playInterval = setInterval(()=>{
      openLightbox(i % IMAGES.length);
      i++;
    }, 3000);
  } else {
    clearInterval(playInterval);
  }
});

// Initial render
renderImages(IMAGES);
