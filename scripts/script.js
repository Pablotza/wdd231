const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');
menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('showing');
});

document.getElementById('currentYear').textContent = new Date().getFullYear();

document.getElementById('lastModified').textContent = "Last Modified: " + document.lastModified;

const courses = [
    { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
    { code: "WDD230", name: "Web Frontend Development I", credits: 3, completed: false },
    { code: "CSE110", name: "Introduction to Programming", credits: 2, completed: true },
    { code: "CSE210", name: "Programming with Classes", credits: 4, completed: false },
    { code: "WDD330", name: "Web Frontend Development II", credits: 3, completed: false },
    { code: "CSE310", name: "Algorithms", credits: 4, completed: false }
];

const coursesContainer = document.getElementById('courses');
const totalCreditsEl = document.getElementById('totalCredits');

function renderCourses(filteredCourses) {
    coursesContainer.innerHTML = '';
    let totalCredits = 0;

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) courseCard.classList.add('completed');

        courseCard.innerHTML = `<h3>${course.code}: ${course.name}</h3><p>Credits: ${course.credits}</p>`;
        coursesContainer.appendChild(courseCard);
        totalCredits += course.credits;
    });

    totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;
}

document.getElementById('all').addEventListener('click', () => {
    renderCourses(courses);
});
document.getElementById('wdd').addEventListener('click', () => {
    renderCourses(courses.filter(c => c.code.startsWith('WDD')));
});
document.getElementById('cse').addEventListener('click', () => {
    renderCourses(courses.filter(c => c.code.startsWith('CSE')));
});

renderCourses(courses);
