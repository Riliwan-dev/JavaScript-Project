// Get references to the input elements
const celsiusInput = document.getElementById('celsius');
const fahrenheitInput = document.getElementById('fahrenheit');

// Function to convert Celsius to Fahrenheit
function celsiusToFahrenheit() {
    // Get Celsius value, convert to a number
    let celsius = parseFloat(celsiusInput.value); 

    // Conversion formula: °F = (°C × 9/5) + 32
    let fahrenheit = (celsius * 9/5) + 32;

    // Update the Fahrenheit input, rounded to 2 decimal places
    if (!isNaN(fahrenheit)) {
        fahrenheitInput.value = fahrenheit.toFixed(2);
    } else {
        fahrenheitInput.value = "";
    }
}

// Function to convert Fahrenheit to Celsius
function fahrenheitToCelsius() {
    // Get Fahrenheit value, convert to a number
    let fahrenheit = parseFloat(fahrenheitInput.value);

    // Conversion formula: °C = (°F − 32) × 5/9
    let celsius = (fahrenheit - 32) * 5/9;

    // Update the Celsius input, rounded to 2 decimal places
    if (!isNaN(celsius)) {
        celsiusInput.value = celsius.toFixed(2);
    } else {
        celsiusInput.value = "";
    }
}

// Initialize the converter when the page loads (optional, for default value)
// Since we set a default value of "0" in HTML for Celsius, we call the conversion to set the Fahrenheit value.
celsiusToFahrenheit();