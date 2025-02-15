export const useCheckboxState = async () => {
  const { checkboxState } = await chrome.storage.local.get(['checkboxState']);
  const a = await chrome.storage.local.get(['checkboxState']);
  return checkboxState ?? false;
};
