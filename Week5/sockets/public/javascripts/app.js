var url = "/";
var primus = Primus.connect(url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', function(data) {
	var title = document.querySelector(".title--live");
	if (title) {
		title.innerHTML = "Ghost clicked";
	}
});

// klik naar server sturen
document.querySelector('.submit').addEventListener('click', function(e){
	var q = document.querySelector('.question').value;
	var a1 = document.querySelector('.answer1').value;
	var a2 = document.querySelector('.answer2').value;
	var string = [q, a1, a2];
	console.log(string);
	primus.write({ action: string });

	e.preventDefault();
});