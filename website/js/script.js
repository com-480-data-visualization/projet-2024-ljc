new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    sectionsColor: ['#C8D6A2', '#B7CE66', '#C8D6A2', '#B7CE66','#C8D6A2'],//['#ADDCCA', '#DCEBC2', '#FED2B7', '#F7A8A4', '#F58A94'],
    navigation: true,
    slidesNavigation: true,
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'lastPage'],
    navigationTooltips: ['Title', 'First Section', 'Slides', 'Third Section'],
});

document.getElementById('part1').addEventListener('click', function() {
    document.getElementById('popup-part1').style.display = 'block'; 
});

document.getElementById('part2').addEventListener('click', function() {
    window.location.href = 'page2.html'; // Change the URL to your desired page
});

document.getElementById('part3').addEventListener('click', function() {
    window.location.href = 'page3.html'; // Change the URL to your desired page
});

document.getElementById('part4').addEventListener('click', function() {
    window.location.href = 'page4.html'; // Change the URL to your desired page
});


window.addEventListener('click', function(event) {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

function closePopup() {
  popup.style.display = 'none';
}

