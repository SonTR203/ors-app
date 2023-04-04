/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import NavbarSetup from './Links';
import { useRouter } from 'next/router';
import SignOutButton from '../SignOutButton';

const NavbarMenu = ({ openMenu, setOpenMenu, laptopSize, laptopHeight }) => {
	const router = useRouter();

	// Hide sidebar menu everytime new page loads (in mobile screen mode)
	useEffect(() => {
		if (!laptopSize) {
			setOpenMenu(false);
		}
	}, [router.pathname])

	return (
		<>
		<div
			className={`overflow-x-hidden overflow-y-scroll fixed inset-y-0 bg-brand-blue-900 h-screen py-3 w-80 flex flex-col justify-between text-neutral-500 z-[100] transition-all duration-500 ${
				openMenu ? 'left-0' : 'left-[-20rem]'
			}`}
		>
			<div>
				<div className='mt-[2.6rem]'></div>
			</div>
			<div className="flex flex-col self-center">
				<Image
					src="/Logo.svg"
					alt="ORS Logo"
					width={80}
					height={80}
					priority
					className="py-3 self-center w-auto h-auto"
				/>
				<Link
					href="./"
					className="pb-5 self-center text-xs text-white/70 hover:text-white focus:text-white"
				>
					Visit Ottawa Rec Sports
				</Link>
			</div>

			<NavbarSetup />

			<div className="mt-auto px-5 flex flex-col">
				<Image
					src="/TrophyIcon.svg"
					alt="Trophy"
					width={158}
					height={158}
					priority
					className={`"py-3 self-center w-auto h-auto" ${laptopHeight ? "block" : "hidden"}`}
				/>

				<SignOutButton />
			</div>
		</div>
		{(!laptopSize && openMenu) && (
			<div
			onClick={(e) => setOpenMenu(false)}
			class="z-[50] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		)}
	</>
	);
};

export default NavbarMenu;
