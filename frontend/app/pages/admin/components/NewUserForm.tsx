import { useFormik } from "formik"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { ProgressSpinner } from "primereact/progressspinner"
import { useState } from "react"
import { classNames } from 'primereact/utils';
import { Password } from "primereact/password"

interface dialogProps {
    setShowDialog: (bool: boolean) => void,
    setUsers: React.Dispatch<React.SetStateAction<Array<User>>>,
    showDialog: boolean
}
type User = {
    name: string,
    rut: string,
    email: string,
    userPermits: {
        tenders?: {
            create: boolean,
            remove: boolean,
            update: boolean,
            read: boolean
        },
        contracts?: {
            create: boolean,
            remove: boolean,
            update: boolean,
            read: boolean
        }
    },
    role: string
}

interface FormErrors {
    name?: string,
    rut?: string,
    email?: string,
    role?: string,
    password?: string
}

export const NewUserForm: React.FC<dialogProps> = ({ setShowDialog, showDialog, setUsers }) => {
    const [selectedRegion, setSelectedRegion] = useState<boolean>(false);
    const [selectedProvince, setSelectedProvince] = useState<boolean>(false);
    const [provinceSelectRegion, setProvinceSelectRegion] = useState<Array<string>>();
    const [communeSelectProvince, setCommuneSelectProvince] = useState<Array<string>>();
    const [loading, setLoading] = useState<boolean>(false)


    const addNewUser = async (data: any) => {
        //setLoading(true);
        //const responseStatus = await createTender(data);
        /*if (responseStatus === 201) {
            setType("success")
            setMessage("Licitación agregada con éxito")
            onHide();
            setShowToast(true);
            formik.resetForm();
            setLoading(false);
            getTenderList(data);

        }*/
        console.log(data);

    }

    const onHide = () => {
        setShowDialog(false);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            rut: '',
            email: '',
            password: ''
        },
        validate: (data) => {
            let errors: FormErrors = {};

            if (!data.name) {
                errors.name = 'Este campo es requerido.';
            }

            if (!data.rut) {
                errors.rut = 'Este campo es requerido.'
            }

            if (!data.email) {
                errors.email = 'Este campo es requerido.';
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Correo electrónico inválido.';
            }

            if (!data.password) {
                errors.password = 'Este campo es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {
            //setFormData(data);
            //setShowMessage(true);
            addNewUser(data);
        }
    });
    const isFormFieldValid = (name: string) => {
        return !!((formik.touched as any)[name] && (formik.errors as any)[name]);
    };

    const getFormErrorMessage = (name: string) => {
        return isFormFieldValid(name) && <small className="p-error">{(formik.errors as any)[name]}</small>;
    };
    return (
        <div>
            <Dialog className='dialogForm-resp' header="Nuevo Usuario" visible={showDialog} onHide={() => onHide()} >
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="card">
                            <form onSubmit={formik.handleSubmit} className="p-fluid">
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Nombre*</label>
                                    </span>
                                    {getFormErrorMessage('name')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="rut" name="rut" value={formik.values.rut} onChange={formik.handleChange} onBlur={formik.handleBlur} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('rut') })} />
                                        <label htmlFor="rut" className={classNames({ 'p-error': isFormFieldValid('rut') })}>Rut*</label>
                                    </span>
                                    {getFormErrorMessage('rut')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                        <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Correo electrónico*</label>
                                    </span>
                                    {getFormErrorMessage('email')}
                                </div>
                                <div className="field">
                                    <span className="p-float-label">
                                        <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} toggleMask feedback={false}
                                            className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Contraseña*</label>
                                    </span>
                                    {getFormErrorMessage('password')}
                                </div>
                                <div className="confirm-button-container">
                                    <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => onHide()} className="p-button-text p-button-warning" />
                                    <Button
                                        type="submit"
                                        label="Guardar"
                                        icon={loading ? null : 'pi pi-check'}
                                        iconPos="right" // Esto coloca el icono a la derecha del texto del botón 
                                        className={loading ? 'p-button-disabled ' : 'p-button-warning'}
                                        disabled={loading}
                                    >
                                        {loading && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="15" animationDuration=".5s" />}</Button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </Dialog>
        </div>
    );
}

export default NewUserForm;