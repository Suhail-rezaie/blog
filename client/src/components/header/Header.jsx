import "./header.css";
export default function Header() {
  return (
    <div className="header">
      <div className="headertitle">
        <span className="headertitlesm">React & Node</span>
        <span className="headertitlelg">BLOG</span>
      </div>

      <img
        className="headerimg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
