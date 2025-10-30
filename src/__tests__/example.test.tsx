import { render, screen } from '@testing-library/react';

// Simple example test
describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });

  it('can render a simple component', () => {
    render(<div>Hello Test</div>);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });
});

