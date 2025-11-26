const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const steps = document.querySelectorAll('.step');
const currentStepText = document.getElementById('currentStep');

let currentStep = 0;

next.addEventListener('click', () => {
  currentStep++;
  if(currentStep > steps.length) currentStep = steps.length;
  update();
});

prev.addEventListener('click', () => {
  currentStep--;
  if(currentStep < 0) currentStep = 0;
  update();
});

function update() {
  steps.forEach((step, index) => {
    const icon = step.querySelector('.icon');
    if(index < currentStep) {
      step.classList.add('active');
      icon.textContent='✔';
      // Force reflow to restart animation if needed
      icon.style.animation = 'none';
      icon.offsetHeight; // trigger reflow
      icon.style.animation = '';
    } else {
      step.classList.remove('active');
      icon.textContent='✖';
      icon.style.animation = 'none';
    }
  });

  const progressPercent = ((currentStep-1)/(steps.length-1))*100;
  progress.style.width = currentStep === 0 ? '0%' : progressPercent + '%';

  prev.disabled = currentStep === 0;
  next.disabled = currentStep === steps.length;

  currentStepText.textContent = currentStep;
}
