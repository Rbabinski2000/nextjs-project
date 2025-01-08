import { db } from '@/app/lib/firebase'
import { collection, addDoc, setDoc, doc, getDoc} from 'firebase/firestore'
import { query, where,getDocs } from "firebase/firestore";
import { Firestore } from 'firebase/firestore';
import { Timestamp} from "@firebase/firestore";


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
      console.log("Document data:", docSnap.data());
      data=docSnap.data().address;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    return data;
}
async function DbCollectionArtGet(user){
  const articlesRef=collection(db,"articles");
  const userRef=doc(db,"users",user?.uid)
  //console.log(articlesRef)
  let tab=[];
  const q=query(articlesRef,where("user","==",userRef))

  const querySnapshot = await getDocs(q);
  //console.log(userRef)
  querySnapshot.forEach((doc) => {
    //console.log("w srodku snapa",doc)
    // doc.data() is never undefined for query doc snapshots
    tab[tab.length]=doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  
  return tab
}

async function DbCollectionSchedGet(user,starting,ending){
  //console.log(starting)
  const articlesRef=collection(db,"schedules");
  const userRef=doc(db,"users",user?.uid)
  //console.log(articlesRef)
  let tab=[];
  const start=Timestamp.fromDate(starting)
  const end=Timestamp.fromDate(ending)
  const q=query(articlesRef,where("user","==",userRef),where("Date",">=",start),where("Date","<=",end))
  
  const querySnapshot = await getDocs(q);
  
  querySnapshot.forEach((doc) => {
    //console.log("w srodku snapa",doc.data())
    // doc.data() is never undefined for query doc snapshots
    tab[tab.length]=doc.data();
    //console.log(doc.id, " => ", doc.data());
  });
  return tab

}

async function DbCollectionSchedSet(user,event,value){
  let temp=new Date(event.day);
  temp.setHours(event.hour);
  temp.setMinutes(0);
  temp.setSeconds(0);
  temp.setMilliseconds(0);
  try {
    const userRef=doc(db,"users",user?.uid)
    //console.log(userRef)
    const docRef =addDoc(collection(db, "schedules"), {
      Title:value,
      Content:value,
      user:userRef,
      Date:Timestamp.fromDate(temp)
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}
export {DbCollectionSet,DbCollectionGet,DbCollectionArtGet,DbCollectionSchedGet,DbCollectionSchedSet}