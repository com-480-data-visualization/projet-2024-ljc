new fullpage('#fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    sectionsColor: ['#ffb330', '#fff0cb', '#fff0cb', '#fff0cb','#fff0cb'],
    navigation: true,
    slidesNavigation: true,
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'lastPage'],
    navigationTooltips: ['Introduction', 'Your carbon footprint', 'Main problems', 'Fabric comparision', 'Conclusion'],
    loopHorizontal: false,
    dropEffect: true,
});

document.getElementById('part1').addEventListener('click', function() {
    document.getElementById('popup-part1').style.display = 'block'; 
});

document.getElementById('part2').addEventListener('click', function() {
    document.getElementById('popup-part2').style.display = 'block'; 
});

document.getElementById('part3').addEventListener('click', function() {
    document.getElementById('popup-part3').style.display = 'block'; 
});

document.getElementById('part4').addEventListener('click', function() {
    document.getElementById('popup-part4').style.display = 'block'; 
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup-part1')) {
        document.getElementById('popup-part1').style.display = 'none';
    } else if (event.target === document.getElementById('popup-part2')){
        document.getElementById('popup-part2').style.display = 'none';
    } else if (event.target === document.getElementById('popup-part3')){
        document.getElementById('popup-part3').style.display = 'none';
    } else if (event.target === document.getElementById('popup-part4')){
        document.getElementById('popup-part4').style.display = 'none';
    }
});

function closePopup(id) {
    document.getElementById(id).style.display = 'none';
}




