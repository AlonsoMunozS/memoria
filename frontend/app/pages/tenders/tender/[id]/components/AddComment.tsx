import React, { useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { useFormik } from 'formik';
import { Button } from "primereact/button";
import { classNames } from 'primereact/utils';
import { InputTextarea } from "primereact/inputtextarea";
import { createStageComments, getStageComments } from "../../../../../services/TenderStageService";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";


type StageComment = {
    stageId: number
    createdBy: string
    createdAt: number
    post: string
}

interface AddNextStage {
    showDialog: boolean,
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>,
    stage: any,
    setStageCommentsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setStageComments: React.Dispatch<React.SetStateAction<Array<StageComment> | undefined>>
}

interface FormErrors {
    post?: string,
}

const AddComment = ({ showDialog, setShowDialog, stage, setStageCommentsLoading, setStageComments }: AddNextStage) => {
    const [loading, setLoading] = useState(false);
    const msgs = useRef<Toast | null>(null);

    const dataUser = localStorage.getItem('dataUser');
    const dataUserJson = JSON.parse(dataUser || '{}');

    const getStageCommentsHandler = async () => {
        setStageCommentsLoading(true);
        const comments = await getStageComments(stage.id)
        setStageComments(comments)
        setStageCommentsLoading(false);
    }

    const addNewComment = async (data: any) => {
        setLoading(true);
        const body = {
            stageId: stage.id,
            createdBy: dataUserJson.name,
            post: data.post
        }
        console.log(body)
        const responseStatus = await createStageComments(body);
        if (responseStatus === 201) {
            onHideDialog();
            formik.resetForm();
            setLoading(false);
            getStageCommentsHandler()
            msgs.current?.show({ severity: "success", summary: "Exitoso", detail: "Comentario añadido correctamente", life: 3000 });


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
            <Toast ref={msgs} position="bottom-center" />
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
                                    <Button
                                        type="submit"
                                        label="Guardar"
                                        icon={loading ? null : 'pi pi-check'}
                                        iconPos="right" // Esto coloca el icono a la derecha del texto del botón 
                                        className={loading ? 'p-button-disabled' : ''}
                                        disabled={loading}
                                    >
                                        {loading && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="15" animationDuration=".5s" />}</Button>

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