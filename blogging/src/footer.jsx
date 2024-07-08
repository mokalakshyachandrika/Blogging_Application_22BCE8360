import "./footer.css";

function Footer() {
  return (
    <>
      <div className="mainDiv">
        <p>
          &copy; {new Date().getFullYear} <b>BLOGGING APPLICATION</b>. All
          rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
