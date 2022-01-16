import ReactDOM  from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';
import './Modal.css';
function BackDrop(props){
    return(
        <div onClick={props.hideCart} className = "backdrop"/>
    );
}

function ModalOverlay(props){
    return (
        <div className = "modal">
            <div className = "content">{props.children}</div>
        </div>
    );
}

function Modal(props){
    const OverlaysPortal = document.getElementById("overlays");

    return(
       <Fragment>
         {ReactDOM.createPortal(<BackDrop hideCart = {props.hideCart}/> , OverlaysPortal)}
         {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay> , OverlaysPortal)}
       </Fragment> 
    );
}


export default Modal;