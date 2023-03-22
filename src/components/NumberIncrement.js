import React, { useState, useEffect } from "react";
import AnimatedNumber from "animated-number-react";
function NumberIncrement(props) {
  useEffect(() => {
    if (props.number !== 0) {
      setNumber(props.number);
    }
  }, [props.number]);
  const [number, setNumber] = useState(0);
  const formatValue = (value) => (
    <div
      style={{
        fontSize: "50px",
        color: "orange",
        textAlign: "center",
        fontWeight: 600,
      }}
    >
      {value.toFixed(2)} x
    </div>
  );
  return (
    <AnimatedNumber
      value={number}
      formatValue={formatValue}
      duration={8000}
      complete={() => {
        console.log("number", number);
        if (number !== 0) {
          props.setCrash(true);
        }
      }}
    />
  );
}

export default NumberIncrement;
