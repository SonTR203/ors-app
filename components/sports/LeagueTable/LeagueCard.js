/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import DeleteLeagueModal from './Modals/DeleteLeagueModal';
import EditLeagueModal from './Modals/EditLeagueModal';
import Link from 'next/link';

export default function LeagueCard({ league, sport, selectedLeague, setSelectedLeague }) {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    return (
        <>
        <tr onClick={(e) => clickedLeague(e, league)} class="bg-white border border-gray-400 cursor-pointer">
                <th scope="row" class="relative px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {selectedLeague && selectedLeague.id === league.id && (
                        <div className='w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute'/>
                    )}
                    {league.name}
                </th>
                <td class="px-5 py-3 translate-x-2">
                    {/* {getNumberOfTeams(league)} / {league.maxteams} */}
                </td>
                <td class="px-6 py-3">
                    <ul>
                     {league.Coordinators && league.Coordinators.items.map((coordinator) => (
                        <>
                        <li className='text-blue-700 text-xs'>
                        <Link href={`/players/${coordinator.username}`} onClick={(e) => e.stopPropagation()}>{coordinator.name}</Link>
                        </li>
                        </>
                     ))}
                     </ul>
                </td>
                <td class="px-6 py-3">
                    {league.status}
                </td>
                <td class="flex gap-4 px-6 py-3 text-center justify-center">
                    <ion-icon style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></ion-icon>
                    <ion-icon onClick={(e) => editLeagueFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></ion-icon>
                    <ion-icon onClick={(e) => deleteLeagueFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></ion-icon>
                </td>
                </tr>

        {deleteModal && (
            <DeleteLeagueModal leagueInfo={league} setDeleteModal={setDeleteModal} listLeaguesFunc={listLeaguesFunc} />
        )}
        {editModal && (
            <EditLeagueModal league={league} setOpenModal={setEditModal} sport={sport} listLeaguesFunc={listLeaguesFunc} />
        )}
    </>
    )
}