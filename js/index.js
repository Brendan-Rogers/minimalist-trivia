// Minimalist Trivia JS
// written by Brendan Rogers
//		https://brendanrogers.online
//		https://thequarantinepost.online
//		https://spacedoge.studio
// using Open Trivia DB
//		https://opentdb.com
(()=>{ console.log('Index is initiated.');

	// Define scores
	let correct = 0;
	let incorrect = 0;

	// Define default trivia request
	let category = 9;
	let difficulty = 'hard';
	let url = constructURL(category, difficulty);

	// loading variable for CORRECT ANSWER
	let correctAnswer = "";

	// Define output zones
	const headlineOut = document.querySelector("#headline");
	const questionOut = document.querySelector("#question");
	const correctOut = document.querySelector("#correct");
	const incorrectOut = document.querySelector("#incorrect");
	const status = document.querySelector("#status");

	// create button array
	btn1 = document.querySelector("#btn1");
	btn2 = document.querySelector("#btn2");
	btn3 = document.querySelector("#btn3");
	btn4 = document.querySelector("#btn4");
	btn = [btn1, btn2, btn3, btn4];

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
		correctAnswer = question.correct_answer;

		// Load the ANSWERS into BTNs
		switch (question.type) {
			// Load MULTIPLE CHOICE question
			case 'multiple':
				// make Buttons 3 and 4 visible, after TRUE / FALSE question
				btn[2].style.visibility = "visible";
				btn[3].style.visibility = "visible";
				// set Correct Answer in a RANDOM position
				let correct_location = Math.floor(Math.random() * Math.floor(4));
				btn[correct_location].innerHTML = question.correct_answer;
				btn[correct_location].value = 1;

				// Iterator for Incorrect Questions (there are 3)
				x = 0;
				// Loop through BUTTONS
				for (i = 0; i < 4; i++) {
					// escape if we're on CORRECT LOCATION
					if (i == correct_location) { continue; }
					// button needs a question, so we write the first Wrong Answer to it
					btn[i].innerHTML = question.incorrect_answers[x];
					btn[i].value = 0;
					// increment X, so the next time we have a button to fill, we get the next incorrect answer
					x++;
				}
				break;
			// Load TRUE / FALSE question
			case 'boolean':
				// load TRUE / FALSE buttons
				btn[0].innerHTML = "True";
				btn[1].innerHTML = "False";
				btn[2].style.visibility = "hidden";
				btn[3].style.visibility = "hidden";
				// load VALUES based on QUESTION.CORRECT_ANSWER
				if (question.correct_answer){ 
					btn[0].value = 1;
					btn[1].value = 0;
				} else {
					btn[0].value = 0;
					btn[1].value = 1;
				}
				break;
		}		
	}
	// Creates API URL on state change
	function constructURL(category, difficulty) {
		let url = `https://opentdb.com/api.php?amount=1`;
		if (category) {url += `&category=${category}`;}
		if (difficulty) {url += `&difficulty=${difficulty}`;}
		return url;
	}

	// call default trivia
	getTrivia(url);

	// EVENT HANDLING
	btn.forEach((element) => {
		element.addEventListener('click', (element)=> {
				// RESULT is based on value of clicked button, Increment SCORES based on RESULT
				let result = (element.target.value == 1) ? "TRUE" : "FALSE";
				if (result == "TRUE") {
					status.innerHTML = `CORRECT`;
					correct++; 
				} else {
					status.innerHTML = `INCORRECT, the answer was ${correctAnswer.toUpperCase()}`;
					incorrect++; 
				}
				correctOut.innerHTML = correct;
				incorrectOut.innerHTML = incorrect;

				// Prepare new URL from dropdowns
				const categorySelect = document.querySelector('#categories');
				const difficultySelect = document.querySelector('#difficulty');
				category = categorySelect.options[categorySelect.selectedIndex].value;
				difficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
				url = constructURL(category, difficulty);
				// Make a new question
				getTrivia(url);

		});
	});

	// Instantanious Update upon changing dropdowns (expected behaviour?)
	// CATEGORY change
	const categorySelect = document.querySelector('#categories');
	categorySelect.addEventListener('change', (element) => {
		category = categorySelect.options[categorySelect.selectedIndex].value;
		difficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
		let url = constructURL(category, difficulty);
		getTrivia(url);
	});

	// DIFFICULTY change
	const difficultySelect = document.querySelector('#difficulty');
	difficultySelect.addEventListener('change', (element) => {
		category = categorySelect.options[categorySelect.selectedIndex].value;
		difficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
		let url = constructURL(category, difficulty);
		getTrivia(url);
	});

	
	
	// Check for Service Worker / Register Service Worker
	 // if ('serviceWorker' in navigator) { 
	 // 	// register service worker 
	 // 	navigator.serviceWorker.register('/service-worker.js'); 
	 // }
})();




