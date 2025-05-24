import Modal from './Modal';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal onClose={onCancel}>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
          Decline
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={onConfirm}
        >
          Accept
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
