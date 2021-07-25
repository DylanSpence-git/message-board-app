import { useState, useRef } from 'react';
import NewMessageForm from '../components/NewMessageForm';
import MessageBoard from '../components/MessageBoard';
import LoginForm from '../components/LoginForm';
import ky from 'ky-universal';
import jwt_decode from 'jwt-decode';

const MessageBoardUI=({jsonData})=>{
    const [messages, setMessages] = useState(jsonData);
    const [showMessageForm, setShowMessageForm] = useState(false);
    const usernameRef = useRef(null);

    const  addNewMessage = async (values) => {
        let message;
        try{
            values.name = usernameRef.current;
            message = await ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/messages`, {
                json: values,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }).json();
            setMessages([message, ...messages]);
        } catch (err){
            console.error(JSON.stringify(err));
        }
    }

    const logInUser = async (values) => {
        let response;
        try{
            response = await ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                json: values
            }).json();
            const decodedTokenPayload = jwt_decode(response.token);
            usernameRef.current = decodedTokenPayload.username;
            sessionStorage.setItem('token', response.token);
            setShowMessageForm(true);
        }catch(err) {
            console.error(JSON.stringify(err));
        }
    }
    
        return (
        showMessageForm ?
        <div>
            <NewMessageForm addNewMessage={addNewMessage}/>
            <MessageBoard messages={messages}/>
        </div>
        :
            <LoginForm logInUser={logInUser} />
        );
}

export default MessageBoardUI;