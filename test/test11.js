const link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Nunito:400,700|Titan+One|Creepster|Satisfy|Eczar:700');
document.head.appendChild(link);

const body = document.querySelector('body');
const sidebar = body.querySelector('nav');
const toggle = body.querySelector('.toggle');
const searchBtn = body.querySelector('.search-box');
const searchInput = searchBtn.querySelector('input');
const modeSwitch = body.querySelector('.toggle-switch');
const modeText = body.querySelector('.mode-text');
const menuLinks = document.getElementById('menu-links');
const closeMenuBtn = body.querySelector('.close-menu');

let allButtons = []; // Store all buttons for global search

// Toggle sidebar visibility
toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
});

// Close sidebar when search is clicked
searchBtn.addEventListener('click', () => {
    sidebar.classList.remove('close');
});

// Switch between dark and light modes
modeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark');
    modeText.innerText = body.classList.contains('dark') ? 'Light mode' : 'Dark mode';
});

// Completely remove the menu from the DOM when "Close Menu" is clicked
closeMenuBtn.addEventListener('click', () => {
    sidebar.remove(); // Removes the entire sidebar from the DOM
});

// Load sub-buttons and replace current sidebar buttons
function loadSubButtons(category) {
    const subButtons = {
        player: [
          { text: "Edit Level", action: () => alert('Player Option 1') },
          { text: "Free Membership", action: () => alert('Player Option 2') },
          { text: "Get Gold", action: () => alert('Player Option 1') },
          { text: "Morph Forever", action: () => alert('Player Option 2') },
          { text: "Reset Account", action: () => alert('Player Option 1') },
          { text: "Set Grade", action: () => alert('Player Option 2') },
          { text: "Set Health", action: () => alert('Player Option 1') },
          { text: "Set Tower", action: () => alert('Player Option 2') },
          { text: "Skip Tutorial", action: () => alert('Player Option 1') },
          { text: "Spam Effects On People", action: () => alert('Player Option 2') },
          { text: "Max Account", action: () => alert('https://cdn.jsdelivr.net/gh/PXIFusionX/Fusion-Loader@main/Hacks/Max%20account') },
          { text: "Unlimited Spins", action: () => alert('Player Option 1') },
          { text: "Compleate Current Quest", action: () => alert('https://raw.githubusercontent.com/PXIFusionX/Fusion-Loader/main/Hacks/Complete%20Quest') },
          { text: "Unlock Items", action: () => alert('Player Option 2') },
          { text: "Unlock Pets", action: () => alert('Player Option 1') },
          { text: "WalkAnywhere", action: () => alert('Player Option 2') },
          { text: "WalkSpeed", action: () => alert('Player Option 1') },
        ],
        battle: [
            { text: "Damage Hack", action: () => alert('Battle Option 1') },
            { text: "Fill Energy", action: () => alert('Battle Option 2') },
            { text: "Invincibility Hack", action: () => alert('Battle Option 2') },
        ],
       Invintory: [
            { text: "Invintory Stacker", action: () => alert('Battle Option 1') },
            { text: "Clear Invintory", action: () => alert('Battle Option 2') },
            { text: "Selector (Basic)", action: () => alert('Battle Option 2') },
            { text: "Selector (Advanced)", action: () => alert('Battle Option 2') },
            { text: "Remove Item", action: () => alert('Battle Option 2') },
            { text: "Obtain All Furniture", action: () => alert('Battle Option 2') },
            { text: "Save Invintory", action: () => alert('Battle Option 2') },
         ]
    };

    // Clear current buttons
    menuLinks.innerHTML = '';

    // Add the Back button at the top
    const backButton = { text: "Back", icon: "bx bx-arrow-back", action: goBack };
    menuLinks.appendChild(createButtonElement(backButton));

    // Add the selected category's sub-buttons
    subButtons[category].forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    // Update the global button list
    updateAllButtons();

    sidebar.classList.remove('close');
}

// Function for back button behavior
function goBack() {
    loadMainMenu();
}

// Load the main menu (called initially when the page loads)
function loadMainMenu() {
    menuLinks.innerHTML = '';
    const mainButtons = [
        { text: "Player", icon: "bx bx-user", action: () => loadSubButtons('player') },
        { text: "Battle", icon: "bx bx-shield-quarter", action: () => loadSubButtons('battle') },
      { text: "Invintory", icon: "bx bxs-backpack", action: () => loadSubButtons('Invintory') },
      { text: "Pet Hacks", icon: "bx bxs-dog", action: () => loadSubButtons('Invintory') }
    ];

    // Add the buttons to the menu
    mainButtons.forEach(button => {
        const li = createButtonElement(button);
        menuLinks.appendChild(li);
    });

    // Update the global button list
    updateAllButtons();
}

// Helper function to create button elements
function createButtonElement(button) {
    const li = document.createElement('li');
    li.classList.add('nav-link');
    li.innerHTML = `
        <a href="#">
            <i class='bx ${button.icon || ''} icon'></i>
            <span class="text nav-text">${button.text}</span>
        </a>`;
    li.addEventListener('click', button.action);
    return li;
}

// Update the global list of all buttons
function updateAllButtons() {
    allButtons = Array.from(menuLinks.querySelectorAll('li'));
}

// Add search functionality
searchInput.addEventListener('input', () => {
    const filterText = searchInput.value.toLowerCase();

    allButtons.forEach(link => {
        const text = link.querySelector('.nav-text').textContent.toLowerCase();
        if (text.includes(filterText)) {
            link.style.display = ''; // Show the link
        } else {
            link.style.display = 'none'; // Hide the link
        }
    });

    // Ensure Back button stays visible at the top
    const backButton = allButtons.find(link => 
        link.querySelector('.nav-text')?.textContent === "Back"
    );
    if (backButton) {
        backButton.style.display = ''; // Always show Back button
        menuLinks.insertBefore(backButton, menuLinks.firstChild); // Keep Back at the top
    }
});

// Initialize the page with the main menu
loadMainMenu();
