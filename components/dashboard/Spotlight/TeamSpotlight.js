/**
 * Last updated: 2023-04-2
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';

export default function TeamSpotlight() {
	return (
		<div className="flex flex-row lg:flex-col col-span-1 items-center justify-start lg:justify-center border-b lg:border-b-0 lg:border-r border-brand-neutral-300 p-8 gap-4 lg:gap-2">
			<img
				width="100"
				height="100"
				className="rounded-full bg-red-500 self-center mr-3 lg:mr-0 lg:mb-3"
				alt="N/A"
			/>
			<div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Name</span>
					<span className="col-span-1 truncate">
						The Benchwarmers
					</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Sport</span>
					<span className="truncate">Soccer</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Captain</span>
					<span className="truncate col-span-1">John Doe</span>
				</div>
				<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
					<span className="text-sm font-light col-span-1">Team Members</span>
					<span className="truncate col-span-1">8</span>
				</div>
			</div>
		</div>
	);
}
