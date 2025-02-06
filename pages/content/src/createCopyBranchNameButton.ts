const isJiraPage = () => {
  console.log('isJiraPage');
  console.log(window.location.href);
};

export const createCopyBranchNameButton = () => {
  isJiraPage();
  console.log('createCopyBranchNameButton');

  // 全てのボタンを取得
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    // ボタンを赤くする
    button.style.backgroundColor = 'red';
    button.style.color = 'white';

    // 新しいボタンを作成
    const newButton = document.createElement('button');
    newButton.innerText = '新しいボタン';
    newButton.style.marginLeft = '10px'; // 隣に配置するための余白

    // 新しいボタンのクリックイベントを追加
    // newButton.addEventListener('click', () => {
    //   alert('新しいボタンがクリックされました！');
    // });

    // 3. 既存のボタンの隣に挿入
    button.insertAdjacentElement('afterend', newButton);
  });
};
