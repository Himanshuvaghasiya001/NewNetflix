// components/ProfileImageUpload.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileImage } from '../features/auth/authAPI';

const ProfileImageUpload = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !user) return;

    dispatch(updateProfileImage({ id: user._id, image }));
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept="image/*" />
        <button type="submit" className="bg-blue-600 text-black px-4 py-1 mt-2">
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {user?.profileImage && (
        <img
          src={`http://localhost:8000/${user.profileImage}`}
          alt="Profile"
          className="w-32 h-32 mt-4 object-cover rounded-full"
        />
      )}
    </div>
  );
};

export default ProfileImageUpload;
