/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// NOTE: This location dropdown component is EXCLUSIVELY used for creating new Users in Admin Portal!

import { Select } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import UserGroupChip from './UserGroupChip';

export default function UserGroupsDropDown({ userGroups, setUserGroups }) {
	const [openModal, setOpenModal] = useState(false);

	/**
	 * Auth roles always consist of User!
	 */

	const addNewUserGroup = (e, newGroup) => {
		e.preventDefault();
		setOpenModal(false);
		const found = userGroups.includes(newGroup);
		if (!found) {
			setUserGroups((userGroups) => [...userGroups, newGroup]);
		} else {
			const arr2 = userGroups.filter((item) => item !== newGroup);
			setUserGroups(arr2);
		}
	};

	return (
		<>
			<div onClick={(e) => setOpenModal(!openModal)}>
				<input
					type="text"
					disabled
					id="authRoles"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer w-full"
				/>
			</div>

			<div className="flex absolute">
				{userGroups &&
					userGroups.map((name) => (
						<>
							<div className="relative bottom-[2.5rem]">
								<UserGroupChip
									name={name}
									userGroups={userGroups}
									setUserGroups={setUserGroups}
								/>
							</div>
						</>
					))}
			</div>

			{openModal && (
				<>
					<div
						id="dropdown"
						className="z-[100] absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44  border border-gray-400 bottom-1"
					>
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownDefaultButton"
						>
							<li>
								<p
									onClick={(e) => e.preventDefault()}
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									User
								</p>
							</li>
							<li>
								<p
									onClick={(e) => addNewUserGroup(e, 'Captain')}
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Captain
								</p>
							</li>
							<li>
								<p
									onClick={(e) => addNewUserGroup(e, 'Referee')}
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Referee
								</p>
							</li>
							<li>
								<p
									onClick={(e) => addNewUserGroup(e, 'Coordinator')}
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Coordinator
								</p>
							</li>
							<li>
								<p
									onClick={(e) => addNewUserGroup(e, 'Admin')}
									class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
								>
									Admin
								</p>
							</li>
						</ul>
					</div>

					<div
						onClick={(e) => setOpenModal(false)}
						class="z-[0] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}
		</>
	);
}
