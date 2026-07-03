let name=document.getElementById("name")
let company=document.getElementById("company")
let experience=document.getElementById("experience")
let domain=document.getElementById("domain")
let email=document.getElementById("email")
let about=document.getElementById("about")
let photu=document.getElementById("photu")


const mentors = [
    {
        id: 1,
        name: "Rahul Sharma",
        company: "Software Engineer - Google",
        experience: "5 Years",
        domain: "Web Development",
        email: "rahul.sharma@google.com",
        about: "Passionate about full-stack development and helping students build industry-ready projects.",
        image: "Rahul.png"
    },

    {
        id: 5,
        name: "Vikas Mehta",
        company: "Cloud Engineer - Microsoft",
        experience: "4 Years",
        domain: "Cloud Computing",
        email: "vikas.mehta@microsoft.com",
        about: "Works with Azure cloud services and enjoys mentoring students interested in DevOps and cloud technologies.",
        image: "Vikas.png"
    },

    {
        id: 3,
        name: "Aarav Kapoor",
        company: "Cybersecurity Analyst - Deloitte",
        experience: "6 Years",
        domain: "Cybersecurity",
        email: "aarav.kapoor@deloitte.com",
        about: "Specializes in ethical hacking, network security, and career guidance for aspiring cybersecurity professionals.",
        image: "Screenshot 2026-07-01 221211.png"
    },

    {
        id: 4,
        name: "Priya Verma",
        company: "AI Engineer - Amazon",
        experience: "5 Years",
        domain: "Artificial Intelligence",
        email: "priya.verma@amazon.com",
        about: "Builds machine learning solutions and enjoys simplifying AI concepts for beginners.",
        image: "Screenshot 2026-07-01 221405.png"
    },

    {
        id: 2,
        name: "Ananya Singh",
        company: "Product Designer - Adobe",
        experience: "4 Years",
        domain: "UI/UX Design",
        email: "ananya.singh@adobe.com",
        about: "Designs intuitive digital experiences and mentors students in Figma, design thinking, and product design.",
        image: "Screenshot 2026-07-01 221410.png"
    },

    {
        id: 6,
        name: "Sneha Iyer",
        company: "Data Scientist - Flipkart",
        experience: "5 Years",
        domain: "Data Science",
        email: "sneha.iyer@flipkart.com",
        about: "Works on recommendation systems and data-driven products while mentoring students in Python and analytics.",
        image: "Screenshot 2026-07-01 221415.png"
    }
];

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

console.log(id);

const mentor=mentors.find(function(person){
    return person.id==id
})

photu.src=mentor.image
name.textContent=mentor.name;
company.textContent=mentor.company;
experience.textContent=mentor.experience;
domain.textContent=mentor.domain;
email.textContent=mentor.email;
about.textContent=mentor.about;