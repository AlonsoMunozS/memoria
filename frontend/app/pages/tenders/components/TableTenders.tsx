import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tender } from '../tender/models/Tender';
interface TenderProps {
    tenders: Array<Tender>
}

const TableTenders = ({tenders} : TenderProps) => {

    const [filters, setFilters] = useState({
        'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
        'safi': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'address': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'currentStages': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [loading, setLoading] = useState(false);

    const currentStages = ['publicación', 'consultas', 'respuestas', 'apertura técnica', 'informe evaluación técnica', 'apertura económica', 'regional', 'subdirección santiago', 'resolución', 'contraloría', 'seremía', 'adjudicación', 'cierre anticipado'];

   const onGlobalFilterChange = (e:any) => {
        const value = e.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    }

    const renderHeader = () => {
        return (
            <div style={{display: 'flex',justifyContent:'space-between',gap:'2rem'}}>
                <span className="p-input-icon-left" style={{width: '100%'}}>
                    <i className="pi pi-search" />
                    <InputText style={{width: '100%'}} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda por palabra clave" />
                </span>
                <Button style={{width:'25%'}} className="p-button-rounded" icon="pi pi-plus" label='Agregar Licitación'/>
            </div>
        )
    }

   /* const stageBodyTemplate = (rowData: string) => {
        return <span className={`customer-badge status-${rowData.currentStage}`}>{rowData.currentStage}</span>;
    }*/

    /*const stagesFilderTemplate = (options: string) => {
        return <Dropdown value={options.value} options={currentStages} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={stagesItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }*/

    const stagesItemTemplate = (option: string) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const actionBodyView = () => {
        return <Button className="p-button-rounded" icon="pi pi-eye"></Button>;
    }

    const actionBodyEdit = () => {
        return <Button className="p-button-rounded" icon="pi pi-pencil"></Button>;
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <DataTable value={tenders} paginator className="p-datatable-customers" header={header} rows={4}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                dataKey="id" rowHover
                filters={filters} filterDisplay="menu" loading={loading}
                globalFilterFields={['safi', 'address', 'currentStage']} emptyMessage="No se han encontrado licitaciones."
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Licitaciones">
                <Column field="safi" header="Safi" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="address" header="Dirección" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="currentStage" header="Etapa" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} />
                <Column header='Ver' headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyView} />
                <Column header='Editar' headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyEdit} />
            </DataTable>
        </div>
    );
};

export default TableTenders;