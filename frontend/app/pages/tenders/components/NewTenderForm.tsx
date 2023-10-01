
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Tender } from '../tender/models/Tender';
import { stages } from '../../../data/stages';
import { Tag } from 'primereact/tag';
import { Dropdown, DropdownProps } from 'primereact/dropdown';
import createTender from '../../services/TenderService';

interface dialogProps {
    setShowDialog: (bool: boolean) => void;
}

interface FormErrors {
    name?: string
    safi?: string
    region?: string
    province?: string
    commune?: string
    address?: string
    mercadoPublicoId?: string
}
interface FormData {
    name: string;
    safi: string;
}

export const NewTenderForm: React.FC<dialogProps> = ({ setShowDialog }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        safi: '',
    });
    const [selectedRegion, setSelectedRegion] = useState<boolean>(false);
    const [selectedProvince, setSelectedProvince] = useState<boolean>(false);
    const [provinceSelectRegion, setProvinceSelectRegion] = useState<Array<string>>();
    const [communeSelectProvince, setCommuneSelectProvince] = useState<Array<string>>();

    const regions = require('../../../data/regions.json');
    const provinces = require('../../../data/provinces.json');
    const communes = require('../../../data/communes.json');
    const categories = require('../../../data/categories.json');


    const onRegionChange = (e: { value: any }) => {
        if (e.value) {
            setSelectedRegion(true);
            setSelectedProvince(false);
            findProvince(e.value);
        }
        else {
            setSelectedRegion(false);
            setSelectedProvince(false);
        }
    }

    const findProvince = (searchedRegion: string) => {
        if (searchedRegion) {
            const findRegion = provinces.find((region: any) =>
                region.region.toLowerCase() === searchedRegion.toLowerCase()
            );
            setProvinceSelectRegion(findRegion.provinces);
        }

    }

    const onProvinceChange = (e: { value: any }) => {
        if (e.value) {
            setSelectedProvince(true);
            findCommune(e.value);
        }
        else {
            setSelectedProvince(false);
        }
    }

    const findCommune = (searchedProvince: string) => {
        if (searchedProvince) {
            const findProvince = communes.find((province: any) =>
                province.province.toLowerCase() === searchedProvince.toLowerCase()
            );
            setCommuneSelectProvince(findProvince.communes);
        }

    }

    const dropOptionTemplate = (option: any) => {
        return (
            <div>{option}</div>
        );
    }

    const dropSelectedTemplate = (option: string, props: DropdownProps) => {
        if (option) {
            return (
                <div>{option}</div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }
    const onHide = () => {
        setShowDialog(false);
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            safi: '',
            region: undefined,
            province: undefined,
            commune: undefined,
            address: '',
            mercadoPublicoId: '',
            category: undefined

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

            if (!data.mercadoPublicoId) {
                errors.mercadoPublicoId = 'Este campo es requerido.';
            }

            if (!data.region) {
                errors.region = 'Este campo es requerido.';
            }

            if (!data.province) {
                errors.province = 'Este campo es requerido.';
            }

            if (!data.commune) {
                errors.commune = 'Este campo es requerido.';
            }

            if (!data.address) {
                errors.address = 'Este campo es requerido.';
            }

            return errors;
        },
        onSubmit: (data) => {
            setFormData(data);
            setShowMessage(true);
            onHide();
            formik.resetForm();
            createTender(data);
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
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="mercadoPublicoId" name="mercadoPublicoId" value={formik.values.mercadoPublicoId} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('mercadoPublicoId') })} />
                                <label htmlFor="mercadoPublicoId" className={classNames({ 'p-error': isFormFieldValid('mercadoPublicoId') })}>Id de Mercado Público*</label>
                            </span>
                            {getFormErrorMessage('mercadoPublicoId')}
                        </div>
                        <div className="field">
                            <span>
                                <Dropdown id='region' name='region' value={formik.values.region} options={regions.regions} onChange={(event) => { onRegionChange(event), formik.handleChange(event) }} filter showClear placeholder="Seleccionar Región" emptyFilterMessage="No se encontraron coincidencias" valueTemplate={dropSelectedTemplate} itemTemplate={dropOptionTemplate} className={classNames({ 'p-error': isFormFieldValid('region') })} />
                                <label htmlFor="region" className={classNames({ 'p-error': isFormFieldValid('region') })}></label>
                                {getFormErrorMessage('region')}
                            </span>
                        </div>
                        <div className="field">
                            <span>
                                <Dropdown id='province' name='province' value={selectedRegion ? formik.values.province : null} options={provinceSelectRegion} onChange={(event) => { onProvinceChange(event), formik.handleChange(event) }} disabled={!selectedRegion} filter showClear placeholder="Seleccionar Provincia" emptyFilterMessage="No se encontraron coincidencias" valueTemplate={dropSelectedTemplate} itemTemplate={dropOptionTemplate} className={classNames({ 'p-error': isFormFieldValid('province') })} />
                                <label htmlFor="province" className={classNames({ 'p-error': isFormFieldValid('province') })}></label>
                                {getFormErrorMessage('province')}
                            </span>
                        </div>
                        <div className="field">
                            <span>
                                <Dropdown id='commune' name='commune' value={selectedProvince ? formik.values.commune : null} options={communeSelectProvince} onChange={formik.handleChange} disabled={!selectedProvince} filter showClear placeholder="Seleccionar Comuna" emptyFilterMessage="No se encontraron coincidencias" valueTemplate={dropSelectedTemplate} itemTemplate={dropOptionTemplate} className={classNames({ 'p-error': isFormFieldValid('comuna') })} />
                                <label htmlFor="commune" className={classNames({ 'p-error': isFormFieldValid('commune') })}></label>
                                {getFormErrorMessage('commune')}
                            </span>
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id="address" name="address" value={formik.values.address} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('address') })} />
                                <label htmlFor="address" className={classNames({ 'p-error': isFormFieldValid('address') })}>Dirección*</label>
                            </span>
                            {getFormErrorMessage('address')}
                        </div>
                        <div className="field">
                            <span>
                                <Dropdown id='category' name='category' value={formik.values.category} options={categories.categories} onChange={formik.handleChange} filter showClear placeholder="Seleccionar Categoría" emptyFilterMessage="No se encontraron coincidencias" valueTemplate={dropSelectedTemplate} itemTemplate={dropOptionTemplate} />
                                <label htmlFor="category" className={classNames({ 'p-error': isFormFieldValid('commune') })}></label>
                            </span>
                        </div>
                        <div className="confirm-button-container">
                            {/*<Button type="submit" label="Submit" className="mt-2" />*/}
                            <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
                            <Button type="submit" label="Guardar" icon="pi pi-check" autoFocus />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default NewTenderForm
