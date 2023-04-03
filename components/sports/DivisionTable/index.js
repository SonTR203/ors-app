/**
 * Last updated: 2023-03-29
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { listDivisions } from '@/src/graphql/queries';
import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import CreateButton from '../CreateButton';
import DivisionCard from './DivisionCard';
import CreateDivisionModal from './Modals/CreateDivisionModal';

export default function DivisionTable({ selectedDivision, setSelectedDivision, selectedSeason, selectedLeague}) {
    const [newDivisionModal, setNewDivisionModal] = useState(false);
    const [divisions, setDivisions] = useState([]);
    const [showTable, setShowTable] = useState(false);

    useEffect(() => {
        if (selectedSeason) {
            listDivisionsFunc();
        }
    }, [selectedSeason])

    const listDivisionsFunc = async () => {
        const variables = {
            filter: {
                season: {
                    eq: selectedSeason.id
                }
            }
        }
        const divisions = await API.graphql({
            query: listDivisions, variable: variables,
        })
        setDivisions(divisions.data.listDivisions.items);
        setSelectedDivision(divisions.data.listDivisions.items[0]);
    }

    useEffect(() => {
        if (selectedLeague) {
            if (selectedLeague.Seasons && selectedLeague.Seasons.items.length !== 0) {
                setShowTable(true)
            }
        }
        if (selectedSeason) {
            setShowTable(true);
        }
        if (selectedLeague === null || selectedSeason === null) {
            setDivisions([]);
            setShowTable(false);
            setSelectedDivision(null);
        }
    }, [selectedLeague, selectedSeason])

    if (!showTable) {
        return;
    }

    return (
        <>
        <div class="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
            <table class="w-full text-sm text-left border border-gray-400">
                <thead class="text-md text-black bg-white">
                    <tr>
                        <th scope="col" class="text-lg font-medium px-6 py-4">
                            Division
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th scope="col" class="font-medium px-6 py-4">
                            
                        </th>
                        <th className='absolute right-5 top-2'>
                            <CreateButton label="Create New Division"
                                            state={newDivisionModal}
                                            setState={setNewDivisionModal} 
                                            selectedType={selectedSeason} />
                        </th>
                    </tr>
                </thead>
                <thead class="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="font-light px-6 py-2 border-l-[1px] border-gray-400">
                            Name
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            Level
                        </th>
                        <th scope="col" class="font-light px-6 py-2">
                            Team Count
                        </th>
                        <th scope="col" class="font-light py-2 border-r-[1px] text-center border-gray-400">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {divisions && divisions.map((division) => (
                    <>
                        <DivisionCard division={division} selectedDivision={selectedDivision} setSelectedDivision={setSelectedDivision} selectedSeason={selectedSeason} listDivisionsFunc={listDivisionsFunc} />
                    </>
                    ))}
                    {(divisions && selectedSeason !== null && divisions.length === 0) && (
                        <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" class="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic">
                            No divisions for this season.
                        </th>
                        <td class="px-6 py-4">
                        </td>
                        <td class="px-6 py-4">
                        </td>
                        <td class="px-6 py-4">
                        </td>
                        <td class="flex gap-4 px-6 py-4 text-center">
                        </td>
                    </tr>
                    )}
        
                    <tr class="bg-white border-b-[1px] border-t-[1px] border-gray-500">
                        <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer">
                            All Divisions
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon>
                        </th>
                        <td class="px-6 py-4">
                        </td>
                        <td class="px-6 py-4">
                        </td>
                        <td class="flex gap-4 px-6 py-4 text-center">
                        </td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
        {newDivisionModal && (
            <>
            <CreateDivisionModal openModal={newDivisionModal} setOpenModal={setNewDivisionModal} selectedSeason={selectedSeason} listDivisionsFunc={listDivisionsFunc} setSelectedDivision={setSelectedDivision} />
                </>
        )}
        </>
    )
}