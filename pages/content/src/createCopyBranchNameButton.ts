const getIsCreateBranchPage = () => {
  return window.location.href.includes('https://github.atlassian.com/github/create-branch');
};

export const createCopyBranchNameButton = () => {
  const isCreateBranchPage = getIsCreateBranchPage();
  if (!isCreateBranchPage) {
    return;
  }

  const searchBranchNameDom = setInterval(() => {
    const targetElement = document.querySelector(
      'section.gitHubCreateBranch .gitHubCreateBranch__title .gitHubCreateBranch__subHeader b',
    );
    if (targetElement && targetElement.textContent?.trim() !== '') {
      console.log('Found target element:', targetElement);
      clearInterval(searchBranchNameDom);

      //targetElementの横にボタンを追加
      const newButton = document.createElement('button');
      newButton.innerText = 'ブランチ名をコピー';
      newButton.style.marginLeft = '10px'; // 隣に配置するための余白

      // 新しいボタンのクリックイベントを追加
      newButton.addEventListener('click', () => {
        //クリップボードにtargetElementのテキストをコピー
        navigator.clipboard.writeText(targetElement.textContent || '');
        alert(`${targetElement.textContent}をコピーしました`);
      });

      // 特定の要素の隣に新しいボタンを挿入
      targetElement.insertAdjacentElement('afterend', newButton);
    } else {
      console.log('Target element not found');
    }
  }, 2000);
};
