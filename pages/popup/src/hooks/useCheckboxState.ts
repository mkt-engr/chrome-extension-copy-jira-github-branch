import { useCallback, useEffect, useState } from 'react';

export const useCheckboxState = () => {
  const [isAutoCopy, setIsAutoCopy] = useState(false);

  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAutoCopy(checked);
    chrome.storage.local.set({ checkboxState: checked });
  }, []);

  useEffect(() => {
    const fetchCheckboxState = async () => {
      const { checkboxState } = await chrome.storage.local.get(['checkboxState']);
      setIsAutoCopy(checkboxState ?? false);
    };
    fetchCheckboxState();
  }, []);
  return { isAutoCopy, handleCheckboxChange };
};
