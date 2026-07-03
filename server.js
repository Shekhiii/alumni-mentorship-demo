require("dotenv").config();
const fs = require("fs");
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

transporter.verify((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("✅ Gmail Connected!");
    }
});

const mentors = [
    {
        id: 1,
        name: "Rahul Sharma",
        domain: "Web Development"
    },
    {
        id: 2,
        name: "Ananya Singh",
        domain: "Product Design"
    },
    {
        id: 3,
        name: "Aarav Kapoor",
        domain: "Cyber Security"
    },
    {
        id: 4,
        name: "Priya Verma",
        domain: "AI Engineering"
    },
    {
        id: 5,
        name: "Vikas Mehta",
        domain: "Cloud Computing"
    },
    {
        id: 6,
        name: "Sneha Iyer",
        domain: "Data Science"
    }
];

app.get("/api/mentors", (req, res) => {
    res.json(mentors);
});

app.get("/api/bookings", (req, res) => {
    const bookings = JSON.parse(
        fs.readFileSync("bookings.json", "utf8")
    );

    res.json(bookings);
});

app.post("/book", async (req, res) => {

    const {
        mentorid,
        mentorname,
        name,
        email,
        date,
        time
    } = req.body;
console.log(req.body);

    try {

        const bookings = JSON.parse(
            fs.readFileSync("bookings.json", "utf8")
        );

        const newBooking = {
            id: Date.now(),
            mentorid,
            mentorname,
            name,
            email,
            date,
            time
        };

        bookings.push(newBooking);

        fs.writeFileSync(
            "bookings.json",
            JSON.stringify(bookings, null, 2)
        );

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "NSUT Mentorship Booking",

            html: `
<div style="font-family:Arial,sans-serif;padding:20px">

<h2 style="color:brown;">NSUT Alumni Mentorship</h2>

<p>Hello <strong>${name}</strong>,</p>

<p>Your mentorship session with <b>${mentorname}</b> has been booked successfully.</p>

<table style="border-collapse:collapse">

<tr>
<td><b>Date:</b></td>
<td>${date}</td>
</tr>

<tr>
<td><b>Time:</b></td>
<td>${time}</td>
</tr>



</table>

<br>

<p>Your request is currently <b>pending approval</b>.</p>

<hr>

<small>
This is an automated email from the NSUT Alumni Mentorship Portal.
</small>

</div>
`
        });

        res.json({
            success: true
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false
        });

    }

});



app.post("/accept", async (req, res) => {

    const { id } = req.body;

    const bookings = JSON.parse(fs.readFileSync("bookings.json", "utf8"));

    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        return res.json({ success: false });
    }

    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: "Booking Accepted 🎉",
        text: `Hi ${booking.name}, your session with ${booking.mentorname} has been ACCEPTED.`
    });

    
    const updated = bookings.filter(b => b.id != id);

    fs.writeFileSync("bookings.json", JSON.stringify(updated, null, 2));

    res.json({ success: true });
});


app.post("/reject", async (req, res) => {

    const { id } = req.body;

    const bookings = JSON.parse(fs.readFileSync("bookings.json", "utf8"));

    const booking = bookings.find(b => b.id == id);

    if (!booking) {
        return res.json({ success: false });
    }

    
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: "Booking Rejected ❌",
        text: `Hi ${booking.name}, your session with ${booking.mentorname} has been REJECTED.`
    });

    
    const updated = bookings.filter(b => b.id != id);

    fs.writeFileSync("bookings.json", JSON.stringify(updated, null, 2));

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
