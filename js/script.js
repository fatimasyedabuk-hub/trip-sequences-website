// The same three image objects are reused in both stories.
const images = [
  {
    name: 'The suitcase', src: 'images/suitcase.jpg',
    alt: 'An open suitcase packed with clothes, a camera, and a sun hat.',
    credit: 'Kindel Media / Pexels',
    source: 'https://www.pexels.com/photo/photo-of-a-packed-suitcase-8212231/'
  },
  {
    name: 'The airport', src: 'images/airport.jpg',
    alt: 'Travellers pass a large flight departure board in an airport terminal.',
    credit: 'jack berry / Unsplash',
    source: 'https://unsplash.com/photos/people-walk-past-a-departure-board-in-an-airport-hNQ0RH_a5Jo'
  },
  {
    name: 'The beach', src: 'images/beach.jpg',
    alt: 'Clear turquoise water meets white sand beneath a bright blue sky.',
    credit: 'Schiba / Unsplash',
    source: 'https://unsplash.com/ja/写真/澄んだ青い水と白い砂浜のビーチ---i41IjUzVQ'
  }
];

const stories = [
  {
    name: 'The holiday begins',
    order: [0, 1, 2], // Suitcase, airport, beach.
    titles: ['Room for adventure.', 'Somewhere else awaits.', 'Finally, nowhere to be.'],
    captions: [
      'The bag is packed. The everyday can wait. Everything you need for a week away is right here.',
      'A destination on a departure board is about to become a real place. Find the gate. The adventure is getting closer.',
      'No schedule. No rushing. Just warm sand and the sea. This is what the packing and waiting were for.'
    ],
    readings: [
      'At the beginning, the packed suitcase feels like anticipation: something good is about to happen.',
      'After packing, the airport becomes a gateway to somewhere new.',
      'As the final image, the beach becomes the destination and the reward. The story ends with escape.'
    ]
  },
  {
    name: 'The holiday ends',
    order: [2, 0, 1], // Beach, suitcase, airport. Exactly the same images.
    titles: ['One last look.', 'Time to pack it away.', 'Home is the next stop.'],
    captions: [
      'Stay a little longer. Take in the water, the light, the quiet. Soon, this view will be a memory.',
      'The same clothes go back into the same suitcase. This time, packing means the holiday is over.',
      'Back beneath the departure board, waiting for the journey home. The beach is behind you now.'
    ],
    readings: [
      'Before packing and departure, the beach reads as a final moment of a holiday already underway.',
      'After the beach, the packed suitcase suggests leaving rather than arriving.',
      'As the final image, the airport signals the return home. The story ends with separation from the holiday.'
    ]
  }
];

// State variables: which story and which frame the visitor is viewing.
let currentStory = 0;
let currentFrame = 0;
const positions = ['Beginning', 'Middle', 'End'];
const mainImage = document.getElementById('main-image');
const beginButton = document.getElementById('begin-button');
const endButton = document.getElementById('end-button');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const frameButtons = document.querySelectorAll('.frame');

// DOM manipulation: update the main image, captions, controls, and sequence strip.
function renderStory() {
  const story = stories[currentStory];
  const image = images[story.order[currentFrame]];
  mainImage.src = image.src;
  mainImage.alt = image.alt;
  document.getElementById('photo-name').textContent = image.name.toUpperCase();
  document.getElementById('photo-tag').textContent = '0' + (currentFrame + 1) + ' / 03';
  document.getElementById('image-credit').textContent = image.credit + ' ↗';
  document.getElementById('image-credit').href = image.source;
  document.getElementById('chapter-label').textContent = positions[currentFrame].toUpperCase() + ' · 0' + (currentFrame + 1) + ' OF 03';
  document.getElementById('chapter-title').textContent = story.titles[currentFrame];
  document.getElementById('chapter-caption').textContent = story.captions[currentFrame];
  document.getElementById('reading-text').textContent = story.readings[currentFrame];
  document.getElementById('sequence-position').textContent = 'STORY 0' + (currentStory + 1) + ' · FRAME 0' + (currentFrame + 1) + ' / 03';
  previousButton.disabled = currentFrame === 0;
  nextButton.disabled = currentFrame === 2;
  beginButton.setAttribute('aria-pressed', String(currentStory === 0));
  endButton.setAttribute('aria-pressed', String(currentStory === 1));
  beginButton.classList.toggle('selected', currentStory === 0);
  endButton.classList.toggle('selected', currentStory === 1);

  frameButtons.forEach(function (button, index) {
    const frameImage = images[story.order[index]];
    button.querySelector('img').src = frameImage.src;
    button.querySelector('.frame-title').firstChild.textContent = frameImage.name + ' ';
    button.setAttribute('aria-label', positions[index] + ': ' + frameImage.name);
    button.classList.toggle('active', index === currentFrame);
    if (index === currentFrame) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
  });
  document.getElementById('announcement').textContent = story.name + '. ' + positions[currentFrame] + ': ' + story.titles[currentFrame];
}

function chooseStory(storyIndex) {
  currentStory = storyIndex;
  currentFrame = 0;
  renderStory();
}

function moveFrame(direction) {
  const newFrame = currentFrame + direction;
  if (newFrame < 0 || newFrame > 2) return;
  currentFrame = newFrame;
  renderStory();
}

// Event listeners connect buttons and keyboard actions to our functions.
beginButton.addEventListener('click', function () { chooseStory(0); });
endButton.addEventListener('click', function () { chooseStory(1); });
previousButton.addEventListener('click', function () { moveFrame(-1); });
nextButton.addEventListener('click', function () { moveFrame(1); });
document.getElementById('replay-button').addEventListener('click', function () {
  currentFrame = 0;
  renderStory();
});
frameButtons.forEach(function (button, index) {
  button.addEventListener('click', function () {
    currentFrame = index;
    renderStory();
  });
});
document.addEventListener('keydown', function (event) {
  if (event.ctrlKey || event.altKey || event.metaKey || event.target.matches('input, textarea, select')) return;
  if (event.key === 'ArrowRight') { event.preventDefault(); moveFrame(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveFrame(-1); }
});
renderStory();
