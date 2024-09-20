const axios = require('axios');

const sendNotification = async (firebaseToken, notification) => {
  const firebaseServerKey = 'YOUR_SERVER_KEY'; // Your Firebase Server Key

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `key=${firebaseServerKey}`,
  };

  const body = {
    to: firebaseToken,
    notification: {
      title: notification.title,
      body: notification.body,
    },
  };

  try {
    await axios.post('https://fcm.googleapis.com/fcm/send', body, { headers });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendNotification;
