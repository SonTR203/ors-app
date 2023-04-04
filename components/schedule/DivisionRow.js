import React from 'react';
import { useRouter } from 'next/router';

const DivisionRow = ({ key, division }) => {
	const router = useRouter();
	const CalendarIcon = () => (
		<svg width={18} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1.34 17.143c-.357 0-.67-.129-.938-.386C.134 16.5 0 16.2 0 15.857V2.571c0-.342.134-.642.402-.9.268-.257.58-.385.938-.385h1.452V0h1.451v1.286h7.593V0h1.452v1.286h1.451c.358 0 .67.128.938.385.268.258.402.558.402.9v6.45h-1.34V6.643H1.34v9.214h7.125v1.286H1.34Zm15.834-4.693-1.586-1.521.648-.622a.65.65 0 0 1 .469-.171.65.65 0 0 1 .469.171l.647.622c.12.114.179.264.179.45 0 .185-.06.335-.179.45l-.647.621ZM9.804 18v-1.521l4.824-4.629 1.585 1.521L11.39 18H9.804ZM1.34 5.357h13.4V2.571H1.34v2.786Z"
				fill="#023059"
				fillOpacity={0.8}
			/>
		</svg>
	);
	const navigateToProfile = () => {
		router.push({
			pathname: `/schedule/soccer/${division.id}`,
			query: { divisionID: division.id },
		});
	};
	return (
		<tr
			key={division.id}
			className="border-b border-brand-neutral-300 cursor-pointer"
			onClick={navigateToProfile}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				<div className="flex items-center">
					<p>{division.name}</p>
				</div>
			</td>
			<td className="p-5">{division.level}</td>
			<td className="p-5">{division.abbreviation}</td>
			<td className="p-5 flex justify-center">
				<CalendarIcon />
			</td>
		</tr>
	);
};

export default DivisionRow;
