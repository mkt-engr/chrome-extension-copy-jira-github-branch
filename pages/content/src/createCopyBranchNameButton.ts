const getIsCreateBranchPage = () => {
  return window.location.href.includes('https://github.atlassian.com/github/create-branch');
};

export const createCopyBranchNameButton = async () => {
  const isCreateBranchPage = getIsCreateBranchPage();
  if (!isCreateBranchPage) {
    // return;
  }

  const checkboxState = await getCheckboxState();

  let counter = 1;
  const searchBranchNameDomIntervalId = setInterval(() => {
    console.log(counter++);
    const targetElement = document.querySelector(
      'section.gitHubCreateBranch .gitHubCreateBranch__title .gitHubCreateBranch__subHeader b',
    );

    if (counter > 100) {
      clearInterval(searchBranchNameDomIntervalId);
      return;
    }

    if (targetElement && targetElement.textContent?.trim() !== '') {
      console.log('Found target element:', targetElement);
      clearInterval(searchBranchNameDomIntervalId);

      if (checkboxState) {
        //クリップボードにtargetElementのテキストをコピー
        navigator.clipboard.writeText(targetElement.textContent || '');
        alert(`${targetElement.textContent}をコピーしました`);
      }

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
  }, 1000);
};

const getCheckboxState = async (): Promise<boolean> => {
  const { checkboxState } = await chrome.storage.local.get(['checkboxState']);
  console.log({ checkboxState });

  if (checkboxState) {
    console.log('Auto copying is enabled.');
  } else {
    console.log('Auto copying is disabled.');
  }
  return checkboxState;
};
