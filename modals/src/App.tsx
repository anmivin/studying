import Page from './Page';
import ModalProvider from './modal/ModalProvider';
import ToastProvider from './toast/ToastProvider';
function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <Page />
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
