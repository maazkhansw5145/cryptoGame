import React, { useState, useEffect } from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CloseIcon from "@mui/icons-material/Close";
import HttpsIcon from "@mui/icons-material/Https";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Box } from "@mui/system";
import TransitionsModal from "../components/TransitionModal";
import NumberIncrement from "../components/NumberIncrement";
import Lottie from "lottie-react";
import RocketGif from "./rocket.json";
import RocketStandbyGif from "./rocketStandby.json";
import { TextField } from "@mui/material";
function Crash(props) {
  const [mode, setMode] = useState("Manual");
  const [payout, setPayout] = useState("1.98");
  const [amount, setAmount] = useState("0.62342");
  const [numberOfBets, setNumberOfBets] = useState("0");
  const [stopOnWinAmount, setStopOnWinAmount] = useState("0");
  const [stopOnLoseAmount, setStopOnLoseAmount] = useState("0");
  const [lockOnWinInput, setLockOnWinInput] = useState(false);
  const [onWinPercentage, setOnWinPercentage] = useState(0);
  const [lockOnLoseInput, setLockOnLoseInput] = useState(false);
  const [onLosePercentage, setOnLosePercentage] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openModalFor, setOpenModalFor] = useState("login");
  const [maxNumber, setMaxNumber] = useState(0);
  const [crash, setCrash] = useState(false);

  const handleClick = () => {
    if (crash) {
      setCrash(false);
      setMaxNumber(0);
    } else {
      function getRandomNumber() {
        const randomNum = Math.random(); // Generate a random number between 0 and 1
        if (randomNum < 0.9) {
          return Math.floor(Math.random() * 9) + 1; // Generate a number between 1 and 9
        } else {
          return Math.floor(Math.random() * 91) + 9; // Generate a number between 9 and 100
        }
      }
      let number = 1;
      number = getRandomNumber();
      setMaxNumber(number);
    }
  };

  return (
    <>
      <div
        style={{
          marginTop: 64,
          padding: "20px 40px",
          background: "rgb(13 13 13)",
        }}
      >
        <span
          style={{
            padding: "10px 20px",
            background: "#25282a",
            color: "white",
            display: "flex",
            width: "fit-content",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <p style={{ color: "rgb(182 182 182)", margin: 0 }}>Casino</p>&nbsp;
          <NavigateNextIcon style={{ color: "rgb(182 182 182)" }} />
          <p
            style={{
              margin: 0,
            }}
          >
            crash
          </p>
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#161616",
                padding: "10px 40px",

                textAlign: "center",
              }}
            >
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    color: "lawngreen",
                    fontWeight: 600,
                    margin: 0,
                    fontSize: 12,
                  }}
                >
                  Bankroll BTC
                </p>
                &nbsp;
                <p
                  style={{
                    color: "gray",
                    fontWeight: 600,
                    margin: 0,
                    fontSize: 12,
                  }}
                >
                  BTC
                </p>
              </div>
              <p
                style={{
                  color: "white",
                  fontWeight: 700,
                  margin: 0,
                  fontSize: 12,
                }}
              >
                Rs123123123
              </p>
            </div>

            <div
              style={{
                display: "flex",
                background: "#161616",
                padding: "0 15px",

                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "lawngreen",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    5687177
                  </p>
                  <p style={{ color: "lawngreen", fontSize: 13, margin: 0 }}>
                    2.19X
                  </p>
                </div>
              </span>
            </div>
            {/* <Box sx={{ display: { xs: "block", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center" },
                marginBottom: { xs: "30px" },
              }} */}
            {/* > */}
            <div
              style={{
                display: "flex",
                background: "#161616",
                padding: "0 15px",

                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "lawngreen",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    5687177
                  </p>
                  <p style={{ color: "lawngreen", fontSize: 13, margin: 0 }}>
                    2.19X
                  </p>
                </div>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                background: "#161616",
                padding: "0 15px",

                textAlign: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    background: "orange",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    5687177
                  </p>
                  <p style={{ color: "lawngreen", fontSize: 13, margin: 0 }}>
                    2.19X
                  </p>
                </div>
              </span>
            </div>

            <div
              style={{
                display: "flex",
                background: "#161616",
                padding: "0 15px",

                textAlign: "center",
                alignItems: "center",
              }}
            >
              <TrendingUpIcon style={{ color: "gray", marginRight: 10 }} />
              <p
                style={{
                  color: "gray",
                  fontWeight: 700,
                  margin: 0,
                  fontSize: 13,
                }}
              >
                Trends
              </p>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box sx={{ display: { xs: "block", md: "flex" } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "center" },
                marginBottom: { xs: "30px" },
              }}
            >
              <div style={{ width: "fit-content" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ display: "flex" }}>
                    <button
                      style={{
                        padding: "10px 50px",
                        marginRight: 15,
                        color: mode === "Manual" ? "white" : "gray",
                        background:
                          mode === "Manual" ? "rgb(40 40 40)" : "black",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setMode("Manual")}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          cursor: "pointer",
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        Manual
                      </div>
                    </button>
                    <button
                      style={{
                        padding: "10px 50px",
                        color: mode === "Auto" ? "white" : "gray",
                        background: mode === "Auto" ? "rgb(40 40 40)" : "black",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setMode("Auto")}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          cursor: "pointer",
                          fontWeight: 700,
                          textAlign: "center",
                        }}
                      >
                        Auto
                      </div>
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 30 }}>
                  <div
                    style={{
                      display: "flex",
                      margin: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p
                        style={{
                          fontSize: ".875rem",
                          fontWeight: 400,
                          alignItems: "center",
                          height: "1rem",
                          color: "gray",
                        }}
                      >
                        Amount
                      </p>
                      <ErrorOutlineIcon
                        style={{ marginLeft: 10, color: "green" }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 400,
                          alignItems: "center",
                          height: "1rem",
                          color: "gray",
                        }}
                      >
                        0.00000BTC
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      background: "#161616",
                      padding: 10,
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <p
                        style={{
                          background: "#509c06",
                          color: "white",
                          borderRadius: 10,
                          padding: "4px 8px",
                          marginRight: 10,
                          fontSize: 12,
                          margin: "auto 10px auto",
                        }}
                      >
                        Rs
                      </p>
                      <TextField
                        InputProps={{
                          disableUnderline: true,
                          sx: {
                            fontSize: 16,
                            color: "white",
                            outline: "none",
                            background: "none",
                            border: "none",
                          },
                        }}
                        variant="standard"
                        value={amount}
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div style={{ display: "flex" }}>
                      <span
                        style={{
                          color: "#dedede",
                          background: "#3c3939",
                          padding: "5px 8px",
                          borderRadius: 5,
                          margin: "0 5px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setAmount((Number(amount) / 2).toFixed(4))
                        }
                      >
                        /2
                      </span>
                      <span
                        style={{
                          color: "#dedede",
                          background: "#3c3939",
                          padding: "5px 8px",
                          borderRadius: 5,
                          marginRight: 5,
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          setAmount((Number(amount) * 2).toFixed(4))
                        }
                      >
                        x2
                      </span>
                      <SwapVertIcon
                        style={{
                          color: "#dedede",
                          background: "#3c3939",
                          padding: "5px 8px",
                          borderRadius: 5,
                          marginRight: 5,
                          fontWeight: 600,
                          fontSize: 22,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {mode === "Manual" ? (
                  <>
                    <div style={{ margin: "40px 0" }}>
                      <div
                        style={{
                          display: "flex",
                          margin: 10,
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              fontSize: ".875rem",
                              fontWeight: 400,
                              alignItems: "center",
                              height: "1rem",
                              color: "gray",
                            }}
                          >
                            Payout
                          </p>
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: ".875rem",
                              fontWeight: 400,
                              alignItems: "center",
                              height: "1rem",
                              color: "gray",
                            }}
                          >
                            Chance 50.00000%
                          </p>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <TextField
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: 16,
                                color: "white",
                                outline: "none",
                                background: "none",
                                border: "none",
                              },
                            }}
                            variant="standard"
                            type="number"
                            value={payout}
                            onChange={(e) => setPayout(e.target.value)}
                          />
                        </div>

                        <div>
                          <CloseIcon
                            style={{ color: "lawngreen", cursor: "pointer" }}
                            onClick={() => setPayout(0)}
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                          "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
                        border: "none",
                        color: "black",
                        fontWeight: 700,
                        fontSize: 17,
                        padding: 20,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (!props.auth.isAuthenticated) {
                          setOpenModal(true);
                          setOpenModalFor("login");
                        } else if (props.auth.balance === 0) {
                          toast.error("Oops! insufficient balance", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        } else {
                          handleClick();
                        }
                      }}
                    >
                      {crash ? "Play Again!" : "Start Auto Bet"}
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <div style={{ margin: "15px 0" }}>
                        <p
                          style={{
                            fontSize: ".875rem",
                            fontWeight: 400,
                            alignItems: "center",
                            height: "1rem",
                            color: "gray",
                          }}
                        >
                          Number Of Bets
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <TextField
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: 16,
                                color: "white",
                                outline: "none",
                                background: "none",
                                border: "none",
                              },
                            }}
                            variant="standard"
                            type="number"
                            value={numberOfBets}
                            onChange={(e) => setNumberOfBets(e.target.value)}
                          />
                        </div>

                        <div style={{ display: "flex" }}>
                          <div
                            style={{
                              color: "#dedede",
                              background: "#3c3939",
                              padding: "5px 8px",
                              borderRadius: 5,
                              margin: "0 5px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => setNumberOfBets(0)}
                          >
                            0
                          </div>

                          <div
                            style={{
                              color: "#dedede",
                              background: "#3c3939",
                              padding: "5px 8px",
                              borderRadius: 5,
                              margin: "0 5px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => setNumberOfBets(10)}
                          >
                            10
                          </div>
                          <div
                            style={{
                              color: "#dedede",
                              background: "#3c3939",
                              padding: "5px 8px",
                              borderRadius: 5,
                              margin: "0 5px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                            onClick={() => setNumberOfBets(100)}
                          >
                            100
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ margin: "15px 0" }}>
                        <p
                          style={{
                            fontSize: ".875rem",
                            fontWeight: 400,
                            alignItems: "center",
                            height: "1rem",
                            color: "gray",
                          }}
                        >
                          On win
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            background: "#111111",
                            padding: "5px 20px",
                            display: "flex",
                            marginRight: 20,
                            borderRadius: 5,
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => setLockOnWinInput(!lockOnWinInput)}
                          >
                            {lockOnWinInput ? (
                              <HttpsIcon
                                style={{
                                  color: "cornflowerblue",
                                  marginRight: 10,
                                }}
                              />
                            ) : (
                              <LockOpenIcon
                                style={{ color: "lawngreen", marginRight: 10 }}
                              />
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                color: "gray",
                                fontSize: 12,
                              }}
                            >
                              Reset
                            </p>
                            <p
                              style={{
                                color: "white",
                                fontSize: 12,
                              }}
                            >
                              Increased By
                            </p>
                          </div>
                        </div>
                        <div style={{ width: "40%" }}>
                          <TextField
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: 16,
                                color: "white",
                                outline: "none",
                                background: "none",
                                border: "none",
                              },
                            }}
                            variant="standard"
                            value={onWinPercentage}
                            type="number"
                            onChange={(e) => setOnWinPercentage(e.target.value)}
                            disabled={lockOnWinInput}
                          />
                        </div>
                        <div>
                          <p style={{ color: "lawngreen" }}>%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ margin: "15px 0" }}>
                        <p
                          style={{
                            fontSize: ".875rem",
                            fontWeight: 400,
                            alignItems: "center",
                            height: "1rem",
                            color: "gray",
                          }}
                        >
                          Stop on win
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            background: "#509c06",
                            color: "white",
                            borderRadius: 10,
                            padding: "1px 4px",
                            marginRight: 10,
                            fontSize: 12,
                          }}
                        >
                          Rs
                        </p>
                        <TextField
                          InputProps={{
                            disableUnderline: true,
                            sx: {
                              fontSize: 16,
                              color: "white",
                              outline: "none",
                              background: "none",
                              border: "none",
                            },
                          }}
                          variant="standard"
                          value={stopOnWinAmount}
                          type="number"
                          onChange={(e) => setStopOnWinAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <div style={{ margin: "15px 0" }}>
                        <p
                          style={{
                            fontSize: ".875rem",
                            fontWeight: 400,
                            alignItems: "center",
                            height: "1rem",
                            color: "gray",
                          }}
                        >
                          On Lose
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            background: "#111111",
                            padding: "5px 20px",
                            display: "flex",
                            marginRight: 20,
                            borderRadius: 5,
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => setLockOnLoseInput(!lockOnLoseInput)}
                          >
                            {lockOnLoseInput ? (
                              <HttpsIcon
                                style={{
                                  color: "cornflowerblue",
                                  marginRight: 10,
                                }}
                              />
                            ) : (
                              <LockOpenIcon
                                style={{ color: "lawngreen", marginRight: 10 }}
                              />
                            )}
                          </div>
                          <div>
                            <p
                              style={{
                                color: "gray",
                                fontSize: 12,
                              }}
                            >
                              Reset
                            </p>
                            <p
                              style={{
                                color: "white",
                                fontSize: 12,
                              }}
                            >
                              Increased By
                            </p>
                          </div>
                        </div>
                        <div style={{ width: "40%" }}>
                          <TextField
                            InputProps={{
                              disableUnderline: true,
                              sx: {
                                fontSize: 16,
                                color: "white",
                                outline: "none",
                                background: "none",
                                border: "none",
                              },
                            }}
                            variant="standard"
                            value={onLosePercentage}
                            type="number"
                            onChange={(e) =>
                              setOnLosePercentage(e.target.value)
                            }
                            disabled={lockOnLoseInput}
                          />
                        </div>
                        <div>
                          <p style={{ color: "lawngreen" }}>%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ margin: "15px 0" }}>
                        <p
                          style={{
                            fontSize: ".875rem",
                            fontWeight: 400,
                            alignItems: "center",
                            height: "1rem",
                            color: "gray",
                          }}
                        >
                          Stop on lose
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          background: "#161616",
                          padding: 10,
                          alignItems: "center",
                        }}
                      >
                        <p
                          style={{
                            background: "#509c06",
                            color: "white",
                            borderRadius: 10,
                            padding: "1px 4px",
                            marginRight: 10,
                            fontSize: 12,
                          }}
                        >
                          Rs
                        </p>
                        <TextField
                          InputProps={{
                            disableUnderline: true,
                            sx: {
                              fontSize: 16,
                              color: "white",
                              outline: "none",
                              background: "none",
                              border: "none",
                            },
                          }}
                          variant="standard"
                          value={stopOnLoseAmount}
                          type="number"
                          onChange={(e) => setStopOnLoseAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background:
                          "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
                        border: "none",
                        color: "black",
                        fontWeight: 700,
                        marginTop: 20,
                        fontSize: 17,
                        padding: 20,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (!props.auth.isAuthenticated) {
                          setOpenModal(true);
                          setOpenModalFor("login");
                        } else if (props.auth.balance === 0) {
                          toast.error("Oops! insufficient balance", {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                          });
                        } else {
                          handleClick();
                        }
                      }}
                    >
                      {crash ? "Play Again!" : "Start Auto Bet"}
                    </button>
                  </>
                )}
              </div>
            </Box>
            <Box
              sx={{
                marginLeft: {
                  sm: 0,
                  md: 2,
                },
              }}
            >
              <div
                style={{
                  position: "relative",
                  maxWidth: "500px",
                  width: "90vw",
                  height: "430px",
                  backgroundImage: "url(/rocketBackground.png)",
                  backgroundSize: "cover",
                }}
              >
                {!crash ? (
                  <>
                    <NumberIncrement number={maxNumber} setCrash={setCrash} />
                    <div
                      style={{
                        display: "-webkit-inline-box",
                        marginTop: 60,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "45%",
                          left: "50%",
                          transform: "translate(-50%, -0%)",
                          textAlign: "center",
                        }}
                      >
                        <Lottie
                          animationData={
                            maxNumber === 0 ? RocketStandbyGif : RocketGif
                          }
                          loop={true}
                          style={{
                            width: 250,
                            height: 250,
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      top: "45%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "50px",
                        color: "#ffbe00",
                        textAlign: "center",
                        fontWeight: 600,
                        margin: "0 20px 0 0",
                      }}
                    >
                      Crash
                    </p>
                    <img
                      src="/explosion.gif"
                      width={120}
                      height={120}
                      alt="explosion gif"
                    />
                  </div>
                )}
              </div>
            </Box>
          </Box>
        </div>
        <TransitionsModal
          open={openModal}
          setOpen={setOpenModal}
          for={openModalFor}
          setFor={setOpenModalFor}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps)(Crash);
