import { sampleFunction } from '@src/sampleFunction';
import { createCopyBranchNameButton } from '@src/createCopyBranchNameButton';

console.log('content script loaded');

// Shows how to call a function defined in another module
// sampleFunction();

createCopyBranchNameButton();
