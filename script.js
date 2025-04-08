let hasCounted = false; // Flag, um sicherzustellen, dass nur einmal gezählt wird

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function countUp(element) {
    const targetNumber = parseInt(element.querySelector('h2').innerText, 10);
    let currentNumber = 0;

    const interval = setInterval(() => {
        if (currentNumber < targetNumber) {
            currentNumber++;
            element.querySelector('h2').innerText = currentNumber;
        } else {
            clearInterval(interval);
        }
        
    },1500/(targetNumber)); // Geschwindigkeit der Zählung (in Millisekunden)
}

function checkCounting() {
    const elements = document.querySelectorAll('.zahleninhalt');
    if (!hasCounted) {
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                countUp(element);
                hasCounted = true; // verhindert mehrfaches Zählen
            }
        });
    }
}

// Event Listener für Scroll und Resize
window.addEventListener('scroll', checkCounting);
window.addEventListener('resize', checkCounting);

// Überprüfen, ob die Elemente beim Laden bereits im Viewport sind
document.addEventListener('DOMContentLoaded', checkCounting);

document.addEventListener("DOMContentLoaded", function() {
    // Holen Sie sich die h1-Überschrift
    let header = document.querySelector("h1");
    let stickyOffset = header.offsetTop; // Ursprünglicher Offset speichern 

    window.onscroll = function() {
        // Überprüfen des Scroll-Offsets
        if (window.pageYOffset > stickyOffset) {
            header.classList.add("sticky"); // Füge die sticky-Klasse hinzu, wenn der Scroll-Zustand erreicht ist
        } else {
            header.classList.remove("sticky"); // Entferne die sticky-Klasse, wenn die ursprüngliche Position erreicht wird
        }
    };
});