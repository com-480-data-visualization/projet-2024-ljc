function hideOrShowWasteCounter() {
    if (document.getElementById('counter').style.display == 'none') {
        document.getElementById('counter').style.display = 'block';
    } else {
        document.getElementById('counter').style.display = 'none';
    }
}

document.getElementById('part1').addEventListener('click', function() {
    document.getElementById('popup-part1').style.display = 'block'; 
    hideOrShowWasteCounter();
});

document.getElementById('part2').addEventListener('click', function() {
    document.getElementById('popup-part2').style.display = 'block'; 
    hideOrShowWasteCounter();
});

document.getElementById('part3').addEventListener('click', function() {
    document.getElementById('popup-part3').style.display = 'block'; 
    hideOrShowWasteCounter();
});

document.getElementById('part4').addEventListener('click', function() {
    document.getElementById('popup-part4').style.display = 'block';
    hideOrShowWasteCounter();
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup-part1')) {
        document.getElementById('popup-part1').style.display = 'none';
        hideOrShowWasteCounter();
    } else if (event.target === document.getElementById('popup-part2')){
        document.getElementById('popup-part2').style.display = 'none';
        hideOrShowWasteCounter();
    } else if (event.target === document.getElementById('popup-part3')){
        document.getElementById('popup-part3').style.display = 'none';
        hideOrShowWasteCounter();
    } else if (event.target === document.getElementById('popup-part4')){
        document.getElementById('popup-part4').style.display = 'none';
        hideOrShowWasteCounter();
    }
});

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
    hideOrShowWasteCounter();
}


document.addEventListener("DOMContentLoaded", function() {
    let counter = 0;
    const counterButton = document.getElementById("counter");

    setInterval(function() {
        // The world produces 92 million tons of textile waste every year. (https://theroundup.org/textile-waste-statistics/)
        waste_per_second = 92*1e6/365/24/60/60;
        counter+=waste_per_second;
        counterButton.innerText = 'Worldwide textile waste since you opened this page:\n' + Math.round(counter*100)/100 + ' tons';
    }, 1000);
});


