import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from './ConfirmationModal';

describe('ConfirmationModal', () => {
  const message = 'Are you sure?';
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the message and buttons', () => {
    render(
      <ConfirmationModal
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(/Decline/i)).toBeInTheDocument();
    expect(screen.getByText(/Accept/i)).toBeInTheDocument();
  });

  it('calls onCancel when Decline button or modal close button is clicked', () => {
    render(
      <ConfirmationModal
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText(/Decline/i));
    expect(onCancel).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('×'));
    expect(onCancel).toHaveBeenCalledTimes(2);
  });

  it('calls onConfirm when Accept button is clicked', () => {
    render(
      <ConfirmationModal
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    fireEvent.click(screen.getByText(/Accept/i));
    expect(onConfirm).toHaveBeenCalled();
  });
});
