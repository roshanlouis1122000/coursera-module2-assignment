import React from 'react'

import './App.css'

import {ChatEngine} from 'react-chat-engine'

import LoginForm from './components/LoginForm'
import ChatFeed from './components/ChatFeed'

const projectID = process.env.REACT_APP_API_KEY

const App = () => {

    if(!localStorage.getItem('userName')) return <LoginForm />

    return(   
        <ChatEngine 
            height="100vh" 
            projectID={projectID}
            userName={localStorage.getItem('userName')}
            userSecret={localStorage.getItem('password')}
            renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>}
        />
    )
}

export default App