const isJiraPage = () => {
  console.log('isJiraPage');
  console.log(window.location.href);
  return window.location.href.includes('https://github.atlassian.com/github/create-branch');
};

export const createCopyBranchNameButton = () => {
  const isJira = isJiraPage();
  console.log({ isJira }, '🤩🤩🤩🤩🤩🤩🤩');
  if (!isJira) {
    return;
  }
  console.log('createCopyBranchNameButton');

  // 全てのボタンを取得
  searchButtons();

  const targetElement = document.querySelector('.gitHubCreateBranch .gitHubCreateBranch__title b');
  if (targetElement) {
    // 新しいボタンを作成
    const newButton = document.createElement('button');
    newButton.innerText = '新しいボタン';
    newButton.style.marginLeft = '10px'; // 隣に配置するための余白

    // 新しいボタンのクリックイベントを追加
    newButton.addEventListener('click', () => {
      alert('新しいボタンがクリックされました！');
    });

    // 特定の要素の隣に新しいボタンを挿入
    targetElement.insertAdjacentElement('afterend', newButton);
  } else {
    console.log('Target element not found');
  }
};
function searchButtons() {
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
}

// MutationObserverを使用してDOMの変化を監視
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'childList' || mutation.type === 'attributes' || mutation.type === 'characterData') {
      createCopyBranchNameButton();
    }
  });
});

// 監視するターゲットノードを指定
const targetNode = document.body;

// オプションを指定して監視を開始
const config = { childList: true, subtree: true, attributes: true, characterData: true };
observer.observe(targetNode, config);
