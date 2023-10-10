
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { login } from '../../services/LoginService';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useRouter } from 'next/router';

interface FormErrors {
    email?: string,
    password?: string
}

export const LoginForm = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState<boolean>(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const router = useRouter();

    const loginUser = async (data: any) => {
        setLoading(true);
        setWrongPassword(false);
        setWrongEmail(false);
        const responseStatus = await login(data);
        if (responseStatus === 200) {
            router.push('/');
        }
        else if (responseStatus === 401) {
            setWrongPassword(true);
        }
        else if (responseStatus === 404) {
            setWrongEmail(true);
        }
        setLoading(false);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (data) => {
            let errors: FormErrors = {};

            if (!data.email) {
                errors.email = "Este campo es requerido."
            }

            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = "Correo electrónico inválido.";
            }

            if (!data.password) {
                errors.password = "Este campo es requerido."
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            loginUser(data);
        }
    });

    const isFormFieldValid = (name: string) => {
        return !!((formik.touched as any)[name] && (formik.errors as any)[name]);
    };

    const getFormErrorMessage = (name: string) => {
        return isFormFieldValid(name) && <small className="p-error">{(formik.errors as any)[name]}</small>;
    };

    return (
        <div className="form-demo">
            <div className="flex justify-content-center">
                <div className="card">
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        <div className="field" style={{ textAlign: 'left' }}>
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Correo electrónico*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field" style={{ textAlign: 'left' }}>
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} toggleMask feedback={false}
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Contraseña*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                        <Button
                            type="submit"
                            label="Ingresar"
                            icon={loading ? null : ''}
                            iconPos="right" // Esto coloca el icono a la derecha del texto del botón 
                            className={loading ? 'p-button-disabled' : ''}
                            disabled={loading}
                        >
                            {loading && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="15" animationDuration=".5s" />}</Button>
                        {wrongEmail && <small style={{ textAlign: 'center' }}>Correo electrónico incorrecto</small>}
                        {wrongPassword && <small style={{ textAlign: 'center' }}>Contraseña incorrecta</small>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;