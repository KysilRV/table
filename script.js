'use strict';
// Получения перменных
const table = document.querySelector('.table'),
      wrapper = document.querySelector('.wrapper'),
      under = document.querySelector('.under'),
      rowBtnAdd = document.querySelector('.plus_row'),
      colBtnAdd = document.querySelector('.plus_col'),
      rowBtnRemove = document.querySelector('.minus_row'),
      colBtnRemove = document.querySelector('.minus_col');

// Функционал кнопок добавления
function createBlueBlock() {
    const blueBlock = document.createElement('div');
    blueBlock.classList.add('block');
    return blueBlock;
};

// Положение кнопок удаления
function btnPos() {
    const blocks = document.querySelectorAll('.block');
    blocks.forEach(block => {
        block.addEventListener('mouseenter', (e) => {
            const target = e.target;
            if (wrapper.clientHeight > 140) {
                rowBtnRemove.style.cssText = `display: flex; top: ${target.offsetTop}px;`;
            };
            if (wrapper.clientWidth > 140) {
                colBtnRemove.style.cssText = `display: flex; left: ${target.offsetLeft}px;`;
            };
        });
    });
};
btnPos();

// Работа кнопок добавления
rowBtnAdd.addEventListener('click', () => {
    const rows = document.querySelectorAll('.row'),
          rowLen = rows[0].querySelectorAll('.block').length,
          newRow = document.createElement('div');

    const lastDataId = rows[rows.length - 1].getAttribute('data-id')
    
    newRow.classList.add('row');
    newRow.setAttribute('data-id', +lastDataId + 1)

    for (let i = 0; i < rowLen; i++) {
        const blueBlock = document.createElement('div');
        blueBlock.classList.add('block');
        newRow.append(createBlueBlock());
    };
    wrapper.append(newRow);
    btnPos();
});

colBtnAdd.addEventListener('click', () => {
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => {
        row.append(createBlueBlock())
    });
    btnPos();
});

// Появление блоков с минусом
under.addEventListener('mouseleave', () => {
    rowBtnRemove.style.display = 'none';
    colBtnRemove.style.display = 'none';
});

// Работа кнопок удаления

function checkTable(n, btn, side) {
    if (side < n) {
        btn.style.display = 'none';
    } else if (side < 140) {
        btn.style.display = 'none';
    };
};

function checkBtnPos(btn, side, dir) {
    if (side >= dir) {
        btn.style.display = 'none';
    }
};

rowBtnRemove.addEventListener('click', function() {
    const clientHeightVar = this.style.top.slice(0, -2);
    document.querySelectorAll('.row')[Math.round(clientHeightVar / 120)].remove();

    checkBtnPos(rowBtnRemove, clientHeightVar, wrapper.clientHeight)
    checkTable(clientHeightVar, rowBtnRemove, wrapper.clientHeight);
    btnPos();
});

colBtnRemove.addEventListener('click', function() {
    const clientWidthVar = this.style.left.slice(0, -2),
          rows = document.querySelectorAll('.row');

    rows.forEach(row => row.querySelectorAll('.block')[Math.round(clientWidthVar / 120)].remove());
    checkBtnPos(colBtnRemove, clientWidthVar, wrapper.clientWidth)
    checkTable(clientWidthVar, colBtnRemove, wrapper.clientWidth);
    btnPos();
});
