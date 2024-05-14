import { useModal } from './modal/ModalProvider';

const InnerModal = () => {
  const { onOpenModal } = useModal();
  return (
    <div>
      <p>Тут ещё что-то написано</p>
      <button
        onClick={() => {
          onOpenModal({ content: <>Вторая модалка</> });
        }}
      >
        Open second modal
      </button>
    </div>
  );
};

export default InnerModal;
