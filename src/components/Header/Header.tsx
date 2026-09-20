import styles from "./header.module.css";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { InputSearch } from "../Input";
import ButtonLink from "../Button/ButtonLink";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoSearch } from "react-icons/io5";
import { useRef, useState } from "react";
import ButtonIcon from "../Button/ButtonIcon";
interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  showMenu?: boolean;
  setShowMenu?: Function;
  className?: string;
  pageRef: React.RefObject<number>;
}
const Header: React.FC<HeaderProps> = ({
  className = "",
  showMenu = false,
  setShowMenu,
  pageRef,
  ...props
}) => {
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const navigator = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleSearchFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchValue = (
      form.elements.namedItem("input-search") as HTMLInputElement
    ).value;
    if (searchValue.length < 3) return;
    setShowSearchInput(false);
    searchInputRef.current && (searchInputRef.current.value = "");
    navigator(`/?st=${encodeURIComponent(searchValue.trim())}`);
  };
  return (
    <div className={`${styles.header} ${className}`} {...props}>
      <div className={styles["header-top"]}>
        <div
          className={`${styles["hamburger-menu-container"]} ${
            styles["hide-on-desktop"]
          } ${showSearchInput ? styles.hide : ""}`}
        >
          <ButtonIcon
            onClick={() => {
              pageRef.current = window.scrollY;
              document.body.style.overflow = "hidden";
              setShowMenu && setShowMenu(true);
            }}
          >
            <RxHamburgerMenu color="white" size={38} />
          </ButtonIcon>
          <div className={`${showMenu ? styles["backdrop-menu"] : ""}`}></div>
        </div>
        <Link
          to="/"
          className={`${styles.logo} ${showSearchInput ? styles.hide : ""}`}
        >
          <img height={28} src={logo} alt="NovaPlay logo" />
          <span className={styles["logo-text"]}>
            Nova<span>Play</span>
          </span>
        </Link>
        <form
          onSubmit={handleSearchFormSubmit}
          className={`${styles["input-search-container"]} ${
            showSearchInput ? "" : styles["hide-on-mobile"]
          }`}
        >
          <InputSearch
            className={styles["input-search"]}
            ref={searchInputRef}
            id="input-search"
            autoComplete="off"
            placeholder="Buscar películas..."
          />
          <button
            type="button"
            className={`${styles["hide-on-desktop"]}`}
            onClick={() => setShowSearchInput(false)}
          >
            Cancel
          </button>
        </form>

        <ButtonIcon
          className={`${styles["search-button"]} ${
            showSearchInput ? styles.hide : ""
          } ${styles["hide-on-desktop"]}`}
          onClick={() => {
            setShowSearchInput(true);
            requestAnimationFrame(() => {
              searchInputRef.current?.focus();
            });
          }}
        >
          <IoSearch size={34} color="white" />
        </ButtonIcon>
        <ButtonLink
          className={styles.button}
          to="/?c=accion"
          radius="lg"
        >
          Explorar
        </ButtonLink>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/?c=accion">
              Acción
            </Link>
          </li>
          <li>
            <Link to="/?c=comedia">
              Comedia
            </Link>
          </li>
          <li>
            <Link to="/?c=drama">
              Drama
            </Link>
          </li>
          <li className={`${styles["hide-on-desktop"]}`}>
            <Link
              className={`${styles["highlight-link"]}`}
              to="/?c=terror"
            >
              Terror
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
