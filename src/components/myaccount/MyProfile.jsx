import { Avatar, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { updateCredentialsAPI } from "../utils/CartApi";
import { toast } from "react-toastify";

const MyProfile = () => {

  const name = JSON.parse(sessionStorage.getItem("userInfo"));

  const email = JSON.parse(sessionStorage.getItem("userEmail"));
  console.log("email", email);
  const [emailCom, setEmailCom] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isFormActive, setIsFormActive] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPass, setEditingPass] = useState(false);

  const [loading, setLoading] = useState(false)

  const [errors, setErrors] = useState({
    email: false,
    pass: false,
    newpass: false,
  });

  const enableFordEdit = (e) => {
    const { value } = e.target;
    setIsFormActive(true);
    if (value === "email") {
      setEditingEmail(true);
    } else if (value === "pass") {
      setEditingPass(true);
    }
  };
  const updateData = async () => {
    let body = {};
    if (editingEmail) {
      body = {
        email: email,
        passwordCurrent: password,
        password: password,
      };
    } else if (editingPass) {
      body = {
        email: email,
        passwordCurrent: password,
        password: newPassword,
      };
    }

    try {
      setLoading(true)
      const res = await updateCredentialsAPI(body)
      
      if (res.status==='success') {
        toast.success('Profile updated succesfully!')
        sessionStorage.setItem('useremail', email);
        
      }else if(res.status==='fail'){
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong, Please try again later!')
    }finally{
      setLoading(false)
    }
  };
  const discardData = () => {
    setEmailCom(localStorage.getItem("useremail"));
    setPassword("");
    setNewPassword("");
    setIsFormActive(false);
    setEditingEmail(false);
    setEditingPass(false);
    setErrors({ email: false, pass: false, newpass: false });
  };
  const handleChanges = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      if (!isValidEmail(value)) {
        setErrors({ ...errors, [name]: true });
      } else {
        setErrors({ ...errors, [name]: false });
      }
      setEmail(value);
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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className="my-profile-section">
      <Avatar sx={{ height: "100px", width: "100px", background: "black" }}>
        {name
          .split(" ")
          .map((word) => word[0].toUpperCase())
          .join(" ")}
      </Avatar>
      <Grid sx={{ margin: "2rem 4rem" }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            type="text"
            value={name}
            variant="standard"
            fullWidth
            disabled
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
            onChange={handleChanges}
            disabled={!isFormActive}
            error={errors.email}
            helperText={errors.email ? "Please enter an valid Email" : ""}
          />
        </Grid>
        {(editingEmail || editingPass) && (
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
        {isFormActive ? (
          <>
            <Grid item xs={6}>
              <button onClick={updateData} className="update-btn">
                {loading?<><CircularProgress size={20} color="inherit"/></>:"Save changes"}
                
              </button>
            </Grid>
            <Grid item xs={6}>
              <button onClick={discardData} className="update-btn">
                
                discard changes
              </button>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={6}>
              <button
                onClick={enableFordEdit}
                className="update-btn"
                value="email"
              >
                change email
              </button>
            </Grid>
            <Grid item xs={6}>
              <button
                onClick={enableFordEdit}
                className="update-btn"
                value="pass"
              >
                change password
              </button>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}

export default MyProfile;
