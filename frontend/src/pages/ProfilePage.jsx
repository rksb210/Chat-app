import { Camera, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const ProfilePage = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if(!file) return;

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profilePic: base64Image})
    }

  };
  return (
    <div className="pt-20 flex justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
          <p className="text-lg text-gray-600">Your Profile Information</p>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={selectedImg  || authUser?.profilePic || "/avatar.png"}
              alt="User Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-primary shadow"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                              absolute bottom-0 right-0 
                              bg-base-content hover:scale-105
                              p-2 rounded-full cursor-pointer 
                              transition-all duration-200
                              ${
                                isUpdatingProfile
                                  ? "animate-pulse pointer-events-none"
                                  : ""
                              }
                            `}
            >
              <Camera className="w-5 h-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>

          <p className="text-sm text-gray-500">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <div className="text-sm text-zinc-400 flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name
            </div>
            <p className="px-4 py-1.5 bg-base-200 rounded-lg border h-10">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm text-zinc-400 flex items-center gap-2 ">
              <Mail className="w-4 h-4" />
              Email Address
            </div>
            <p className="px-4 py-1.5 bg-base-200 rounded-lg border  h-10">
              {authUser?.email}
            </p>
          </div>
        </div>

        <div className="mt-6 bg-base-300 rounded-xl p-6">
          <h2 className="text-lg font-medium  mb-4">Account Information</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
