let allQuestions = [];
let currentIndex = 0;
let score = 0;
const MAX_QUESTIONS = 20;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initQuiz(data) {
  let mc = [];
  if (Array.isArray(data.Questions)) {
    mc = data.Questions.map(q => ({ ...q, answers: q.answers || q.anwser }));
  } else if (Array.isArray(data.questions)) {
    mc = data.questions;
  }
  const openQ = data.open_questions || [];
  allQuestions = [...mc, ...openQ];
  shuffle(allQuestions);
  allQuestions = allQuestions.slice(0, MAX_QUESTIONS);
  showQuestion();
}

function showQuestion() {
  const questionEl = document.getElementById('question');
  const answersEl = document.getElementById('answers');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');

  questionEl.innerHTML = '';
  answersEl.innerHTML = '';
  submitBtn.style.display = 'inline-block';
  nextBtn.style.display = 'none';

  const q = allQuestions[currentIndex];
  questionEl.innerHTML = `<p><strong>${currentIndex + 1}. ${q.pytanie}</strong></p>`;
  if (q.photo) questionEl.innerHTML += `<img src="${q.photo}" alt="Zdjęcie pytania">`;

  if (q.answers) {
    const entries = Object.entries(q.answers);
    shuffle(entries);
    entries.forEach(([key, text]) => {
      const div = document.createElement('div');
      div.className = 'answer';
      div.innerHTML = `<label><input type="radio" name="answer" value="${key}"> ${text}</label>`;
      answersEl.appendChild(div);
    });
  } else {
    const input = document.createElement('input');
    input.type = 'text'; input.id = 'text-answer'; input.placeholder = 'Twoja odpowiedź';
    answersEl.appendChild(input);
  }

  nextBtn.textContent = currentIndex === allQuestions.length - 1 ? 'Zobacz wynik' : 'Następne pytanie';
  submitBtn.onclick = checkAnswer;
  nextBtn.onclick = nextQuestion;
}

function checkAnswer() {
  const q = allQuestions[currentIndex];
  const answersEl = document.getElementById('answers');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  let userAns;
  if (q.answers) {
    const checked = answersEl.querySelector('input[name="answer"]:checked');
    if (!checked) { alert('Wybierz odpowiedź!'); return; }
    userAns = checked.value;
  } else {
    const textInput = document.getElementById('text-answer');
    if (!textInput.value.trim()) { alert('Wpisz odpowiedź!'); return; }
    userAns = textInput.value.trim().toUpperCase();
  }
  const correctKey = q.poprawna;
  answersEl.querySelectorAll('.answer label').forEach(label => {
    const input = label.querySelector('input');
    if (!input) return;
    if (input.value === correctKey) label.classList.add('correct');
    else if (input.checked) label.classList.add('wrong');
    input.disabled = true;
  });
  if (userAns === correctKey) score++;
  submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-block';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < allQuestions.length) showQuestion();
  else {
    document.getElementById('quiz-container').innerHTML = `
      <div style="text-align:center">
        <h2>Koniec quizu!</h2>
        <p>Twój wynik: ${score}/${allQuestions.length}</p>
      </div>`;
  }
}

window.addEventListener('keydown', e => { if (e.key === 'Enter') e.preventDefault(); });

fetch('pytania.json')
  .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
  .then(initQuiz)
  .catch(err => {
    document.getElementById('quiz-container').innerHTML = `<p style="color:red">Nie udało się załadować quizu: ${err.message}</p>`;
    console.error(err);
  });