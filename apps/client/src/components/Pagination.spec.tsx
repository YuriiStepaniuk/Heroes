import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination component', () => {
  const onPageChange = jest.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders page info', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText('Page 2 of 5')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={onPageChange} />);
    const prevBtn = screen.getByText(/Previous/i);
    expect(prevBtn).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={onPageChange} />);
    const nextBtn = screen.getByText(/Next/i);
    expect(nextBtn).toBeDisabled();
  });

  it('calls onPageChange with page - 1 when Previous clicked', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const prevBtn = screen.getByText(/Previous/i);
    fireEvent.click(prevBtn);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with page + 1 when Next clicked', () => {
    render(<Pagination page={3} totalPages={5} onPageChange={onPageChange} />);
    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
