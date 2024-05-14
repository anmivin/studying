import { useModal } from './modal/ModalProvider';
import { useToast } from './toast/ToastProvider';
import InnerModal from './InnerModal';

const Page = () => {
  const { onOpenModal } = useModal();
  const { addToast } = useToast();
  return (
    <div>
      <button
        onClick={() => {
          onOpenModal({ content: <InnerModal /> });
        }}
      >
        Open first modal
      </button>

      <button onClick={() => addToast({ title: 'Hello', text: 'Success', variant: 'success' })}>
        Open success toast
      </button>
      <button onClick={() => addToast({ title: 'Hello', text: 'Info', variant: 'info' })}>Open info toast</button>
      <button onClick={() => addToast({ title: 'Hello', text: 'Error', variant: 'error' })}>Open error toast</button>
    </div>
  );
};

export default Page;
