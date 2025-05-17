// DOM elements
const directory = document.getElementById('directory');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

// Toggle grid/list view
gridBtn.addEventListener('click', () => {
    directory.classList.replace('list', 'grid');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
    directory.classList.replace('grid', 'list');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
});

// Toggle mobile menu
menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    menuBtn.textContent = isExpanded ? '☰' : '✕';
});

// Fetch and display members
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching members:', error);
        directory.innerHTML = '<p class="error">Failed to load directory. Please try again later.</p>';
    }
}

function displayMembers(members) {
    directory.innerHTML = '';
    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Map membership levels to labels
        const membershipLabel = {
            1: 'Bronze',
            2: 'Silver',
            3: 'Gold'
        }[member.membership] || 'Unknown';
        card.innerHTML = `
            <span class="membership membership-${member.membership}">${membershipLabel}</span>
            <img src="images/${member.image}" alt="${member.name} logo" onerror="this.src='images/placeholder.png';">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        directory.appendChild(card);
    });
}

// Initialize
getMembers();
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = new Date(document.lastModified).toLocaleString('en-US');