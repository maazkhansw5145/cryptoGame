import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import CloseIcon from "@mui/icons-material/Close";
import HttpsIcon from "@mui/icons-material/Https";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Slider, Box } from "@mui/material";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import "./dice.css";
import TextField from "@mui/material/TextField";
import TransitionsModal from "../components/TransitionModal";
import { addGame } from "../redux/actions/authActions";
function ClassicDice(props) {
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
  const [rollNumber, setRollNumber] = useState(50);
  const [numberGenerated, setNumberGenerated] = useState(50);
  const [winAmount, setWinAmount] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const [openModalFor, setOpenModalFor] = useState("login");

  function rollDice() {
    const dice = [...document.querySelectorAll(".die_list")];
    dice.forEach((die) => {
      toggleClasses(die);
      die.dataset.roll = getRandomNumber(1, 6);
      let generatedNumber = getRandomNumber(1, 99);
      setNumberGenerated(generatedNumber);
    });
    let result = "lose";
    let a = (amount / 100) * 10;
    let winPercentage = 100 - rollNumber;

    let balanceChange = (a / 100) * winPercentage;
    let newBalance = props.auth.user.balance;
    if (numberGenerated > rollNumber) {
      result = "win";
      newBalance = newBalance + balanceChange;
    } else {
      newBalance = newBalance - balanceChange;
    }
    let win_chances = 100 - rollNumber;
    setTimeout(() => {
      props.addGame(
        props.auth.user._id,
        amount,
        result,
        newBalance,
        "dice",
        win_chances
      );
    }, 1500);
  }

  function toggleClasses(die) {
    die.classList.toggle("odd_roll");
    die.classList.toggle("even_roll");
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <>
      <div
        style={{
          margin: "64px auto 0 auto",
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
            alignItems: "center",
            width: "fit-content",
            marginBottom: 10,
          }}
        >
          <p style={{ color: "rgb(182 182 182)", margin: 0 }}>Casino</p>&nbsp;
          <NavigateNextIcon style={{ color: "rgb(182 182 182)" }} />
          <p
            style={{
              margin: 0,
            }}
          >
            classic dice
          </p>
        </span>
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
                marginBottom: { xs: "10px" },
              }}
            >
              <div style={{ width: "fit-content" }}>
                {/* <div style={{ display: "flex", justifyContent: "center" }}>
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
                        className={{
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
                        border: "none",
                        color: mode === "Auto" ? "white" : "gray",
                        background: mode === "Auto" ? "rgb(40 40 40)" : "black",
                        borderRadius: 5,
                        cursor: "pointer",
                      }}
                      onClick={() => setMode("Auto")}
                    >
                      <div
                        className={{
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
                </div> */}

                <div style={{ marginTop: 30 }}>
                  <div
                    style={{
                      display: "flex",
                      margin: 10,
                      justifyContent: "space-between",
                      alignItems: "center",
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
                        value={amount}
                        variant="standard"
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

                {/* {mode === "Manual" ? ( */}
                <>
                  <div
                    style={{
                      margin: "40px 0",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        margin: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
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
                            margin: 0,
                          }}
                        >
                          Win Amount
                        </p>
                      </div>
                      {/* <div>
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
                      </div> */}
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
                      <div style={{ display: "flex" }}>
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
                          disable={true}
                          variant="standard"
                          type="number"
                          value={winAmount}
                        />
                      </div>

                      <div style={{ display: "flex" }}>
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
                        rollDice();
                      }
                    }}
                  >
                    Bet
                  </button>
                </>

                {/* // ) : (
                //   <>
                //     <div>
                //       <div style={{ margin: "15px 0" }}>
                //         <p
                //           style={{
                //             fontSize: ".875rem",
                //             fontWeight: 400,
                //             alignItems: "center",
                //             height: "1rem",
                //             color: "gray",
                //           }}
                //         >
                //           Number Of Bets
                //         </p>
                //       </div>

                //       <div
                //         style={{
                //           display: "flex",
                //           justifyContent: "space-between",
                //           background: "#161616",
                //           padding: 10,
                //           alignItems: "center",
                //         }}
                //       >
                //         <div>
                //           <input
                //             style={{
                //               fontSize: 16,
                //               color: "white",
                //               outline: "none",
                //               background: "none",
                //               border: "none",
                //             }}
                //             type="number"
                //             value={numberOfBets}
                //             onChange={(e) => setNumberOfBets(e.target.value)}
                //           />
                //         </div>

                //         <div style={{ display: "flex" }}>
                //           <div
                //             style={{
                //               color: "#dedede",
                //               background: "#3c3939",
                //               padding: "5px 8px",
                //               borderRadius: 5,
                //               margin: "0 5px",
                //               fontWeight: 600,
                //               cursor: "pointer",
                //             }}
                //             onClick={() => setNumberOfBets(0)}
                //           >
                //             0
                //           </div>

                //           <div
                //             style={{
                //               color: "#dedede",
                //               background: "#3c3939",
                //               padding: "5px 8px",
                //               borderRadius: 5,
                //               margin: "0 5px",
                //               fontWeight: 600,
                //               cursor: "pointer",
                //             }}
                //             onClick={() => setNumberOfBets(10)}
                //           >
                //             10
                //           </div>
                //           <div
                //             style={{
                //               color: "#dedede",
                //               background: "#3c3939",
                //               padding: "5px 8px",
                //               borderRadius: 5,
                //               margin: "0 5px",
                //               fontWeight: 600,
                //               cursor: "pointer",
                //             }}
                //             onClick={() => setNumberOfBets(100)}
                //           >
                //             100
                //           </div>
                //         </div>
                //       </div>
                //     </div>

                //     <div>
                //       <div style={{ margin: "15px 0" }}>
                //         <p
                //           style={{
                //             fontSize: ".875rem",
                //             fontWeight: 400,
                //             alignItems: "center",
                //             height: "1rem",
                //             color: "gray",
                //           }}
                //         >
                //           On win
                //         </p>
                //       </div>

                //       <div
                //         style={{
                //           display: "flex",
                //           justifyContent: "space-between",
                //           background: "#161616",
                //           padding: 10,
                //           alignItems: "center",
                //         }}
                //       >
                //         <div
                //           style={{
                //             background: "#111111",
                //             padding: "5px 20px",
                //             display: "flex",
                //             marginRight: 20,
                //             borderRadius: 5,
                //             alignItems: "center",
                //           }}
                //         >
                //           <div
                //             style={{
                //               cursor: "pointer",
                //             }}
                //             onClick={() => setLockOnWinInput(!lockOnWinInput)}
                //           >
                //             {lockOnWinInput ? (
                //               <HttpsIcon
                //                 style={{
                //                   color: "cornflowerblue",
                //                   marginRight: 10,
                //                 }}
                //               />
                //             ) : (
                //               <LockOpenIcon
                //                 style={{ color: "lawngreen", marginRight: 10 }}
                //               />
                //             )}
                //           </div>
                //           <div>
                //             <p
                //               style={{
                //                 color: "gray",
                //                 fontSize: 12,
                //               }}
                //             >
                //               Reset
                //             </p>
                //             <p
                //               style={{
                //                 color: "white",
                //                 fontSize: 12,
                //               }}
                //             >
                //               Increased By
                //             </p>
                //           </div>
                //         </div>
                //         <div style={{ width: "40%" }}>
                //           <input
                //             style={{
                //               fontSize: 16,
                //               color: "white",
                //               outline: "none",
                //               background: "none",
                //               border: "none",
                //               width: "80%",
                //             }}
                //             value={onWinPercentage}
                //             type="number"
                //             onChange={(e) => setOnWinPercentage(e.target.value)}
                //             disabled={lockOnWinInput}
                //           />
                //         </div>
                //         <div>
                //           <p style={{ color: "lawngreen" }}>%</p>
                //         </div>
                //       </div>
                //     </div>

                //     <div>
                //       <div style={{ margin: "15px 0" }}>
                //         <p
                //           style={{
                //             fontSize: ".875rem",
                //             fontWeight: 400,
                //             alignItems: "center",
                //             height: "1rem",
                //             color: "gray",
                //           }}
                //         >
                //           Stop on win
                //         </p>
                //       </div>
                //       <div
                //         style={{
                //           display: "flex",
                //           background: "#161616",
                //           padding: 10,
                //           alignItems: "center",
                //         }}
                //       >
                //         <p
                //           style={{
                //             background: "#509c06",
                //             color: "white",
                //             borderRadius: 10,
                //             padding: "1px 4px",
                //             marginRight: 10,
                //             fontSize: 12,
                //           }}
                //         >
                //           Rs
                //         </p>
                //         <input
                //           style={{
                //             fontSize: 16,
                //             color: "white",
                //             outline: "none",
                //             background: "none",
                //             border: "none",
                //           }}
                //           value={stopOnWinAmount}
                //           type="number"
                //           onChange={(e) => setStopOnWinAmount(e.target.value)}
                //         />
                //       </div>
                //     </div>

                //     <div>
                //       <div style={{ margin: "15px 0" }}>
                //         <p
                //           style={{
                //             fontSize: ".875rem",
                //             fontWeight: 400,
                //             alignItems: "center",
                //             height: "1rem",
                //             color: "gray",
                //           }}
                //         >
                //           On Lose
                //         </p>
                //       </div>

                //       <div
                //         style={{
                //           display: "flex",
                //           justifyContent: "space-between",
                //           background: "#161616",
                //           padding: 10,
                //           alignItems: "center",
                //         }}
                //       >
                //         <div
                //           style={{
                //             background: "#111111",
                //             padding: "5px 20px",
                //             display: "flex",
                //             marginRight: 20,
                //             borderRadius: 5,
                //             alignItems: "center",
                //           }}
                //         >
                //           <div
                //             style={{
                //               cursor: "pointer",
                //             }}
                //             onClick={() => setLockOnLoseInput(!lockOnLoseInput)}
                //           >
                //             {lockOnLoseInput ? (
                //               <HttpsIcon
                //                 style={{
                //                   color: "cornflowerblue",
                //                   marginRight: 10,
                //                 }}
                //               />
                //             ) : (
                //               <LockOpenIcon
                //                 style={{ color: "lawngreen", marginRight: 10 }}
                //               />
                //             )}
                //           </div>
                //           <div>
                //             <p
                //               style={{
                //                 color: "gray",
                //                 fontSize: 12,
                //               }}
                //             >
                //               Reset
                //             </p>
                //             <p
                //               style={{
                //                 color: "white",
                //                 fontSize: 12,
                //               }}
                //             >
                //               Increased By
                //             </p>
                //           </div>
                //         </div>
                //         <div style={{ width: "40%" }}>
                //           <input
                //             style={{
                //               fontSize: 16,
                //               color: "white",
                //               outline: "none",
                //               background: "none",
                //               border: "none",
                //               width: "80%",
                //             }}
                //             value={onLosePercentage}
                //             type="number"
                //             onChange={(e) =>
                //               setOnLosePercentage(e.target.value)
                //             }
                //             disabled={lockOnLoseInput}
                //           />
                //         </div>
                //         <div>
                //           <p style={{ color: "lawngreen" }}>%</p>
                //         </div>
                //       </div>
                //     </div>

                //     <div>
                //       <div style={{ margin: "15px 0" }}>
                //         <p
                //           style={{
                //             fontSize: ".875rem",
                //             fontWeight: 400,
                //             alignItems: "center",
                //             height: "1rem",
                //             color: "gray",
                //           }}
                //         >
                //           Stop on lose
                //         </p>
                //       </div>
                //       <div
                //         style={{
                //           display: "flex",
                //           background: "#161616",
                //           padding: 10,
                //           alignItems: "center",
                //         }}
                //       >
                //         <p
                //           style={{
                //             background: "#509c06",
                //             color: "white",
                //             borderRadius: 10,
                //             padding: "1px 4px",
                //             marginRight: 10,
                //             fontSize: 12,
                //           }}
                //         >
                //           Rs
                //         </p>
                //         <input
                //           style={{
                //             fontSize: 16,
                //             color: "white",
                //             outline: "none",
                //             background: "none",
                //             border: "none",
                //           }}
                //           value={stopOnLoseAmount}
                //           type="number"
                //           onChange={(e) => setStopOnLoseAmount(e.target.value)}
                //         />
                //       </div>
                //     </div>

                  
                //     <button
                //       style={{
                //         width: "100%",
                //         display: "flex",
                //         justifyContent: "center",
                //         alignItems: "center",
                //         background:
                //           "linear-gradient(66deg, rgba(255,213,0,1) 0%, rgba(140,253,45,1) 100%)",
                //         border: "none",
                //         color: "black",
                //         fontWeight: 700,
                //         marginTop: 20,
                //         fontSize: 17,
                //         padding: 20,
                //         cursor: "pointer",
                //       }}
                //       onClick={() => {
                //         if (!props.auth.isAuthenticated) {
                //           setOpenModal(true);
                //           setOpenModalFor("login");
                //         } else if (props.auth.balance === 0) {
                //           toast.error("Oops! insufficient balance", {
                //             position: "top-center",
                //             autoClose: 5000,
                //             hideProgressBar: false,
                //             closeOnClick: true,
                //             pauseOnHover: true,
                //             draggable: true,
                //             progress: undefined,
                //             theme: "colored",
                //           });
                //         } else {
                //           rollDice();
                //         }
                //       }}
                //     >
                //       Start Auto Bet
                //     </button>
                //   </>
                // )} */}
              </div>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <hr style={{ margin: "0 10px" }} />
              </Box>
            </Box>

            <div>
              <Box sx={{ display: { md: "flex" } }}>
                <div
                  style={{
                    background: "#161616",
                    padding: "10px 40px",
                    marginRight: 25,
                    textAlign: "center",
                    width: "max-content",
                    margin: "20px auto 0 auto",
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
                    background: "#161616",
                    textAlign: "center",
                    padding: "10px 40px",
                    display: "flex",
                    alignItems: "center",
                    width: "max-content",
                    margin: "20px auto 0 auto",
                  }}
                >
                  <p style={{ color: "darkgray", margin: 8 }}>
                    Game results will be displayed here.
                  </p>
                </div>
              </Box>

              <div style={{ margin: "40px 0" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <p
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: 600,
                      border: "4px solid darkgray",
                      padding: 15,
                      marginLeft: 50,
                    }}
                  >
                    {numberGenerated}
                  </p>
                </div>
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "20px 0",
                  }}
                >
                  <div>
                    <div className="dice">
                      <ol
                        className="die_list odd_roll"
                        data-roll="1"
                        id="die-2"
                      >
                        <li className="die_item" data-side="1">
                          <span className="dot"></span>
                        </li>
                        <li className="die_item" data-side="2">
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </li>
                        <li className="die_item" data-side="3">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </li>
                        <li className="die_item" data-side="4">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </li>
                        <li className="die_item" data-side="5">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </li>
                        <li className="die_item" data-side="6">
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                          <span className="dot"></span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <Slider
                    style={{ width: "80%" }}
                    aria-label="Small"
                    value={rollNumber}
                    valueLabelDisplay="auto"
                    onChange={(e) => {
                      if (
                        Number(e.target.value) > 1 &&
                        Number(e.target.value) < 99
                      ) {
                        let a = (amount / 100) * 10;
                        let winPercentage = 100 - rollNumber;

                        let balanceChange =
                          Number(amount) + (a / 100) * winPercentage;
                        setWinAmount(balanceChange);
                        setRollNumber(Number(e.target.value));
                      }
                    }}
                    marks={[
                      {
                        value: 10,
                        scaledValue: 10,
                        label: "10",
                      },
                      {
                        value: 20,
                        scaledValue: 20,
                        label: "20",
                      },
                      {
                        value: 30,
                        scaledValue: 30,
                        label: "30",
                      },
                      {
                        value: 40,
                        scaledValue: 40,
                        label: "40",
                      },
                      {
                        value: 50,
                        scaledValue: 50,
                        label: "50",
                      },
                      {
                        value: 60,
                        scaledValue: 60,
                        label: "60",
                      },
                      {
                        value: 70,
                        scaledValue: 70,
                        label: "70",
                      },
                      {
                        value: 80,
                        scaledValue: 80,
                        label: "80",
                      },
                      {
                        value: 90,
                        scaledValue: 90,
                        label: "90",
                      },
                      {
                        value: 99,
                        scaledValue: 99,
                        label: "99",
                      },
                    ]}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  margin: "40px 20px",
                  background: "#141313",
                  padding: 15,
                  borderRadius: 15,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ margin: "auto" }}>
                  <p style={{ color: "gray" }}>Payout</p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#0b0b0b",
                      padding: "5px 20px",
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  >
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
                      value={winAmount}
                    />
                    <p style={{ color: "lawngreen", margin: 2 }}>X</p>
                  </div>
                </div>
                <div style={{ margin: "auto" }}>
                  <p style={{ color: "gray" }}>
                    {rollNumber > 50 ? "Roll Over" : "Roll Under"}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "#0b0b0b",
                      padding: "5px 20px",
                      marginTop: 10,
                      borderRadius: 5,
                    }}
                  >
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
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "rgb(20, 19, 19)",
                  padding: 15,
                  borderRadius: 15,
                  marginBottom: 20,
                  margin: "40px 20px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      fontWeight: 400,
                      alignItems: "center",
                      color: "gray",
                    }}
                  >
                    Win Chance
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "rgb(11, 11, 11)",
                    padding: "5px 20px",
                    marginTop: 10,
                    borderRadius: 5,
                  }}
                >
                  <div style={{ display: "flex" }}>
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
                      value={100 - rollNumber}
                      type="number"
                      onChange={(e) => {
                        if (
                          Number(e.target.value) > 1 &&
                          Number(e.target.value) < 99
                        ) {
                          let a = (amount / 100) * 10;
                          let winPercentage = 100 - rollNumber;

                          let balanceChange = (a / 100) * winPercentage;
                          setWinAmount(balanceChange);
                          setRollNumber(100 - Number(e.target.value));
                        } else if (e.target.value === "") {
                          setRollNumber(99);
                        }
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "#dedede",
                        background: "rgb(24 23 23)",
                        padding: "5px 8px",
                        borderRadius: 5,
                        margin: "0 5px",
                        fontWeight: 600,

                        fontSize: 16,
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => setRollNumber(99)}
                      disabled={rollNumber < 1}
                    >
                      min
                    </span>

                    <button
                      style={{
                        color: "#dedede",
                        background: "rgb(24 23 23)",
                        padding: "5px 8px",
                        borderRadius: 5,
                        marginRight: 5,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontSize: 16,
                        border: "none",
                      }}
                      onClick={() => setRollNumber(rollNumber + 5)}
                      disabled={100 - rollNumber < 6}
                    >
                      -5
                    </button>
                    <button
                      style={{
                        color: "#dedede",
                        background: "rgb(24 23 23)",
                        padding: "5px 8px",
                        borderRadius: 5,
                        marginRight: 5,
                        fontWeight: 600,

                        fontSize: 16,
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setRollNumber(rollNumber - 5);
                      }}
                      disabled={100 - rollNumber > 94}
                    >
                      +5
                    </button>

                    <span
                      style={{
                        color: "#dedede",
                        background: "rgb(24 23 23)",
                        padding: "5px 8px",
                        borderRadius: 5,
                        marginRight: 5,
                        fontWeight: 600,

                        fontSize: 16,
                        border: "none",
                        cursor: "pointer",
                      }}
                      disabled={rollNumber > 98}
                      onClick={() => setRollNumber(2)}
                    >
                      max
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <TransitionsModal
        open={openModal}
        setOpen={setOpenModal}
        for={openModalFor}
        setFor={setOpenModalFor}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps, { addGame })(ClassicDice);
