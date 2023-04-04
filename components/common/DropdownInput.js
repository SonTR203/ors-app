/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';

const DropdownInput = ({ options, value, setValue, placeholder }) => {
	const CircleArrowDown = () => (
		<svg width={22} height={22} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M11 0a11 11 0 1 0 0 22 11 11 0 0 0 0-22Zm0 2.2a8.8 8.8 0 1 1 0 17.6 8.8 8.8 0 0 1 0-17.6ZM5.5 8.8l5.5 5.5 5.5-5.5h-11Z"
				fill="#000"
				fillOpacity={0.7}
			/>
		</svg>
	);
	return (
		<div className="relative">
			<select
				
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				className="w-3/4 rounded border border-brand-neutral-300 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder={placeholder}
			>
				{options.map((option, index) => (
					<option key={index} value={option}>
						{option}
					</option>
				))}
			</select>
			<span className="absolute right-2 top-1/2 -translate-y-1/2">
				<CircleArrowDown />
			</span>
		</div>
	);
};

export default DropdownInput;
