import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCGJlB3qEx4nn5zC_RwaDI3YUN7w3w2dOY',
  authDomain: 'do-zero-a-beyond-kjhowk.firebaseapp.com',
  projectId: 'do-zero-a-beyond-kjhowk',
  storageBucket: 'do-zero-a-beyond-kjhowk.appspot.com',
  messagingSenderId: '659362798750',
  appId: '1:659362798750:web:63ec83d323edea51a4af8f',
  measurementId: 'G-3FSXKRTNLD'
}

Firebase.initializeApp(firebaseConfig)
export const firestore = Firebase.firestore()
export const auth = Firebase.auth()
