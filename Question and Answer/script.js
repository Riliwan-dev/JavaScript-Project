/*
  script.js
  - Toggles FAQ active class
  - Replaces font-awesome plus/minus
  - Adds dark mode toggle and "add question" demo
*/

const container = document.getElementById('faqContainer');
const darkToggle = document.getElementById('darkToggle');
const addBtn = document.getElementById('addQ');

// attach events to existing items (delegation)
container.addEventListener('click', (e)=>{
  const qRow = e.target.closest('.question');
  if(!qRow) return;
  const faq = qRow.closest('.faq');
  handleToggle(faq);
});

// keyboard accessibility for Enter/Space
container.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter' || e.key === ' '){
    const qRow = e.target.closest('.question');
    if(!qRow) return;
    e.preventDefault();
    const faq = qRow.closest('.faq');
    handleToggle(faq);
  }
});

// Utility: set icon to plus/minus depending on active
function refreshIcons(root=document){
  root.querySelectorAll('.faq').forEach(faq=>{
    const q = faq.querySelector('.question');
    const icon = faq.querySelector('.icon');
    if(faq.classList.contains('active')){
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
      q.setAttribute('aria-expanded','true');
      faq.querySelector('.answer').hidden = false;
    } else {
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
      q.setAttribute('aria-expanded','false');
      faq.querySelector('.answer').hidden = true;
    }
  });
}

// Close others and open clicked (single-open behavior)
function handleToggle(faq){
  // close others
  document.querySelectorAll('.faq').forEach(item=>{
    if(item !== faq){
      item.classList.remove('active');
      item.querySelector('.answer').hidden = true;
    }
  });

  // toggle current
  faq.classList.toggle('active');
  const answer = faq.querySelector('.answer');
  if(faq.classList.contains('active')){
    answer.hidden = false;
  } else {
    answer.hidden = true;
  }

  refreshIcons();
}

// Dark mode toggle with preference saved to localStorage
function setDark(enabled){
  if(enabled){
    document.body.classList.add('dark');
    darkToggle.setAttribute('aria-pressed','true');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('qa_dark','1');
  } else {
    document.body.classList.remove('dark');
    darkToggle.setAttribute('aria-pressed','false');
    darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.removeItem('qa_dark');
  }
}

darkToggle.addEventListener('click', ()=>{
  const enabled = document.body.classList.contains('dark');
  setDark(!enabled);
});

// restore preference
if(localStorage.getItem('qa_dark')) setDark(true);

// Add question demo (creates a new FAQ item)
let nextId = document.querySelectorAll('.faq').length + 1;
addBtn.addEventListener('click', ()=>{
  const id = nextId++;
  const article = document.createElement('article');
  article.className = 'faq';
  article.setAttribute('data-id', id);
  article.innerHTML = `
    <div class="question" tabindex="0" role="button" aria-expanded="false">
      <h3>New question #${id}?</h3>
      <i class="fa-solid fa-plus icon" aria-hidden="true"></i>
    </div>
    <div class="answer" hidden>
      <p>This is a sample answer for the newly added question. You can replace it with any content.</p>
    </div>
  `;
  container.appendChild(article);
  refreshIcons();
});

// ensure icons reflect initial state
refreshIcons();
