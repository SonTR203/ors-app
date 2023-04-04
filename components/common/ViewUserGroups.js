/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 */

import React from 'react';
import { useUser } from '@/context/userContext';

export default function ViewUserGroups() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();

  console.log(user)
  console.log(authRoles)
	return (
		<>
			{user && (
				<div className="border">
					<p>User Groups of current user:</p>
					<ul className="list-disc">
						{authRoles && authRoles.map((role, index) => <li key={index}>{role}</li>)}
						{authRoles && authRoles.length === 0 && <li>No user groups for this user.</li>}
					</ul>
				</div>
			)}
		</>
	);
}
