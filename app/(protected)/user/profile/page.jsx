'use client'
import { useState ,useEffect} from "react";
import { updateProfile,reload } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { DbCollectionGet,DbCollectionSet } from "../../fireCollection";



function ProfileForm() {
  const { user } = useAuth();
  const [error, setError] = useState(""); // Stan obsługujący błędy
  const router=useRouter();
  DbCollectionGet(user)
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
  });
  
  const [addressData, setAddressData] = useState({
    city:"",
    street:"",
    zipCode:""
  });

  useEffect(() => {
    if (user) {
      DbCollectionGet(user)
        .then(res => {
          setAddressData({
            city: res?.city || "",
            street: res?.street || "",
            zipCode: res?.zipCode || ""
          });
        })
        .catch(err => {
          console.error("Error fetching address data:", err);
        });
    }
  }, [user]);

  // const docA=doc(db,"users","8gvxS1VytSQfUXgHzPG1");
  // const docSnap=getDoc(docA)
  // console.log(docSnap)
  const onSubmit = (event) => {
    event.preventDefault();

    
    
    DbCollectionSet(addressData,user)
    updateProfile(user, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
        router.refresh()
      })
      .catch((error) => {
        setError(error.message);
      });
      
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeAddress = (event) => {
    const { name, value } = event.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      {error && (
        <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="displayName" className="block mb-1 text-sm font-medium text-gray-700">
            Display Name
          </label>
          <input
            type="text"
            id="displayName"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label htmlFor="photoURL" className="block mb-1 text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="text"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <h1>Address</h1>
        <div>
          <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={addressData.city}
            onChange={handleChangeAddress}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="street" className="block mb-1 text-sm font-medium text-gray-700">
            Street
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={addressData.street}
            onChange={handleChangeAddress}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block mb-1 text-sm font-medium text-gray-700">
            zipCode
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={addressData.zipCode}
            onChange={handleChangeAddress}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
