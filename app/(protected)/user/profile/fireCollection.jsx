import { db } from '@/app/lib/firebase'
import { collection, addDoc, setDoc, doc, getDoc } from 'firebase/firestore'



async function DbCollectionSet(addressData){

    try {
        const docRef = await setDoc(doc(db, "users", user?.uid), {
          address: {
            city: addressData.city,
            street: addressData.street,
            zipCode: addressData.zipCode
          }
        });
        console.log("Document written with ID: ", docRef?.uid);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


};
async function DbCollectionGet(user){
    const docRef=doc(db,"users",user?.uid);
    const docSnap=await getDoc(docRef)
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    return docSnap
}

export {DbCollectionSet,DbCollectionGet}