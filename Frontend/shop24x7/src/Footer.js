import React from "react";

function Footer() {
  return (
    <div bgcolor="light" className="text-center text-lg-left">
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright: &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}
export default Footer;
