const adminview = document.getElementById("adminview");

async function loadBookings() {

    const response = await fetch("/api/bookings");
    const bookings = await response.json();

    adminview.innerHTML = "";

    bookings.forEach((booking) => {

        const card = document.createElement("div");
        card.className = "bookingcard";

        card.innerHTML = `
            <h2 class="mentorname">${booking.mentorname}</h2>

            <p><strong>Student:</strong> ${booking.name}</p>

            <p><strong>Email:</strong> ${booking.email}</p>

            <p><strong>Date:</strong> ${booking.date}</p>

            <p><strong>Time:</strong> ${booking.time}</p>

            <p><strong>Status:</strong> ${booking.status || "pending"}</p>

            <div class="btnbox">
                <button class="accept" data-id="${booking.id}">Accept</button>
                <button class="reject" data-id="${booking.id}">Reject</button>
            </div>
        `;

        adminview.appendChild(card);

    });

}
window.loadBookings = loadBookings;

loadBookings();


document.addEventListener("click", async (e) => {

if (e.target.classList.contains("accept")) {

    const button = e.target;
    const card = button.closest(".bookingcard");

    // Disable both buttons
    card.querySelectorAll("button").forEach(btn => btn.disabled = true);

    // Change text
    button.textContent = "Accepting...";

    const id = button.dataset.id;

    await fetch("/accept", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });

    card.classList.add("removing");

    setTimeout(() => {
        loadBookings();
    }, 300);
}

if (e.target.classList.contains("reject")) {

    const button = e.target;
    const card = button.closest(".bookingcard");

    card.querySelectorAll("button").forEach(btn => btn.disabled = true);

    button.textContent = "Rejecting...";

    const id = button.dataset.id;

    await fetch("/reject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
    });

    card.classList.add("removing");

    setTimeout(() => {
        loadBookings();
    }, 300);
}
});