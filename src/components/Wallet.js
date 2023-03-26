import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { ArrowDropDown } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { connect } from "react-redux";
import QRCode from "qrcode.react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { addTransaction } from "../redux/actions/authActions";
function Wallet(props) {
  const [openDepositCoinsMenu, setOpenDepositCoinsMenu] = useState(false);
  const [openWithdrawCoinsMenu, setOpenWithdrawCoinsMenu] = useState(false);

  const [selectedDepositCoin, setSelectedDepositCoin] = useState("BNB");
  const [selectedWithdrawCoin, setSelectedWithdrawCoin] = useState("BNB");
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [action, setAction] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    deposit(props.auth.user.wallet_address);
  }, []);

  function checkBlock(blockNumber) {
    props.auth.user.transactions.forEach((tx) => {
      if (tx.block_number === blockNumber) {
        return false;
      }
    });
    return true;
  }

  function deposit(wallet_address) {
    const apiUrl = "https://api.bscscan.com/api";
    const apiKey = "S862SKZT5GTFNF32WU87IYVES9G921SK9Y";
    const address = wallet_address;
    const startBlock = 0;
    const endBlock = 99999999;
    const page = 1;
    const offset = 10;
    const sort = "asc";

    const url = `${apiUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${offset}&sort=${sort}&apikey=${apiKey}`;

    fetch(url)
      .then((response) => {
        console.log(response);
        response.json().then((data) => {
          data.result.length !== 0 &&
            data.result.forEach((tx) => {
              console.log(checkBlock(tx.blockNumber));
              if (checkBlock(tx.blockNumber)) {
                if (tx.from !== wallet_address && tx.to === wallet_address) {
                  props.addTransaction(
                    props.auth.user._id,
                    tx.value,
                    tx.blockNumber
                  );
                  console.log(
                    `Block Number: ${tx.blockNumber}, Value: ${
                      tx.value / 1e18
                    } `
                  );
                }
              }

              // You can access any other properties of the transaction object using tx.propertyName
            });
        });
        // const transactions = response.data.result;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div style={{ margin: 30 }}>
      {action === "" ? (
        <>
          <button
            onClick={() => {
              setAction("deposit");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              background: "#50940f",
              padding: "20px 50px",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              color: "white",
              width: "-webkit-fill-available",
            }}
          >
            <p
              style={{
                padding: "10 40px",
                fontSize: 18,
                fontWeight: 500,
                margin: "auto",
              }}
            >
              Deposit
            </p>
          </button>
          <button
            onClick={() => {
              setAction("withdraw");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              background: "#5b2290",
              padding: "20px 50px",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              color: "white",
              width: "-webkit-fill-available",
            }}
          >
            <p
              style={{
                padding: "10 40px",
                fontSize: 18,
                fontWeight: 500,
                margin: "auto",
              }}
            >
              Withdraw
            </p>
          </button>
        </>
      ) : action === "deposit" ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <p style={{ margin: 0 }}>Wallet</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p style={{ margin: "0 10px 0 0" }}>Transactions</p>
              <CloseIcon
                style={{ cursor: "pointer" }}
                onClick={() => props.close()}
              />
              {/* material ui cross icon */}
            </div>
          </div>
          <div style={{ margin: "40px 0" }}>
            <div style={{ margin: "10px 0" }}>
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
                    Deposit Currency
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
                    Record
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "2px solid gray",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginLeft: 40 }}>
                <Box
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setOpenDepositCoinsMenu(true);
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img src="/bnb.png" width={40} height={40} alt="BNB" />

                    <div style={{ marginLeft: 10 }}>
                      <p
                        style={{
                          color: "gray",
                          display: "flex",
                        }}
                      >
                        {selectedDepositCoin} <ArrowDropDown />
                      </p>
                    </div>
                  </div>
                </Box>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(openDepositCoinsMenu)}
                  onClose={() => setOpenDepositCoinsMenu(!openDepositCoinsMenu)}
                >
                  <MenuItem
                    onClick={() => {
                      setSelectedDepositCoin("BTC");
                      setOpenDepositCoinsMenu(false);
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
              </div>

              <div style={{ display: "flex" }}>
                <input
                  style={{
                    color: "white",
                    marginRight: 30,
                    border: "none",
                    margin: "auto 0",
                    background: "black",
                  }}
                  value={props.auth.balance}
                  placeholder="0.0000"
                />
              </div>
            </div>
          </div>
          <h1 style={{ color: "white", textAlign: "center" }}>BNB - Deposit</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <QRCode value={props.auth.user.wallet_address} />
          </div>
          <p
            style={{
              color: "white",
              fontStyle: "italic",
              margin: "10px 0 0 0",
              display: "flex",
            }}
          >
            Your Address: {props.auth.user.wallet_address}
            <ContentCopyIcon
              style={{ cursor: "pointer", marginLeft: 10 }}
              onClick={() =>
                navigator.clipboard.writeText(props.auth.user.wallet_address)
              }
            />
          </p>
          <p
            style={{
              color: "white",
              fontStyle: "italic",
              margin: "10px 0 0 0",
            }}
          >
            Remember: It supports only BEP20 binanace smart chain
          </p>
          {/* <button
          onClick={() => {}}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px auto",
            background: depositAmount === 0 ? "gray" : "blueviolet",

            padding: "5px 50px",
            borderRadius: 10,
            cursor: "pointer",
            border: "none",
            color: "white",
          }}
          disabled={depositAmount === 0}
        >
          <p style={{ padding: "10 40px" }}>Deposit</p>
        </button> */}
        </div>
      ) : (
        <>
          <div style={{ margin: "40px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
              }}
            >
              <p style={{ margin: 0 }}>Wallet</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ margin: "0 10px 0 0" }}>Transactions</p>
                <CloseIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => props.close()}
                />
                {/* material ui cross icon */}
              </div>
            </div>
            <div style={{ margin: "10px 0" }}>
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
                    Withdraw Currency
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
                    Record
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "2px solid gray",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ marginLeft: 40 }}>
                <Box
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget);
                    setOpenWithdrawCoinsMenu(true);
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
                        }}
                      >
                        {selectedWithdrawCoin} <ArrowDropDown />
                      </p>
                    </div>
                  </div>
                </Box>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  open={Boolean(openWithdrawCoinsMenu)}
                  onClose={() =>
                    setOpenWithdrawCoinsMenu(!openWithdrawCoinsMenu)
                  }
                >
                  <MenuItem
                    onClick={() => {
                      setSelectedWithdrawCoin("BTC");
                      setOpenWithdrawCoinsMenu(false);
                    }}
                  >
                    <img
                      src="/bnb.png"
                      width={20}
                      height={20}
                      alt="bnb"
                      style={{
                        marginRight: 10,
                      }}
                    />
                    BNB
                  </MenuItem>
                </Menu>
              </div>

              <div style={{ display: "flex" }}>
                <input
                  style={{
                    color: "white",
                    marginRight: 30,
                    border: "none",
                    margin: "auto 0",
                    background: "black",
                  }}
                  placeholder="0.0000"
                  value={withdrawAmount}
                  onChange={(e) => {
                    if (e.target.value < props.auth.user.balance) {
                      setWithdrawAmount(e.target.value);
                    } else {
                      alert("insufficient Balance")
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ margin: "10px 0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: ".875rem",
                    fontWeight: 400,
                    height: "1rem",
                    color: "gray",
                  }}
                >
                  Your BNB Address
                </p>
              </div>
              <div>
                <p style={{ color: "white", margin: "5px 0 0 0" }}>
                  Total Balance: {props.auth.balance}
                </p>
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <input
                style={{
                  color: "white",
                  marginRight: 30,
                  border: "2px solid gray",
                  margin: "auto 0",
                  background: "black",
                  width: "-webkit-fill-available",
                  padding: 20,
                }}
                placeholder="0x000"
                value={withdrawAddress}
                onChange={(e) => {
                  setWithdrawAddress(e.target.value);
                }}
              />
            </div>
          </div>
          <p
            style={{
              color: "white",
              fontStyle: "italic",
              margin: "10px 0 0 0",
            }}
          >
            Remember: It supports only BEP20 binanace smart chain
          </p>
          <button
            onClick={() => {}}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px auto",
              background: withdrawAmount === 0 ? "gray" : "blueviolet",
              padding: "20px 50px",
              borderRadius: 10,
              cursor: "pointer",
              border: "none",
              color: "white",
            }}
            disabled={withdrawAmount === 0}
          >
            <p style={{ padding: "10 40px", margin: 0 }}>Withdraw</p>
          </button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(mapStateToProps, { addTransaction })(Wallet);
