import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useLoader } from "./context/LoaderContext";
import "./loader.css";

const Loader = () => {
  const { showLoader } = useLoader();
   console.log("showLoader", showLoader)
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
