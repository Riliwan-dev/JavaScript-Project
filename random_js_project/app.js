document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('output').textContent = 
    "Random number: " + Math.floor(Math.random()*1000);
});
