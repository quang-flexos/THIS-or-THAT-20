const basicModeQuestions = {
  "questions": [
    {
      "context": "Imagine you are planning a dream vacation:",
      "this_or_that": "Beach resort or Mountain cabin?",
      "personality_THIS": "The person who tends to choose Beach resort is likely outgoing, social, and enjoys a vibrant atmosphere. They may appreciate relaxation, water activities, and meeting new people, and they might have a love for sunny and warm environments.",
      "personality_THAT": "The person who tends to choose Mountain cabin is often introspective, calm, and values solitude. They may enjoy nature, hiking, and cozying up with a book by the fireplace, and they might find peace and tranquility in the beauty of the mountains."
    },
    {
      "context": "You are at a carnival and can only pick one ride:",
      "this_or_that": "Roller coaster or Ferris wheel?",
      "personality_THIS": "The person who tends to choose Roller coaster is likely thrill-seeking, adventurous, and enjoys adrenaline rushes. They may have a daring personality, always seeking excitement and intense experiences, and they might be a fan of fast-paced activities.",
      "personality_THAT": "The person who tends to choose Ferris wheel is often laid-back, patient, and enjoys a more relaxed pace. They may appreciate panoramic views, taking things slow, and being present in the moment, and they might find joy in simple pleasures."
    },
    {
      "context": "You're picking a superhero power for yourself:",
      "this_or_that": "Invisibility or Super strength?",
      "personality_THIS": "The person who tends to choose Invisibility is likely introverted, observant, and values privacy. They may have a strategic mind, preferring to work behind the scenes, and they might be curious about understanding others without drawing too much attention.",
      "personality_THAT": "The person who tends to choose Super strength is often assertive, confident, and enjoys taking charge. They may have a desire to help others and protect them, and they might be enthusiastic about using their power to tackle challenges head-on."
    },
    {
      "context": "You're attending a costume party and can only pick one theme:",
      "this_or_that": "Medieval knights or Futuristic space?",
      "personality_THIS": "The person who tends to choose Medieval knights is likely honorable, loyal, and nostalgic. They may have a fascination with history, chivalry, and classic tales of heroism, and they might enjoy dressing up as legendary characters.",
      "personality_THAT": "The person who tends to choose Futuristic space is often innovative, imaginative, and forward-thinking. They may have a love for sci-fi, technology, and the idea of exploring uncharted territories, and they might embrace the possibilities of the future."
    },
    {
      "context": "You're creating your perfect meal:",
      "this_or_that": "Pizza or Sushi?",
      "personality_THIS": "The person who tends to choose Pizza is likely easy-going, sociable, and enjoys comfort food. They may have a preference for variety, and they might enjoy sharing meals with friends and family in a casual setting.",
      "personality_THAT": "The person who tends to choose Sushi is often refined, adventurous, and appreciates fine dining. They may have a taste for unique flavors, and they might enjoy the artistry and precision involved in Japanese cuisine."
    },
    {
      "context": "You're designing your dream home interior:",
      "this_or_that": "Rustic farmhouse or Modern minimalist?",
      "personality_THIS": "The person who tends to choose Rustic farmhouse is likely warm, down-to-earth, and values tradition. They may appreciate a cozy and inviting atmosphere, and they might enjoy incorporating natural elements and vintage touches into their space.",
      "personality_THAT": "The person who tends to choose Modern minimalist is often organized, sleek, and enjoys simplicity. They may have a preference for clean lines and clutter-free spaces, and they might find beauty in the elegance of modern design."
    },
    {
      "context": "You're preparing for a fun day outdoors:",
      "this_or_that": "Picnic at the park or Hiking in the forest?",
      "personality_THIS": "The person who tends to choose Picnic at the park is likely sociable, relaxed, and enjoys leisurely activities. They may have a love for good food and company, and they might find joy in spending time outdoors without strenuous physical activities.",
      "personality_THAT": "The person who tends to choose Hiking in the forest is often adventurous, nature-loving, and physically active. They may enjoy challenging themselves, exploring new trails, and connecting with nature's beauty and serenity."
    },
    {
      "context": "You're adopting a pet:",
      "this_or_that": "Dog or Cat?",
      "personality_THIS": "The person who tends to choose Dog is likely loyal, outgoing, and values companionship. They may enjoy an active lifestyle, and they might find joy in a pet that is playful, affectionate, and forms strong bonds with their owner.",
      "personality_THAT": "The person who tends to choose Cat is often independent, introspective, and values personal space. They may appreciate a more relaxed and low-maintenance pet, and they might admire a cat's grace and ability to be both affectionate and solitary."
    },
    {
      "context": "You're picking a musical instrument to learn:",
      "this_or_that": "Guitar or Piano?",
      "personality_THIS": "The person who tends to choose Guitar is likely artistic, expressive, and enjoys being the center of attention. They may have a passion for music and storytelling, and they might find joy in playing an instrument that is versatile and portable.",
      "personality_THAT": "The person who tends to choose Piano is often disciplined, elegant, and enjoys the beauty of classical music. They may have an appreciation for complexity and precision, and they might find fulfillment in the emotional depth of piano compositions."
    },
    {
      "context": "You're attending a costume party and can only pick one theme:",
      "this_or_that": "Superheroes or Movie villains?",
      "personality_THIS": "The person who tends to choose Superheroes is likely idealistic, brave, and values justice. They may have a desire to be a force for good in the world, and they might admire the heroic traits and struggles of iconic superheroes.",
      "personality_THAT": "The person who tends to choose Movie villains is often charismatic, complex, and enjoys exploring the darker side of human nature. They may appreciate the depth and unpredictability of well-portrayed villains, and they might find excitement in embodying a powerful antagonist."
    },
    {
      "context": "You're picking a gaming experience:",
      "this_or_that": "Open-world exploration or Competitive multiplayer?",
      "personality_THIS": "The person who tends to choose Open-world exploration is likely curious, creative, and enjoys immersive storytelling. They may have a preference for solo adventures, discovering new landscapes, and delving into rich narratives.",
      "personality_THAT": "The person who tends to choose Competitive multiplayer is often competitive, team-oriented, and enjoys testing their skills against others. They may thrive in high-pressure situations and find satisfaction in mastering a game through intense competition."
    }]
};

let currentQuestions;

// Get elements
const startSection = document.querySelector('.start');
const questionsSection = document.querySelector('.questions');
const startBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');
// Get flips
const flips = document.querySelectorAll('.flip');

let preFetchedQuestions = [];
let isNextSetFetched = false;
let preFetchCounter = 0;
const MAX_PREFETCH_ATTEMPTS = 4; // Number of times to pre-fetch

// Define toggleFlip 
function toggleFlip() {
  this.classList.toggle('flipped');
  this.classList.toggle('active'); // Add or remove 'active' class when flipped
}

// Add listeners to flip the cards on each click
flips.forEach(flip => {
  flip.addEventListener('click', toggleFlip);
});

// Flip back
document.addEventListener('transitionend', (e) => {
  if (e.target.classList.contains('flip')) {
    e.target.classList.remove('flipped');
  }
});

// Start THAT button  
startBtn.addEventListener('click', async () => {
  startBtn.classList.add('loading'); // Add the loading class to animate the button
  const { funLevel, difficulty, purpose } = getUserInputs();
  await startGame(funLevel, difficulty, purpose);
  // Hide away start section once the game starts
  startSection.style.display = 'none';
  questionsSection.style.display = 'flex';
});

nextBtn.addEventListener('click', (e) => {
  flips.forEach(flip => {
    // Only flip a card if it's showing the back side
    if (flip.classList.contains("flipped")) {
      flip.click()
    };
  });
  populateThisOrThatQuestions();
});

function populateThisCard(context, question, followUp) {
  document.getElementById("context").textContent = context;
  document.getElementById("this-question").textContent = question;
  document.getElementById("this-question-follow-up").textContent = followUp;
}

function populateThatCard(context, question, followUp) {
  document.getElementById("context").textContent = context;
  document.getElementById("that-question").textContent = question;
  document.getElementById("that-question-follow-up").textContent = followUp;
}

async function populateThisOrThatQuestions() {
  const randomQuestion = currentQuestions.shift();
  const context = randomQuestion.context;

  console.log(currentQuestions);

  const thisQuestion = randomQuestion.this_or_that.split(" or ")[0];
  const thisQuestionFollowUp = randomQuestion.personality_THIS;

  const thatQuestion = randomQuestion.this_or_that.split(" or ")[1].replace("?", "");
  const thatQuestionFollowUp = randomQuestion.personality_THAT;

  populateThisCard(context, thisQuestion, thisQuestionFollowUp);
  populateThatCard(context, thatQuestion, thatQuestionFollowUp);

  // Check if current questions are exhausted
  if (currentQuestions.length == 0) {
    if (isNextSetFetched) {
      // Use pre-fetched questions
      currentQuestions = preFetchedQuestions;
      preFetchedQuestions = [];
      isNextSetFetched = false;
      if (preFetchCounter >= MAX_PREFETCH_ATTEMPTS) {
        preFetchCounter = 0;
      }
    } else if (preFetchCounter < MAX_PREFETCH_ATTEMPTS) {
      document.getElementById("context").textContent = "Wow you are a quick player! We're still retrieving additional questions, so please wait a bit.";
      nextBtn.disabled = true;
    } else {
      // All 20 questions have been viewed
      document.getElementById("context").textContent = "Only 20 questions are allowed at this time";
      nextBtn.disabled = true;
      return;
    }
  }
}


async function startGame(funLevel, difficulty, purpose) {
  document.getElementById("start").textContent = "START";
  currentQuestions = await fetchThisOrThatQuestions(funLevel, difficulty, purpose);
  await populateThisOrThatQuestions();
  // Silently pre-fetch the next set of questions
  preFetchNextSet(funLevel, difficulty, purpose);
}

function getUserInputs() {
  document.getElementById("welcome-message").textContent = "Hold on! We're retrieving your questions. It usually takes about 30 seconds. While you're waiting, reflecting on what made you grateful in the past 3 months is a great way to pass the time!";

  const funLevel = document.getElementById("fun-level").value;
  const difficultySelect = document.getElementById("difficulty");
  const difficulty = difficultySelect.options[difficultySelect.selectedIndex].value;
  const purpose = document.getElementById("needs").value;

  return { funLevel, difficulty, purpose };
}

async function fetchThisOrThatQuestions(funLevel, difficulty, purpose) {
  const response = await fetch("https://this-or-that-ftn1.onrender.com/get_this_or_that_question", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      purpose: purpose,
      difficulty: difficulty,
      fun: funLevel
    })
  });
  if (response.status == 200) {
    let jsonResponse = JSON.parse(await response.json());
    return jsonResponse.questions;
  }
  return [];
}

async function preFetchNextSet(funLevel, difficulty, purpose) {
  const questions = await fetchThisOrThatQuestions(funLevel, difficulty, purpose);
  preFetchedQuestions = questions;
  isNextSetFetched = true;
  console.log("Finish pre-fetching the next set of questions");
  preFetchCounter++;
  if (preFetchCounter < MAX_PREFETCH_ATTEMPTS) {
    preFetchNextSet(funLevel, difficulty, purpose);
  }
  nextBtn.disabled = false;
  document.getElementById("context").textContent = "Additional questions are fetched, why don't you click Next!";
  currentQuestions = currentQuestions.concat(preFetchedQuestions);
}