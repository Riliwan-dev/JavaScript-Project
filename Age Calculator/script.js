// Get DOM elements
const dateInput = document.getElementById('date-input');
const calculateBtn = document.getElementById('calc-age-btn');
const yearsSpan = document.getElementById('years');
const monthsSpan = document.getElementById('months');
const daysSpan = document.getElementById('days');

// Set max date to today so user can't select future dates
dateInput.max = new Date().toISOString().split('T')[0];

calculateBtn.addEventListener('click', calculateAge);

function calculateAge() {
    const dobValue = dateInput.value;

    if (dobValue === "") {
        alert("Please select your date of birth.");
        return;
    }

    const birthDate = new Date(dobValue);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // Adjust for months
    if (ageDays < 0) {
        // Borrow days from previous month
        ageMonths--;
        // Get number of days in the previous month
        let daysInPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += daysInPreviousMonth;
    }

    // Adjust for years
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Display the result
    yearsSpan.textContent = ageYears;
    monthsSpan.textContent = ageMonths;
    daysSpan.textContent = ageDays;
}