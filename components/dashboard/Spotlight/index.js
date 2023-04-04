/**
 * Last updated: 2023-04-2
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import TeamSpotlight from './TeamSpotlight';
import PlayerSpotlight from './PlayerSpotlight';

export default function Spotlight() {
	return (
		<section id="spotlight" className="col-span-4 lg:col-span-2">
			<div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
					<h1 className="text-md font-medium">Team and Player Spotlight</h1>
					<a href="#" className="text-sm text-right">
						View Rosters
					</a>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
                    <TeamSpotlight />
					<PlayerSpotlight />
				</div>
			</div>
		</section>
	);
}
