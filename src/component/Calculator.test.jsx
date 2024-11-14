import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator Component', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<Calculator />);
  });

  it('renders calculator title', () => {
    expect(screen.getByText('Calculator')).toBeInTheDocument();
  });

  it('renders initial display value as "0"', () => {
    expect(screen.getByRole('textbox').value).toBe('0');
  });

  it('displays entered digits correctly', () => {
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    expect(screen.getByRole('textbox').value).toBe('123');
  });

  it('handles basic addition operation', () => {
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').value).toBe('5');
  });

  it('handles square root operation', () => {
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('√'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').value).toBe('3');
  });

  it('handles percentage operation', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('%'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').value).toBe('0.5');
  });

  it('saves and recalls memory correctly', () => {
    fireEvent.click(screen.getByText('7'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('MS'));
    fireEvent.click(screen.getByText('CLEAR'));
    fireEvent.click(screen.getByText('MR'));
    expect(screen.getByRole('textbox').value).toBe('7');
  });

  it('clears memory correctly', () => {
    fireEvent.click(screen.getByText('9'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('MS'));
    fireEvent.click(screen.getByText('MC'));
    fireEvent.click(screen.getByText('MR'));
    expect(screen.getByRole('textbox').value).toBe('0');
  });

  it('clears all values when "CLEAR" is clicked', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('='));
    fireEvent.click(screen.getByText('CLEAR'));
    expect(screen.getByRole('textbox').value).toBe('0');
  });

  it('handles division by zero gracefully', () => {
    fireEvent.click(screen.getByText('8'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').value).toBe('Error');
  });

  it('calculates decimal operations', () => {
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByRole('textbox').value).toBe('8');
  });
});
