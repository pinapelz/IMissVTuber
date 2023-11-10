import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const ScheduleThumbnail = 
React.memo(function ScheduleThumbnail() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [thumbnail, setThumbnail] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        axios.get('https://imisserinya.vercel.app/api/schedule')
            .then((response) => {
                console.log(response.data)
                setThumbnail(response.data.thumbnail)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
                setError(error)
                setLoading(false)
            })
    }, [])

    function openModal() {
        if (window.innerWidth <= 768) {
            window.open(thumbnail, '_blank');
        } else {
            setModalIsOpen(true);
        }
    }

    function closeModal() {
        setModalIsOpen(false);
    }


    if(loading){
        return <p>Loading...</p>
    }
    if(error){
        return <p>An error occurred while fetching data</p>
    }

    return (
        <>
        <h1>Weekly Schedule</h1>
        <p>Let's hope Erina updated her schedule this week...</p>
        <img src={thumbnail} style={{ maxWidth: '100%', height: 'auto' }} alt="Schedule Thumbnail" onClick={openModal}/>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                },
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    width: '80%', 
                    height: '80%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'auto',
                },
            }}
        >
            <img src={thumbnail} style={{ width: '100%', height: 'auto' }} alt="Schedule Thumbnail" />
        </Modal>
        </>
    )
});
export default ScheduleThumbnail;