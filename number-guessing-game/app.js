(() => {
  const $message = document.getElementById('js-message'),
        $quizCount = document.getElementById('js-quizCount'),
        $inputArea = document.getElementById('js-inputArea'),
        $inputButton = document.getElementById('js-inputButton'),
        $outputArea = document.getElementById('js-outputArea'),
        $againButton = document.getElementById('js-btn-again'),
        $outputWrap = document.querySelector('.outputWrap'),
        answerMin = 0,
        judgeNumber = 25,
        answerMax = 100,
        answerLimitCount = 10;
  let answer,
      limitCount = answerLimitCount,
      entriesNumber = [];
  const alertText = {
    init: 'あなたが正解だと思う' + answerMin + '〜' + answerMax + 'の間の数字を入力欄に入力してください',
    correct: '正解です、お見事！！！',
    incorrect: '不正解です。',
    toBig: '値が大きいです。',
    toBigger: '値が大きすぎます！',
    toSmall: '値が小さいです。',
    toSmaller: '値が小さすぎます！',
    error: 'エラー！' + answerMin + '〜' + answerMax + 'までの数値を入力してください！',
    gameover: answerLimitCount + '回間違えたのでゲームオーバーです…'
  }

  // -------------------------------- //
  // 初期設定
  // -------------------------------- //
  const init = () => {
    answer = Math.floor( Math.random() * (answerMax + 1 - answerMin) ) + answerMin;
    $message.textContent = alertText.init;
    $quizCount.textContent = answerLimitCount + '回';
  }
  init();

  // -------------------------------- //
  // 正誤判定
  // -------------------------------- //
  let inputAreaValue;
  const inputEntriesNumber = () => {
    inputAreaValue = Number($inputArea.value);
    if (inputAreaValue === answer) {
      alertColor('primary');
      $message.textContent = alertText.correct;
      showAgainButton();
    } else {
      alertColor('danger');
      bigOrSmall();
      inputValueSave();
      outputAreaShow();
      limitCount--;
      $quizCount.textContent = limitCount + '回';
      if (limitCount === 0) {
        $message.textContent = alertText.gameover;
        showAgainButton();
      }
    }
  }

  // -------------------------------- //
  // 値の大小、正解から近いか遠いか、エラーの判定
  // -------------------------------- //
  const bigOrSmall = () => {
    if (inputAreaValue > answerMax || inputAreaValue < answerMin) {
      $message.textContent = alertText.error;
    } else {
      if (inputAreaValue < answer) {
        if (answer - inputAreaValue <=  judgeNumber) {
          $message.textContent = alertText.incorrect + alertText.toSmall;
        } else {
          $message.textContent = alertText.incorrect + alertText.toSmaller;
        }
      } else {
        if (inputAreaValue - answer >=  judgeNumber) {
          $message.textContent = alertText.incorrect + alertText.toBigger;
        } else {
          $message.textContent = alertText.incorrect + alertText.toBig;
        }
      }
    }
  }

  // -------------------------------- //
  // アラートの色変更
  // -------------------------------- //
  const alertColor = (status) => {
    if (status === 'danger') {
      $message.classList.add('alert-danger');
      $message.classList.remove('alert-primary');
    } else if(status === 'primary') {
      $message.classList.remove('alert-danger');
      $message.classList.add('alert-primary');
    }
  }

  // -------------------------------- //
  // 入力値を保存、入力フォームのリセット
  // -------------------------------- //
  const inputValueSave = () => {
    entriesNumber.push(inputAreaValue);
    $inputArea.value = '';
  }

  // -------------------------------- //
  // 不正解の場合、これまでの入力値を表示＋更新する
  // -------------------------------- //
  const outputAreaShow = () => {
    if (limitCount === answerLimitCount) {
      $outputWrap.style.display = 'block';
    }
    $outputArea.textContent = entriesNumber;
  }

  $inputButton.addEventListener('click', () => {
    inputEntriesNumber();
  });

  // -------------------------------- //
  // ゲーム再プレイ時に初期化
  // -------------------------------- //
  const gameReset = () => {
    $inputArea.disabled = false;
    $inputButton.disabled = false;
    $againButton.style.display = 'none';
    $outputWrap.style.display = 'none';
    $inputArea.value = '';
    limitCount = answerLimitCount;
    entriesNumber = [];
  }

  $againButton.addEventListener('click', () => {
    gameReset();
    init();
  });

  // -------------------------------- //
  // 再プレイボタン表示
  // -------------------------------- //
  const showAgainButton = () => {
    $inputArea.disabled = true;
    $inputButton.disabled = true;
    $againButton.style.display = 'block';
  }
})();