import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Tag } from "primereact/tag";
import { stages } from "../../../../../data/stages";
import { useFormik } from 'formik';
import { Button } from "primereact/button";
import { Dropdown, DropdownProps } from "primereact/dropdown";
import { classNames } from 'primereact/utils';
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { createNewStage } from "../../../../../services/TenderStageService";
import { updateTender } from "../../../../../services/TenderService";
import { useRouter } from "next/router";
import { ProgressSpinner } from "primereact/progressspinner";

interface AddNextStage {
    showDialog: boolean,
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>,
    stage: any,
    setCurrentStage: React.Dispatch<React.SetStateAction<number>>
}

interface FormErrors {
    newCurrentStage?: string,
    toDate?: any
}

const AddNextStageDialog = ({ showDialog, setShowDialog, stage, setCurrentStage }: AddNextStage) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const addNewNextStage = async (data: any) => {
        setLoading(true);
        var date = new Date(data.toDate)
        if (typeof (router.query.id) == "string") {

            const body = {
                tenderId: parseInt(router.query.id, 10),
                name: data.newCurrentStage,
                toDate: date.getTime()
            }
            const updateCurrentStage = {
                currentStage: data.newCurrentStage
            }
            const responseStatus = await createNewStage(body);
            const responseStatusCurrentStage = await updateTender(parseInt(router.query.id, 10), updateCurrentStage);

            if (responseStatus === 201) {
                setCurrentStage(data.newCurrentStage);
                onHideDialog();
                formik.resetForm();
                setLoading(false);
            }
        }
    }

    const treeOne = ["6", "7"];
    const treeTwo = ["9", "10"];

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    const dropOptionTemplate = (option: number) => {
        return (
            <div>
                {<Tag id="stage.name" className={`tender-status stage${option}`}>{stages.tag[option]}</Tag>}
            </div>
        );
    }

    const dropSelectedTemplate = (option: number, props: DropdownProps) => {
        if (option) {
            return (
                <div>
                    <Tag id="stage.name" className={`tender-status stage${option}`}>{stages.tag[option]}</Tag>
                </div>
            );
        }
        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const onHideDialog = () => {
        setShowDialog(false);
        formik.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            newCurrentStage: (stage.name == 6 || stage.name == 9) ? stage.name + 2 : stage.name == 5 || stage.name == 8 ? undefined : stage.name + 1,
            toDate: undefined
        },
        validate: (data) => {
            let errors: FormErrors = {};
            if (!data.newCurrentStage) {
                errors.newCurrentStage = 'Este campo es requerido.';
            }
            if (!data.toDate) {
                errors.toDate = 'Este campo es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {
            addNewNextStage(data);
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
            <Dialog className='dialogForm-resp' header="Nueva Etapa" visible={showDialog} onHide={() => onHideDialog()} >
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="tagstage">
                            {stage.name != 5 && stage.name != 6 && stage.name != 8 && stage.name != 9 && <Tag id="stage.name" className={`tender-status stage${stage.name + 1}`}>{stages.tag[stage.name + 1]}</Tag>}
                            {(stage.name == 6 || stage.name == 9) && <Tag id="stage.name" className={`tender-status stage${stage.name + 2}`}>{stages.tag[stage.name + 2]}</Tag>}
                        </div>
                        <div className="card">
                            <form onSubmit={formik.handleSubmit} className="p-fluid">
                                {(stage.name == 5 || stage.name == 8) &&
                                    <div className="field">
                                        <span>
                                            <Dropdown id="newCurrentStage" name="newCurrentStage" value={formik.values.newCurrentStage} options={stage.name == 5 ? treeOne : treeTwo} onChange={formik.handleChange} valueTemplate={dropSelectedTemplate} itemTemplate={dropOptionTemplate} showClear placeholder="Seleccionar Nueva Etapa" emptyFilterMessage="No se encontraron coincidencias" className={classNames({ 'p-error': isFormFieldValid("newCurrentStage") })} onBlur={formik.handleBlur} />
                                            <label htmlFor="newCurrentStage" className={classNames({ 'p-error': isFormFieldValid('newCurrentStage') })}></label>
                                            {getFormErrorMessage("newCurrentStage")}
                                        </span>
                                    </div>}
                                <div className="field">
                                    <span>
                                        <Calendar id="toDate" name="toDate" value={formik.values.toDate} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Fecha de término" locale="es" />
                                        <label htmlFor="toDate" className={classNames({ 'p-error': isFormFieldValid("toDate") })}></label>
                                        {getFormErrorMessage('toDate')}
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
export default AddNextStageDialog;