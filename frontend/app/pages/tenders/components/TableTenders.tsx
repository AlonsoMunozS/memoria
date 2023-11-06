import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tender } from '../tender/models/Tender';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import NewTenderDialog from './NewTenderDialog';
import NewTenderForm from './NewTenderForm';
import { stages } from '../../../data/stages';
import InfoMessage from '../../components/InfoMessage';
import { ProgressSpinner } from 'primereact/progressspinner';

interface TenderProps {
    tenders: Array<Tender>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setTenders: React.Dispatch<React.SetStateAction<Array<Tender>>>
}

/*const stages = {
    "publicacion": "PUBLICACIÓN",
    "FirstStage": "PUBLICACIÓN"
}*/

const TableTenders = ({ tenders, loading, setLoading, setTenders }: TenderProps) => {

    const [type, setType] = useState<"success" | "info" | "warn" | "error" | undefined>();
    const [message, setMessage] = useState<string | undefined>();
    const [showToast, setShowToast] = useState<boolean>(false);

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'safi': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'address': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'currentStage': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [displayNewTenderDialog, setDisplayNewTenderDialog] = useState(false);

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="p-input-icon-left" style={{ flexGrow: 1, marginRight: '10px' }}>
                    <i className="pi pi-search" />
                    <InputText style={{ width: '100%' }} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda por palabra clave" />
                </div>
                <div>
                    <Button className="p-button-rounded fullplusbutton-resp" icon="pi pi-plus" label='Agregar Licitación' onClick={() => { setDisplayNewTenderDialog(true); setShowToast(false) }} />
                    <Button className="p-button-rounded smallplusbutton-resp" icon="pi pi-plus" onClick={() => { setDisplayNewTenderDialog(true) }} />
                </div>
            </div>
        )
    }

    const currentStageBodyTemplate = (rowData: any) => {
        const currentStage: number = rowData.currentStage
        return <Tag className={`tender-status stage${currentStage}`}>{stages.tag[currentStage]}</Tag>;
    }

    const currentStageFilterTemplate = (options: any) => {
        return <Dropdown value={options.value} options={stages.tag} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={currentStageItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const currentStageItemTemplate = (option: any) => {
        return <Tag className={`customer-badge status-${option}`}>{option}</Tag>;
    }

    const currentStageRowFilterTemplate = (options: any) => {
        return <Dropdown value={options.value} options={stages.tag} onChange={(e) => options.filterApplyCallback(e.value)} itemTemplate={currentStageItemTemplate} placeholder="Selecciona una Estapa" className="p-column-filter" showClear />
    }

    const actionBodyView = (rowData: any) => {
        return <Button className="p-button-rounded" icon="pi pi-eye" onClick={() => { window.open(`http://191.233.245.250:3001/tenders/tender/${rowData.id}`, '_blank'); }}></Button>;
    }
    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            {loading && (
                <div className="spinner-container">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            )}
            <DataTable value={tenders.reverse()} paginator className="p-datatable-customers" header={header} rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                dataKey="id" rowHover size="small"
                filters={filters} filterDisplay="menu"
                globalFilterFields={['name', 'mercadoPublicoId', 'currentStage']} emptyMessage="No se han encontrado licitaciones."
                currentPageReportTemplate={"Se encontraton {totalRecords} Licitaciones"}>
                <Column field="name" header="Nombre" sortable filter filterPlaceholder="Búsqueda por nombre" style={{ minWidth: '14rem' }} />
                <Column field="mercadoPublicoId" header="ID Mercado Público" sortable filter filterPlaceholder="Búsqueda por Id mercado público" style={{ minWidth: '14rem' }} />
                <Column field="currentStage" header="Etapa" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} body={currentStageBodyTemplate} filter filterElement={currentStageFilterTemplate} />
                <Column header='Ver' headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyView} />
            </DataTable>
            <NewTenderDialog showDialog={displayNewTenderDialog} setShowDialog={setDisplayNewTenderDialog}>
                <NewTenderForm setShowDialog={setDisplayNewTenderDialog} setType={setType} setMessage={setMessage} setShowToast={setShowToast} setTenders={setTenders} setLoadingTenders={setLoading} />
            </NewTenderDialog>
            <div className='p-toast'>
                <InfoMessage type={type} message={message} showToast={showToast} />
            </div>
        </div>
    );
};

export default TableTenders;
