import {defineStore} from "pinia";
import {ref,computed,onMounted} from 'vue';
import { useFirebaseAuth } from "vuefire";
import {signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth();
    const authUser = ref(null);
    const errorMsg = ref('');
  
    const errorCodes = {
      'auth/invalid-credential' : 'Credenciales invalidas'
    }
  
    const login = ({ email, password }) => {
      
      signInWithEmailAndPassword(auth, email, password)
        .then(userCrendetial => {
          console.log(userCrendetial);
        }).catch(error => {
          console.error(error);
          console.log(error.code); 
          errorMsg.value = errorCodes[error.code]
        })
    }
  
    const hasError = computed( () => {
      return errorMsg.value;
    })
  
    return {
      login,
      errorMsg,
      hasError
    }
  });