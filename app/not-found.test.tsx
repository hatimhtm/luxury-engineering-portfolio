import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

describe('NotFound Component', () => {
  it('renders the 404 text', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the "You\'re Lost" heading', () => {
    render(<NotFound />);
    expect(screen.getByText(/You're Lost/i)).toBeInTheDocument();
  });

  it('renders the descriptive text', () => {
    render(<NotFound />);
    expect(screen.getByText(/But so was I — from Tangier to Nanchang to Manila./i)).toBeInTheDocument();
    expect(screen.getByText(/The difference is, I always find my way. Let me help you find yours./i)).toBeInTheDocument();
  });

  it('renders the "Go Home" link pointing to home page', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /Go Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the "Let\'s Talk Instead" link pointing to contact page', () => {
    render(<NotFound />);
    const link = screen.getByRole('link', { name: /Let's Talk Instead/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/contact');
  });

  it('renders the easter egg text', () => {
    render(<NotFound />);
    expect(screen.getByText(/\/\/ lord_decay was here too/i)).toBeInTheDocument();
  });
});
