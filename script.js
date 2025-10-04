// ===== PART 2: JAVASCRIPT FUNCTIONS =====

// Global variable to demonstrate scope
let globalCounter = 0;

/**
 * Calculates the area of a rectangle
 * @param {number} width - The width of the rectangle
 * @param {number} height - The height of the rectangle
 * @returns {number} The calculated area
 */
function calculateArea(width, height) {
    // Local variables - only accessible within this function
    const area = width * height;
    return area;
}

/**
 * Increments and returns the global counter
 * Demonstrates global scope modification
 * @returns {number} The updated counter value
 */
function incrementCounter() {
    globalCounter++;
    return globalCounter;
}

/**
 * Formats text based on specified style
 * @param {string} text - The text to format
 * @param {string} style - The formatting style ('uppercase', 'lowercase', 'capitalize')
 * @returns {string} The formatted text
 */
function formatText(text, style = "normal") {
    let formattedText;
    
    switch(style) {
        case "uppercase":
            formattedText = text.toUpperCase();
            break;
        case "lowercase":
            formattedText = text.toLowerCase();
            break;
        case "capitalize":
            formattedText = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            break;
        default:
            formattedText = text;
    }
    
    return formattedText;
}

/**
 * Generates a random hex color
 * @returns {string} A random hex color code
 */
function getRandomColor() {
    const hexChars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexChars[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Applies a random color to an element and returns the color
 * @param {string} elementId - The ID of the element to color
 * @returns {string} The applied color
 */
function applyRandomColor(elementId) {
    const element = document.getElementById(elementId);
    const color = getRandomColor();
    element.style.background = color;
    return color;
}

/**
 * Demonstrates function composition by creating a color palette
 * @param {number} count - Number of colors to generate
 * @returns {string[]} Array of color codes
 */
function generateColorPalette(count = 5) {
    const palette = [];
    for (let i = 0; i < count; i++) {
        palette.push(getRandomColor());
    }
    return palette;
}

// ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT =====

/**
 * Flips a card element by toggling CSS classes
 * @param {string} cardId - The ID of the card element
 */
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('flipped');
}

/**
 * Shows modal with animation
 */
function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    // Use setTimeout to ensure the display change is processed before adding the class
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * Hides modal with animation
 */
function hideModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500);
}

/**
 * Toggles loading animation
 * @returns {boolean} Whether loading is now running
 */
function toggleLoading() {
    const progressBar = document.getElementById('loadingProgress');
    const isRunning = progressBar.style.width === '100%';
    
    if (isRunning) {
        progressBar.style.width = '0%';
    } else {
        progressBar.style.width = '100%';
    }
    
    return !isRunning;
}

/**
 * Triggers shake animation on element
 * @param {string} elementId - The ID of the element to animate
 */
function triggerShakeAnimation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove('shake');
    // Trigger reflow
    void element.offsetWidth;
    element.classList.add('shake');
}

/**
 * Toggles rotation animation on element
 * @param {string} elementId - The ID of the element to animate
 */
function toggleRotation(elementId) {
    const element = document.getElementById(elementId);
    element.classList.toggle('rotate');
}

// ===== EVENT LISTENERS AND INITIALIZATION =====

document.addEventListener('DOMContentLoaded', function() {
    // Part 2: Function demonstrations
    document.getElementById('calculateBtn').addEventListener('click', function() {
        const area = calculateArea(15, 20);
        document.getElementById('functionResult').innerHTML = 
            `The area of a rectangle with width 15 and height 20 is: <strong>${area}</strong>`;
    });
    
    document.getElementById('formatTextBtn').addEventListener('click', function() {
        const originalText = "Hello, this is a Sample Text!";
        const formatted = formatText(originalText, "capitalize");
        document.getElementById('functionResult').innerHTML = 
            `Original: "${originalText}"<br>Formatted: "${formatted}"`;
    });
    
    document.getElementById('randomColorBtn').addEventListener('click', function() {
        const color = applyRandomColor('functionResult');
        const palette = generateColorPalette(3);
        document.getElementById('functionResult').innerHTML = 
            `Applied random color: <strong>${color}</strong> to this element.<br>
             Color palette: ${palette.join(', ')}`;
    });
    
    document.getElementById('counterBtn').addEventListener('click', function() {
        const count = incrementCounter();
        document.getElementById('functionResult').innerHTML = 
            `Global counter value: <strong>${count}</strong><br>
             This demonstrates global scope - the counter persists between function calls.`;
    });
    
    // Part 3: Combined interactions
    document.getElementById('card1').addEventListener('click', function() {
        flipCard('card1');
    });
    
    document.getElementById('card2').addEventListener('click', function() {
        flipCard('card2');
    });
    
    document.getElementById('openModalBtn').addEventListener('click', showModal);
    
    document.getElementById('closeModal').addEventListener('click', hideModal);
    
    document.getElementById('modal').addEventListener('click', function(e) {
        if (e.target === this) {
            hideModal();
        }
    });
    
    document.getElementById('toggleLoadingBtn').addEventListener('click', function() {
        const isRunning = toggleLoading();
        this.textContent = isRunning ? 'Stop Loading' : 'Start Loading';
    });
    
    document.getElementById('animateBoxBtn').addEventListener('click', function() {
        triggerShakeAnimation('jsAnimatedBox');
        // Also toggle rotation
        toggleRotation('jsAnimatedBox');
    });
    
    // Initialize with some animations
    setTimeout(() => {
        triggerShakeAnimation('jsAnimatedBox');
    }, 1000);
});

// Additional utility function demonstrating closure
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

// Example usage of closure (can be tested in console)
const double = createMultiplier(2);
const triple = createMultiplier(3);