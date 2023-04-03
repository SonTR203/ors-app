/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

export default function CoordinatorDropdown({ leagueCoordinators, setLeagueCoordinators, listUsers}) {
    const [searchUser, setSearchUser] = useState('');

    // We don't want the same coordinator twice!
  const addCoordinator = (e, user) => {
    e.preventDefault();
    const found = leagueCoordinators.some(el => el.username === user.Username);
    if (!found) {
        let newCoordinatorInfo = {
          name: `${user.Attributes.find(o => o.Name === 'name')['Value']} ${user.Attributes.find(o => o.Name === 'family_name')['Value']}`,
          username: user.Username,
        }
        setLeagueCoordinators(leagueCoordinators => [...leagueCoordinators, newCoordinatorInfo]);
    } else {
      const array = leagueCoordinators.filter(item => item.username !== user.Username);
      setLeagueCoordinators(array);
    }
}

    return (
    <>
    {/* <!-- Dropdown menu --> */}
    <div id="dropdownSearch" class="z-[300] border fixed bg-white rounded-lg shadow-md w-[17rem] dark:bg-gray-700">
    <div class="p-3">
      <label for="input-group-search" class="sr-only">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none">

        </div>
        <input value={searchUser} onChange={(e) => setSearchUser(e.target.value)} type="text" id="input-group-search" class="block w-[69%] p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
        <button onClick={(e) => setSearchFunc(e)} class="text-white absolute right-0 top-[1px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

      </div>
    </div>
  <ul class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    
    {listUsers && listUsers.filter((user) => {
        const searchItem = searchUser.toLocaleLowerCase();
        const v = `${user.Attributes.find(o => o.Name === 'name')['Value'].toLocaleLowerCase()} ${user.Attributes.find(o => o.Name === 'family_name')['Value'].toLocaleLowerCase()}`
        if (!searchItem) return true;
        return v.startsWith(searchItem);
    })
    .map((user) => (
        <>
        <li className='cursor-pointer' onClick={(e) => addCoordinator(e, user)}>
            <UserCard searchUser={searchUser} user={user} />
        </li>
        </>
    ))}

  </ul>
  <a href="#" class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline">
      <svg class="w-5 h-5 mr-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path></svg>
      Add new user
  </a>
</div>
    </>
    )
}