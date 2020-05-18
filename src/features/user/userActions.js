import { toastr } from "react-redux-toastr";

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
