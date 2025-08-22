import { render, screen } from '@testing-library/react';
import Hero from '../Hero';

describe('Hero component', () => {
  it('renders heading and paragraph', () => {
    render(<Hero />);
    expect(screen.getByText(/Revolutionizing Barcode & RFID Solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/Innovative technology for sustainable/i)).toBeInTheDocument();
  });

  it('renders explore button', () => {
    render(<Hero />);
    expect(screen.getByText(/Explore Our Solutions/i)).toBeInTheDocument();
  });
});
