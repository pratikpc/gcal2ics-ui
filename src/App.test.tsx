import React from 'react';
import { queryByAttribute, render, screen } from '@testing-library/react';
import App from './App';

test('renders realizes link exists', () => {
   render(<App />);
   const linkElement = screen.getByDisplayValue(/embed/i);
   expect(linkElement).toBeInTheDocument();
});
