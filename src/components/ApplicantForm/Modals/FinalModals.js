import React from 'react';
import {Modal} from 'react-bootstrap';
import styles from './Modals.module.css';

const FinalModal = (props) => {
    const closeModal = () => {
        props.resetForm();
        props.onHide();
    }
    return (
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            backdrop="static"
        >
            <div className={`${styles.content} ${styles.final}`}>
                <p className={styles.title}>Спасибо {props.name}!</p>
                <p className={styles.text}>Мы скоро свяжемся с вами</p>
                <button
                    className={`${styles.btn} btnApp`}
                    onClick={closeModal}
                >
                    Понятно
                </button>
            </div>
        </Modal>
    )
}

export default FinalModal;