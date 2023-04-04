import React from 'react';
import TeamNameAndImage from './TeamNameAndImage';

const MatchRow = ({ match }) => {
	console.log(match);
	const CalendarIcon = () => (
		<svg width={14} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M9.275 13.211c-.531 0-.979-.186-1.342-.56-.363-.373-.544-.833-.544-1.38 0-.546.181-1.006.544-1.38.363-.373.81-.56 1.342-.56.531 0 .979.187 1.342.56.363.374.544.834.544 1.38 0 .547-.181 1.007-.544 1.38-.363.374-.81.56-1.342.56Zm-8.108 2.8c-.311 0-.584-.12-.817-.36-.233-.24-.35-.52-.35-.84v-12.4c0-.32.117-.6.35-.84.233-.24.506-.36.817-.36H2.43v-1.2h1.263v1.2h6.612v-1.2h1.263v1.2h1.264c.311 0 .584.12.817.36.233.24.35.52.35.84v12.4c0 .32-.117.6-.35.84-.233.24-.506.36-.817.36H1.167Zm0-1.2h11.666v-8.6H1.167v8.6Zm0-9.8h11.666v-2.6H1.167v2.6Z"
				fill="#000"
			/>
		</svg>
	);
	const ClockIcon = () => (
		<svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="m10.94 11.871.9-.9-3.18-3.2v-4.02h-1.2v4.5l3.48 3.62ZM8 16.011a7.74 7.74 0 0 1-3.1-.63 8.114 8.114 0 0 1-2.55-1.72 8.113 8.113 0 0 1-1.72-2.55 7.74 7.74 0 0 1-.63-3.1c0-1.093.21-2.126.63-3.1a8.114 8.114 0 0 1 1.72-2.55A8.114 8.114 0 0 1 4.9.641 7.74 7.74 0 0 1 8 .011a7.74 7.74 0 0 1 3.1.63c.973.42 1.823.994 2.55 1.72a8.114 8.114 0 0 1 1.72 2.55c.42.974.63 2.007.63 3.1a7.74 7.74 0 0 1-.63 3.1 8.112 8.112 0 0 1-1.72 2.55 8.115 8.115 0 0 1-2.55 1.72 7.74 7.74 0 0 1-3.1.63Zm0-1.2c1.867 0 3.467-.666 4.8-2 1.333-1.333 2-2.933 2-4.8 0-1.866-.667-3.466-2-4.8-1.333-1.333-2.933-2-4.8-2s-3.467.667-4.8 2c-1.333 1.334-2 2.934-2 4.8 0 1.867.667 3.467 2 4.8 1.333 1.334 2.933 2 4.8 2Z"
				fill="#000"
			/>
		</svg>
	);
	const LocationIcon = () => (
		<svg width={13} height={18} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M6.5 8.299a1.34 1.34 0 0 0 1.005-.436c.278-.29.417-.64.417-1.052 0-.41-.139-.761-.417-1.052A1.34 1.34 0 0 0 6.5 5.324a1.34 1.34 0 0 0-1.005.435c-.278.29-.417.641-.417 1.052 0 .411.139.762.417 1.052.277.29.612.436 1.005.436Zm0 7.034c1.801-1.715 3.132-3.27 3.991-4.665.86-1.395 1.29-2.624 1.29-3.687 0-1.671-.51-3.039-1.533-4.101C9.225 1.817 7.976 1.286 6.5 1.286c-1.476 0-2.725.531-3.748 1.594C1.73 3.942 1.22 5.31 1.22 6.981c0 1.063.44 2.292 1.32 3.687.88 1.396 2.2 2.95 3.961 4.665Zm0 1.678c-2.18-1.94-3.809-3.743-4.885-5.408C.538 9.94 0 8.398 0 6.981c0-2.125.653-3.818 1.96-5.079C3.267.642 4.78.012 6.5.012c1.72 0 3.233.63 4.54 1.89C12.347 3.163 13 4.856 13 6.982c0 1.416-.538 2.957-1.615 4.621C10.31 13.268 8.68 15.07 6.5 17.011Z"
				fill="#000"
			/>
		</svg>
	);
	const EditIcon = () => (
		<svg
			width="18"
			height="19"
			viewBox="0 0 18 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M8.15655 2.698H2.59034C2.16856 2.698 1.76405 2.86555 1.4658 3.1638C1.16755 3.46205 1 3.86656 1 4.28834V15.4208C1 15.8425 1.16755 16.247 1.4658 16.5453C1.76405 16.8435 2.16856 17.0111 2.59034 17.0111H13.7228C14.1445 17.0111 14.549 16.8435 14.8473 16.5453C15.1455 16.247 15.3131 15.8425 15.3131 15.4208V9.85455"
				stroke="#023059"
				stroke-opacity="0.8"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M14.1203 1.50529C14.4366 1.18895 14.8657 1.01123 15.3131 1.01123C15.7604 1.01123 16.1895 1.18895 16.5058 1.50529C16.8222 1.82163 16.9999 2.25067 16.9999 2.69804C16.9999 3.14542 16.8222 3.57446 16.5058 3.8908L8.95168 11.4449L5.771 12.2401L6.56617 9.05942L14.1203 1.50529Z"
				stroke="#023059"
				stroke-opacity="0.8"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
	const TrashIcon = () => (
		<svg width={15} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11.786 6.845V17.4H3.214V6.845h8.572ZM10.179.51H4.82L3.75 1.567H0v2.11h15v-2.11h-3.75L10.179.51Zm3.75 4.222H1.07V17.4c0 1.161.965 2.111 2.143 2.111h8.572c1.178 0 2.143-.95 2.143-2.11V4.732Z"
				fill="#B61700"
				fillOpacity={0.8}
			/>
		</svg>
	);
	return (
		<>
			<tr
				// key={team.id}
				className="border-b border-brand-neutral-300 flex flex-row items-stretch py-[26px] px-5 justify-between"
				// onClick={navigateToProfile}
			>
				{/* odd:bg-white even:bg-brand-neutral-100 */}
				<td className="font-medium flex flex-row gap-7 items-center">
					<TeamNameAndImage />
					<span className="border border-black rounded px-[47px] py-[10px] flex flex-row items-center h-fit gap-1">
						<p>{0}</p>
						<p>:</p>
						<p>{0}</p>
					</span>
					<TeamNameAndImage reverse={true} />
				</td>
				<td className="w-3/12 flex flex-col justify-items-stretch">
					<span className="flex flex-row gap-10 mb-auto">
						<p className="flex flex-row gap-[6px] items-center">
							<span>
								<CalendarIcon />
							</span>
							Fri, Mar 10
						</p>
						<p className="flex flex-row gap-[6px] items-center">
							<span>
								<ClockIcon />
							</span>
							09:00 AM
						</p>
					</span>
					<span>
						<p className="flex flex-row gap-[6px] items-center">
							<span>
								<LocationIcon />
							</span>
							Algonquin Dome Field
						</p>
					</span>
				</td>
				<td className="p-5 w-1/12 flex flex-row items-center gap-8">
					<span>
						<EditIcon />
					</span>
					<span>
						<TrashIcon />
					</span>
				</td>
			</tr>
		</>
	);
};

export default MatchRow;
