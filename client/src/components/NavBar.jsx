// the dropdown nav that is on all pages so user can jump around to where they want
/*
1.make navbar
  - Icon
  - list of nav places
2. make function for when nav icon/button is clicked it shows the dropdown list
  - when click do this
  - add classlist?
  -make nav list hidden and when icon is cliked add classname that shows it 
3. sidebar: when navbar-content has show class add styling
 */
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import NavIcon from '../images/nav_icon.png';

function NavBar() {

    const showNav = () => {
        const navContent = document.querySelector(".navbar-content");
        const navBar = document.querySelector(".navbar");

        navContent.classList.toggle("show");
        
        if ( navContent.classList.contains("show") ) {
            navBar.classList.add("sidebar");
        } else {
            navBar.classList.remove("sidebar");
        }    
    }


    return (
        <div className='navbar'>
            <div onClick={showNav} className='dropbtn'>
            <img src={NavIcon} alt="Nav-Icon" width="50" height="56"/>
            </div>
            <div id="myDropdown" className='navbar-content'>
                <Link className="nav-link" to="/discover">Discover</Link>
                <Link className="nav-link" to="/profile">Profile</Link>
                <Link className="nav-link" to="/rankings">Rankings</Link>
                <Link className="nav-link" to="/recommended">Recommended</Link>                
            </div>
        </div>
    )
}

export default NavBar;