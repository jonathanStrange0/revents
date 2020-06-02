import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";
import cuid from "cuid";
import { login } from "../auth/authActions";

export const updateProfile = (user) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  // destructuring props we don't want by removing them from user using destructuring.
  const { isLoaded, isEmpty, ...updatedUser } = user;
  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Your profile has been updated.");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName,
  };

  try {
    dispatch(asyncActionStart());
    //upload file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    // get back url for the image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
    // get user document from firestore
    let userDoc = await firestore.get(`users/${user.uid}`);
    // check if a user currently has photo
    // if no photo, update profile image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }
    // add the image to firestore
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }],
      },
      { name: imageName, url: downloadURL }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};

export const deletePhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;

  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }],
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = (photo) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  try {
    return await firebase.updateProfile({ photoURL: photo.url });
  } catch (error) {
    console.log(error);
    throw new Error("Problem setting main photo");
  }
};
