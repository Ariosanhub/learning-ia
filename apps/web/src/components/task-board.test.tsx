import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskBoard } from './task-board';

test('renderiza coluna Planejamento', () => {
  render(<TaskBoard />);
  expect(screen.getByText(/Planejamento/i)).toBeInTheDocument();
});
