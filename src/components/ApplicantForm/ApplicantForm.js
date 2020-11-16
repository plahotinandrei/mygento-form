import React from 'react';
import {FieldArray, Formik} from 'formik';
import * as yup from 'yup';
import styles from './ApplicantForm.module.css';
import FileInput from './FileInput/FileInput.js';

const ApplicantForm = (props) => {
    const validationSchema = yup.object().shape({
        firstname: yup.string().required('Введите имя'),
        lastname: yup.string().required('Введите фамилию'),
        email: yup.string().email('Пожалуйста укажите электронную почту').required('Введите электронную почту'),
        file: yup.array().of(yup.object().shape({
            file: yup.mixed().test('fileSize', 'загружайте файл размером не более 16 mb', (value) => {
                if(!value) return false
                return value.size < 16777216
            }),
            name: yup.string()
        }).nullable()).notRequired(),
        gender: yup.string().required('Укажите пол'),
        policycheck: yup.boolean().oneOf([true], 'Обязательное поле')
    })
    //.matches(/([А-Яа-я|^0-9])/, 'В имени могут быть только буквы')

    const getFileSchema = (file) => file && ({
        file: file,
        type: file.type,
        name: file.name
    })

    const getError = (touched, error) => {
        return touched && error && <span className={styles.error}>{error}</span>
    }

    const getErrorClass = (touched, error) => {
        return touched && error && styles.errorInput
    }

    const getArrErrorsMessages = (errors) => {
        const result= [];
        errors && Array.isArray(errors) && errors.forEach((value) => {
            if(typeof value == 'string') {
                result.push(value);
            }else if(typeof value == 'object') {
                Object.values(value).forEach((error) => {
                    result.push(error);
                })
            }
        })
        return result;
    }

    return (
        <div className={styles.applicantForm}>
            <h1 className={styles.title}>Анкета соискателя</h1>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    file: undefined,  
                    gender: '',
                    gitlink: '',
                    policycheck: false
                }}
                validateOnBlur
                onSubmit={(values) => {console.log(values)}}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty}) => {
                    
                    return (
                        <div className={styles.form}>
                            <p className={styles.groupTitle}>Личные данные</p>
                            <div className={styles.personal}>                                
                                <div className={styles.personalInput}>
                                    <label htmlFor='firstname'  className={styles.label}>Имя*</label>
                                    <input 
                                        className={`${getErrorClass(touched.firstname, errors.firstname)} ${styles.input}`}
                                        placeholder='Имя'
                                        type='text' 
                                        name='firstname'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.firstname}
                                    />   <br/>
                                    {getError(touched.firstname, errors.firstname)}
                                </div>
                                <div className={styles.personalInput}>
                                    <label htmlFor='lastname'  className={styles.label}>Фамилия*</label>
                                    <input 
                                        className={`${getErrorClass(touched.lastname, errors.lastname)} ${styles.input}`}
                                        placeholder='Фамилия'
                                        type='text' 
                                        name='lastname'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.lastname}
                                    />   <br/>
                                    {getError(touched.lastname, errors.lastname)}
                                </div>
                                <div className={styles.personalInput}>
                                    <label htmlFor='email' className={styles.label}>Электронная почта*</label>
                                    <input 
                                        className={`${getErrorClass(touched.email, errors.email)} ${styles.input}`}
                                        placeholder='Электронная почта'
                                        type='email' 
                                        name='email'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />   <br/>
                                    {getError(touched.email, errors.email)}
                                </div>
                                <FieldArray name='file'>
                                    {(arrayHelper) => {
                                        const onChange = (fileList) => {
                                            const file = getFileSchema(fileList[0]);
                                            if(!file) {
                                                arrayHelper.remove(0);
                                            };
                                            if(Array.isArray(values.file)) {
                                                arrayHelper.replace(0, file)
                                            }else {
                                                arrayHelper.push(file)
                                            }
                                        }

                                        const onRemove = () => {
                                            arrayHelper.remove(0);
                                        }

                                        return (
                                            <div className={`${styles.personalInput} ${styles.fileInput}`}>
                                                <FileInput 
                                                    values = {values.file}
                                                    onChange = {onChange}
                                                    onRemove= {onRemove}
                                                    errors={Boolean(errors.file)}
                                                    
                                                />
                                                {getArrErrorsMessages(errors.file).map((error, i) => {
                                                    return <span className={styles.error} key={i}>{error}</span>
                                                })}
                                            </div>
                                            
                                        )
                                    }}
                                </FieldArray>
                            </div>
                            <p className={styles.groupTitle}>Пол* {errors.gender && <span className={styles.error}>{errors.gender}</span>}</p> 
                            <div className={styles.gender}>    
                                <div className={styles.genderGroup}>
                                    <label>
                                        <input 
                                            name='gender' 
                                            type='radio' 
                                            value="male"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        Мужской
                                    </label>
                                    
                                    <label>
                                        <input 
                                            name='gender' 
                                            type='radio' 
                                            value="female"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            />
                                        Женский
                                    </label>
                                </div>
                            </div>
                            <p className={styles.groupTitle}>Github</p>
                            <div className={styles.gitlink}>
                                <label htmlFor='email' className={styles.label}>Вставьте ссылку на Github</label>
                                <input 
                                    className={styles.input}
                                    placeholder='Вставьте ссылку на Github'
                                    type='text' 
                                    name='gitlink'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.gitlink}
                                />
                            </div>
                            <div className={styles.policychec}>
                                <label>
                                    <input
                                        type='checkbox'
                                        name='policycheck'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        checked={values.policycheck}
                                    />
                                    * Я согласен с <span>политикой конфиденциальности</span>
                                </label>
                                {errors.policycheck && <span className={styles.error}>{errors.policycheck}</span>}
                            </div>    
                            <button
                                className={styles.sendBtn}
                                disabled={!isValid || !dirty}
                                onClick={handleSubmit}
                                type='submit'
                            >
                                Отправить
                            </button>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
    
}

export default ApplicantForm