import '@testing-library/jest-dom';

// JSDOM doesn't implement scrollIntoView
HTMLElement.prototype.scrollIntoView = function () {};
