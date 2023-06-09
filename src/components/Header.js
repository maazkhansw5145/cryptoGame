import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { logout, login } from "../redux/actions/authActions";
import { ArrowDropDown, Casino } from "@mui/icons-material";
import Loading from "./Loading";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import TransitionsModal from "./TransitionModal";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
function Header(props) {
  const [open, setOpen] = useState(false);
  const [openCoinsMenu, setOpenCoinsMenu] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BNB");
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openModalFor, setOpenModalFor] = useState("login");
  const [loading, setLoading] = useState(false);

  console.log(props);
  // useEffect(() => {
  //   if (!props.auth.isAuthenticated) {
  //     checkUser();
  //   }
  // }, []);

  let activeStyle = {
    background: "brown",
    color: "white",
    textDecoration: "none",
    borderRadius: 20,
    margin: "0 10px",
    padding: 10,
  };
  let nonActiveStyle = {
    textDecoration: "none",
    color: "white",
    padding: 10,
  };

  // const supabase = createClient(
  //   "https://dmmjiwtnypxeuxqjgtrk.supabase.co",
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtbWppd3RueXB4ZXV4cWpndHJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0NTcyNDYsImV4cCI6MTk5MTAzMzI0Nn0.ro-zLw-vI5u_Yp7uqwxAJ0pR7mLiaZCldBXvc-Z0TNE"
  // );
  // async function checkUser() {
  //   setLoading(true);
  //   await supabase.auth.getUser().then(async (value) => {
  //     console.log("Check login", value);
  //     if (value.data?.user) {
  //       props.login({
  //         name: value.data.user.user_metadata.full_name,
  //         emailId: value.data.user.user_metadata.email,
  //         picture_url: value.data.user.user_metadata.picture,
  //       });
  //       setLoading(false);
  //       toast.success("Logged in successfully", {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    // supabase.auth.signOut();
    props.logout();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar position="fixed" open={open} style={{ background: "black" }}>
          <Toolbar>
            <Box sx={{ display: "flex" }}>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }
              >
                <span style={{ display: "flex" }}>
                  <Casino
                    sx={{
                      marginRight: {
                        xs: "0",
                        sm: "10px",
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Dice
                  </Typography>
                </span>
              </NavLink>
              <NavLink
                to="/crash"
                style={({ isActive }) =>
                  isActive ? activeStyle : nonActiveStyle
                }
              >
                <span style={{ display: "flex" }}>
                  <RocketLaunchIcon
                    sx={{
                      marginRight: {
                        xs: "0",
                        sm: "10px",
                      },
                    }}
                  />
                  <Typography
                    color="inherit"
                    sx={{
                      display: {
                        xs: "none",
                        sm: "block",
                      },
                    }}
                  >
                    Crash
                  </Typography>
                </span>
              </NavLink>
            </Box>

            {props.auth.isAuthenticated && (
              <>
                <Box
                  sx={{
                    marginLeft: {
                      xs: "5px",
                      sm: "10px",
                      md: "40px",
                    },
                  }}
                >
                  <Box
                    onClick={(e) => {
                      setAnchorEl(e.currentTarget);

                      setOpenCoinsMenu(true);
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <img src="/bnb.png" width={40} height={40} alt="bnb" />

                      <div style={{ marginLeft: 10 }}>
                        <p
                          style={{
                            color: "gray",
                            display: "flex",
                            marginBottom: 0,
                          }}
                        >
                          {selectedCoin} <ArrowDropDown />
                        </p>
                        <p style={{ fontWeight: 700, marginTop: 0 }}>
                          {Number(props.auth.balance).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Box>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    open={Boolean(openCoinsMenu)}
                    onClose={() => setOpenCoinsMenu(!openCoinsMenu)}
                  >
                    <MenuItem
                      onClick={() => {
                        setSelectedCoin("BNB");
                        setOpenCoinsMenu(false);
                      }}
                    >
                      <img
                        src="/bnb.png"
                        width={40}
                        height={40}
                        alt="bnb"
                        style={{
                          marginRight: 10,
                        }}
                      />
                      BNB
                    </MenuItem>
                  </Menu>
                </Box>

                <div
                  onClick={() => {
                    setOpenModal(true);
                    setOpenModalFor("wallet");
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 20,
                    background: "blueviolet",
                    padding: 10,
                    borderRadius: 10,
                    cursor: "pointer",
                  }}
                >
                  <AccountBalanceWalletIcon />
                  <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                    <p style={{ margin: "0 0 0 10px" }}>Wallet</p>
                  </Box>
                </div>
              </>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <div style={{ display: "flex" }}>
              {props.auth.isAuthenticated ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Logout">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="User"
                          src={props.auth.user.picture}
                          style={{ marginRight: 20 }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key={"logout"}
                        onClick={() => {
                          logout();
                          handleCloseUserMenu();
                        }}
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Typography>{props.auth.user.full_name}</Typography>
                  </Box>
                </span>
              ) : (
                <div style={{ padding: 10 }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      setOpenModal(true);
                      setOpenModalFor("login");
                    }}
                  >
                    <Typography>Sign in</Typography>
                  </IconButton>
                  {/* <IconButton
                    size="large"
                    style={{
                      marginRight: 10,
                    }}
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={() => {
                      setOpenModal(true);
                      setOpenModalFor("signup");
                    }}
                  >
                    <Typography>Sign up</Typography>
                  </IconButton> */}
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <TransitionsModal
          open={openModal}
          setOpen={setOpenModal}
          for={openModalFor}
          setFor={setOpenModalFor}
        />
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps, { logout, login })(Header);
