// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGEzElpA_X1Ymae99O5RdeHaLovRwSmf0",
  authDomain: "leefamilysite-742a6.firebaseapp.com",
  projectId: "leefamilysite-742a6",
  storageBucket: "leefamilysite-742a6.appspot.com",
  messagingSenderId: "540312015181",
  appId: "1:540312015181:web:ee8f03ab6bed9a98736704"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;
  const errorMsg = document.getElementById("signupError");
  const successMsg = document.getElementById("signupSuccess");

  // Hide previous messages
  errorMsg.classList.add("hidden");
  successMsg.classList.add("hidden");

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById("signupForm").reset();
      successMsg.classList.remove("hidden");
    })
    .catch((error) => {
      errorMsg.textContent = error.message;
      errorMsg.classList.remove("hidden");
      console.error("Signup error:", error);
    });

    
});
