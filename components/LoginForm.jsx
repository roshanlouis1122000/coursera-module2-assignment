import {useState} from 'react'
import axios from 'axios'

const projectID = process.env.REACT_APP_API_KEY

const LoginForm = () => {
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const authObject = { 'Project-ID':projectID, 'User-Name':userName, 'User-Secret':password }
        try {
            await axios.get('https://api.chatengine.io/chats',{headers:authObject})
        
            localStorage.setItem('userName',userName)
            localStorage.setItem('password',password)
 
            window.location.reload()
        } catch (error) {
            setError('Oops!!! Incorrect credentials...')
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input" value={userName} placeholder="Username" onChange={(e)=>setUserName(e.target.value)} required/>
                    <input type="password" className="input" value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                    <h2 className="error">{error}</h2>
                </form>
            </div>
        </div>
    )
}

export default LoginForm