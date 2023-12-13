import {
  Avatar,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { updateCredentialsAPI } from "../utils/CartApi";
import { toast } from "react-toastify";

const MyProfile = () => {
  const [currentName, setCurrentName] = useState(
    sessionStorage.getItem("username")
  );

  const email = sessionStorage.getItem("userEmail");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [username, setUsername] = useState(currentName);

  const [isFormActive, setIsFormActive] = useState(false);
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingPass, setEditingPass] = useState(false);
  const [editingGender, setEditingGender] = useState(false);
  const [editingBirth, setEditingBirth] = useState(false);
  const [editingNumber, setEditingNumber] = useState(false);

  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // for all field save data when user refresh page
  useEffect(() => {
    const storedData = localStorage.getItem("email");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPhoneNumber(parsedData.phoneNumber || "");
      setGender(parsedData.gender || "");
      setBirthdate(parsedData.birthdate || "");
    }
  }, []); 
  useEffect(() => {
    // Update localStorage whenever all field changes
    localStorage.setItem(
      "email",
      JSON.stringify({ phoneNumber, gender, birthdate })
    );
  }, [phoneNumber, gender, birthdate]);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    username: false,
    pass: false,
    newpass: false,
    gender: false,
    birthdate: false,
    phoneNumber: false,
  });

  const enableFordEdit = (e) => {
    const { value } = e.target;
    setIsFormActive(true);
    if (value === "username") {
      setEditingUsername(true);
    } else if (value === "pass") {
      setEditingPass(true);
    } else if (value === "gender") {
      setEditingGender(true);
    } else if (value === "birthdate") {
      setEditingBirth(true);
    } else if (value === "phoneNumber") {
      setEditingNumber(true);
    }
  };
  const updateData = async () => {
    let body = {};
    let updateType;
    if (editingUsername) {
      if (username.length < 1) {
        toast.error("Please enter valid details");
        return;
      }
      body = {
        name: username,
      };
      updateType = "username";
    } else if (editingPass) {
      body = {
        email: email,
        passwordCurrent: password,
        password: newPassword,
      };
      updateType = "password";
    }

    try {
      setLoading(true);
      const res = await updateCredentialsAPI(body, updateType);
      console.log("resUpdate", res);
      if (res.status === "success") {
        const updatedData = {
          phoneNumber: phoneNumber,
          gender: gender,
          birthdate: birthdate,
        };
        localStorage.setItem(email, JSON.stringify(updatedData));
        toast.success("Profile updated succesfully!");
        sessionStorage.setItem("username", username);
        setCurrentName(username);
        setIsFormActive(false);
        setEditingUsername(false);
        setEditingPass(false);

        setPassword("");
        setNewPassword("");
      } else if (res.status === "fail") {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, Please try again later!");
    } finally {
      setLoading(false);
    }
  };
  const discardData = () => {
    setUsername(currentName);

    setPassword("");
    setNewPassword("");
    setIsFormActive(false);
    setEditingUsername(false);
    setEditingPass(false);
    setErrors({ username: false, pass: false, newpass: false });
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
      if (value == "") {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
    } else if (name === "pass") {
      if (value.length < 6) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
      setPassword(value);
    } else if (name === "newpass") {
      if (value.length < 6) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
      setNewPassword(value);
    }
  };
  const handleBirthdayChange = (e) => {
    const inputDate = e.target.value;
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/; // Update the date format to match the input type

    if (inputDate === "" || dateFormat.test(inputDate)) {
      setBirthdate(inputDate);
    }
  };
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className="my-profile-section">
      <Avatar sx={{ height: "100px", width: "100px", background: "black" }}>
        {currentName.split().map((word)=>word[0].toUpperCase()).join(" ")}
      </Avatar>
      <Grid sx={{ margin: "2rem 4rem" }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            value={username}
            name="username"
            variant="standard"
            fullWidth
            onChange={handleChanges}
            disabled={!editingUsername}
            error={errors.username}
            helperText={errors.username ? "Please enter a valid name" : ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={email}
            variant="standard"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel style={{ fontSize: "12px" }}>Birth Date</InputLabel>
          <TextField
            type="date"
            value={birthdate}
            name="birthdate"
            variant="standard"
            fullWidth
            onChange={handleBirthdayChange}
            disabled={!editingUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              disabled={!editingUsername}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            name="phoneNumber"
            variant="standard"
            fullWidth
            onChange={handlePhoneNumberChange}
            disabled={!editingUsername}
          />
        </Grid>
        {editingPass && (
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              name="pass"
              value={password}
              variant="standard"
              fullWidth
              onChange={handleChanges}
              disabled={!isFormActive}
              error={errors.pass}
              helperText={
                errors.pass
                  ? "Password must be at least 6 characters long."
                  : ""
              }
            />
          </Grid>
        )}
        {editingPass && (
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              variant="standard"
              name="newpass"
              fullWidth
              onChange={handleChanges}
              disabled={!isFormActive}
              error={errors.newpass}
              helperText={
                errors.newpass
                  ? "Password must be at least 6 characters long."
                  : ""
              }
            />
          </Grid>
        )}

        <>
          <Grid item xs={6}>
            <button
              onClick={isFormActive ? updateData : enableFordEdit}
              className="update-btn"
              value={!isFormActive && "username"}
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                </>
              ) : isFormActive ? (
                "Save Changes"
              ) : (
                "Update Data"
              )}
            </button>
          </Grid>
          <Grid item xs={6}>
            <button
              onClick={isFormActive ? discardData : enableFordEdit}
              className="update-btn"
              value={!isFormActive && "pass"}
            >
              {isFormActive ? "Discard Changes" : "Change Password"}
            </button>
          </Grid>
        </>
      </Grid>
    </div>
  );
};

export default MyProfile;
