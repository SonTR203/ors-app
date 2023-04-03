/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteDivisionModal from './Modals/DeleteDivisionModal';
import EditDivisionModal from './Modals/EditDivisionModal';
// Tabler Icons
import { IconCalendarDue } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function DivisionCard({ division, selectedDivision, setSelectedDivision, selectedSeason, listDivisionsFunc }) {

    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();

    const clickedDivision = (e) => {
        e.preventDefault();
        setSelectedDivision(division);
    }

    const editDivisionFunc = (e) => {
        e.stopPropagation();
        setEditModal(!editModal);
    }

    const deleteDivisionFunc = (e) => {
        e.stopPropagation();
        setDeleteModal(!deleteModal);
    }

    const gameScheduleNavigate = (e) => {
        e.stopPropagation();
        router.push(`/schedule/soccer/${division.id}`);
    }

    return (
        <>
        <tr onClick={(e) => clickedDivision(e)} class="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedDivision && selectedDivision.id === division.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {division.name}
                </th>
                <td class="px-6 py-3">
                    {division.level}
                </td>
                <td class="px-6 py-3">
                    {/* {division.gender} */}
                    16
                </td>
                <td class="flex gap-4 px-6 py-4 text-center justify-center">
                    <IconUsers onClick={(e) => gameScheduleNavigate(e, division)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="calendar-outline"></IconUsers>
                    <IconEdit onClick={(e) => editDivisionFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconEdit>
                    <IconTrash onClick={(e) => deleteDivisionFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                </td>
                </tr>
        
        {deleteModal && (
            <DeleteDivisionModal seasonInfo={selectedSeason} divisionInfo={division} setDeleteModal={setDeleteModal} listDivisionsFunc={listDivisionsFunc} />
        )}
        {editModal && (
            <EditDivisionModal division={division} selectedSeason={selectedSeason} setOpenModal={setEditModal} listDivisionsFunc={listDivisionsFunc} setSelectedDivision={setSelectedDivision} />
        )}
    </>
    )
}