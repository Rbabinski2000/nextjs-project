import { db } from '@/app/lib/firebase'
import { collection, addDoc, setDoc, doc, getDoc} from 'firebase/firestore'
import { query, where,getDocs } from "firebase/firestore";



async function DbCollectionSet(addressData,user){

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
    const docSnap=await getDoc(doc(db,"users",user?.uid))
    let data;
    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data().address);
      //data=docSnap.data().address;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    return data;
}
async function DbCollectionArtGet(user){
  const articlesRef=collection(db,"articles");
  //console.log(articlesRef)
  let tab=[];
  const q=query(articlesRef,where("user","!=",""))

  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
    //console.log("w srodku snapa",doc)
    // doc.data() is never undefined for query doc snapshots
    tab[tab.length]=doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  
  return tab
}
export {DbCollectionSet,DbCollectionGet,DbCollectionArtGet}