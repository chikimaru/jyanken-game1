// 手の選択肢
const hands = ['rock', 'scissors', 'paper'];
const handEmoji = {
  rock: '✊',
  scissors: '✌️',
  paper: '🖐️'
};
const handName = {
  rock: 'グー',
  scissors: 'チョキ',
  paper: 'パー'
};

// DOM要素
const playerHandDisplay = document.getElementById('player-hand');
const computerHandDisplay = document.getElementById('computer-hand');
const resultDisplay = document.getElementById('result');
const handButtons = document.querySelectorAll('.hand-btn');
const resetBtn = document.getElementById('reset-btn');

// ゲーム状態
let isPlaying = false;

// ボタンにイベントリスナーを追加
handButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!isPlaying) {
      const playerChoice = btn.dataset.hand;
      playGame(playerChoice);
    }
  });
});

// リセットボタン
resetBtn.addEventListener('click', resetGame);

// ゲームのメインロジック
function playGame(playerChoice) {
  isPlaying = true;

  // ボタンを無効化
  handButtons.forEach(btn => btn.disabled = true);

  // コンピュータの選択をランダムに決定
  const computerChoice = hands[Math.floor(Math.random() * hands.length)];

  // じゃんけんポンのアニメーション
  animateJanken(() => {
    // 選択を表示
    playerHandDisplay.textContent = handEmoji[playerChoice];
    computerHandDisplay.textContent = handEmoji[computerChoice];

    // 勝敗判定
    const result = determineWinner(playerChoice, computerChoice);
    displayResult(result);

    // リセットボタンを表示
    resetBtn.style.display = 'block';
  });
}

// じゃんけんポンのアニメーション
function animateJanken(callback) {
  let count = 0;
  const interval = setInterval(() => {
    count++;

    // ランダムな手を表示
    const randomHand = hands[Math.floor(Math.random() * hands.length)];
    playerHandDisplay.textContent = handEmoji[randomHand];
    computerHandDisplay.textContent = handEmoji[randomHand];

    if (count >= 6) {
      clearInterval(interval);
      callback();
    }
  }, 200);
}

// 勝敗判定
function determineWinner(player, computer) {
  if (player === computer) {
    return 'draw';
  }

  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return 'win';
  }

  return 'lose';
}

// 結果表示
function displayResult(result) {
  resultDisplay.className = 'result ' + result;

  if (result === 'win') {
    resultDisplay.textContent = '🎉 あなたの勝ち！ 🎉';
    document.querySelector('.male').classList.add('celebrate');
  } else if (result === 'lose') {
    resultDisplay.textContent = '😢 あなたの負け... 😢';
    document.querySelector('.male').classList.add('shake');
  } else {
    resultDisplay.textContent = '🤝 引き分け！ 🤝';
  }

  // アニメーションをクリア
  setTimeout(() => {
    document.querySelector('.male').classList.remove('celebrate', 'shake');
  }, 600);
}

// ゲームリセット
function resetGame() {
  isPlaying = false;

  // 表示をリセット
  playerHandDisplay.textContent = '？';
  computerHandDisplay.textContent = '？';
  resultDisplay.textContent = '';
  resultDisplay.className = 'result';

  // ボタンを有効化
  handButtons.forEach(btn => btn.disabled = false);
  resetBtn.style.display = 'none';
}
