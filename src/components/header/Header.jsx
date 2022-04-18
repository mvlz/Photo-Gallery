import SearchBox from "../searchBox/SearchBox";
import "./Header.css";
const Header = ({ searchVal, setSearchVal }) => {
  function changeHandler(e) {
    setSearchVal(e.target.value);
  }
  return (
    <div>
      <header className="header">
        <div className="logo">
          <div className="logo-img">
            <img
              src="https://www.freepnglogos.com/uploads/pinterest-logo-p-png-0.png"
              alt="Pinterest logo"
            />
          </div>
          <h2>Pinterest</h2>
        </div>
        <SearchBox searchVal={searchVal} changeHandler={changeHandler} />
        <ul className="menu">
          <li>
            <a href="">
              <h3>Github</h3>
            </a>
          </li>
          <li>
            <a href="">
              <h3>Docs</h3>
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
