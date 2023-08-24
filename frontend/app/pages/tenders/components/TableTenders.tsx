import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tender } from '../tender/models/Tender';
interface tenderProps {
    Tenders: Array<Tender>
}

const TableTenders = ({Tenders} : tenderProps) => {

    const [tenders, setTenders] = useState(Tenders);

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
            <div className="flex justify-content-between align-items-center">
                <h5 className="m-0">Licitaciones</h5>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Búsqueda por palabra clave" />
                </span>
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

    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-eye"></Button>;
    }

    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            <div className="card datatable-margin">
                <DataTable value={tenders} paginator className="p-datatable-customers" header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[10,25,50]}
                    dataKey="id" rowHover
                    filters={filters} filterDisplay="menu" loading={loading}
                    globalFilterFields={['safi', 'address', 'currentStage']} emptyMessage="No customers found."
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="safi" header="Safi" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                    <Column field="address" header="Dirección" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                    <Column field="currentStage" header="Etapa" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '10rem' }} />
                    <Column headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
                </DataTable>
            </div>
        </div>
    );
};

export default TableTenders;