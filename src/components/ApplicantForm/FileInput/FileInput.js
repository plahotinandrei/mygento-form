import React from 'react'
import {useDropzone} from 'react-dropzone'
import styles from './FileInput.module.css';
import sprite from './../../../assets/img/form-sprite.svg'

function FileInput(props) {
    const onDrop = (acceptedFiles) => {
        console.log(typeof acceptedFiles);
        props.onChange(acceptedFiles);
    }

    const {getRootProps, getInputProps} = useDropzone({onDrop, maxFiles: 1})

    return (
        <div className={styles.fileInput}>   
            {props.values && props.values.indexOf(undefined) && props.values.length ? 
                <div onClick={() => props.onRemove()} className={`${styles.file} ${props.errors ? styles.error : ""}`}>
                    <svg className={styles.clip}>
                        <use href={sprite + '#paper-clip'}/>
                    </svg>
                    <span className={styles.fileName}>
                        {props.values[0]['name']}
                    </span>
                    <svg className={styles.close}>
                        <use href={sprite + '#close'}/>
                    </svg>
                </div>
                : 
                <div {...getRootProps()} className={styles.drop}>
                    <input {...getInputProps()} multiple={false}/>
                    <svg className={styles.plus}>
                        <use href={sprite + '#plus'}/>
                    </svg>
                    <span className={styles.dropText}>Загрузить резюме</span>
                </div>
            }
        </div>
    )
}

export default FileInput;