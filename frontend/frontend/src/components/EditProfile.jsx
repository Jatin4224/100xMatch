import { useState } from "react";
import { useDispatch } from "react-redux";
import api, { getErrorMessage } from "../utils/api";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    age: user.age ?? "",
    gender: user.gender || "",
    about: user.about || "",
    skills: (user.skills || []).join(", "),
  });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const skills = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        photoUrl: form.photoUrl,
        about: form.about,
        skills,
      };
      // optional fields are only sent once filled in
      if (form.age !== "") payload.age = Number(form.age);
      if (form.gender) payload.gender = form.gender;

      const res = await api.patch("/profile/edit", payload);
      dispatch(addUser(res.data.data));
      setSaved(true);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-10">
      <form
        onSubmit={handleSave}
        className="card w-full max-w-md bg-base-200 hover:shadow-[0px_4px_30px_0px_rgba(255,255,255,0.3)]"
      >
        <div className="card-body gap-3">
          <h2 className="card-title justify-center">Edit Profile</h2>

          <div className="flex gap-3">
            <input
              name="firstName"
              className="input input-bordered w-full"
              placeholder="First Name"
              required
              value={form.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              className="input input-bordered w-full"
              placeholder="Last Name"
              required
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <input
            name="photoUrl"
            type="url"
            className="input input-bordered"
            placeholder="Photo URL"
            value={form.photoUrl}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <input
              name="age"
              type="number"
              min="18"
              max="120"
              className="input input-bordered w-full"
              placeholder="Age"
              value={form.age}
              onChange={handleChange}
            />
            <select
              name="gender"
              className="select select-bordered w-full"
              value={form.gender}
              onChange={handleChange}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            name="skills"
            className="input input-bordered"
            placeholder="Skills (comma separated)"
            value={form.skills}
            onChange={handleChange}
          />
          <textarea
            name="about"
            className="textarea textarea-bordered"
            placeholder="About you"
            maxLength={500}
            rows={4}
            value={form.about}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {saved && <p className="text-green-500 text-sm">Profile saved!</p>}
          <button
            type="submit"
            className="btn btn-outline btn-error"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      <div className="w-full max-w-sm">
        <p className="text-center mb-2 opacity-70">Preview</p>
        <UserCard
          user={{
            ...form,
            age: form.age === "" ? undefined : form.age,
            skills,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
