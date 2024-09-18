// Import Firebase services
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyCgl_RWNOHv5gfJXkJcUH9lWJ3aLDhxeZk",
  authDomain: "green-thumb-fdcee.firebaseapp.com",
  databaseURL: "https://green-thumb-fdcee-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "green-thumb-fdcee",
  storageBucket: "green-thumb-fdcee.appspot.com",
  messagingSenderId: "368499647609",
  appId: "1:368499647609:web:0f10e773a41c1bb982e0a8"
});

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Handle sign-up form submission
$('#signup-form').on('submit', async function(event) {
    event.preventDefault();
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
    const firstName = $('#first-name').val();
    const lastName = $('#last-name').val();

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user.uid);

        // Store additional user data in Firestore
        await addUserToFirestore(email, firstName, lastName, password);

        // Redirect to home.html upon successful sign-up
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error signing up:', error.message);
        // Display error message to the user
    }
});

// Handle sign-in form submission
$('#signin-form').on('submit', async function(event) {
    event.preventDefault();
    const email = $('#signin-email').val();
    const password = $('#signin-password').val();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed in:', user.uid);
        
        // Redirect to home.html upon successful sign-in
        window.location.href = 'home.html';
    } catch (error) {
        console.error('Error signing in:', error.message);
        // Display error message to the user
    }
});

// Monitor authentication state and handle redirection in a more controlled manner
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in');
        // Optionally, redirect to home.html or handle authenticated user state here
        // Commenting out the automatic redirection to prevent unwanted navigation
        // window.location.href = 'home.html'; // Uncomment if needed for auto redirect on page load
    } else {
        console.log('No user signed in');
        // Handle signed out state
    }
});

// Define events globally
const events = [
    { eventName: "Spring Planting Workshop", eventDate: "2024-07-15" },
    { eventName: "Community Garden Cleanup", eventDate: "2024-08-05" },
    { eventName: "Botanical Photography Contest", eventDate: "2024-09-02" },
    { eventName: "Herb Gardening Basics", eventDate: "2024-07-28" },
    { eventName: "Outdoor Yoga in the Park", eventDate: "2024-08-12" },
    { eventName: "Beekeeping Seminar", eventDate: "2024-09-20" },
    { eventName: "Composting 101", eventDate: "2024-07-30" },
    { eventName: "Plant Swap Meet", eventDate: "2024-08-19" },
    { eventName: "DIY Terrarium Workshop", eventDate: "2024-09-10" },
    { eventName: "Sustainable Landscaping Techniques", eventDate: "2024-07-22" },
    { eventName: "Farm-to-Table Cooking Demo", eventDate: "2024-08-08" },
    { eventName: "Indoor Gardening Tips", eventDate: "2024-09-14" },
    { eventName: "Wildflower Seed Bomb Making", eventDate: "2024-07-25" },
    { eventName: "Tree Planting Day", eventDate: "2024-08-31" },
    { eventName: "Water Conservation Workshop", eventDate: "2024-09-05" },
    { eventName: "Edible Plants Walk", eventDate: "2024-07-18" },
    { eventName: "Greenhouse Tour", eventDate: "2024-08-26" },
    { eventName: "Permaculture Principles", eventDate: "2024-09-08" },
    { eventName: "Urban Garden Design", eventDate: "2024-07-29" },
    { eventName: "Birdwatching in the Park", eventDate: "2024-08-15" }
];

// DOMContentLoaded event listener
// DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const eventNameSelect = document.getElementById('eventName');
    const eventDateInput = document.getElementById('eventDate');
    const volunteerForm = document.getElementById('volunteerForm');
    const registeredEventsDiv = document.getElementById('registeredEvents');
    const donationForm = document.getElementById('donationForm');
    const thankYouMessage = document.getElementById('thankYouMessage');

    // Function to populate event names in select options
    function populateEventNames() {
        events.forEach(event => {
            const option = document.createElement('option');
            option.value = event.eventName;
            option.textContent = event.eventName;
            eventNameSelect.appendChild(option);
        });
    }

    // Function to update event date input based on selected event
    function updateEventDate() {
        const selectedEventName = eventNameSelect.value;
        const selectedEvent = events.find(event => event.eventName === selectedEventName);
        if (selectedEvent) {
            eventDateInput.value = selectedEvent.eventDate;
        } else {
            eventDateInput.value = ''; // Clear date input if no event selected
        }
    }

    // Function to add a registered event to the list
    function addRegisteredEvent(eventName, eventDate) {
        const listItem = document.createElement('li');
        listItem.textContent = `${eventName} on ${eventDate}`;
        registeredEventsDiv.appendChild(listItem); // Use registeredEventsDiv to append the listItem
    }

    // Event listener for select change
    
    eventNameSelect.addEventListener('change', updateEventDate);
    // Event listener for volunteer form submission
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const selectedEventName = eventNameSelect.value;
            const selectedEvent = events.find(event => event.eventName === selectedEventName);

            if (selectedEvent) {
                // Display a popup message with the selected event details
                alert(`Don't forget "${selectedEvent.eventName}" on ${selectedEvent.eventDate}`);

                // Add the registered event to the list
                addRegisteredEvent(selectedEvent.eventName, selectedEvent.eventDate);
            }
        });
    }

    // Event listener for donation form submission
    if (donationForm && thankYouMessage) {
        donationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Simulate submitting the form (you can implement actual submission logic here)
            setTimeout(() => {
                donationForm.reset(); // Reset the form fields
                thankYouMessage.style.display = 'block'; // Display the thank you message
            }, 1000); // Simulate a delay of 1 second (1000 milliseconds)
        });
    }

    // Initial population of event names
    populateEventNames();
});
