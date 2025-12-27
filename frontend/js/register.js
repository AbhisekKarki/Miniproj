const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!username || !email || !password || !confirmPassword) {
        errorMsg.textContent = "All fields are required";
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = data.message || "Registration failed";
            return;
        }

        // Optionally store token if backend returns one
        localStorage.setItem("token", data.token);

        // Redirect to login or dashboard
        window.location.href = "/login.html";

    } catch (err) {
        errorMsg.textContent = "Server not reachable";
    }
});
