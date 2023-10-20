import { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from "primereact/accordion";
import { Tender } from "../../models/Tender";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { stages } from '../../../../../data/stages';
import { UpdateTenderValue, updateTender } from '../../../../../services/TenderService';
interface tenderProps {
    tenderLoading: boolean,
    tender: Tender | undefined
}
const GeneralInfo = ({ tender, tenderLoading }: tenderProps) => {
    const [tenderName, setTenderName] = useState('');
    const [safi, setSafi] = useState('');
    const [region, setRegion] = useState<string>();
    const [province, setProvince] = useState<string>();
    const [commune, setCommune] = useState<string>();
    const [address, setAddress] = useState('');
    const [mercadoPublicoId, setMercadoPublicoId] = useState('');
    const [category, setCategory] = useState('');

    const [editName, setEditName] = useState<boolean>(false);
    const [editSafi, setEditSafi] = useState<boolean>(false);
    const [editRegion, setEditRegion] = useState<boolean>(false);
    const [editProvince, setEditProvince] = useState<boolean>(false);
    const [editCommune, setEditCommune] = useState<boolean>(false);
    const [editAddress, setEditAddress] = useState<boolean>(false);
    const [editMercadoPublicId, setEditMercadoPublicoId] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<boolean>(false);

    const [selectedRegion, setSelectedRegion] = useState<boolean>(false);
    const [selectedProvince, setSelectedProvince] = useState<boolean>(false);

    const [provinceSelectRegion, setProvinceSelectRegion] = useState<Array<string>>(['']);
    const [communeSelectProvince, setCommuneSelectProvince] = useState<Array<string>>(['']);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const regions = require('../../../../../data/regions.json');
    const provinces = require('../../../../../data/provinces.json');
    const communes = require('../../../../../data/communes.json');
    const categories = require('../../../../../data/categories.json');

    const convertDate = (dateTimeStamp: number | undefined) => {
        if (dateTimeStamp) {
            const data = new Date(dateTimeStamp);
            const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
            return data.toLocaleDateString('es-CL', options).replace(/ de /g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());;
        }
        return '';
    }

    useEffect(() => {
        //setId(tender?.id ? tender?.id.toString() : '');
        setTenderName(tender?.name || '');
        setSafi(tender?.safi || '');
        setRegion(tender?.region);
        setProvince(tender?.province);
        setCommune(tender?.commune);
        setAddress(tender?.address || '');
        setMercadoPublicoId(tender?.mercadoPublicoId || '');
        setCategory(tender?.category || '');
    }, [tender]);

    const updateTenderInfo = async (body: UpdateTenderValue) => {
        if (tender) await updateTender(tender.id, body);
        setIsLoading(false);
    }
    const findProvince = (searchedRegion: string) => {
        if (searchedRegion) {
            const findRegion = provinces.find((region: any) =>
                region.region.toLowerCase() === searchedRegion.toLowerCase()
            );
            setProvinceSelectRegion(findRegion.provinces);
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

    const handleEditClickId = (name: string) => {
        if (name == 'Nombre') {
            setEditName(true);
        }
        if (name == 'SAFI') {
            setEditSafi(true);
        }
        if (name == 'Región') {
            if (region) {
                findProvince(region);
            }
            if (province) {
                findCommune(province);
            }
            setEditRegion(true);
            setEditProvince(true);
            setEditCommune(true);
        }
        if (name == 'Provincia') {
            if (region) {
                findProvince(region);
            }
            if (province) {
                findCommune(province);
            }
            setEditProvince(true);
            setEditCommune(true);
        }
        if (name == 'Comuna') {
            if (region) {
                findProvince(region);
            }
            if (province) {
                findCommune(province);
            }
            setEditCommune(true);
        }
        if (name == 'Dirección') {
            setEditAddress(true);
        }
        if (name == 'ID en Mercado Público') {
            setEditMercadoPublicoId(true);
        }
        if (name == 'Categoría') {
            setEditCategory(true);
        }
    };

    const handleExitClick = (name: string) => {
        if (name == 'Nombre') {
            setTenderName(tender?.name || '');
            setEditName(false);
        }
        if (name == 'SAFI') {
            setSafi(tender?.safi || '');
            setEditSafi(false);
        }
        if (name == 'Comuna') {
            setRegion(tender?.region);
            setProvince(tender?.province);
            setCommune(tender?.commune);
            setEditRegion(false);
            setEditProvince(false);
            setEditCommune(false);
        }
        if (name == 'Dirección') {
            setAddress(tender?.address || '');
            setEditAddress(false);
        }
        if (name == 'ID en Mercado Público') {
            setMercadoPublicoId(tender?.mercadoPublicoId || '');
            setEditMercadoPublicoId(false);
        }
        if (name == 'Categoría') {
            setCategory(tender?.category || '');
            setEditCategory(false);
        }
    };

    const handleSaveClick = async (name: string) => {
        if (name == 'Nombre') {
            setIsLoading(true);
            await updateTenderInfo({ name: tenderName })
            setEditName(false);
        }
        if (name == 'SAFI') {
            setIsLoading(true);
            await updateTenderInfo({ safi: safi })
            setEditSafi(false);
        }
        if (name == 'Comuna') {
            setIsLoading(true);
            await updateTenderInfo({ region: region, province: province, commune: commune })
            setEditRegion(false);
            setEditProvince(false);
            setEditCommune(false);
        }
        if (name == 'Dirección') {
            setIsLoading(true);
            await updateTenderInfo({ address: address })
            setEditAddress(false);
        }
        if (name == 'ID en Mercado Público') {
            setIsLoading(true);
            await updateTenderInfo({ mercadoPublicoId: mercadoPublicoId })
            setEditMercadoPublicoId(false);
        }
        if (name == 'Categoría') {
            setIsLoading(true);
            await updateTenderInfo({ category: category })
            setEditCategory(false);
        }
    };

    const handleChange = (e: any, name: string) => {
        if (name == 'Nombre') {
            console.log(e.target.value);
            setTenderName(e.target.value);
        }
        if (name == 'SAFI') {
            setSafi(e.target.value);
        }
        if (name == 'Región') {
            setRegion(e.target.value);
            if (e.target.value) {
                setSelectedRegion(true);
                setSelectedProvince(false);
                setProvince("");
                setCommune("");
                findProvince(e.target.value);
            }
            else {
                setSelectedRegion(false);
                setSelectedProvince(false);
            }
        }
        if (name == 'Provincia') {
            setProvince(e.target.value);
            if (e.target.value) {
                setSelectedProvince(true);
                setCommune("");
                findCommune(e.target.value);
            }
            else {
                setSelectedProvince(false);
            }
        }
        if (name == 'Comuna') {
            setCommune(e.target.value);
        }
        if (name == 'Dirección') {
            setAddress(e.target.value);
        }
        if (name == 'ID en Mercado Público') {
            setMercadoPublicoId(e.target.value);
        }
        if (name == 'Categoría') {
            setCategory(e.target.value);
        }
    };

    const editing = (edit: boolean, value: string, name: string) => {
        return (
            <>
                {edit ? (
                    <div>
                        <span><strong>{name}: </strong></span>
                        <InputText value={value} onChange={(e) => { handleChange(e, name) }} />
                        <Button icon={!isLoading ? 'pi pi-save' : 'pi pi-spinner pi-spin'} className="p-button-text" style={{
                            outline: 'none',
                            boxShadow: 'none'
                        }} onClick={() => { handleSaveClick(name) }} />
                        {!isLoading && <Button icon='pi pi-times' className="p-button-text" style={{
                            outline: 'none',
                            boxShadow: 'none'
                        }} onClick={() => { handleExitClick(name) }} />}

                    </div>
                ) : (

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span><strong>{name}: </strong>{value}</span>
                        <Button icon='pi pi-pencil' className="p-button-rounded p-button-text" onClick={() => { handleEditClickId(name) }} />
                    </div>
                )}
            </>
        )
    }
    const editingDrop = (edit: boolean, value: string | null | undefined, name: string, options: Array<string>, noShowButton?: boolean) => {
        return (
            <>
                {edit ? (

                    <div>
                        <span><strong>{name}: </strong></span>
                        <Dropdown value={value} options={options} onChange={(e) => { handleChange(e, name) }} filter showClear placeholder="Seleccionar" emptyFilterMessage="No se encontraron coincidencias" />
                        {!noShowButton &&
                            <div>
                                <Button icon={!isLoading ? 'pi pi-save' : 'pi pi-spinner pi-spin'} className="p-button-text" style={{
                                    outline: 'none',
                                    boxShadow: 'none'
                                }} onClick={() => { handleSaveClick(name) }} />
                                {!isLoading && <Button icon='pi pi-times' className="p-button-text" style={{
                                    outline: 'none',
                                    boxShadow: 'none'
                                }} onClick={() => { handleExitClick(name) }} />}
                            </div>
                        }
                    </div>

                ) : (

                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <span><strong>{name}: </strong>{value ? value : "Sin seleccionar"}</span>
                        <Button icon='pi pi-pencil' className="p-button-rounded p-button-text" onClick={() => { handleEditClickId(name) }} />

                    </div>

                )}
            </>
        )
    }
    const generalInfoHeader = () => {
        return (
            <div style={{ display: 'flex', gap: "1rem" }}>
                <div >
                    Ver información general
                </div>
                {tenderLoading && <div >
                    <i className="pi pi-spinner pi-spin"></i>
                </div>}
            </div>
        )
    }
    return (
        <div>
            <Accordion>
                <AccordionTab header={generalInfoHeader()}>
                    <div className="contenedor-tenderInfo">
                        <div className="part1">
                            {editing(editName, tenderName, 'Nombre')}
                            {editing(editSafi, safi, 'SAFI')}
                            {editingDrop(editRegion, region, 'Región', regions.regions, true)}
                            {editingDrop(editProvince, province, 'Provincia', provinceSelectRegion, true)}
                            {editingDrop(editCommune, commune, 'Comuna', communeSelectProvince)}
                            {editing(editAddress, address, 'Dirección')}
                        </div>
                        <div className="part2">
                            <Divider layout="vertical" />
                        </div>
                        <div className="part3">
                            {editing(editMercadoPublicId, mercadoPublicoId, 'ID en Mercado Público')}
                            {editingDrop(editCategory, category, 'Categoría', categories.categories)}
                            <div>
                                <p><strong>Fecha de creación:</strong> {convertDate(tender?.createdAt)}</p>
                            </div>
                            <div>
                                <p><strong>Creado por:</strong> {tender?.createdBy}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ marginRight: '5px' }}><strong>Etapa actual:</strong> </p>
                                {tender?.currentStage != null && <Tag id="currentStage" className={`tender-status stage${tender.currentStage} justify-content-end`}>{stages.tag[tender.currentStage]}</Tag>}
                            </div>
                            <div>
                                <p><strong>Empresas asociadas:</strong> {tender?.companies ? tender?.companies : "Ninguna"}</p>
                            </div>
                        </div>
                    </div>
                </AccordionTab>
            </Accordion>

        </div>
    );
}

export default GeneralInfo;