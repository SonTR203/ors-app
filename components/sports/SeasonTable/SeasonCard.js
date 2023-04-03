/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteSeasonModal from "./Modals/DeleteSeasonModal";
import EditSeasonModal from "./Modals/EditSeasonModal";
import { IconTrash, IconEdit, IconUsers, IconCalendarDue } from '@tabler/icons-react';

export default function SeasonCard({ season, selectedSeason, setSelectedSeason, selectedLeague }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const router = useRouter();

    const clickedSeason = (e) => {
        e.preventDefault();
        setSelectedSeason(season);
    }

    const convertDateReadable = (date) => {
        let convertedDate = date.replaceAll('-', '/');
        let newDate = new Date(convertedDate);
        newDate.toString().replaceAll('-', '/')
        let newDateSplit = newDate.toString().split(' ');
        let newDateConcatnate = `${newDateSplit[1]} ${newDateSplit[2]}`
        return newDateConcatnate;
    }

    const editSeasonFunc = (e) => {
        e.stopPropagation();
        setEditModal(!editModal);
    }

    const deleteSeasonFunc = (e) => {
        e.stopPropagation();
        setDeleteModal(!deleteModal);
    }

    const goToSchedulePage = (e) => {
        e.preventDefault();
        router.push({
            pathname: '/schedule/soccer',
            query: { leagueID: selectedLeague.id, seasonID: selectedSeason.id }
        })
    }

    return (
        <>
        <tr onClick={(e) => clickedSeason(e)} class="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" class="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedSeason && selectedSeason.id === season.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {season.name}
                </th>
                <td class="px-6 py-3">
                    {convertDateReadable(season.start_date)}
                </td>
                <td class="px-6 py-3">
                    {convertDateReadable(season.end_date)}
                </td>
                <td class="px-6 py-3">
                    {season.status}
                </td>
                <td class="flex gap-4 px-6 py-4 text-center justify-center">
                    <IconUsers onClick={(e) => goToSchedulePage(e)} style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></IconUsers>
                    <IconEdit onClick={(e) => editSeasonFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconEdit>
                    <IconTrash onClick={(e) => deleteSeasonFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
                </td>
                </tr>
        
        {deleteModal && (
            <DeleteSeasonModal leagueInfo={selectedLeague} seasonInfo={season} setDeleteModal={setDeleteModal} listSeasonsFunc={listSeasonsFunc} />
        )}
        {editModal && (
            <EditSeasonModal season={season} selectedLeague={selectedLeague} setOpenModal={setEditModal} listSeasonsFunc={listSeasonsFunc} setSelectedSeason={setSelectedSeason} />
        )}
    </>
    )
}