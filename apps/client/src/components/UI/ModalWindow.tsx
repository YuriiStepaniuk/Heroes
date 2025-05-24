interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
