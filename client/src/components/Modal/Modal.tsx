import M from "materialize-css";
import React, { Fragment, useEffect } from "react";

// interface IStateProps {
// }

// interface IDispatchProps {
// }

interface IModalProps {
    id: string;
    modalHeaderName?: string;
}

const Modal: React.FC<IModalProps> = (props) => {

    const { id, modalHeaderName, children } = props;

    console.log(modalHeaderName);

    const elems = document.querySelectorAll(".modal");
    const instances = M.Modal.init(elems, { inDuration: 500, outDuration: 500, dismissible: false, opacity: 0.755 });

    useEffect(() => {
        document.addEventListener("DOMContentLoaded", () => {
            instances[0].open();
        });
    }, []);

    const handleCloseEvent = () => {
        document.addEventListener("DOMContentLoaded", () => {
            instances[0].close();
            instances[0].destroy();
        });
    };

    return (
        <Fragment>
            <div id={id} className="modal bottom-sheet">
                <div className="modal-content">
                    <h4>{modalHeaderName}</h4>
                    {children}
                </div>
                <a href="#!" className="modal-close btn-floating btn-large green"><i className="material-icons">done</i></a>
                {/* <a href="#!" className="modal-close btn-floating btn-medium red"><i className="material-icons">delete_forever</i></a> */}
                <div className="modal-footer">
                    <span><button className="btn modal-close">CANCEL</button></span>
                </div>
            </div>
        </Fragment>
    );
};

export default Modal;
