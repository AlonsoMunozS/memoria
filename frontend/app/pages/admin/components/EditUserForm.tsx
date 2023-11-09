import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { ProgressSpinner } from "primereact/progressspinner"
import { useState, useEffect } from "react"
import { updateUserPermits, getUsers } from "../../../services/UserService"
import { Checkbox } from "primereact/checkbox"

interface dialogProps {
    setShowDialog: (bool: boolean) => void,
    setUsers: React.Dispatch<React.SetStateAction<Array<User>>>,
    showDialog: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    user: User | undefined,
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}
type User = {
    id: string,
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


export const EditUserForm: React.FC<dialogProps> = ({ setShowDialog, showDialog, setUsers, setLoading, user, setUser }) => {
    const [loadingSave, setLoadingSave] = useState<boolean>(false);
    const [checkedTender, setCheckedTender] = useState<boolean>(user?.userPermits?.tenders ? true : false);
    const [checkedTenderCreate, setCheckedTenderCreate] = useState<boolean>(user?.userPermits?.tenders ? user?.userPermits.tenders.create : false);
    const [checkedTenderRemove, setCheckedTenderRemove] = useState<boolean>(user?.userPermits?.tenders ? user?.userPermits.tenders.remove : false);
    const [checkedTenderUpdate, setCheckedTenderUpdate] = useState<boolean>(user?.userPermits?.tenders ? user?.userPermits.tenders.update : false);
    const [checkedTenderRead, setCheckedTenderRead] = useState<boolean>(user?.userPermits?.tenders ? user?.userPermits.tenders.read : false);
    const [selectTender, setSelectTender] = useState(true);

    const getUserList = async () => {
        setLoading(true);
        const responseUsers = await getUsers();
        setUsers(responseUsers);
        setLoading(false);
    }


    const editPermitsUser = async () => {
        setLoadingSave(true);
        if (checkedTender) {
            const dataUser = {
                userPermits: {
                    tenders: {
                        create: checkedTenderCreate,
                        remove: checkedTenderRemove,
                        update: checkedTenderUpdate,
                        read: checkedTenderRead
                    }
                }
            }
            const responseStatus = await updateUserPermits(user?.id, dataUser);
            if (responseStatus === 201) {
                onHide();
                setLoadingSave(false);
                getUserList();

            }
        }
        else {
            const dataUser = {
                userPemits: null
            }
            const responseStatus = await updateUserPermits(user?.id, dataUser);
            if (responseStatus === 201) {
                onHide();
                setLoadingSave(false);
                getUserList();

            }
        }

    }

    const onHide = () => {
        setUser(undefined);
        setShowDialog(false);
    }
    useEffect(() => {
        setCheckedTender(user?.userPermits?.tenders ? true : false);
        setCheckedTenderCreate(user?.userPermits?.tenders ? user?.userPermits.tenders.create : false);
        setCheckedTenderRemove(user?.userPermits?.tenders ? user?.userPermits.tenders.remove : false);
        setCheckedTenderUpdate(user?.userPermits?.tenders ? user?.userPermits.tenders.update : false);
        setCheckedTenderRead(user?.userPermits?.tenders ? user?.userPermits.tenders.read : false);

    }, [user]);

    useEffect(() => {
        if (!selectTender) {
            setCheckedTenderCreate(false);
            setCheckedTenderRemove(false);
            setCheckedTenderUpdate(false);
            setCheckedTenderRead(false);
        }
    }, [selectTender]);

    return (
        <div>
            <Dialog className='dialogForm-resp' header={`Editar permisos de ${user?.name}`} visible={showDialog} onHide={() => onHide()} >
                <div className="form-demo">
                    <div className="flex justify-content-center">
                        <div className="card">
                            <div className="field-checkbox" style={{ marginBottom: '25px' }}>
                                <Checkbox inputId="binary" checked={checkedTender} onChange={e => { setCheckedTender(e.checked ? e.checked : false), setSelectTender(e.checked ? e.checked : false) }} />
                                <label htmlFor="binary"> Permisos de licitación</label>
                            </div>
                            <div className="field-checkbox" style={{ marginBottom: '15px' }}>
                                <Checkbox inputId="binary" checked={checkedTenderCreate} onChange={e => setCheckedTenderCreate(e.checked ? e.checked : false)} disabled={!checkedTender} />
                                <label htmlFor="binary"> Crear Licitación</label>
                            </div>
                            <div className="field-checkbox" style={{ marginBottom: '15px' }}>
                                <Checkbox inputId="binary" checked={checkedTenderRemove} onChange={e => setCheckedTenderRemove(e.checked ? e.checked : false)} disabled={!checkedTender} />
                                <label htmlFor="binary"> Eliminar Licitación</label>
                            </div>
                            <div className="field-checkbox" style={{ marginBottom: '15px' }}>
                                <Checkbox inputId="binary" checked={checkedTenderUpdate} onChange={e => setCheckedTenderUpdate(e.checked ? e.checked : false)} disabled={!checkedTender} />
                                <label htmlFor="binary"> Editar Licitación</label>
                            </div>
                            <div className="field-checkbox" style={{ marginBottom: '25px' }}>
                                <Checkbox inputId="binary" checked={checkedTenderRead} onChange={e => setCheckedTenderRead(e.checked ? e.checked : false)} disabled={!checkedTender} />
                                <label htmlFor="binary"> Ver Inofrmación de Licitaciones</label>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-button-container">
                        <Button type="button" label="Cancelar" icon="pi pi-times" onClick={() => onHide()} className="p-button-text p-button-warning" />
                        <Button
                            type="submit"
                            label="Guardar"
                            icon={loadingSave ? null : 'pi pi-check'}
                            iconPos="right" // Esto coloca el icono a la derecha del texto del botón 
                            className={loadingSave ? 'p-button-disabled p-button-warning' : 'p-button-warning'}
                            disabled={loadingSave}
                            onClick={editPermitsUser}
                        >
                            {loadingSave && <ProgressSpinner style={{ width: '20px', height: '20px' }} strokeWidth="15" animationDuration=".5s" />}</Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default EditUserForm;