import * as React from "react";

import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import Signup from "../pages/authentication/signup";
import Login from "../pages/authentication/login";

const style = {
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  marginLeft: "auto",
  marginRight: "auto",
  transform: "translate(0, -50%)",
  width: "85%",
  maxWidth: 600,
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  background: "black",
};

export default function TransitionsModal(props) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={() => props.setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={{ ...style }}>
          {props.for === "login" ? (
            <Login setFor={props.setFor} />
          ) : (
            <Signup setFor={props.setFor} />
          )}
        </Box>
      </Modal>
    </div>
  );
}
