import React from "react";
import "./style.css";
import CloseIcon from "@mui/icons-material/Close";

const PopUpComponent = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="close-btn" onClick={() => props.setTrigger(false)}>
          <CloseIcon />
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopUpComponent;
