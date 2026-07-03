mename=document.getElementById("mename")
const form = document.getElementById("formbhar");


mentors=[
    {
        id: 1,
        name: "Rahul Sharma"
    },
    {
        id: 2,
        name: "Ananya Singh"
    },
    {
        id: 3,
        name: "Aarav Kapoor"
    },
    {
        id: 4,
        name: "Priya Verma"
    },
    {
        id: 5,
        name: "Vikas Mehta"
    },
    {
        id: 6,
        name: "Sneha Iyer"
    }

]


const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const mentor=mentors.find(function(person){
    return person.id==id
})

mename.textContent=mentor.name;


form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const data = {
        mentorid: mentor.id,
        mentorname:mentor.name,
    name: document.getElementById("askname").value,
    email: document.getElementById("email").value,
    date: document.getElementById("dates").value,
    time: document.getElementById("time").value
};

const bookBtn = document.getElementById("bookbtn");

bookBtn.disabled = true;
bookBtn.textContent = "Booking...";

const response = await fetch("/book", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
});

const result = await response.json();
console.log(result);

if (result.success) {

    document.getElementById("bookingform").innerHTML = `
        <div class="successCard">

            <div class="tick">✓</div>

            <h2>Booking Requested!</h2>

            <p>Your mentorship session has been successfully requested.</p>

            <div class="summary">
                <p><strong>Mentor:</strong> ${mentor.name}</p>
                <p><strong>Date:</strong> ${data.date}</p>
                <p><strong>Time:</strong> ${data.time}</p>
            </div>

            <p class="emailInfo">
                📧 An email has been sent to
                <strong>${data.email}</strong>
            </p>

            <div class="actions">
                <a href="index.html" class="homeBtn">
                    Back to Home
                </a>

                <button id="againBtn">
                    Book Another Session
                </button>
            </div>

        </div>
    `;

    document.getElementById("againBtn").addEventListener("click", () => {
        location.reload();
    });

}

});

