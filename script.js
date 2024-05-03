function toggleDiv(e) {
  e.preventDefault(); // Prevent default link behavior

  const tabs = document.querySelectorAll('.ntab');
  tabs.forEach(tab => {
    
    tab.classList.remove('active');
    // Get the corresponding div for each tab
    const classname = tab.textContent;
    const div = document.querySelector('.' + classname);
    console.log(div);
    // Hide the div
    div.classList.add('hidden');
    console.log("class list is "+tab.classList);
  });

  const clickedTab = e.target.closest('.ntab');
  clickedTab.classList.add('active');

  // Get the corresponding div for the clicked tab
  const classname = clickedTab.textContent;
  const div = document.querySelector('.' + classname);
  console.log(clickedTab.textContent);
  // Show the div
  div.classList.remove('hidden');
}

document.querySelectorAll('.ntab').forEach(tab => {
  tab.addEventListener('click', toggleDiv);
});

if ("geolocation" in navigator) {
  // Geolocation is available
  navigator.geolocation.getCurrentPosition(function(position) {
    // Retrieve latitude and longitude
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
      
    // Display latitude and longitude on the webpage
    document.getElementById('geo-output').innerHTML = 'Latitude: ' + latitude + ', Longitude: ' + longitude;
    }, function(error) {
    // Handle errors, such as the user denying permission
    var errorMessage = '';
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        errorMessage = "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        errorMessage = "An unknown error occurred.";
        break;
    }
    document.getElementById('geo-output').innerHTML = errorMessage;
  });
} else {
  // Geolocation is not available in this browser
  document.getElementById('geo-output').textContent = "Geolocation is not supported by your browser";
}
  
// Define the text and other variables
const text = "ForeWeather!";
let index = 0;

// Function to simulate typewriter effect
function typeWriter() {
  console.log("typewriter called")
  if (index < text.length) {
    document.getElementById("wel_h1").textContent += text.charAt(index);
    index++;
    setTimeout(typeWriter, Math.random() * 150 + 50); // Adjust typing speed here
  }
}

// Run the function when HTML content is loaded
document.addEventListener("DOMContentLoaded", function() {
  setTimeout(typeWriter, Math.random() * 150 + 50);
});

// Get the form and button elements
const form = document.querySelector("form");
const button = document.getElementById("searchButton");
const search=document.getElementById("searchButton");
form.addEventListener("change", function(){
  var parameters = document.querySelectorAll('input[type="checkbox"]:checked');
  if (parameters.length === 0){
  validate.classList.remove('hidden');
  search.classList.add('hidden');
  }
})
// Add click event listener to the button
button.addEventListener("click", function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Submit the form
    form.submit();
});

function validateForm(form) {
  console.log("validate called");
  // Check if a city is selected
  var city = document.getElementById("in1").value;
  if (city === "default") {
      alert("Please select a city.");
      return false; // Prevent form submission
  }

  // Check if at least one parameter is selected
  var parameters = document.querySelectorAll('input[type="checkbox"]:checked');
  if (parameters.length === 0) {
      alert("Please select at least one parameter.");
      return false; // Prevent form submission
  }
  const validate=document.getElementById("validate");
  validate.classList.add('hidden');
  alert("Form validated, you can now submit!")
  const search=document.getElementById("searchButton");
  search.classList.remove('hidden');
  // All validations passed, allow form submission
  return true;
}
const pic = new Image();
const pic2 = new Image();

pic.src="pexels-bella-white-201200-635279.jpeg";
pic2.src="Beach Waves Night Palm Trees Starry Sky Scenery Wallpaper.jpeg";
document.addEventListener("DOMContentLoaded", function() {
  // Array of image URLs
  var imageUrls = [
      "pexels-bella-white-201200-635279.jpeg",
      "Beach Waves Night Palm Trees Starry Sky Scenery Wallpaper.jpeg",
      "tropical-beach-at-night-with-palm-trees-and-reflection-in-water-bio-luminescence-night-beach-scene-in-maldives-with-bio-luminescent-plankton-illuminating-the-waterline-ai-generated-free-photo.jpeg" 
  ];

  // Counter to keep track of the current image index
  var currentIndex = 0;

  // Function to change background image
  function changeBackground() {
      var myDiv = document.querySelector("body");
      if (myDiv) {
          // Set the background image to the current image URL
          myDiv.style.backgroundImage = "url('" + imageUrls[currentIndex] + "')";

          // Increment the counter
          currentIndex++;

          // Reset the counter to 0 if it exceeds the length of the array
          if (currentIndex >= imageUrls.length) {
              currentIndex = 0;
          }
      }
  }

  setInterval(changeBackground, 5000); // 1000 milliseconds = 1 seconds
});