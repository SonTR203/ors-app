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
// Tabler Icons
import { IconCalendarDue } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function LeagueCard({ league, sport, selectedLeague, setSelectedLeague }) {
    const [users, setUsers] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

    useEffect(() => {
        setUsers([]);
        getUserListByUserNames();
    }, [])

    const getUserListByUserNames = () => {
        league.coordinators.forEach((coordinator) => {
            var params = {
                UserPoolId: 'us-east-1_70GCK7G6t',
                Username: coordinator /* required */
              };
              cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else     console.log(data);           // successful response
                    setUsers((users) => {
                        return uniqueById([...users, data]);
                    });
            });
        })
    }

    function uniqueById(items) {
        const set = new Set();
        return items.filter((item) => {
          const isDuplicate = set.has(item.Username);
          set.add(item.Username);
          return !isDuplicate;
        });
      }

    // const fetchUser = async (user) => {
    //     let myData = 'Test';
    //     var params = {
    //         UserPoolId: 'us-east-1_70GCK7G6t',
    //         Username: user /* required */
    //       };
    //       await cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
    //         if (err) console.log(err, err.stack); // an error occurred
    //         else     console.log(data);           // successful response
    //             return "Justin";
    //     });
    // }

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
                    {league.type}
                </td>
                <td class="px-6 py-3">
                    <ul>
                    {users && users.map((coordinator) => (
                        <>
                        <li className="text-blue-700 text-sm">
                        <Link href={`/players/${coordinator.Username}`}>{coordinator.UserAttributes.find(o => o.Name === 'name')['Value']} {coordinator.UserAttributes.find(o => o.Name === 'family_name')['Value']}</Link>
                        </li>
                        </>
                    ))}
                     </ul>
                </td>
                <td class="flex gap-4 px-6 py-3 text-center justify-center">
                    <IconUsers style={{color: 'black', fontSize: '21px', cursor: 'pointer'}} name="people"></IconUsers>
                    <IconEdit onClick={(e) => editLeagueFunc(e)} style={{color: 'darkblue', fontSize: '21px', cursor: 'pointer'}} name="create-outline"></IconEdit>
                    <IconTrash onClick={(e) => deleteLeagueFunc(e)} style={{color: 'red', fontSize: '21px', cursor: 'pointer'}} name="trash-outline"></IconTrash>
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