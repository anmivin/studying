import * as ReactDOM from 'react-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import CloseIcon from '../icons/xmark';
import './Modal.css';

interface ModalProps {
  children: React.ReactNode;
  id: number;
  onClose: () => void;
}

const Modal = ({ children, id, onClose }: ModalProps) => {
  const [isCreatedPortal, setCreatedPortal] = useState<boolean>(false);

  useEffect(() => {
    const existportal = document.querySelector(`.portal-${id}`);
    if (existportal) return;
    const portal = document.createElement('div');
    portal.classList.add(`portal-${id}`);
    document.body.appendChild(portal);
    setCreatedPortal(true);
  }, [id]);

  const modalRef = useRef<HTMLDivElement>(null);

  const modalCloseHandler = useCallback(
    (target?: EventTarget) => {
      if (target && modalRef.current?.contains(target as Node)) return;
      const portal = document.querySelector(`.portal-${id}`);
      portal && document.body.removeChild(portal);
      onClose();
    },
    [id],
  );

  if (!isCreatedPortal) return null;

  return ReactDOM.createPortal(
    <div onClick={(e) => modalCloseHandler(e.target)} className="backdrop">
      <div ref={modalRef} className="modal-body">
        <div>
          <div className="modal-button" onClick={() => modalCloseHandler()}>
            <CloseIcon />
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.querySelector(`.portal-${id}`) as HTMLElement,
  );
};

export default Modal;
