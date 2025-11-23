/* Enhanced Vanilla Password Generator */
(() => {
  const $ = s => document.querySelector(s);
  const passwordInput = $("#password");
  const length = $("#length");
  const lenLabel = $("#lenLabel");
  const lower = $("#lower");
  const upper = $("#upper");
  const numbers = $("#numbers");
  const symbols = $("#symbols");
  const avoidSimilar = $("#avoidSimilar");
  const pronounceable = $("#pronounceable");
  const generateBtn = $("#generate");
  const copyBtn = $("#copy");
  const downloadBtn = $("#download");
  const historyList = $("#historyList");
  const clearHistory = $("#clearHistory");
  const themeSelect = $("#themeSelect");
  const toggleTheme = $("#toggleTheme");
  const soundToggle = $("#soundToggle");
  const sfxGen = document.getElementById("sfxGen");
  const sfxCopy = document.getElementById("sfxCopy");

  const ranges = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}<>?,./~`-="
  };
  const similar = /[il1LoO0]/g;

  function saveHistory(pwd){
    if(!pwd) return;
    const list = JSON.parse(localStorage.getItem("pwd_history")||"[]");
    list.unshift({pwd, t: Date.now()});
    if(list.length>50) list.length=50;
    localStorage.setItem("pwd_history", JSON.stringify(list));
    renderHistory();
  }

  function renderHistory(){
    const list = JSON.parse(localStorage.getItem("pwd_history")||"[]");
    historyList.innerHTML = "";
    list.forEach((it, idx) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      span.textContent = it.pwd;
      const btns = document.createElement("div");
      btns.style.display='flex';btns.style.gap='6px';
      const use = document.createElement("button");
      use.textContent = "Use"; use.onclick = ()=> { passwordInput.value = it.pwd; makeToast('Loaded'); };
      const del = document.createElement("button");
      del.textContent = "Del"; del.onclick = ()=> { removeHistory(idx); };
      btns.appendChild(use); btns.appendChild(del);
      li.appendChild(span); li.appendChild(btns);
      historyList.appendChild(li);
    });
  }

  function removeHistory(i){
    const list = JSON.parse(localStorage.getItem("pwd_history")||"[]");
    list.splice(i,1);
    localStorage.setItem("pwd_history", JSON.stringify(list));
    renderHistory();
  }

  function makeToast(msg){
    const t = document.createElement("div");
    t.textContent = msg;
    t.style.position='fixed';t.style.right='12px';t.style.bottom='12px';t.style.padding='8px 12px';
    t.style.background='rgba(0,0,0,0.8)';t.style.color='#fff';t.style.borderRadius='8px';t.style.zIndex=9999;
    document.body.appendChild(t);
    setTimeout(()=> t.style.opacity='0',1400);
    setTimeout(()=> t.remove(),1800);
  }

  length.addEventListener("input", ()=> lenLabel.textContent = length.value);

  function getCharset(){
    let set = "";
    if(lower.checked) set += ranges.lower;
    if(upper.checked) set += ranges.upper;
    if(numbers.checked) set += ranges.numbers;
    if(symbols.checked) set += ranges.symbols;
    if(avoidSimilar.checked) set = set.replace(similar, "");
    return set;
  }

  function generatePronounceable(len){
    const vowels = "aeiou";
    const consonants = "bcdfghjklmnpqrstvwxyz";
    let out = "";
    for(let i=0;i<len;i++){
      out += (i%2===0) ? consonants[Math.floor(Math.random()*consonants.length)] : vowels[Math.floor(Math.random()*vowels.length)];
    }
    return out;
  }

  function generate(){
    const len = Number(length.value);
    if(pronounceable.checked){
      return generatePronounceable(len);
    }
    const charset = getCharset();
    if(!charset) { makeToast("Select at least one set"); return ""; }
    let pwd = "";
    if(window.crypto && crypto.getRandomValues){
      const arr = new Uint32Array(len);
      crypto.getRandomValues(arr);
      for(let i=0;i<len;i++) pwd += charset[arr[i] % charset.length];
    } else {
      for(let i=0;i<len;i++) pwd += charset[Math.floor(Math.random()*charset.length)];
    }
    return pwd;
  }

  generateBtn.addEventListener("click", ()=>{
    const pwd = generate();
    if(!pwd) return;
    passwordInput.value = pwd;
    passwordInput.classList.add("flash");
    setTimeout(()=> passwordInput.classList.remove("flash"),300);
    saveHistory(pwd);
    if(soundToggle.checked){ try{ sfxGen.currentTime=0; sfxGen.play(); }catch(e){} }
  });

  copyBtn.addEventListener("click", async ()=>{
    const txt = passwordInput.value;
    if(!txt) return makeToast("Nothing to copy");
    try{
      await navigator.clipboard.writeText(txt);
      makeToast("Copied");
      if(soundToggle.checked){ try{ sfxCopy.currentTime=0; sfxCopy.play(); }catch(e){} }
    }catch(e){
      makeToast("Copy failed");
    }
  });

  downloadBtn.addEventListener("click", ()=>{
    const txt = passwordInput.value;
    if(!txt) return makeToast("Nothing to save");
    const blob = new Blob([txt],{type:'text/plain'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='password.txt'; a.click(); URL.revokeObjectURL(a.href);
    makeToast('Saved');
  });

  clearHistory.addEventListener("click", ()=>{ localStorage.removeItem("pwd_history"); renderHistory(); makeToast("History cleared"); });

  themeSelect.addEventListener("change", (e)=> {
    document.body.classList.remove('theme-midnight','theme-sunrise','theme-forest','theme-mono');
    const v = e.target.value;
    if(v==='midnight') document.body.classList.add('theme-midnight');
    if(v==='sunrise') document.body.classList.add('theme-sunrise');
    if(v==='forest') document.body.classList.add('theme-forest');
    if(v==='mono') document.body.classList.add('theme-mono');
    localStorage.setItem('pg_theme', v);
  });

  toggleTheme.addEventListener("click", ()=> {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('pg_dark', isDark? '1':'0');
  });

  // load sfx (small embedded base64 fallback if not present)
  function ensureSfx(){
    // audio files placed in sfx/ in zip; browsers will load them if available.
  }

  // init
  (function init(){
    lenLabel.textContent = length.value;
    renderHistory();
    const savedTheme = localStorage.getItem('pg_theme');
    if(savedTheme){ themeSelect.value = savedTheme; themeSelect.dispatchEvent(new Event('change')); }
    const savedDark = localStorage.getItem('pg_dark');
    if(savedDark==='1') document.body.classList.add('dark');
    ensureSfx();
  })();
})();
