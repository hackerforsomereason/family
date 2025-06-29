/* global firebase */

// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAGEzElpA_X1Ymae99O5RdeHaLovRwSmf0",
  authDomain: "leefamilysite-742a6.firebaseapp.com",
  projectId: "leefamilysite-742a6",
  storageBucket: "leefamilysite-742a6.appspot.com",
  messagingSenderId: "540312015181",
  appId: "1:540312015181:web:ee8f03ab6bed9a98736704"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ✅ Handle login form
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
      .then((userCredential) => {
        return userCredential.user.getIdToken().then((token) => {
          console.log("JWT Token:", token); // Optional: save or send to backend
          loading.textContent = "Logging in...";
          window.location.href = "dashboard.html";
        });
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
        loading.classList.add("hidden");
        errorMsg.textContent = "Invalid email or password.";
        errorMsg.classList.remove("hidden");
      });
  });
}

// ✅ Auto-redirect back to login if not signed in (on dashboard)
if (window.location.pathname.includes("dashboard.html")) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      setupAutoLogout();
    }
  });
}

// ✅ Logout function
function logout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}

// ✅ Auto logout after 5 minutes of inactivity
function setupAutoLogout() {
  let logoutTimer;
  const AUTO_LOGOUT_TIME = 5 * 60 * 1000; // 5 minutes

  function resetTimer() {
    clearTimeout(logoutTimer);
    logoutTimer = setTimeout(() => {
      alert("Thank you for visiting OurFamilyAlbum. For your safety, you've been automatically logged out after 5 minutes of inactivity.");
      logout();
    }, AUTO_LOGOUT_TIME);
  }

  // Reset timer on user activity
  ["mousemove", "keydown", "touchstart"].forEach((event) => {
    window.addEventListener(event, resetTimer);
  });

  resetTimer(); // Start timer
}
