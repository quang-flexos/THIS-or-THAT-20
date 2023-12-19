// All modes
const mode = {
  "categories": [
    {
      "category": "Food and Drink",
      "questions": [
        "Cooking or being cooked for",
        "Store-bought or homemade",
        "Coffee or tea",
        "Beer or wine",
        "Sweet or savory",
        "Spicy or sweet",
        "Barbecue or vegetarian",
        "Chocolate or vanilla",
        "Ice cream or cake",
        "French fries or onion rings",
        "Tacos or sushi",
        "Pancakes or waffles",
        "Smoothies or juice",
        "Coca or Pepsi",
        "Cheesecake or tiramisu",
        "Ramen or Pho",
        "Ice cream or frozen yogurt",
        "Tacos or burritos",
        "Chocolate chip cookies or brownies"
      ]
    },
    {
      "category": "Work and Personal",
      "questions": [
        "Early bird or night owl",
        "Hybrid or remote work",
        "Start work late or leave work early",
        "Virtual meeting or face-to-face meeting",
        "Introvert or extrovert",
        "Team player or independent worker",
        "Coffee breaks or meditation breaks",
        "Structured routine or flexible schedule",
        "Windows or macOS",
        "Formal attire or casual wear",
        "Multitasking or single-task focus",
        "Project management software or handwritten to-do lists",
        "Fast-paced startup or established corporate environment",
        "Working in a quiet environment or in a bustling space",
        "Slack emojis or memes",
        "\"Bring Your Pet to Work\" days or \"Bring Your Child to Work\"",
        "Morning meetings or afternoon meetings",
        "Solving problems independently or seeking helps",
        "Spontaneity or planning ahead",
        "Embracing change and adaptability or sticking to established routines",
        "Dance uncontrollably when music plays or be forced to hug everyone you meet",
        "Wake up with a new hairstyle every day or a new colored skin every day"
      ]
    },
    {
      "category": "Hobby and Interest",
      "questions": [
        "Vacation or staycation",
        "Piano or guitar",
        "Breakfast or brunch",
        "Netflix binge or outdoor adventure",
        "Summer or winter",
        "Book or movie",
        "City life or countryside",
        "Sitcom or drama",
        "Scary movies or romantic comedies",
        "Singing in the shower or dancing",
        "Camping or staying in a hotel",
        "Pencil and paper or digital notes",
        "Rainy day indoors or sunny day outdoors",
        "Cooking at home or dining out",
        "Action-packed movie or romantic comedy",
        "Skiing or snowboarding",
        "Facebook or Instagram",
        "Art museum or science museum",
        "Video games or board games",
        "Vintage or modern style",
        "Concert or theater show",
        "E-book or physical book",
        "Sunrise or sunset",
        "Home-cooked meal or takeout",
        "Bar or karaoke night",
        "Black coffee or latte",
        "Indoor workout or outdoor exercise",
        "Rain or snow",
        "Cloud or Rainbow",
        "Coffee date or picnic",
        "Reality TV or Movie",
        "Board game night or movie night",
        "Classic art or modern art",
        "Morning meetings or afternoon meetings",
        "Comedy or thriller movie",
        "Rainy day indoors or sunny day outdoors",
        "Live music concert or theater show",
        "Hot weather or cold weather",
        "Barbie or Oppenheimer",
        "Conan or Doraemon",
        "Pirate or ninja",
        "Sneaker or flip flop shoe",
        "Classical art or modern art",
        "Audiobook or podcast",
        "Panda or penguin",
        "Painting or playing an instrument",
        "Gardening or crafting",
        "Cooking or dish washing",
        "Photography or writing",
        "Yoga or zumba",
        "Running or swimming"
      ]
    }
  ]
}

// Variables
var cards = document.getElementById('cards');
var cardLeft = document.getElementById('left');
var cardRight = document.getElementById('right');
var nextButton = document.getElementById('next');
var nextButtonText = document.querySelector('#next span');
var modeIndex = 0;
var currentQuestions = [];
var usedQuestions = [];

// Function to get URL query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Initialize the modes based on the query parameter
window.onload = function() {
  const modeParam = getQueryParam('mode');
  if (modeParam === 'dentist') {
    loadDentistMode();
  } else {
    loadMode(modeIndex);
  }
};

// Load mode
function loadMode(index) {
  currentQuestions = [...mode.categories[index].questions];
  usedQuestions = [];
  loadRandomQuestion();
}

// Load random question
function loadRandomQuestion() {
  if (currentQuestions.length === 0) {
    if (usedQuestions.length === 0) {
      console.error("No questions available in the current mode: " + mode.categories[modeIndex].category);
      return;
    }
    currentQuestions = [...usedQuestions];
    usedQuestions = [];
  }

  let randomIndex = Math.floor(Math.random() * currentQuestions.length);
  let question = currentQuestions.splice(randomIndex, 1)[0];
  usedQuestions.push(question);
  updateCardsWithQuestion(question);
}

// Update cards with question
function updateCardsWithQuestion(question) {
  let parts = question.split(' or ');
  if (parts.length !== 2) {
    console.error("Invalid question format: " + question);
    return;
  }

  updateCardContent(cardLeft, parts[0]);
  updateCardContent(cardRight, parts[1]);
}

// Update card content
function updateCardContent(card, content) {
  card.innerHTML = '';
  let h2 = document.createElement('h2');
  h2.classList.add('text-align-center');
  h2.textContent = toTitleCase(content.trim());
  card.appendChild(h2);
}

// Title case conversion
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Add event listeners
document.querySelectorAll('.tab button').forEach(button => {
  button.addEventListener('click', function() {
    setActiveTab(this);
    loadRandomQuestion();
  });
});

[nextButton, cardLeft, cardRight].forEach(element => {
  element.addEventListener('click', handleCardClick);
});

// Set active tab
function setActiveTab(selectedTab) {
  document.querySelectorAll('.tab button').forEach(tab => tab.classList.remove('active'));
  selectedTab.classList.add('active');
}

// Handle card click
function handleCardClick() {
  if (this === nextButton) {
    nextQuestions();
  } else {
    toggleCardActiveState(this);
  }
}

// Toggle card active state
function toggleCardActiveState(selectedCard) {
  [cardLeft, cardRight].forEach(card => card.classList.remove('active'));
  selectedCard.classList.add('active');
  adjustCardStyles();
}

// Adjust card styles
function adjustCardStyles() {
  cardLeft.style.transform = cardLeft.classList.contains('active') ? 'scale(1) rotate(-2deg)' : 'scale(0.9) rotate(0deg)';
  cardRight.style.transform = cardRight.classList.contains('active') ? 'scale(1) rotate(2deg)' : 'scale(0.9) rotate(0deg)';
  nextButtonText.textContent = 'NEXT';
}

// Next questions logic
function nextQuestions() {
  if (nextButtonText.textContent === 'NEXT') {
    cards.classList.add('hidden');
    setTimeout(() => {
      cards.classList.remove('hidden');
      nextButtonText.textContent = 'OR';
      [cardLeft, cardRight].forEach(card => card.classList.remove('active'));
      cardLeft.style.transform = 'scale(1) rotate(0deg)';
      cardRight.style.transform = 'scale(1) rotate(0deg)';
      loadRandomQuestion();
    }, 500);
  }
}

// Function to load the "dentist" mode
function loadDentistMode() {
  // Define the dentist mode questions or load them from elsewhere
  const dentistQuestions = [
      "Electric toothbrush or manual toothbrush",
      "Date someone with bad breath or bad manners",
      "Drink sour milk or brush your teeth with soap",
      "Have braces for a year or wear a retainer every night for three years",
      "Have a toothache for a day or sensitive teeth for a week",
      "Give up candy or soda to improve your dental health",
      "Have a dental check-up or a teeth cleaning",
      "Give up brushing your hair or give up brushing your teeth",
      "Go to a dentist who dresses like a superhero or a dentist who tells the best stories",
      "Clean your teeth with just a smile or have your teeth change color based on your mood",
      "Lose all your teeth or lose a day of your life every time you kissed someone",
      "Dentist wear a funny costume every visit or dental chair be a different fun shape each time",
      "Use mint or fruit-flavored toothpaste",
      "Perfect teeth but bad breath or crooked teeth with great breath",
      "Toothbrush that plays music while you brush or one that lights up in different colors",
      "Brush with bubblegum-flavored toothpaste or chocolate-flavored toothpaste",
      "Teeth turn into different fruit shapes or change color based on the weather",
      "Brush teeth with a brush made of feathers or floss with spaghetti",
      "Dental check-up in a jungle-themed office or in a haunted house-themed office",
      "Toothpaste that changes its flavor every 10 seconds or mouthwash that makes your voice sound like a famous singer",
      "Brush your teeth with salt or baking soda",
      "Brush your teeth with warm water or cold water",
      "Get a root canal or wear braces for the rest of your life",
      "Go a day without brushing your teeth or a week without washing your hair",
      "Lose your front tooth or a back molar",
      "Painless visit to the dentist with long waiting times or a quick visit with some discomfort",
      "Accidentally swallow your toothpaste or mouthwash",
      "Live in a world without toothpaste or toothbrushes",
      "Give up coffee or red wine to keep your teeth stain-free",
      "Dentist appointment in a space-themed room or underwater room",
      "Be forced to floss five times per day or have a gold tooth for the rest of your life",
      "Put a dirty denture in your mouth or use your spouse’s toothbrush",
      "Replace porcelain teeth or give a presentation to 1000 people on a topic you know nothing about",
      "Attend a public event with a missing front tooth or have bad breath for a week",
      "Not able to taste food for a month or go without your phone for a month",
      "Brush your teeth with soap or drink sour milk",
      "Wear Invisalign for a year or traditional braces for six months",
      "Brush your teeth in front of strangers or eat with them watching",
      "Toothpaste that changes flavor based on your mood or mouthwash that gives superhuman strength",
      "Brush with garlic-flavored toothpaste or use onion-flavored mouthwash",
      "Wisdom teeth grow back every year or have permanent vampire fangs",
      "Wear a huge tooth costume to work once a week or brush with a broom",
      "Teeth make a squeaky noise when chewing or a musical note with each bite",
      "Brush teeth while on a carousel or floss while on a rollercoaster",
      "Perfect body or perfect smile",
      "Never brush your teeth before kissing someone or never get rid of your pubic hair",
      "Date someone who never brushes their teeth or always wears dirty laundry",
      "Teeth display random emojis or tell your mood of the day",
      "Mouthwash that enhances singing voice or toothpaste that improves speaking skills",
      "Visit a dentist who is also a gourmet chef or one who is a bestselling author",
      "Toothpaste to understand animals for an hour or mouthwash to hear plants' thoughts",
      "Toothpaste that predicts your future or mouthwash to remember forgotten memories",
      "Toothpaste that makes you laugh for five minutes or mouthwash that makes you dance"
  ];

  // Set the currentQuestions array to the dentistQuestions
  currentQuestions = [...dentistQuestions];
  usedQuestions = [];
  loadRandomQuestion();
}