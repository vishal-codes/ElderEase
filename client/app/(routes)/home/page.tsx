"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { databases, ID, Query } from "@/lib/appwrite";
import {
  FaRegFileAlt,
  FaNotesMedical,
  FaPrescriptionBottleAlt,
  FaRegSmileBeam,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  age: string;
  incomeRange: string;
  location: string;
  employmentStatus: string;
  veteranStatus: boolean;
  disabilityStatus: boolean;
}

const DATABASE_ID = "67f178fe0019346e7ffb"; // 🔁 Replace with your actual DB ID
const COLLECTION_ID = "67f17905003c7d0eee37"; // 🔁 Replace with your collection ID

export default function HomePage() {
  const router = useRouter();

  const { user, logout } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<UserProfile>({
    name: "",
    age: "",
    incomeRange: "",
    location: "",
    employmentStatus: "",
    veteranStatus: false,
    disabilityStatus: false,
  });
  const [showInfo, setShowInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [documentId, setDocumentId] = useState<string | null>(null); // to track Appwrite doc ID

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !documentId) return;

    try {
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, documentId, {
        ...formData,
        age: Number(formData.age),
        employmentStatus: formData.employmentStatus === "employed",
      });

      setUserData(formData);
      setIsEditing(false);
      setShowInfo(false);
      alert("✅ Info updated!");
    } catch (error) {
      console.error("❌ Failed to update user profile:", error);
      alert("Update failed. Check console.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    try {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        ...formData,
        age: Number(formData.age),
        employmentStatus: formData.employmentStatus === "employed",
        userId: user.uid,
      });
      setUserData(formData);
      alert("✅ Data saved to Appwrite!");
    } catch (error) {
      console.error("❌ Failed to save user profile:", error);
      alert("Error saving data. Check console.");
    }
  };

  useEffect(() => {
    const checkUserProfile = async () => {
      if (!user) return;

      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID,
          [Query.equal("userId", user.uid)] // 👈 correct string filter
        );

        if (response.documents.length > 0) {
          const data = response.documents[0];
          setDocumentId(data.$id);
          setUserData({
            name: data.name,
            age: String(data.age),
            incomeRange: data.incomeRange,
            location: data.location,
            employmentStatus: data.employmentStatus ? "employed" : "unemployed",
            veteranStatus: data.veteranStatus,
            disabilityStatus: data.disabilityStatus,
          });
        }
      } catch (error) {
        console.error("❌ Error fetching user profile from Appwrite:", error);
      }
    };

    checkUserProfile();
  }, [user]);

  if (!user) return <div className="p-6">Loading or not logged in...</div>;

  const features = [
    {
      title: "Government Subsidy Guide",
      route: "schemes",
      icon: <FaRegFileAlt className="text-8xl text-purple-600" />,
    },
    {
      title: "Health Insurance Support",
      route: "insurance",
      icon: <FaNotesMedical className="text-8xl text-purple-600" />,
    },
    {
      title: "Prescription Reminders",
      route: "reminders",
      icon: <FaPrescriptionBottleAlt className="text-8xl text-purple-600" />,
    },
    {
      title: "Daily Journal",
      route: "journal",
      icon: <FaRegSmileBeam className="text-8xl text-purple-600" />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-300 via-pink-100 to-blue-200">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">ElderEase</h1>
        <div className="flex items-center gap-4">
          {userData && (
            <button
              onClick={() => setShowInfo(true)}
              className="bg-green-200 hover:bg-green-300 px-4 py-2 rounded-xl text-sm"
            >
              View Info
            </button>
          )}
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Section */}
      {!userData ? (
        // 🌱 Show the form if userData is null
        <div className="p-6 max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-2xl shadow"
          >
            <h2 className="text-xl font-semibold">Fill Your Information</h2>

            <input
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <select
              name="incomeRange"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Income Range</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              name="location"
              placeholder="Location"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />

            <select
              name="employmentStatus"
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Employment Status</option>
              <option value="employed">Employed</option>
              <option value="unemployed">Unemployed</option>
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="veteranStatus"
                onChange={handleChange}
              />{" "}
              Veteran
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="disabilityStatus"
                onChange={handleChange}
              />{" "}
              Disabled
            </label>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      ) : (
        // 🙌 Show welcome if userData exists
        <>
          <div className="text-gray-700 text-lg">
            Welcome back, {userData.name} 👋
          </div>
          <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-8">
            {/* Grid Container */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center space-y-2 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-purple-300"
                  // onclick route to feature.title
                  onClick={() => router.push(`/${feature.route}`)}
                >
                  {feature.icon}
                  <h2 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h2>
                </div>
              ))}
            </div>

            {/* Blobs */}
            <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-purple-300 opacity-90 rounded-full blur-3xl z-0" />
            <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-pink-200 opacity-30 rounded-full blur-2xl z-0" />
          </div>
        </>
      )}

      {/* Info Modal */}
      {showInfo && userData && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative">
            <button
              onClick={() => {
                setShowInfo(false);
                setIsEditing(false);
              }}
              className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Your Info" : "Your Info"}
            </h3>

            {!isEditing ? (
              <>
                <ul className="space-y-2 text-sm">
                  <li>
                    <strong>Name:</strong> {userData.name}
                  </li>
                  <li>
                    <strong>Age:</strong> {userData.age}
                  </li>
                  <li>
                    <strong>Income:</strong> {userData.incomeRange}
                  </li>
                  <li>
                    <strong>Location:</strong> {userData.location}
                  </li>
                  <li>
                    <strong>Employment:</strong> {userData.employmentStatus}
                  </li>
                  <li>
                    <strong>Veteran:</strong>{" "}
                    {userData.veteranStatus ? "Yes" : "No"}
                  </li>
                  <li>
                    <strong>Disabled:</strong>{" "}
                    {userData.disabilityStatus ? "Yes" : "No"}
                  </li>
                </ul>
                <button
                  onClick={() => {
                    setFormData(userData);
                    setIsEditing(true);
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Edit Info
                </button>
              </>
            ) : (
              <form onSubmit={handleUpdate} className="space-y-3">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded"
                />

                <select
                  name="incomeRange"
                  value={formData.incomeRange}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <select
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="employed">Employed</option>
                  <option value="unemployed">Unemployed</option>
                </select>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="veteranStatus"
                    checked={formData.veteranStatus}
                    onChange={handleChange}
                  />
                  Veteran
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="disabilityStatus"
                    checked={formData.disabilityStatus}
                    onChange={handleChange}
                  />
                  Disabled
                </label>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
