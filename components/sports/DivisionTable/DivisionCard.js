/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { getDivisionWithTeams } from '@/src/graphql/custom-queries';
import DeleteDivisionModal from './Modals/DeleteDivisionModal';
import EditDivisionModal from './Modals/EditDivisionModal';
import { IconTrash, IconEdit, IconUsers, IconCalendarDue } from '@tabler/icons-react';

export default function DivisionCard({ division, selectedDivision, setSelectedDivision, selectedSeason, listDivisionsFunc }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [teamCount, setTeamCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        getTeamsCount();
    }, [])

    const clickedDivision = (e) => {
        e.preventDefault();
        console.log(division);
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

    const getTeamsCount = async () => {
        const apiData = await API.graphql(
            { query: getDivisionWithTeams, 
            variables: { id: division.id }
        });
        console.log('See here', apiData.data.getDivision);
        setTeamCount(apiData.data.getDivision.Teams.items.length);
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
                    {teamCount}
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