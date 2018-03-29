var size1 = 10;
var size2 = 10;
var url = "/";
var primus = Primus.connect(url, {
  reconnect: {
      max: Infinity // Number: The max delay before we try to reconnect.
    , min: 500 // Number: The minimum delay before we try reconnect.
    , retries: 10 // Number: How many times we should try to reconnect.
  }
});

primus.on('data', function(data) {
	if (data.action) {
		var title = document.querySelector(".title--live");
		var a1 = document.querySelector(".answer1--live");
		var a2 = document.querySelector(".answer2--live");

		if (title && a1 && a2) {
			title.innerHTML = data.action[0];
			a1.innerHTML = data.action[1];
			a2.innerHTML = data.action[2];
		}
	}
	
	if (data.add1) {
		var a1 = document.querySelector(".answer1--live");
		a1.style.fontSize = size1 + 10 + "px";
		size1 = size1 + 10;
		console.log(size1);
	}

	if (data.add2) {
		var a2 = document.querySelector(".answer2--live");
		a2.style.fontSize = size2 + 10 + "px";
		size2 = size2 + 10;
		console.log(size2);
	}
});

// kliks naar server sturen
if (document.querySelector('.submit') !== null) {
	document.querySelector('.submit').addEventListener('click', function(e){
		var q = document.querySelector('.question').value;
		var a1 = document.querySelector('.answer1').value;
		var a2 = document.querySelector('.answer2').value;
		var string = [q, a1, a2];
		console.log(string);
		primus.write({ action: string });

		e.preventDefault();
	});
};

if (document.querySelector('.answer1--live') !== null) {
	document.querySelector('.answer1--live').addEventListener('click', function(e) {
		primus.write({add1: 'answer1'});
		e.preventDefault();
	});
};

if (document.querySelector('.answer2--live') !== null) {
	document.querySelector('.answer2--live').addEventListener('click', function(e) {
		primus.write({add2: 'answer2'});
		e.preventDefault();
	});
};

