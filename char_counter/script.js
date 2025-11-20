/*
  Real-time character counter
  - UTF-16 aware character counting to correctly count emoji and surrogate pairs
  - Shows words, lines, remaining, progress ring
*/

const textarea = document.getElementById('text');
const charsEl = document.getElementById('chars');
const wordsEl = document.getElementById('words');
const linesEl = document.getElementById('lines');
const remainingEl = document.getElementById('remaining');
const ringArc = document.getElementById('ringArc');
const maxInput = document.getElementById('maxLength');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');
const card = document.querySelector('.card');

function utf16Length(str){
  // Count code points (properly counts emoji)
  return Array.from(str).length;
}

function update(){
  const text = textarea.value;
  const max = Math.max(1, parseInt(maxInput.value) || 280);
  const len = utf16Length(text);
  const words = text.trim().length ? text.trim().split(/\s+/).length : 0;
  const lines = text.split(/\n/).length;

  charsEl.textContent = len;
  wordsEl.textContent = words;
  linesEl.textContent = lines;

  const remaining = max - len;
  remainingEl.textContent = remaining;

  // ring: stroke-dasharray expects values like "X 100" where X is percent
  let pct = Math.min(100, Math.max(0, Math.round((len / max) * 100)));
  ringArc.setAttribute('stroke-dasharray', pct + ' 100');

  // over limit style
  if(len > max){
    card.classList.add('over-limit');
  } else {
    card.classList.remove('over-limit');
  }
}

// debounce for typing to improve perf
let timeout;
textarea.addEventListener('input', ()=>{
  clearTimeout(timeout);
  timeout = setTimeout(update, 20);
});
maxInput.addEventListener('input', update);

// buttons
clearBtn.addEventListener('click', ()=>{
  textarea.value = '';
  update();
  textarea.focus();
});

copyBtn.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText(textarea.value);
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
  }catch(e){
    // fallback
    textarea.select();
    document.execCommand('copy');
    copyBtn.textContent = 'Copied ✓';
    setTimeout(()=> copyBtn.textContent = 'Copy', 1200);
  }
});

// initialize
update();
