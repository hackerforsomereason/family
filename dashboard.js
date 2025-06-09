// Your Firebase config here
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
const db = firebase.firestore();

// Logout button handler
document.getElementById("logoutBtn").addEventListener("click", () => {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
});

// Redirect to login if not logged in
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
  } else {
    loadAlbums();
  }
});

// Dummy album only
const albumsData = [
  {
    title: "Dummy Album",
    images: [
      "https://via.placeholder.com/150?text=Image+1",
      "https://via.placeholder.com/150?text=Image+2",
      "https://via.placeholder.com/150?text=Image+3",
    ],
  },
];

// Load albums and display them
function loadAlbums() {
  const container = document.getElementById("albumsContainer");
  container.innerHTML = "";

  albumsData.forEach(album => {
    // Create album container
    const albumDiv = document.createElement("div");
    albumDiv.className = "border rounded shadow p-4 mb-6";

    // Album title
    const title = document.createElement("h2");
    title.textContent = album.title;
    title.className = "text-xl font-semibold mb-3 text-[#A8C3A5]";
    albumDiv.appendChild(title);

    // Images grid (flex wrap)
    const imagesDiv = document.createElement("div");
    imagesDiv.className = "flex flex-wrap gap-2";

    album.images.forEach(src => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = album.title;
      img.className = "w-24 h-24 object-cover rounded";
      imagesDiv.appendChild(img);
    });

    albumDiv.appendChild(imagesDiv);
    container.appendChild(albumDiv);
  });
}
