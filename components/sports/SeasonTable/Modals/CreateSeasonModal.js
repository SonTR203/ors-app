/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { API } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Datepicker from 'tailwind-datepicker-react';
import {createSeason} from '@/src/graphql/mutations'

export default function CreateSeasonModal({ openModal, setOpenModal, selectedLeague, listSeasonsFunc, setSelectedSeason }) {
    const [seasonName, setSeasonName] = useState("");
    const [starts, setStarts] = useState(getConvertedDate(new Date()));
    const [ends, setEnds] = useState(getConvertedDate(new Date()));
    const [message, setMessage] = useState(null);

    const [showStarts, setShowStarts] = useState(false);
    const [showEnds, setShowEnds] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleChangeStart = (selectedDate) => {
        setStarts(getConvertedDate(selectedDate));
        console.log(getConvertedDate(selectedDate));
    }
    const handleChangeEnd = (selectedDate) => {
        setEnds(getConvertedDate(selectedDate));
        console.log(getConvertedDate(selectedDate));
    }

    const handleCloseStart = (state) => {
        setShowStarts(state)
    }
    const handleCloseEnd = (state) => {
        setShowEnds(state)
    }

    const optionsStart = {
        title: "Start Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date("2060-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "border border-[1px] border-gray-500 shadow-lg relative right-[3rem]  translate-y-[20%]",
        },
        icons: {
            prev: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-back-outline"></ion-icon>,
            next: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-forward-outline"></ion-icon>,
        },
        datepickerClassNames: "top-12",
        // defaultDate: new Date('2022-8-5'),
        defaultDate: new Date(),
        language: "en",
    }

    const optionsEnd = {
        title: "End Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: false,
        maxDate: new Date("2060-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "border border-[1px] border-gray-500 shadow-lg relative right-[3rem]  translate-y-[20%]",
        },
        icons: {
            prev: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-back-outline"></ion-icon>,
            next: () => <ion-icon style={{fontSize: '1.5rem'}} name="arrow-forward-outline"></ion-icon>,
        },
        datepickerClassNames: "top-12",
        // defaultDate: new Date('2023-9-9'),
        defaultDate: new Date(),
        language: "en",
    }

    function getConvertedDate(date) {
        let yourDate = date
            yourDate.toISOString().split('T')[0]
            const offset = yourDate.getTimezoneOffset()
            yourDate = new Date(yourDate.getTime() - (offset*60*1000))
            return yourDate.toISOString().split('T')[0];
    }

    const saveSeason = async (e) => {
        e.preventDefault();
        if (seasonName === '') {
            setMessage({status: 'error', message: 'Please fillout required fields.'});
            return;
        }
        try {
            const data = {
                league: selectedLeague.id,
                name: seasonName,
                start_date: starts,
                end_date: ends,
            }
            const apiData = await API.graphql({
                query: createSeason,
                variables: {input: data},
                
            })
            setOpenModal(false);
            listSeasonsFunc();
            setSelectedSeason(apiData.data.createSeason)
            setMessage({status: 'success', message: 'Season successfully created.'});
        } catch (error) {
            setMessage({status: 'error', message: error.message});
            console.error(error);
        }    
    }

    return (
        <>
        {/* // <!-- Main modal --> */}
        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-[5rem] left-0 right-0 z-[220] p-4 w-[32rem] mx-auto">
            <div class="relative w-full h-full">
                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                            Create New Season
                        </h3>
                        <button onClick={() => setOpenModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* <!-- Modal body --> */}
                    <div class="p-6 space-y-6">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Season Name *</label>
                            <input value={seasonName} onChange={(e) => setSeasonName(e.target.value)} type="text" id="name" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        {/* <DatePicker
                            value={values}
                            onChange={setValues}
                            range
                            /> */}
                        <div className='flex gap-2'>
                            <div className='w-full'>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                                <Datepicker options={optionsStart} onChange={handleChangeStart} show={showStarts} setShow={handleCloseStart} />
                            </div>
                            <div className='w-full'>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                                <Datepicker options={optionsEnd} onChange={handleChangeEnd} show={showEnds} setShow={handleCloseEnd} />
                            </div>
                        </div>

                        {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                        
                    </div>

                    {/* <!-- Modal footer --> */}
                    <div class="flex justify-end items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                        <button onClick={(e) => saveSeason(e)} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
                    </div>
                </div>
            </div>
        </div>
            <div onClick={(e) => setOpenModal(false)} class='z-[200] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </>
    )
}