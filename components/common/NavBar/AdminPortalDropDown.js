/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import Link from 'next/link';
import React, { useState } from 'react';
import {
	IconShieldChevron,
	IconChevronRight,
} from '@tabler/icons-react';
import { useUser } from '@/context/userContext';

const AdminPortalDropDown = ({openDropdown, toggle, dropdownMenuNames}) => {
	const [user, setUser, authRoles] = useUser();
	
	return (
		<>
		{user && (authRoles && authRoles.includes('Admin') || authRoles && authRoles.includes('Owner')) && (
			<div className="text-white/70 hover:text-white focus:text-white">
				<button
					onClick={() => toggle("acp")}
					className="p-2 flex flex-row ml-2 justify-between w-full"
				>
					<div className="flex flex-row align-middle">
						<div className="pt-1 ">
							<IconShieldChevron size={'1.2em'} />
						</div>
						<h1 className=" font-medium text-md pl-2">Admin Portal</h1>
					</div>
					<div className="pt-1 mr-2">
						<IconChevronRight style={{transition: '320ms', transform: openDropdown === "acp" ? 'rotate(90deg)' : 'rotate(0deg)'}} size={'1.2em'} />
					</div>
				</button>
				<div
				>
					<div className={`border-x-[1px] border-black flex flex-col font-regular text-sm pl-12 bg-blue-100 text-black/70 transition-all duration-[320ms] overflow-hidden ${openDropdown === "acp" ? 'h-[5.5rem]' : 'h-0'}`}>
						<Link href="/admin-portal/leagues" className="my-1 hover:font-bold focus:font-bold">
							Leagues
						</Link>
						<Link href="/admin-portal/users" className="my-1 hover:font-bold focus:font-bold">
							Users
						</Link>
						<Link href="/admin-portal/teams" className="my-1 hover:font-bold focus:font-bold">
							Teams
						</Link>
					</div>
				</div>
			</div>
		)}
	</>
	);
};

export default AdminPortalDropDown;
