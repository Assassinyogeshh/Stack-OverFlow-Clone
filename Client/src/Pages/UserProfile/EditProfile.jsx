import React from "react";
import { useFormik } from "formik";
import { updateProfile } from "../../Action/Users";
import { useDispatch, useSelector } from "react-redux";
import "./EditProfile.css";

function EditProfile(userId, currentProfile) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUserReducer);

  const cancelEditProfile = () => {};


 const id= currentUser?.stackUser._id;
console.log(currentUser.stackUser);
  const initialValues = {
    name: "",
    about: "",
    tags: "",
    imageData: null,
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("imageData", file);
    }
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {

        const file = values.imageData;
        const base64 = await convertToBase64(file);
// console.log(base64);
        // Handle your form submission logic here
        const updatedTagsArray = values.tags.split(" ");
        dispatch(
          updateProfile(id, {
            ...values,
            tags: updatedTagsArray,
            name:  currentUser?.stackUser?.name,
            imageData: base64,
          })
        );
        alert("Profile updated successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to update the profile");
      }
    },
  });

  return (
    <div className="edit_profile">
      <span className="edit_profile_title">
        <h1>Edit Your Profile</h1>
      </span>
      <div className="public_information">
        <h1>Public Information</h1>
        <div className="updating_profile">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="display_name">
              <h3>Display Name:</h3>
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              id="display_name"
              onChange={handleChange}
            />

            <label htmlFor="about_me">
              <h3>About Me:</h3>
            </label>
            <textarea
              type="text"
              name="about"
              value={values.about}
              id="about_me"
              onChange={handleChange}
              cols="30"
              rows="10"
            ></textarea>

            <label htmlFor="users_tags">
              <h3>Tags:</h3>
            </label>
            <p>Add tags separated by 1 space</p>
            <input
              type="text"
              name="tags"
              value={values.tags}
              id="users_tags"
              onChange={handleChange}
            />

            <label htmlFor="profileImg">Profile Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />

            <div className="profile_btn">
              <button type="submit" className="submit_updated_profile">
                Save Profile
              </button>
              <button onClick={cancelEditProfile} className="user_cancel_btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
