// import React, { useState } from "react";
// import "./UpdateProfile.scss";
// import UpdateProfileImage from "Assets/icon/updates_profile.svg"



// /*  FIREBASE  */


// import {
//    getStorage,
//    ref,
//    uploadBytes,
//    getDownloadURL,
//  } from "firebase/storage";

 

// setPersistence(auth, browserLocalPersistence);

// /* END OF FIREBASE*/

// export const UpdateProfile = () => {
//    const[updateName, setUpdateName] = useState("");
//    const[updateProfileImage, setProfileImage] = useState(null);


//    function onchangeUpdateName(event) {
//       setUpdateName(event.target.value)
//    }




//    const onChangeUpdateProfileImage = (event) => {
//       const file = event.target.files[0];
  
//       setProfileImage(file);
  
//       // Additional logic if needed, such as reading the file for preview
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           console.log(reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };



//     const authUpdateProfile = async () => {
//       const user = auth.currentUser;
    
//       if (user) {
//         try {
//           const updateNameEl = updateName;
    
//           // Check if there's a profile image to upload
//           if (updateProfileImage) {
//             const storage = getStorage(app);
//             const storageRef = ref(storage, `profile-images/${user.uid}`);
    
//             // Upload the image to Firebase Storage
//             await uploadBytes(storageRef, updateProfileImage);
    
//             // Get the download URL of the uploaded image
//             const downloadURL = await getDownloadURL(storageRef);
    
//             // Update the user profile with the download URL
//             await updateProfile(user, {
//               displayName: updateNameEl,
//               photoURL: downloadURL,
//             });
    
//             console.log("Profile updated successfully");
    
//             // Reload the page to see the latest changes
//             window.location.reload();
            
//           } else {
//             // Update the user profile without a new photoURL
//             await updateProfile(user, {
//               displayName: updateNameEl,
//             });
    
//             console.log("Profile updated successfully");
    
//             // Reload the page to see the latest changes
//             window.location.reload();
//           }
//         } catch (error) {
//           console.error("Error updating profile:", error.message);
//         }
//       } else {
//         console.error("User not authenticated");
//       }
//     };
    

//   return (
//     <div className="UpdateProfile">
//       <div className="inner-UpdateProfile">
//         <div className="icon-image">
//          <img src={UpdateProfileImage} alt="" />
//         </div>
//         <div className="UpdateProfile-header">
//          <h4>Let Update your Profile...</h4>
//          <p>Because National Guard Colorado loves and prefer good completed profile</p>
//         </div>
//         <div className="UpdateProfile-form">
//          <div className="UpdateProfile__form-group">
//             <input type="text"
//             value={updateName}
//             onChange={onchangeUpdateName}
//             />
//             <label>Display Name</label>
//          </div>
//          <div className="UpdateProfile__form-group">
//             <input type="file"
//             onChange={onChangeUpdateProfileImage}
//             />
//             <label>Profile Photo</label>
//          </div>
//         </div>
        
//       </div>
//       <div className="UpdateProfile-button">
//             <button className="cancel">
//                cancel
//             </button>
//             <button className="update" onClick={authUpdateProfile}>
//                Update Profile
//             </button>
//          </div>
//     </div>
//   );
// };
