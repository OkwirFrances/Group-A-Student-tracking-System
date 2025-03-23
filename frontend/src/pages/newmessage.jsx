import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './newmessage.css';
import backarrow from '../assets/backarrow.png';
import search from '../assets/search.png';
import emptybox from '../assets/emptybox.png';
import newmessage from '../assets/newmessage.png';
import userimage from '../assets/userimage.png';
import attachment from '../assets/attachment.png';

const users = [
    { id: 1 , name:'Dr. Alvin David' , profilePic: userimage},
    { id: 2, name: 'Dr. Jane Ritah', profilePic: userimage},
    { id: 3, name: 'Dr. Daniella M', profilePic: userimage},
    { id: 4, name: 'Dr. Wakholi J', profilePic: userimage},
    { id: 5, name: 'Dr. Aloi Lugra', profilePic: userimage},
];

const NewMessage = () => {
    const navigate = useNavigate();
    const [showUserList, setShowUserList] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleBackMessageClick = () => {
        navigate('/messages');
    };

    const handleNewMessageClick = () => {
        setShowUserList(true);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
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
                {!showUserList ? (
                    <>
                        <img src={emptybox} alt='emptybox' className='newmessage-emptybox' />
                        <p>Click the button below to start a new chat.</p>
                        <img 
                        src={newmessage} 
                        alt='newmessage' 
                        className='newmessage'
                        onClick={handleNewMessageClick} />
                    </>
                ) : (
                    <div className='user-list'>
                        {users.map(user => (
                            <div 
                            key={user.id} 
                            className='user-item'
                            onClick={() => handleUserClick(user)}>
                                <img src={user.profilePic} alt={user.name} className="user-profile-pic" />
                                <span className='user-name'>{user.name}</span>
                            </div>   
                        ))}
                    </div>
                )}
            </div>
            <div className='newmessage-right'>
            {selectedUser ? (
                <div className='chat-area'>
                    <div className='chat-header'>
                        <img src={selectedUser.profilePic} alt={selectedUser.name} className='chat-profile-pic' />
                        <span className='chat-user-name'>{selectedUser.name}</span>
                    </div>
                    <div className='chatbox'>

                    </div>
                    <div className='chat-input-section'>
                        <input 
                        type='text'
                        className='chat-input'
                        placeholder='Type a message...'
                        />
                        <img src={attachment} alt='attachment' className='attachment' />
                        <button className='send-button'>Send</button>
                    </div>
                </div>
            ) : (
                <div>
                    <nav>Chat Area</nav>
                    <div className='chat-box'>
                        <h2 className='chatmessage'>Select a chat for it to appear here by clicking on it.</h2>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

export default NewMessage;