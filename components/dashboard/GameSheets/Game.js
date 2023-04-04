/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import {
	IconClock,
	IconCalendarEvent,
	IconMapPin,
} from '@tabler/icons-react';
import TeamNameAndImage from '@/components/schedule/TeamNameAndImage';

export default function Game() {
	return (
		<>
			<div className="w-full p-8 flex flex-row justify-between items-center gap-4">
				<div className="min-w-[0px] flex justify-center">
                <img src="/images/soccerball_orange.png" />
				</div>
				<div>
					<div className="font-medium flex flex-row gap-8 items-center">
						<TeamNameAndImage />
						<span className="border-2 border-brand-orange-800 rounded-xl px-[47px] py-[10px] flex flex-row items-center h-fit gap-1">
							<p>{0}</p>
							<p>:</p>
							<p>{0}</p>
						</span>
						<TeamNameAndImage reverse={true} />
					</div>
				</div>
				<div className="flex flex-col gap-3 mx-8">
					<div className="flex justify-between gap-3 text-sm">
						<span className="flex items-center gap-1">
							<IconCalendarEvent /> April 2nd, 2023
						</span>
						<span className="flex items-center gap-1">
							<IconClock /> 02:30 PM
						</span>
					</div>
					<div className="flex gap-1 text-sm">
						<IconMapPin /> Algonquin Dome Field #1
					</div>
				</div>
			</div>
		</>
	);
}
