import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from 'formik';
import { Button } from "primereact/button";
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import { createStageComments } from "../../../../../services/TenderStageService";

interface AddNextStage {
    showDialog: boolean,
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>,
    stage: any
}

interface FormErrors {
    post?: string,
}

const AddComment = ({ showDialog, setShowDialog, stage }: AddNextStage) => {


    const addNewComment = async (data: any) => {
        const body = {
            stageId: stage.id,
            post: data.post
        }
        console.log(body)
        const responseStatus = await createStageComments(body);
        if (responseStatus === 201) {
            onHideDialog();
            formik.resetForm();
        }

    }

    const onHideDialog = () => {
        setShowDialog(false);
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            post: ''
        },
        validate: (data) => {
            let errors: FormErrors = {};
            if (!data.post) {
                errors.post = 'Este campo es requerido.';
            }


            return errors;
        },
        onSubmit: (data) => {
            addNewComment(data);
        }
    });

    const isFormFieldValid = (name: string) => {
        // Utiliza type assertion para indicar que estás seguro de que `name` existe en formik.touched y formik.errors
        return !!((formik.touched as any)[name] && (formik.errors as any)[name]);
    };

    const getFormErrorMessage = (name: string) => {
        return isFormFieldValid(name) && <small className="p-error">{(formik.errors as any)[name]}</small>;
    };


    return (
        <div>
            <Dialog className='dialogForm-resp' header="Nuevo Comentario" visible={showDialog} onHide={() => onHideDialog()} >
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="card">
                            <form onSubmit={formik.handleSubmit} className="p-fluid">
                                <div className="field">
                                    <span>
                                        <InputTextarea id="post" name="post" value={formik.values.post} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Escribe un comentario" />
                                        <label htmlFor="post" className={classNames({ 'p-error': isFormFieldValid("post") })}></label>
                                        {getFormErrorMessage('post')}
                                    </span>
                                </div>

                                <div className="confirm-button-container">
                                    <Button type="button" label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={() => { onHideDialog() }} />
                                    <Button type="submit" label="Guardar" icon="pi pi-check" iconPos="right" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </Dialog >
        </div >
    )


}
export default AddComment;