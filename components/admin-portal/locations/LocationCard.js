import React from 'react';
import Link from 'next/link';
import EditLocationModal from './EditLocationModal';
import DeleteLocationModal from './DeleteLocationModal';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function LocationCard({ location }) {
    const [editLocationModal, setEditLocationModal] = useState(false);
    const [deleteLocationModal, setDeleteLocationModal] = useState(false);

    const editLocationClicked = (e) => {
        e.preventDefault();
        setEditLocationModal(true);
      }
      
      const deleteLocationClicked = (e) => {
        e.preventDefault();
        setDeleteLocationModal(true);
      }

  return (
    <>
    <div className='flex flex-col justify-center text-center border p-3 max-w-[50em] my-2 mx-auto'>
        <IconEdit onClick={(e) => editLocationClicked(e)} style={{position: 'absolute', fontSize: '20px', cursor: 'pointer', transform: 'translate(-0px, -15px)'}} name="create-outline"></IconEdit>
        <IconTrash onClick={(e) => { deleteLocationClicked(e)}} style={{position: 'absolute', fontSize: '20px', cursor: 'pointer', transform: 'translate(25px, -15px)', color: 'red'}} name="trash-outline"></IconTrash>
        <div>
            <p className='text-lg'>{location.name}</p>
            <Link style={{fontSize: '0.9rem', color: 'blue', textDecoration: 'underline'}} href={location.weblink}>{location.weblink}</Link>
        </div>
    </div>
    {editLocationModal && (
            <EditLocationModal location={location} openModal={editLocationModal} setOpenModal={setEditLocationModal} />
        )}
        {deleteLocationModal && (
        <>
          <DeleteLocationModal location={location} setOpenModal={setDeleteLocationModal} />
        </>
    )}
    </>
  )
}
