/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import UpcomingGames from './UpcomingGames';
import Spotlight from './Spotlight';
import GameSheets from './GameSheets';

export default function Dashboard() {
	return (
		<>
			<GameSheets />
			<UpcomingGames />
			<Spotlight />
		</>
	);
}
