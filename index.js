const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");


// Debounce Function
function debounce(fn, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}


// API Fetch Function
async function searchUsers(searchText) {

    resultsDiv.innerHTML = "Loading...";

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users =  await response.json();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(
            searchText.toLowerCase().trim()
        )
    );

    displayUsers(filteredUsers);
}


// Display Function
function displayUsers(users) {

    resultsDiv.innerHTML = "";

    if (users.length === 0) {
        resultsDiv.innerHTML = "<p>No users found</p>";
        return;
    }

    users.forEach(user => {

        const div = document.createElement("div");

        div.classList.add("user");

        div.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
        `;

        resultsDiv.appendChild(div);
    });
}


// Debounced Version
const debouncedSearch = debounce(searchUsers, 500);


// Event Listener
searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value);
});

