/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import Game from './Game';
import { IconAlertCircleFilled } from '@tabler/icons-react';

export default function GameSheets() {
	return (
		<section id="game-sheets" className="col-span-4">
			<div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
					<h1 className="text-md font-medium">Update Game Scores</h1>
					<div className="flex items-center bg-brand-orange-200 rounded-full">
						<IconAlertCircleFilled
							size={24}
							className="text-brand-orange-800"
						/>
						<span className="text-xs font-medium text-brand-orange-900 mx-2">
							These games need your attention!
						</span>
					</div>
				</div>
				<div className="">
					<Game />
				</div>
			</div>
		</section>
	);
}
