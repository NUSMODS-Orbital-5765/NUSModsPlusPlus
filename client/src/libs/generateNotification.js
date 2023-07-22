import axios from 'axios';

export default async function generateNotification (type, authorUsername, targetUsername, content, hiddenValue) {
    const notificationData = {
        "timestamp": new Date(),
        "type": type,
        "content": content,
        "author": authorUsername,
        "target": targetUsername,
        "hiddenValue": hiddenValue,
    }
    const APILINK = `${process.env.REACT_APP_API_LINK}/notification/generate`;
    axios.post(APILINK, 
        notificationData
    )
    .then(result => {
        console.log(`Notification Generated Succesfully`)
    })
    .catch(
        error => console.log(error)
    )
}