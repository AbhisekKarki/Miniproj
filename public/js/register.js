const form = document.getElementById("registerForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    errorMsg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value; // ⭐ Changed from confirmPassword

    // ⭐ Validate all fields
    if (!username || !email || !password || !password1) {
        errorMsg.textContent = "All fields are required";
        return;
    }

    // ⭐ Check password match
    if (password !== password1) {
        errorMsg.textContent = "Passwords do not match";
        return;
    }

    try {
        // ⭐ FIXED: Use correct port (change 3000 to whatever port you're using)
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // ⭐ FIXED: Send password1 too
            body: JSON.stringify({ username, email, password, password1 })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMsg.textContent = data.error || "Registration failed";
            return;
        }

        // Success! Show message and redirect
        alert(data.message); // Show success message
        window.location.href = "/api/log"; // ⭐ Changed to your login route

    } catch (err) {
        console.error(err);
        errorMsg.textContent = "Server not reachable";
    }
});