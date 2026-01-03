const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        errorMsg.textContent = "All fields are required";
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = data.message || "Login failed";
            return;
        }

        // Store token (backend decides usage)
        localStorage.setItem("token", data.token);

        // Redirect
        window.location.href = "/dashboard.html";

    } catch (err) {
        errorMsg.textContent = "Server not reachable";
    }
});
