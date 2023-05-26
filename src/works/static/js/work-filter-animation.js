

const allLabel = document.getElementById("all-label");
allLabel.label = 'all'
const researchLabel = document.getElementById("research-label");
researchLabel.label = 'research'
const artworkLabel = document.getElementById("artwork-label");
artworkLabel.label = 'artwork'
const musicLabel = document.getElementById("music-label");
musicLabel.label = 'music'

allLabel.addEventListener('mouseover', switchHighlight, false);
researchLabel.addEventListener('mouseover', switchHighlight, false);
artworkLabel.addEventListener('mouseover', switchHighlight, false);
musicLabel.addEventListener('mouseover', switchHighlight, false);

allLabel.addEventListener('mouseout', highlightOff, false);
researchLabel.addEventListener('mouseout', highlightOff, false);
artworkLabel.addEventListener('mouseout', highlightOff, false);
musicLabel.addEventListener('mouseout', highlightOff, false);

const allText = document.getElementById("all-text");
allText.label = 'all'
const researchText = document.getElementById("research-text");
researchText.label = 'research'
const artworkText = document.getElementById("artwork-text");
artworkText.label = 'artwork'
const musicText = document.getElementById("music-text");
musicText.label = 'music'


researchText.addEventListener('mouseover', switchHighlight, false);
artworkText.addEventListener('mouseover', switchHighlight, false);
musicText.addEventListener('mouseover', switchHighlight, false);


researchText.addEventListener('mouseout', highlightOff, false);
artworkText.addEventListener('mouseout', highlightOff, false);
musicText.addEventListener('mouseout', highlightOff, false);

var texts = [researchText, artworkText, musicText]
var labels = [researchLabel, artworkLabel, musicLabel]

for (var i = 0; i < 3; i++){
	texts[i].style.transition = '0.3s';
}
allText.style.transition = '0.3s';
allText.className = allText.className == 'None' ? 'all' : allText.className

initText()

function switchHighlight(event){
	// console.log(event.currentTarget.label)

	for (var i = 0; i < 3; i++){
		var colour =  (event.currentTarget.label == texts[i].label) || (event.currentTarget.label == 'all') ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
		texts[i].style.color = colour
		labels[i].style.color = event.currentTarget.label == texts[i].label ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
	}
	var colour = event.currentTarget.label == 'all' ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
	allText.style.color = colour
	allLabel.style.color = colour
}

function highlightOff(e){
	// console.log(allText.className)
	for (var i = 0; i < 3; i++){
		var colour = (allText.className == texts[i].label) || (allText.className == 'all') ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
		texts[i].style.color = colour
		labels[i].style.color = allText.className == labels[i].label ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
	}
	var colour = allText.className == 'all' ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
	allText.style.color = colour
	allLabel.style.color = colour
}

function initText(){
	for (var i = 0; i < 3; i++){
		var colour =  (allText.className == texts[i].label) || (allText.className == 'all') ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
		texts[i].style.color = colour
	}
	allText.style.color = allText.className == 'all' ? 'rgba(20, 20, 20, 1)' : 'rgba(196, 196, 196, 1)'
}


