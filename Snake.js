// Configurações do jogo
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gridSize = 20;
const tileCount = 20;
const snakeSpeed = 200; // Velocidade da cobrinha em milissegundos

// Criação da cobrinha
let snake = [];
snake[0] = { x: 10, y: 10 };

// Criação da comida
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

// Variáveis de direção
let dx = 0;
let dy = 0;

// Função para desenhar no canvas
function draw() {
  // Limpa o canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobrinha
  context.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    context.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  // Desenha a comida
  context.fillStyle = 'red';
  context.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize,
    gridSize
  );

  // Move a cobrinha
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  snakeX += dx;
  snakeY += dy;

  // Verifica colisões com as bordas do canvas
  if (snakeX < 0 || snakeX >= tileCount || snakeY < 0 || snakeY >= tileCount) {
    gameOver();
    return;
  }

  // Verifica colisões com o próprio corpo
  for (let i = 1; i < snake.length; i++) {
    if (snakeX === snake[i].x && snakeY === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Verifica colisão com a comida
  if (snakeX === food.x && snakeY === food.y) {
    // Aumenta o tamanho da cobrinha
    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead);

    // Gera nova posição para a comida
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
  } else {
    // Remove o último segmento da cobrinha
    snake.pop();
  }

  // Adiciona a nova cabeça da cobrinha
  let newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);
}

// Função para processar eventos de teclado
function onKeyDown(event) {
  switch (event.keyCode) {
    case

65: // Tecla 'A' pressionada
if (dx !== 1) { // Impede que a cobrinha volte na direção oposta
dx = -1;
dy = 0;
}
break;
case 87: // Tecla 'W' pressionada
if (dy !== 1) {
dx = 0;
dy = -1;
}
break;
case 68: // Tecla 'D' pressionada
if (dx !== -1) {
dx = 1;
dy = 0;
}
break;
case 83: // Tecla 'S' pressionada
if (dy !== -1) {
dx = 0;
dy = 1;
}
break;
}
}

// Função de fim de jogo
function gameOver() {
alert('Fim de jogo!');
// Reinicia o jogo
snake = [];
snake[0] = { x: 10, y: 10 };
dx = 0;
dy = 0;
}

// Função principal do jogo
function gameLoop() {
draw();
setTimeout(gameLoop, snakeSpeed);
}

// Adiciona o evento de teclado
document.addEventListener('keydown', onKeyDown);

// Inicia o loop do jogo
gameLoop();
