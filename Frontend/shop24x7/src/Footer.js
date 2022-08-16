import React from "react";

function Footer() {
  return (
    <footer className="bg-light">
      <div className="text-center p-2">
        Copyright: &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
export default Footer;
