import React from "react";
import "./SidebarOption.css";

function SidebarOption({ text, Icon, active }) {
    return (
        <div className={`sidebarOption  ${active && "sidebarOption--active"}`}>
            <Icon />
            <h2 className="gradient-text"> <span className={`${active  && "span--active"}`}>{text}</span>
            </h2>
        </div>
    );
}

export default SidebarOption;