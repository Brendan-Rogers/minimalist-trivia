// Minimalist Trivia JS
// written by Brendan Rogers
//		https://brendanrogers.online
//		https://thequarantinepost.online
//		https://spacedoge.studio
// using Open Trivia DB
//		https://opentdb.com
(()=>{ console.log('Index is initiated.');

	// FUNCTIONS
	function getTrivia(url) {
		fetch(url)
			.then(resp => resp.json())
			.then(function(data) {
				gotTrivia(data);
			});
	}
	function gotTrivia(trivia) {
		question = trivia.results[0];
		headlineOut.innerHTML = `${question.category.toUpperCase()} - ${question.difficulty.toUpperCase()}`;
		questionOut.innerHTML = question.question;

		// set Correct Question
		let correct_location = Math.floor(Math.random() * Math.floor(4));
		btn[correct_location].innerHTML = question.correct_answer;
		btn[correct_location].value = 1;

		// Iterator for Incorrect Questions (there are 3)
		x = 0;
		// Loop through BUTTONS
		for (i = 0; i < 4; i++) {
			// escape if we're on Correct Answer
			if (i == correct_location) { continue; }
			// button needs a question, so we write the first Wrong Answer to it
			btn[i].innerHTML = question.incorrect_answers[x];
			btn[i].value = 0;
			// increment X, so the next time we have a button to fill, we get the next incorrect answer
			x++;
		}
	}
	// Creates API URL on state change
	function constructURL(amount, category, difficulty) {
		return `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
	}

	// Define default trivia request
	let amount = 1;
	let category = 9;
	let difficulty = 'hard';
	let url = constructURL(amount, category, difficulty);

	// Define output zones
	let headlineOut = document.querySelector("#headline");
	let questionOut = document.querySelector("#question");
	// create button array
	btn1 = document.querySelector("#btn1");
	btn2 = document.querySelector("#btn2");
	btn3 = document.querySelector("#btn3");
	btn4 = document.querySelector("#btn4");
	btn = [btn1, btn2, btn3, btn4];

	// call default trivia
	getTrivia(url);

	// EVENT HANDLING
	btn.forEach((element) => {
		element.addEventListener('click', (element)=> {
				// True or False click
				let result = (element.target.value == 1) ? "True" : "False";
				console.log(result);
				// Make a new question
				getTrivia(url);

		});
	});


	
	
	
})();




