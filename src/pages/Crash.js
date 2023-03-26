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
import { addGame } from "../redux/actions/authActions";

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
  const [lastThreeGames, setLastThreeGames] = useState([]);

  useEffect(() => {
    if (props.auth.isAuthenticated ) {
      const lastThreeCrashGames = props.auth.user.games
        ? props.auth.user.games
            .slice(-4)
            .filter((game) => game.game === "crash")
        : [];
      setLastThreeGames([...lastThreeCrashGames]);
    }
  }, [props.auth.user]);

  const handleClick = () => {
    if (crash) {
      setCrash(false);
      setMaxNumber(0);
    } else {
      function getRandomNumber() {
        const x = Math.random(); // generate a random number between 0 and 1
        if (x < 0.9) {
          // 90% of the time, generate a random number between 0 and 2
          return Math.random() * 2;
        } else {
          // 10% of the time, generate a random number between 2 and 10
          return 2 + Math.random() * 8;
        }
      }
      let number = 1;
      number = getRandomNumber();
      setMaxNumber(number);
      let result = "win";
      let balanceChange = (amount * 0.1) * number;
      let newBalance = props.auth.user.balance;
      console.log("payout > number", payout > number);
      if (payout > number) {
        newBalance = newBalance - balanceChange;
        result = "lose";
      } else {
        newBalance = newBalance + balanceChange;
      }
      setTimeout(() => {
        props.addGame(
          props.auth.user._id,
          amount,
          result,
          newBalance,
          "crash",
          number
        );
      }, 8000);
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
                  Bankroll BNB
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
                  BNB
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
                {amount}
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
                    background: lastThreeGames[0]
                      ? lastThreeGames[0].result === "win"
                        ? "lawngreen"
                        : "red"
                      : "gray",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    {lastThreeGames[0] ? Number(lastThreeGames[0].amount).toFixed(4) : "N/A"}
                  </p>
                  <p
                    style={{
                      color: "lawngreen",
                      fontSize: 13,
                      margin: 0,
                    }}
                  >
                    {lastThreeGames[0]
                      ? lastThreeGames[0].result === "win"
                        ? Number(lastThreeGames[0].win_chances).toFixed(4)
                        : lastThreeGames[0].amount
                      : "N/A"}
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
                    background: lastThreeGames[1]
                      ? lastThreeGames[1].result === "win"
                        ? "lawngreen"
                        : "red"
                      : "gray",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    {lastThreeGames[1] ? Number(lastThreeGames[1].amount).toFixed(4) : "N/A"}
                  </p>
                  <p style={{ color: "lawngreen", fontSize: 13, margin: 0 }}>
                    {lastThreeGames[1]
                      ? lastThreeGames[1].result === "win"
                        ? Number(lastThreeGames[1].win_chances).toFixed(4)
                        : lastThreeGames[1].amount
                      : "N/A"}
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
                    background: lastThreeGames[2]
                      ? lastThreeGames[2].result === "win"
                        ? "lawngreen"
                        : "red"
                      : "gray",
                    borderRadius: 100,
                    width: 13,
                    height: 13,
                    marginRight: 10,
                  }}
                />
                <div>
                  <p style={{ color: "gray", fontSize: 13, margin: 0 }}>
                    {lastThreeGames[2] ? Number(lastThreeGames[2].amount).toFixed(4) : "N/A"}
                  </p>
                  <p style={{ color: "lawngreen", fontSize: 13, margin: 0 }}>
                    {lastThreeGames[2]
                      ? lastThreeGames[2].result === "win"
                        ? Number(lastThreeGames[2].win_chances).toFixed(4)
                        : lastThreeGames[2].amount
                      : "N/A"}
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
                        {props.auth.balance} BNB
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
                        BNB
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
                          Crash Point
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
                    {/* <p
                      style={{
                        fontSize: "50px",
                        color: "#ffbe00",
                        textAlign: "center",
                        fontWeight: 600,
                        margin: "0 20px 0 0",
                      }}
                    >
                      Crash
                    </p> */}
                    <img
                      src="/explosion.gif"
                      width={120}
                      height={120}
                      alt="explosion gif"
                    />
                    {payout > maxNumber ? (
                      <p
                        style={{
                          color: "#f82424",
                          fontSize: 35,
                          fontWeight: 600,
                          margin: 0,
                          background: "rgba(128,128,128,0.7)",
                          padding: "10px 20px",
                          borderRadius: 20,
                        }}
                      >
                        You Lose
                      </p>
                    ) : (
                      <p
                        style={{
                          color: "lawngreen",
                          fontSize: 35,
                          fontWeight: 600,
                          margin: 0,
                          background: "rgba(128,128,128,0.7)",
                          padding: "10px 20px",
                          borderRadius: 20,
                        }}
                      >
                        You Win
                      </p>
                    )}
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

export default connect(mapStateToProps, { addGame })(Crash);
