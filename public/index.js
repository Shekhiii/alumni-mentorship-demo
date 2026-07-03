fetch("/api/mentors")
.then(response=>response.json())
.then(data=>{
    console.log(data)
})

const slider = document.getElementById("slider");
const stupor = document.getElementById("stupor");
const adpo = document.getElementById("adpa");
const stuportal=document.getElementById("stuportal")
const adminport=document.getElementById("adminport")

adpo.addEventListener("click", () => {
    slider.style.left = "56%";
    stuportal.classList.remove('view')
    stuportal.classList.add('noview')
    adminport.classList.add('view')
    adminport.classList.remove('noview')
    window.loadBookings();
});

stupor.addEventListener("click", () => {
    slider.style.left = "-2%";
    adminport.classList.remove('view')
    adminport.classList.add('noview')
    stuportal.classList.add('view')
    stuportal.classList.remove('noview')
});