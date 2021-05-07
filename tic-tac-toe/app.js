(() => {
  const $selectButton = document.querySelectorAll('.btn-select'),
        $againButton = document.getElementById('js-btn-again'),
        $alert = document.getElementById('js-question'),
        $dot = document.querySelectorAll('.dot'),
        $dotWrap = document.querySelector('.dotWrap');

  const alertText = {
    selectMark: '先攻の方のマークを選んでください。',
    selectDot: 'を置くマスを選んでください。',
    gameOver: 'マスがすべて埋まりました。ゲームオーバーです。',
    victory: 'マスが1列すべて揃いました！！！'
  }
  const markText = [
    '○',
    '×'
  ]
  const VictoryFlag = [
    ['1', '2', '3'],
    ['1', '4', '7'],
    ['1', '5', '9'],
    ['2', '5', '8'],
    ['3', '6', '9'],
    ['3', '5', '7'],
    ['4', '5', '6'],
    ['7', '8', '9']
  ]
  const playerData = {
    player1: [],
    player2: []
  }
  let endFlag,
      yourMark,
      ButtonIndex,
      initIndex,
      dotIndex,
      victoryIndex,
      playerIndex,
      dotCount;


  // -------------------------------- //
  // 先攻/後攻ボタンを表示
  // -------------------------------- //
  ButtonIndex = 0
  const showSelectButton = () => {
    $dotWrap.style.display = 'none';
    while (ButtonIndex < $selectButton.length) {
      $selectButton[ButtonIndex].style.display = 'initial';
      // ボタンの値を入力
      $selectButton[ButtonIndex].textContent = markText[ButtonIndex];
      // ボタンを押したときの処理
      $selectButton[ButtonIndex].addEventListener('click', (e) => {
        yourMark = e.target.textContent;
        showBoard();
      });
      ButtonIndex++;
    }
    ButtonIndex = 0;
  }

  // -------------------------------- //
  // 初期設定
  // -------------------------------- //
  initIndex = 0;
  const init = () => {
    // index値をリセット
    initIndex = 0,
    dotIndex = 0,
    ButtonIndex = 0,
    victoryIndex = 0,
    playerIndex = 0,
    dotCount = 1,
    endFlag = false,
    playerData.player1 = [],
    playerData.player2 = [];
    // 再プレイのときのために盤上データをリセット
    $againButton.style.display = 'none';
    $dotWrap.classList.remove('is-end');
    $alert.textContent = alertText.selectMark;
    showSelectButton();
    while (initIndex < $dot.length) {
      $dot[initIndex].dataset.selected = '';
      $dot[initIndex].textContent = '';
      initIndex++;
    }
  };
  init();

  // -------------------------------- //
  // 先攻/後攻ボタンを消して盤面を表示してゲーム開始
  // -------------------------------- //
  const showBoard = () => {
    while (ButtonIndex < $selectButton.length) {
      $selectButton[ButtonIndex].style.display = 'none';
      ButtonIndex++;
    }
    $dotWrap.style.display = 'table';
    $alert.textContent = '「' + yourMark + '」' + alertText.selectDot;
  };

  // -------------------------------- //
  // 攻守交代
  // -------------------------------- //
  const markChange = () => {
    if (yourMark === markText[0]) {
      yourMark = markText[1];
    } else {
      yourMark = markText[0];
    }
    dotCount++;
    $alert.textContent = '「' + yourMark + '」' + alertText.selectDot;
  };

  // -------------------------------- //
  // 選んだマスをプレイヤーにセット
  // -------------------------------- //
  victoryIndex = 0;
  playerIndex = 0;
  const setNumber = (e) => {
    if (dotCount % 2) {
      playerData.player1.unshift(e.target.dataset.number);
      playerData.player1.sort();
    } else {
      playerData.player2.unshift(e.target.dataset.number);
      playerData.player2.sort();
    }
  }

  // VictoryFlagとplayerData.playerのデータが順不同で一致したら勝ち判定
  const flagCheck = () => {
    while (victoryIndex < VictoryFlag.length) {
      while (playerIndex < Object.keys(playerData).length) {
        // console.log('playerData["player" + (playerIndex + 1)]', playerData["player" + (playerIndex + 1)]);
        if ( playerData["player" + (playerIndex + 1)].toString().includes(VictoryFlag[victoryIndex].toString()) ) {
          endFlag = true;
          break;
        }
        playerIndex++;
      }
      playerIndex = 0;
      victoryIndex++;
    }
    victoryIndex = 0;
    return false;
  }


  // ９マス埋まったら終了
  const selectEnd = () => {
    if (dotCount !== $dot.length) {
      markChange();
    } else {
      $alert.textContent = alertText.gameOver;
      showAgainButton();
    }
  }

  // プレイヤー勝利時の処理
  const showAgainButton = () => {
    $dotWrap.classList.add('is-end');
    $againButton.style.display = 'inherit';
  }

  // 再プレイ
  $againButton.addEventListener('click', () => {
    init();
  });

  // クリックしたボタンにマークをつける
  dotCount = 1;
  while (dotIndex < $dot.length) {
    $dot[dotIndex].addEventListener('click', (e) => {
      if ( e.target.dataset.selected === '' && !endFlag) {
        // 自分が選んだマークがマスに記入される
        e.target.textContent = yourMark;
        e.target.dataset.selected = yourMark;
        // マークを交代する処理
        setNumber(e);
        flagCheck();
        if (endFlag) {
          $alert.textContent = alertText.victory;
          showAgainButton();
        } else {
          selectEnd();
        }
      }
    });
    dotIndex++;
  }
})();
