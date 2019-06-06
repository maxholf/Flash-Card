import { AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_STUDY_REMINDER_KEY = "Flashcards:NotificationsStudyReminder";



export function getDummyData() {
  return {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        },
        {
          question: "What is JSX?",
          answer:
            "Stands for JavaScript XML. It allows combining JavaScript with HTML. Results in easier implementation and clean code."
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    },
    Redux: {
      title: 'Redux',
      questions: [
        {
          question: 'What is Redux?',
          answer: 'Redux is a predictable state container for JavaScript apps.'
        },
        {
           question: 'Whats the first step to change something in the state?',
          answer: 'Dispatching an action.'
        },
        {
           question: 'What is used to tie state and actions together?',
          answer: 'Reducers.'
        },
        {
          question: 'Redux should act as your apps...?',
          answer: 'Single source of truth.'
        }
      ]
    }
  };
}

function createNotification() {
  return {
    title: "Study with Flashcards",
    body: " Don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function createDeckObject(deckTitle) {
  return {
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  };
}

export function createCardObject(question, answer) {
  return { question, answer };
}

export async function clearLocalNotification() {
  await AsyncStorage.removeItem(NOTIFICATION_STUDY_REMINDER_KEY);
  Notifications.cancelAllScheduledNotificationsAsync();
}

export async function setLocalNotification() {
  const dataRaw = await AsyncStorage.getItem(NOTIFICATION_STUDY_REMINDER_KEY);
  const data = JSON.parse(dataRaw);

  if (data === null) {
    const permissionsNotifications = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    if (permissionsNotifications.status === "granted") {
      Notifications.cancelAllScheduledNotificationsAsync();

      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(15);
      tomorrow.setMinutes(0);

     

      Notifications.scheduleLocalNotificationAsync(createNotification(), {
        time: tomorrow,
        repeat: "day"
      });


      AsyncStorage.setItem(
        NOTIFICATION_STUDY_REMINDER_KEY,
        JSON.stringify(true)
      );
    }
  }
}
