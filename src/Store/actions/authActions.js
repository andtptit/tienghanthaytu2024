import { uid } from 'uid';

export const signIn = (credentials) => {

    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      const firebaseInstance = getState().firebase;

      const firebaseFunctions = firebase.functions();
      const firebaseAdmin = firebaseFunctions.httpsCallable('checkUserSessions');
      // firebase.auth().signInWithEmailAndPassword(
      //   credentials.email,
      //   credentials.password
      // ).then(() => {
      //   dispatch({ type: 'LOGIN_SUCCESS' });
      // }).catch((err) => {
      //   dispatch({ type: 'LOGIN_ERROR', err });
      // });

      // Check if user is already logged in on another device
    firebaseAdmin().then((result) => {
      const userSessions = result.data;
      const currentUser = getState().firebase.auth().currentUser;
      const currentSession = userSessions[currentUser.uid];

      if (currentSession) {
        dispatch({ type: 'LOGIN_ERROR', err: { message: 'User is already logged in on another device' } });
      } else {
        // User is not already logged in, proceed with login
        const firebaseAuth = firebase.auth(firebaseInstance);
        firebaseAuth.signInWithEmailAndPassword(credentials.email, credentials.password)
          .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
          })
          .catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
          });
      }
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  
    }
  }

  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
  
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      });
    }
  }
  
export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
      firebase.auth().createUserWithEmailAndPassword(
        newUser.email, 
        newUser.password
      ).then(resp => {
        return firestore.collection('users').doc(resp.user.uid).set({
          name: newUser.name,
          SRN: resp.user.uid,
          userType: newUser.type, 
          phone: newUser.phone,
          email: newUser.email,
          gender: newUser.gender,
        });
      }).then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      }).catch((err) => {
        dispatch({ type: 'SIGNUP_ERROR', err});
      });
    }
  }


export const addStudent = (studentInfo) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
  
      // firebase.auth().createUserWithEmailAndPassword(
      //   studentInfo.email, 
      //   studentInfo.password
      // ).then(resp => {
      //   return firestore.collection('users').doc(resp.user.uid).set({
      //     name: studentInfo.name,
      //     SRN: resp.user.uid,
      //     userType: "Student", 
      //     phone: studentInfo.phone,
      //     email: studentInfo.email,
      //     gender: "male",
      //   });
      // }).then(() => {
        
      // }).catch((err) => {
        
      // });

      const batchSignUpPromises = [];
      
      const emailPrefix = "test";
      const password = "123456";
    
      for (let i = 0; i < 3; i++) {
        const email = `${emailPrefix}${i}@example.com`;
        const promise = firebase.auth().createUserWithEmailAndPassword(email, password);
        batchSignUpPromises.push(promise);
      }
  
      Promise.all(batchSignUpPromises)
        .then(() => {
          alert(`Tạo thành công 3 tài khoản người dùng`);
        })
        .catch((error) => {
          alert(`Lỗi khi tạo tài khoản người dùng: ${error.message}`);
        });
    }
  }

