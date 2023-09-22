
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Tender } from '../tender/models/Tender';
import { stages } from '../../../data/stages';
import { Tag } from 'primereact/tag';

interface FormErrors {
    name?: string
    safi?: string
    province?: string
    commune?: string
    address?: string
    mercadoPublicoId?: string
    category?: string
}
interface FormData {
    name: string;
    safi: string;
}

export const NewTenderForm = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        safi: '',
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            safi: '',
            province: '',
            comune: '',
            address: '',
            currentStage: '',
            mercadoPublicoId: '',
            category: ''

        },
        validate: (data) => {
            let errors: FormErrors = {};

            if (!data.name) {
                errors.name = 'Este campo es requerido.';
            }

            if (!data.safi) {
                errors.safi = 'Este campo es requerido.';
            }
            else if (/[^a-zA-Z0-9]+/.test(data.safi)) {
                errors.safi = 'Safi no válido';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);

            formik.resetForm();
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
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="tagstage">
                    <Tag id="currentStage" className="tender-status stage0 justify-content-end">{stages.tag[0]}</Tag>
                </div>
                <div className="card">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nombre de la Licitación*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="safi" name="safi" value={formik.values.safi} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('safi') })} />
                                <label htmlFor="safi" className={classNames({ 'p-error': isFormFieldValid('safi') })}>Safi*</label>
                            </span>
                            {getFormErrorMessage('safi')}
                        </div>
                        <Button type="submit" label="Submit" className="mt-2" />
                    </form>
                </div>
            </div>
        </div>
    );
}
export default NewTenderForm
