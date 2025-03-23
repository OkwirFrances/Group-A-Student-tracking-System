import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './newmessage.css';
import backarrow from '../assets/backarrow.png';
import search from '../assets/search.png';
import emptybox from '../assets/emptybox.png';
import newmessage from '../assets/newmessage.png';

const NewMessage = () => {
    const navigate = useNavigate();

    const handleBackMessageClick = () => {
        navigate('/messages');
    };

    return (
        <div className='newmessage-container'>
            <Navbar />
            <div className='newmessage-content'>
                <img 
                src={backarrow} 
                alt='backarrow' 
                className='back-arrow'
                onClick={handleBackMessageClick} />
                <h1>New Message</h1>
            </div>
            <div className='newmessage-left'>
                <div className='searchcontainer'>
                    <input 
                    type='text'
                    className='searchinput'
                    placeholder='Search for anything...'
                    />
                    <img src={search} alt='search' className='search' />
                </div>
                <img src={emptybox} alt='emptybox' className='newmessage-emptybox' />
                <p>Click the button below to start a new chat.</p>
                <img src={newmessage} alt='newmessage' className='newmessage' />
            </div>
        </div>
    );
};

export default NewMessage;