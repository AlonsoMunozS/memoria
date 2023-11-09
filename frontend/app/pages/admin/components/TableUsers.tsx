import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import InfoMessage from '../../components/InfoMessage';
import { ProgressSpinner } from 'primereact/progressspinner';
import NewUserForm from './NewUserForm';

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

interface UserProps {
    users: Array<User>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setUsers: React.Dispatch<React.SetStateAction<Array<User>>>
}

const TableUsers = ({ users, loading, setLoading, setUsers }: UserProps) => {

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
    const [displayNewUserDialog, setDisplayNewUserDialog] = useState(false);

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
                    <Button className="p-button-rounded fullplusbutton-resp p-button-warning" icon="pi pi-plus" label='Agregar Usuario' onClick={() => { setDisplayNewUserDialog(true) }} />
                    <Button className="p-button-rounded smallplusbutton-resp p-button-warning" icon="pi pi-plus" onClick={() => { setDisplayNewUserDialog(true) }} />
                </div>
            </div>
        )
    }

    const actionBodyView = (rowData: any) => {
        return <Button className="p-button-rounded p-button-warning" icon="pi pi-pencil"></Button>;
    }
    const header = renderHeader();

    return (
        <div className="datatable-doc-demo">
            {loading && (
                <div className="spinner-container">
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                </div>
            )}
            <DataTable value={users} paginator className="p-datatable-customers" header={header} rows={5}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                dataKey="id" rowHover size="small"
                globalFilterFields={['id', 'rut', 'email']} emptyMessage="No se han encontrado usuarios."
                currentPageReportTemplate={"Se encontraton {totalRecords} Usuarios"}>
                <Column field="name" header="Nombre" />
                <Column field="rut" header="Rut" />
                <Column field="email" header="Correo electrónico" />
                <Column header='Editar' headerStyle={{ width: '4rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyView} />
            </DataTable>
            <NewUserForm setShowDialog={setDisplayNewUserDialog} showDialog={displayNewUserDialog} setUsers={setUsers} />
            <div className='p-toast'>
                <InfoMessage type={type} message={message} showToast={showToast} />
            </div>
        </div>
    );
};

export default TableUsers;