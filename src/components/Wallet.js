import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import { ArrowDropDown } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
function Wallet(props) {
  const [openCoinsMenu, setOpenCoinsMenu] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [anchorEl, setAnchorEl] = useState(null);

  return (
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
      <div style={{margin:'40px 0'}}>
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
                {selectedCoin === "BTC" ? (
                  <img
                    src="/bitcoinIcon.png"
                    width={20}
                    height={20}
                    alt="bitcoin"
                  />
                ) : selectedCoin === "ETH" ? (
                  <img
                    src="/ethereumIcon.png"
                    width={20}
                    height={20}
                    alt="Ethereum"
                  />
                ) : selectedCoin === "Polygon" ? (
                  <img
                    src="/polygonIcon.png"
                    width={20}
                    height={20}
                    alt="Polygon"
                  />
                ) : (
                  <img src="/USDTIcon.png" width={20} height={20} alt="USDT" />
                )}

                <div style={{ marginLeft: 10 }}>
                  <p
                    style={{
                      color: "gray",
                      display: "flex",
                    }}
                  >
                    {selectedCoin} <ArrowDropDown />
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
                  setSelectedCoin("BTC");
                  setOpenCoinsMenu(false);
                }}
              >
                <img
                  src="/bitcoinIcon.png"
                  width={20}
                  height={20}
                  alt="bitcoin"
                  style={{
                    marginRight: 10,
                  }}
                />
                BTC
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedCoin("ETH");
                  setOpenCoinsMenu(false);
                }}
              >
                <img
                  src="/ethereumIcon.png"
                  width={20}
                  height={20}
                  alt="Ethereum"
                  style={{ marginRight: 10 }}
                />{" "}
                ETH
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedCoin("Polygon");
                  setOpenCoinsMenu(false);
                }}
              >
                <img
                  src="/polygonIcon.png"
                  width={20}
                  height={20}
                  alt="Polygon"
                  style={{ marginRight: 10 }}
                />{" "}
                Polygon
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setSelectedCoin("USDT");
                  setOpenCoinsMenu(false);
                }}
              >
                <img
                  src="/USDTIcon.png"
                  width={20}
                  height={20}
                  style={{ marginRight: 10 }}
                  alt="USDT"
                />
                USDT
              </MenuItem>
            </Menu>
          </div>

          <div>
            <input style={{ color: "white", marginRight: 30,border:'none',margin:'auto 0' }} placeholder="0.0000" />
          </div>
        </div>
      </div>

      <button
        onClick={() => {}}
        style={{
          display: "flex",
          alignItems: "center",
          margin: "30px auto",
          background: "blueviolet",
          padding: "5px 50px",
          borderRadius: 10,
          cursor: "pointer",
          border:'none',
          color:'white'
        }}
      >
        <p style={{ padding:'10 40px' }}>Deposit</p>
      </button>
    </div>
  );
}

export default Wallet;
