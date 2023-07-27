

    // Player Greeting
    // create needed constants
    const rememberDiv = document.querySelector('.remember');
    const forgetDiv = document.querySelector('.forget');
    const form = document.querySelector('form');
    const nameInput = document.querySelector('#enterplayer');
    const submitBtn = document.querySelector('#submitplayer');
    const forgetBtn = document.querySelector('#forgetplayer');
    const h1 = document.querySelector('h1');
    const personalGreeting = document.querySelector('.greeting');

    // Stop the form from submitting when a button is pressed
    form.addEventListener('submit', e => e.preventDefault());

    // run function when the 'Say hello' button is clicked
    submitBtn.addEventListener('click', () => {
      // store the entered name in web storage
      localStorage.setItem('name', nameInput.value);
      // run nameDisplayCheck() to sort out displaying the personalised greetings and updating the form display
      nameDisplayCheck();
    });

    // run function when the 'Forget' button is clicked
    forgetBtn.addEventListener('click', () => {
      // Remove the stored name from web storage
      localStorage.removeItem('name');
      // run nameDisplayCheck() to sort out displaying the generic greeting again and updating the form display
      nameDisplayCheck();
    });

    // define the nameDisplayCheck() function
    function nameDisplayCheck() {
      // check whether the 'name' data item is stored in web Storage
      if(localStorage.getItem('name')) {
        // If it is, display personalized greeting
        const name = localStorage.getItem('name');
        h1.textContent = `Welcome, ${name}`;
        personalGreeting.textContent = `Welcome to guess game, ${name}! I hope you have fun while you are here.`;
        // hide the 'remember' part of the form and show the 'forget' part
        forgetDiv.style.display = 'block';
        rememberDiv.style.display = 'none';
      } else {
        // if not, display generic greeting
        h1.textContent = 'Welcome to guess game';
        personalGreeting.textContent = 'We hope you have fun while you are here.';
        // hide the 'forget' part of the form and show the 'remember' part
        forgetDiv.style.display = 'none';
        rememberDiv.style.display = 'block';
      }
    }

    // run nameDisplayCheck() when the page first loads to check wether a personal name was previously
    // set, and if so display the personalized greeting. If not, show the generic greeting
    nameDisplayCheck();

    // Guess number game


    let randomNumber = Math.floor(Math.random() * 100) + 1;
    const guesses = document.querySelector('.guesses');
    const lastResult = document.querySelector('.lastResult');
    const lowOrHi = document.querySelector('.lowOrHi');
    const guessSubmit = document.querySelector('.guessSubmit');
    const guessField = document.querySelector('.guessField');
    let guessCount = 1;
    let resetButton;

    function checkGuess() {
      const userGuess = Number(guessField.value);
      if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
      }

      guesses.textContent += userGuess + ' ';

      if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
      } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        lowOrHi.textContent = '';
        setGameOver();
      } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
          lowOrHi.textContent = 'Last guess was too low, guess higher!' ;
        } else if(userGuess > randomNumber) {
          lowOrHi.textContent = 'Last guess was too high, guess lower!';
        }
      }

      guessCount++;
      guessField.value = '';
      guessField.focus();
    }

    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver() {
      guessField.disabled = true;
      guessSubmit.disabled = true;
      resetButton = document.createElement('button');
      resetButton.textContent = 'Start new game';
      document.body.appendChild(resetButton);
      resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
      guessCount = 1;
      const resetParas = document.querySelectorAll('.resultParas p');
      for (const resetPara of resetParas) {
        resetPara.textContent = '';
      }

      resetButton.parentNode.removeChild(resetButton);
      guessField.disabled = false;
      guessSubmit.disabled = false;
      guessField.value = '';
      guessField.focus();
      lastResult.style.backgroundColor = 'white';
      randomNumber = Math.floor(Math.random() * 100) + 1;
    }


    //Joke API

    const jokeEl = document.getElementById("joke");
    const find_joke = document.getElementById("find_joke");

    // Add EventListener for button clicks

    find_joke.addEventListener('click', generateJoke);

    async function generateJoke() {
      //Call the API
      const jokeRes = await fetch('https://icanhazdadjoke.com/',
      {
        headers: {
          accept: 'application/json'
        }
      });

      const joke = await jokeRes.json();

      console.log(joke);

      //Set Random Jokes
      jokeEl.innerHTML = joke.joke;
    }
    