import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { Star } from "lucide-react";
import Model from "../components/Model";
import { MdEdit } from "react-icons/md";
import Input from "../components/Input";
import { UserContext } from "../context/userContext";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { _id } = useParams();
  const JWT = localStorage.getItem("JwtToken");

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/${_id}`,
        { headers: { Authorization: `Bearer ${JWT}` } }
      );

      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  const editUserProfile = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/user/${_id}`,
        { username, email },
        { headers: { Authorization: `Bearer ${JWT}` } }
      );

      if (response.data.success) {
        setUser(response.data.data.user); 
        setProfile(response.data.data); 
        toast.success(response.data.message);
        setIsModelOpen(false); 
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || e?.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, [_id]);

  useEffect(() => {
    if (isModelOpen && profile?.user) {
      setUsername(profile.user.username);
      setEmail(profile.user.email);
    }
  }, [isModelOpen, profile]);

  if (!profile) {
    return (
      <div>
        <Header />
        <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
          Loading profile...
        </div>
        <Footer />
      </div>
    );
  }

  const { user: userData, reviews } = profile;

  const formattedJoinDate = new Date(userData?.joinDate).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8 mt-24">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <img
            src={userData?.profile}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-teal-500"
          />
          <h1 className="text-2xl font-bold mt-4">{userData?.username}</h1>
          <p className="text-gray-600">{userData?.email}</p>
          <p className="text-gray-500 text-sm">Joined on {formattedJoinDate}</p>
          <button
            className="flex items-center text-white bg-gray-900 px-3 py-1 rounded-full mt-3"
            onClick={() => setIsModelOpen(true)}
          >
            <MdEdit className="mr-2" />
            Edit Profile
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">Review History</h2>
          {reviews?.length > 0 ? (
            <div className="space-y-4">
              {reviews
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((review) => (
                  <Link
                    to={`/movies/${review.movieId}`}
                    key={review._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center hover:scale-105 transition-transform duration-150"
                  >
                    <div>
                      <p className="font-semibold">Movie ID: {review.movieId}</p>
                      <p className="text-gray-700">{review.reviewText}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-2 md:mt-0">
                      <Star className="text-yellow-500 w-4 h-4" />
                      <span className="font-bold">{review.rating}/5</span>
                    </div>
                  </Link>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>

      <Model isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-center py-3">Edit Profile</p>
          <img
            src={userData?.profile}
            alt="profile"
            className="w-16 h-16 object-cover rounded-full border-2 border-teal-400 block mx-auto mb-3"
          />
          <div className="flex flex-col w-full gap-3">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-4 w-full">
            <button
              onClick={() => setIsModelOpen(false)}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={editUserProfile}
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </Model>

      <Toaster />
      <Footer />
    </div>
  );
};


export default Profile;
