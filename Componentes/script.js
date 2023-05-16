let total = 0;
let buffer = '0';
let anteriorOperador = null;
const screen = document.querySelector('.screen');

const buttonClick = (value) => {
  isNaN(value) ? handleSymbol(value) : handleNumero(value);
  screen.innerText = buffer;
};

const handleSymbol = (symbol) => {
  switch (symbol) {
    case 'C':
      buffer = '0';
      total = 0;
    //   document.getElementById('buffer').innerText = '';
      break;
    case '=':
      if (anteriorOperador === null) return;
      flushOperation(parseInt(buffer));
      anteriorOperador = null;
      buffer = total.toString();
    
      break;
    case '←':
      buffer.length === 1 ? (buffer = '0') : (buffer = buffer.slice(0, -1));
      break;
    case '+':
    case '-':
    case '×':
    case '÷':
      handleMath(symbol);
    //   document.getElementById('buffer').innerText = `${total} ${anteriorOperador}`;
      break;
  }
};

const handleMath = (symbol) => {
  if (buffer === '0') return;
  const intBuffer = parseInt(buffer);

  if (total === 0) {
    total = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  anteriorOperador = symbol;
  buffer = '0';
};

const flushOperation = (intBuffer) => {
  switch (anteriorOperador) {
    case '+':
      total += intBuffer;
      break;
    case '-':
      total -= intBuffer;
      break;
    case '×':
      total *= intBuffer;
      break;
    case '÷':
      total /= intBuffer;
      break;
  }
};

const handleNumero = (numeroString) => {
  buffer === '0' ? (buffer = numeroString) : (buffer += numeroString);
};

const init = () => {
  document.querySelector('.calc-buttons').addEventListener('click', (e) => {
    buttonClick(e.target.innerText);
  });
};

init();
