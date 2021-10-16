import { useState } from 'react'
import {sendMessage,isTyping} from 'react-chat-engine'
import {SendOutlined,PictureOutlined, LogoutOutlined} from '@ant-design/icons'

const MessageForm = (props) => {
    const [value,setValue] = useState('')
    const { chatId,creds } = props
    
    const handleChange = (event) => {
        setValue(event.target.value);
    
        // isTyping(props, chatId);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        const text = value.trim();
    
        if (text.length > 0) {
          sendMessage(creds, chatId, { text });
        }
    
        setValue('');
      };
    
      const handleUpload = (event) => {
        sendMessage(creds,chatId,{files:event.target.files,text:''})
      }

      const handleLogout = () => {
          localStorage.clear('userName')
          localStorage.clear('password')
          window.location.reload()
      }

    return(
        <form onSubmit={handleSubmit} className="message-form">
            <input 
                className="message-input"
                placeholder="Send a message ..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon"/>
                </span>
            </label>
            <input 
                type="file"
                style={{display:"none"}}
                id="upload-button"
                multiple={false}
                onChange={handleUpload.bind(this)}
            />
            <button type="submit" className="send-button">
                <SendOutlined className="send-icon"/>
            </button>
            <button onClick={handleLogout} className="logout-button">
                <LogoutOutlined />
            </button>
        </form>
    )
}

export default MessageForm