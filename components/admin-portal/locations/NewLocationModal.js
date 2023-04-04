import React, {useState, useEffect} from 'react'
import { createLocation } from '@/src/graphql/mutations';
import { API } from 'aws-amplify';


export default function NewLocationModal({ locations, setLocations, setOpenModal }) {
    const [openModal, setOpenModal] = useState(false);

    const [name, setName] = useState("");
    const [weblink, setWeblink] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setMessage(null);
    }, [openModal])

    useEffect(() => {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
    }, [message])

    const CreateLocation = async (e) => {
        e.preventDefault();

        if (name === '' || weblink === '') {
            setMessage({status: 'error', message: 'Please fillout required fields.'});
            return;
        }
        
        try {
            const data = {
                name: name,
                weblink: weblink,
            }
            
            const apiData = await API.graphql({
                query: createLocation,
                variables: { input: data },
            });
            setLocations([...locations, apiData.data.createLocation]);
            setOpenModal(false);
            // router.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <button onClick={() => setOpenModal(true)} type="button" className="text-gray-900 bg-white border border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 text-[0.89rem] dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">New Location</button>


    {openModal && ( 
        <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="z-[100] fixed top-[15%] left-[50%] ml-[-240px] z-[150] w-full p-4 overflow-x-hidden overflow-y-auto">
        <div class="w-full h-full max-w-md md:h-auto">
    
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
                
                <button onClick={() => setOpenModal(!openModal)} type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
                
                
                <div class="px-6 py-6 lg:px-8">
                    <h3 class="mb-7 text-xl text-center font-medium text-gray-900 dark:text-white">Add a new Location</h3>
                    <form class="space-y-6" action="#">

                        <div className="">
                            <div className='w-full mb-4'>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Albert Street School" required />
                            </div>
                            <div className='w-full pb-1'>
                                <label for="weblink" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Web Link</label>
                                <input value={weblink} onChange={(e) => setWeblink(e.target.value)} type="text" name="weblink" id="weblink" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="https://ottawarecsports.com/albert-street-school/" required />
                            </div>
                        </div>


                        {message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                       
                        <button onClick={CreateLocation} type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Location</button>
                    </form>
                </div>
            </div>
        <div onClick={(e) => setOpenModal(false)} class='z-[-100] opacity-50 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
        </div> 
        </div>
    )}
    </>
  )
}