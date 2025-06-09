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

// Handle login form submission
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const loading = document.getElementById("loading");
    const errorMsg = document.getElementById("error");
    loading.classList.remove("hidden");
    errorMsg.classList.add("hidden");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        loading.textContent = "Logging in...";
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        loading.classList.add("hidden");
        errorMsg.textContent = "Invalid email or password.";
        errorMsg.classList.remove("hidden");
        console.error("Login error:", error);
      });
  });
}

// Auto redirect to login if not signed in on dashboard
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// Logout function (you can call logout() in dashboard page if needed)
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
