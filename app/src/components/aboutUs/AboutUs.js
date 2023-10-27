import "./AboutUs.css";

function Footer() {
  return (
    <footer className="about_us_section">
      <div className="about_us_info">
        <span className="policy">Terms · Privacy Policy</span>
        <span className="copyright">
          Copyright &copy; {new Date().getFullYear()}, all rights reserved.
        </span>
        <span className="about_us_link">
          <a href="https://www.linkedin.com/in/yunus1997">About Us</a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
