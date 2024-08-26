import React, { useState } from "react";
import "./Profile.scss";
import PageMenu from "../../components/pageMenu/PageMenu";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card";
import { useEffect } from "react";
import {
  updateUser,
  updateUserPhoto,
} from "../../Redux/Features/auth/authSlice";
import Loader from "../../components/Loader/Loader";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";

const cloud_name = process.env.REACT_APP_CLOUD_NAME;
const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "http://api.cloudinary.com/v1_1/dpmuaunbx/image/upload";

const Profile = () => {
  const { isLoading, user } = useSelector((state) => state.auth);
  const initialState = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    role: user?.role || "",
    photo: user?.photo || "",
    address: {
      address: user?.address?.address || "",
      state: user?.address?.state || "",
      country: user?.address?.country || "",
    },
  };

  const [profile, setProfile] = useState(initialState);
  const [profileImg, setProfileImg] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user === null) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        photo: user?.photo || "",
        role: user?.role || "",
        address: {
          address: user?.address?.address || "",
          state: user?.address?.state || "",
          country: user?.address?.country || "",
        },
      });
    }
  }, [user]);

  const savePhoto = async (e) => {
    e.preventDefault();
    let imageUrl;
    try {
      if (
        profileImg !== null &&
        (profileImg.type === "image/jpeg" ||
          profileImg.type === "image/jpg" ||
          profileImg.type === "image/png")
      ) {
        const image = new FormData();
        image.append("file", profileImg);
        image.append("cloud_name", cloud_name);
        image.append("upload_preset", upload_preset);

        // save image to cloudinary
        const response = await fetch(url, { method: "post", body: image });
        const imgData = await response.json();
        imageUrl = imgData?.url.toString();
      }

      // save image to mongo db
      const userData = {
        photo: profileImg ? imageUrl : profile.photo,
      };

      await dispatch(updateUserPhoto(userData));
      setImagePreview(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const userData = {
      name: profile.name,
      phone: profile.phone,
      photo: profile.photo,
      address: {
        address: profile.address,
        state: profile.state,
        country: profile.country,
      },
    };
    await dispatch(updateUser(userData));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    setProfileImg(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <>
      <section>
        {isLoading && <Loader />}
        <div className="container">
          <PageMenu />
          <h2>Profile</h2>
          <div className="--flex-start profile">
            <Card cardClass="card">
              {!isLoading && user && (
                <>
                  <div className="profile-photo">
                    <div>
                      <img
                        src={imagePreview === null ? user?.photo : imagePreview}
                        alt="profile"
                      />
                      <h3>Role: {profile?.role}</h3>
                      {imagePreview !== null && (
                        <div className="--center-all">
                          <button
                            className="--btn --btn-secondary center"
                            onClick={savePhoto}
                          >
                            <AiOutlineCloudUpload size={18} /> Upload Image
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <form onSubmit={saveProfile}>
                    <p>
                      <label htmlFor="file">Change Photo:</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={handleImageChange}
                      />
                    </p>
                    <p>
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={profile?.name}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={profile?.email}
                        onChange={handleInputChange}
                        disabled
                      />
                    </p>
                    <p>
                      <label htmlFor="phone">Phone:</label>
                      <input
                        type="text"
                        name="phone"
                        value={profile?.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="address">Address:</label>
                      <input
                        type="text"
                        name="address"
                        value={profile?.address?.address}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="state">State:</label>
                      <input
                        type="text"
                        name="state"
                        value={profile?.address?.state}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <p>
                      <label htmlFor="country">Country:</label>
                      <input
                        type="text"
                        name="country"
                        value={profile?.address?.country}
                        onChange={handleInputChange}
                        required
                      />
                    </p>
                    <button className="--btn --btn-primary --btn-block">
                      Update User
                    </button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
