/**
 * ローカルストレージに保存したチェックボックスの状態を取得する。
 *
 * @returns チェックボックスの状態
 */
const getCheckboxState = async (): Promise<boolean> => {
  const { checkboxState } = await chrome.storage.local.get(['checkboxState']);
  return checkboxState ?? false;
};

/**
 * クリップボードにgit switch ${branchName} コマンドをコピー
 *
 * @param branchName ブランチ名
 */
const copyGitSwitchCommand = (branchName: string) => {
  navigator.clipboard.writeText(`git fetch && git switch ${branchName}`);
};

/**bタグを探す回数 */
let searchLimitCounter = 100;

export const createCopyBranchNameButton = async () => {
  const checkboxState = await getCheckboxState();

  const searchBranchNameDomIntervalId = setInterval(() => {
    searchLimitCounter--;
    if (searchLimitCounter < 0) {
      clearInterval(searchBranchNameDomIntervalId);
      return;
    }

    const targetElement = document.querySelector(
      'section.gitHubCreateBranch .gitHubCreateBranch__title .gitHubCreateBranch__subHeader b',
    );

    if (targetElement && targetElement.textContent?.trim() !== '') {
      console.log('Found target element:', targetElement);
      clearInterval(searchBranchNameDomIntervalId);

      if (checkboxState) {
        copyGitSwitchCommand(targetElement.textContent || '');
        alert(`ブランチ名「${targetElement.textContent}」をコピーしました`);
      }

      //targetElementの横にボタンを追加
      const newButton = document.createElement('button');
      newButton.innerText = 'ブランチ名をコピー';
      newButton.style.marginLeft = '10px'; // 隣に配置するための余白

      newButton.addEventListener('click', () => {
        copyGitSwitchCommand(targetElement.textContent || '');
        newButton.textContent = 'コピーしました';
        setTimeout(() => {
          newButton.textContent = 'ブランチ名をコピー';
        }, 300);
      });

      // 特定の要素の隣に新しいボタンを挿入
      targetElement.insertAdjacentElement('afterend', newButton);
    }
    console.log('Target element not found');
  }, 1000);
};
