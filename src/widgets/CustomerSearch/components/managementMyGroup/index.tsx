import { useQueryClient } from '@tanstack/react-query';
import { ICellRendererParams } from 'ag-grid-community';
import { FC, KeyboardEvent, useMemo, useState, Dispatch, SetStateAction, Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import { Check, CloseIcon, DeleteIcon, EditIcon2, PlusIcon } from 'src/common/icons';
import clsx from 'clsx';
import { AddGroup } from './AddGroup';
import { AddCustomerToMyGroupMutation, deleteMyGroupMutation, updateMyGroupMutation, useMyGroup } from 'src/app/queries/customer';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { AgGridReact } from 'ag-grid-react';


const ManagementMyGroupModal = () => {
    //
    const { state: { isManagementMyGroupOpen, detailsManagementGroup }, setState } = useCustomerSearchState()

    const gridRef = useRef<AgGridReact<IUpdateMyGroup>>(null)

    const { data: myGroupData } = useMyGroup()

    const [editMode, setEditMode] = useState<IUpdateMyGroup | undefined>();

    const [isShowAdd, setIsShowAdd] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: updateMyGroupMutate } = updateMyGroupMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getMyGroup']);
            toast.success('گروه با موفقیت ویرایش شد');
        }
    });

    const { mutate: AddToMyGroupMutate } = AddCustomerToMyGroupMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getMyGroup']);
            toast.success('مشتری با موفقیت به گروه موردنظر اضافه شد');
            closeModal()
        }
    });


    const closeModal = () => {
        setState(prev => ({ ...prev, isManagementMyGroupOpen: undefined, detailsManagementGroup: undefined }));
        setEditMode(undefined);
    };

    const handleEditWatchlistName = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            e.stopPropagation();
            setEditMode(undefined);
        }
        if (e.key === 'Enter' && editMode) {
            e.preventDefault();
            e.stopPropagation();

            editWatchListName();
        }
    };

    const editWatchListName = () => {
        if (!editMode?.groupName || /^\s*$/.test(editMode?.groupName) || !editMode?.id) return;
        const { id, groupName } = editMode;
        updateMyGroupMutate({ id, groupName: groupName.trimStart() });
        setEditMode(undefined);
    };

    const submitCustomerToMyGroup = () => {
        const rowSelected = gridRef.current?.api.getSelectedRows()

        if (rowSelected && !!detailsManagementGroup?.length) {
            AddToMyGroupMutate({
                groupId: rowSelected.map(item => item.id),
                customerISINs: detailsManagementGroup.map(item => item.customerISIN)
            })
        }
    }

    const columns = useMemo(
        (): ColDefType<IUpdateMyGroup>[] => [
            {
                headerName: 'عنوان گروه',
                field: 'groupName',
                cellRenderer: (row: ICellRendererParams<IUpdateMyGroup>) => (
                    <ActionName {...{ row, editMode, setEditMode, handleEditWatchlistName }} />
                ),
                flex: 1,
                checkboxSelection: !!detailsManagementGroup ? true : false,
            },
            {
                headerName: 'عملیات',
                field: 'id',
                cellRenderer: (row: ICellRendererParams<IUpdateMyGroup>) => <ActionED {...{ row, setEditMode, editMode, editWatchListName }} />,
            },
        ],
        [editMode],
    );

    return (
        <Modal
            isOpen={!!isManagementMyGroupOpen}
            onClose={closeModal}
            className="min-h-[30rem] w-[500px] rounded-md h-full grid bg-L-basic dark:bg-D-basic translate-y-7"
        >
            <div className="grid grid-rows-min-one-min" data-cy="wl-edit-modal">
                <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                    <div>مدیریت گروه‌های من</div>
                    <CloseIcon onClick={closeModal} data-cy="wl-edit-modal-close" className="cursor-pointer" />
                </div>

                <div className="p-4 text-1.2 border-b border-L-gray-400 dark:border-D-gray-400 grid grid-rows-one-min">
                    <div>
                        <AGTable
                            rowData={myGroupData}
                            columnDefs={columns}
                            animateRows={true}
                            ref={gridRef}
                            rowSelection="multiple"
                        />
                    </div>

                    {
                        !!detailsManagementGroup && (
                            <div className='flex gap-x-2 justify-end'>
                                <button
                                    onClick={submitCustomerToMyGroup}
                                    className='px-4 py-2 bg-L-success-200 dark:bg-D-success-200 text-L-basic dark:text-D-basic rounded-lg'
                                >
                                    افزودن به گروه
                                </button>

                                <button
                                    onClick={closeModal}
                                    className='px-4 py-2 bg-L-basic dark:bg-D-basic text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 rounded-lg'>
                                    انصراف
                                </button>
                            </div>
                        )
                    }

                </div>



                <div
                    className={clsx('px-6 py-4 mx-2 text-right')}
                >
                    <div>
                        <div
                            className={clsx('flex items-center cursor-pointer h-full py-2', {
                                hidden: isShowAdd,
                            })}
                            onClick={() => setIsShowAdd(!isShowAdd)}
                        >
                            <div className="bg-L-primary-50 dark:bg-D-gray-400 rounded">
                                <PlusIcon className="text-L-basic dark:text-D-basic" />
                            </div>

                            <p className="text-L-primary-50 dark:text-D-primary-50 mr-2">ایجاد گروه جدید</p>
                        </div>

                        <AddGroup isAddActive={isShowAdd} setIsAddActive={setIsShowAdd} FromEditMode />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ManagementMyGroupModal;

interface IActionName {
    row: ICellRendererParams<IUpdateMyGroup>;
    editMode: IUpdateMyGroup | undefined;
    setEditMode: Dispatch<SetStateAction<IUpdateMyGroup | undefined>>;
    handleEditWatchlistName: (e: KeyboardEvent<HTMLInputElement>) => void;
}
const ActionName: FC<IActionName> = ({ row, editMode, setEditMode, handleEditWatchlistName }) => {
    //
    const { data: myGroupList } = row;

    return (
        <div className="w-full h-full">
            {Number(editMode?.id) === Number(myGroupList?.id) ? (
                <input
                    className="w-full h-full text-center border border-L-gray-400 dark:border-D-gray-400 outline-L-primary-50 dark:outline-D-primary-50"
                    value={editMode?.groupName}
                    onChange={(e) => setEditMode({ id: Number(myGroupList?.id), groupName: e.target.value })}
                    onKeyDownCapture={(e) => handleEditWatchlistName(e)}
                    autoFocus={true}
                />
            ) : (
                <span >{myGroupList?.groupName}</span>
            )}
        </div>
    );
};

interface IActionEdit {
    row: ICellRendererParams<IUpdateMyGroup>;
    editMode: IUpdateMyGroup | undefined;
    setEditMode: Dispatch<SetStateAction<IUpdateMyGroup | undefined>>;
    editWatchListName: () => void;
}

const ActionED: FC<IActionEdit> = ({ row, setEditMode, editMode, editWatchListName }) => {
    const queryClient = useQueryClient();

    const { data: myGroupList, rowIndex } = row;

    const id = myGroupList ? myGroupList?.id : 0;

    const { mutate: deleteMyGroup } = deleteMyGroupMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getMyGroup']);
            toast.success('گروه با موفقیت حذف شد');
        }
    });

    return (
        <div className="h-full flex justify-center items-center gap-4">
            {editMode?.id !== id ? (
                <>
                    <button
                        disabled={rowIndex === 0}
                        className={`text-L-gray-600 disabled:text-L-gray-400 dark:text-D-gray-600 disabled:dark:text-D-gray-400 disabled:cursor-not-allowed`}
                    >
                        <EditIcon2
                            onClick={() => setEditMode({
                                id: Number(myGroupList?.id),
                                groupName: myGroupList?.groupName ?? ""
                            })}
                        />
                    </button>
                    <button
                        disabled={rowIndex === 0}
                        className={`text-L-gray-600 disabled:text-L-gray-400 dark:text-D-gray-600 disabled:dark:text-D-gray-400 disabled:cursor-not-allowed`}
                    >
                        <DeleteIcon
                            onClick={() => deleteMyGroup(Number(id))}
                        />
                    </button>
                </>
            ) : (
                <Fragment>
                    <div
                        className={clsx(
                            'border rounded-full p-1',
                            editMode?.groupName && !/^\s*$/.test(editMode?.groupName)
                                ? 'border-L-success-200 dark:border-L-success-200 cursor-pointer'
                                : 'cursor-no-dro',
                        )}
                        onClick={editWatchListName}
                    >
                        <Check
                            className={clsx(
                                '',
                                editMode?.groupName && !/^\s*$/.test(editMode?.groupName)
                                    ? 'text-L-success-200 dark:text-D-success-200'
                                    : 'text-L-gray-300 cursor-no-drop',
                            )}
                            width={8}
                            height={8}
                        />
                    </div>

                    <div
                        className="border-L-error-200 dark:border-L-error-200 border rounded-full p-1 cursor-pointer"
                        onClick={() => setEditMode(undefined)}
                    >
                        <CloseIcon className="text-L-error-200 dark:text-L-error-200" width={8} height={8} />
                    </div>
                </Fragment>
            )}
        </div>
    );
};
