var map;
var currentLocationIndex = 0;
var locationsVisited = [];

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  // Initialize Leaflet map
  map = L.map("map").setView([51.0259, 4.4773], 14); // Grote Markt Mechelen

  // Add OpenStreetMap tile layer to the map
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Sample locations with challenges (for demonstration)
  var userLocation;
  navigator.geolocation.getCurrentPosition(
    function (position) {
      userLocation = L.latLng(
        position.coords.latitude,
        position.coords.longitude
      );

      var locations = [
        {
          coords: [51.0259, 4.4773],
          challenge: "Solve a riddle at Grote Markt",
        },
        {
          coords: [51.026, 4.476],
          challenge: "Answer a quiz near Grote Markt",
        },
        {
          coords: [51.026, 4.478],
          challenge: "Find hidden treasure near Grote Markt",
        },
        {
          coords: [51.027, 4.476],
          challenge: "Take a photo near Grote Markt",
        },
        {
          coords: [51.025, 4.478],
          challenge: "Record a video near Grote Markt",
        },
      ];

      // Add markers for each location within 10 km of user's current location
      locations.forEach(function (location, index) {
        L.marker(location.coords)
          .addTo(map)
          .bindPopup(location.challenge)
          .on("click", function () {
            if (!locationsVisited.includes(index)) {
              alert("You must visit locations in order!");
            } else if (index === currentLocationIndex) {
              locationsVisited.push(location); // Voeg de volledige locatie toe aan locationsVisited
              showChallenge(location.challenge);
            } else {
              alert("You have already visited this location!");
            }
          });
      });

      // Add marker for user's current location
      L.marker(userLocation, {
        icon: L.icon({
          iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
        }),
      })
        .addTo(map)
        .bindPopup("Your current location")
        .openPopup();

      // Center map to user's location
      map.setView(userLocation, 14);
    },
    function (error) {
      // Handle errors with geolocation
      console.error("Error getting user location:", error.message);
    }
  );
}

function showChallenge(challenge) {
  document.getElementById("challenge").innerHTML = challenge;
}

function showProgress() {
  var progress = "Locations visited: ";
  if (locationsVisited.length === 0) {
    progress += "None";
  } else {
    locationsVisited.forEach(function (location) {
      progress += location.challenge + ", ";
    });
    progress = progress.slice(0, -2); // Verwijder de laatste komma en spatie
  }
  document.getElementById("challenge").innerHTML = progress;
}

console.log(locationsVisited);
