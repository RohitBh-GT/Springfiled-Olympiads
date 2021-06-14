var resultSection = document.querySelector(".result-section");

if (resultSection.textContent === 'Given IMEI found') {
    resultSection.style.backgroundColor = 'green';
    resultSection.style.visibility = 'visible';
}
else if(resultSection.textContent === ''){
    
}
else{
    resultSection.style.backgroundColor = 'red';
    resultSection.style.visibility = 'visible';
}
