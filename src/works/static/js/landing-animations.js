var datetime = new Date();
let option={hour12:false,hour:"numeric",minute:"2-digit",timeZone:"Europe/London"};


let str = ''


setInterval(function () {
	datetime = new Date();
	str = datetime.toLocaleString('en',{timeStyle: "long",hour12:false});
	document.getElementById("time").textContent = str; 
}, 500);
