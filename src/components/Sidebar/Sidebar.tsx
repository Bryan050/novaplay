import styles from "./sidebar.module.css";
import coFlag from "../../assets/flags/co.svg";
import arFlag from "../../assets/flags/ar.svg";
import brFlag from "../../assets/flags/br.svg";
import veFlag from "../../assets/flags/ve.svg";
import mxFlag from "../../assets/flags/mx.svg";
import { Link, useNavigate } from "react-router-dom";
import { getPathnameComponents } from "../../pages/Home";
import { useState } from "react";
import ButtonIcon from "../Button/ButtonIcon";
import { RxCross2 } from "react-icons/rx";
import { GENRES } from "../../data/genres";

const categories = GENRES.map((g) => ({ label: g.label, slug: g.slug }));

export const countryCategories = [
  {
    label: "Colombia",
    icon: coFlag,
    alt: "Bandera de Colombia",
    tag: "CO",
  },
  {
    label: "Argentina",
    icon: arFlag,
    alt: "Bandera de Argentina",
    tag: "AR",
  },
  {
    label: "Brasil",
    icon: brFlag,
    alt: "Bandera de Brasil",
    tag: "BR",
  },
  {
    label: "Venezuela",
    icon: veFlag,
    alt: "Bandera de Venezuela",
    tag: "VE",
  },
  {
    label: "México",
    icon: mxFlag,
    alt: "Bandera de México",
    tag: "MX",
  },
];

const getDefaultChecked = () => {
  const pathnameComponents = getPathnameComponents();
  switch (pathnameComponents.length) {
    case 1:
      return "all";
    case 2:
      const nacionality = pathnameComponents[0];
      let countryExists = countryCategories.some(
        (country) =>
          country.label.toLocaleLowerCase() === nacionality.toLocaleLowerCase()
      );
      return countryExists ? nacionality : "all";
    default:
      return "all";
  }
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  mobileMode?: boolean;
  setMobileMode?: Function;
  pageRef: React.RefObject<number>;
}
const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  mobileMode = false,
  setMobileMode,
  pageRef,
  ...props
}) => {
  const navigate = useNavigate();
  const [defaultChecked, _] = useState<string>(getDefaultChecked());
  const getCategoryPath = (slug: string) => {
    const regex = /\/\d+$/;
    const pathname = location.pathname.includes("/video/")
      ? "/"
      : location.pathname.replace(regex, "");
    return `${pathname}?c=${slug}`;
  };
  const listCategories = () => {
    return categories.map((item, index) => {
      return (
        <li key={index}>
          <Link
            to={getCategoryPath(item.slug)}
            onClick={() => {
              window.scrollTo(0, 0);
              document.body.style.overflow = "scroll";
              mobileMode && setMobileMode && setMobileMode(false);
            }}
          >
            {item.label}
          </Link>
        </li>
      );
    });
  };

  const listCountryCategories = () => {
    return countryCategories.map((item, index) => {
      const value = item.label.toLocaleLowerCase();
      return (
        <span key={index} className={styles["icon-radio-option"]}>
          <input
            defaultChecked={defaultChecked == item.label.toLocaleLowerCase()}
            type="radio"
            onChange={() => {
              window.scrollTo(0, 0);
              document.body.style.overflow = "scroll";
              navigate(`/${item.label.toLowerCase()}`);
              mobileMode && setMobileMode && setMobileMode(false);
            }}
            name="country"
            id={value}
            value={value}
          />
          <label htmlFor={value}>
            <span>{item.label}</span>
            <img width={21} height={16} src={item.icon} alt={item.alt} />
          </label>
        </span>
      );
    });
  };
  return (
    <nav
      className={`${styles.sidebar} ${
        mobileMode ? styles["mobile-mode"] : styles["hide-on-mobile"]
      }`}
      {...props}
    >
      {mobileMode && (
        <div className={styles["mobile-menu-top"]}>
          <ButtonIcon
            className={styles["mobile-menu-close-button"]}
            onClick={() => {
              window.scrollTo(0, pageRef.current);
              document.body.style.overflow = "scroll";
              setMobileMode && setMobileMode(false);
            }}
          >
            <RxCross2 color="white" size={38} />
          </ButtonIcon>
        </div>
      )}
      <h2 className={styles.subtitle}>Explorar por país</h2>
      <div className={styles["nav-options-container"]}>
        <span className={styles["icon-radio-option"]}>
          <input
            type="radio"
            id="all"
            name="country"
            value="all"
            defaultChecked={defaultChecked == "all"}
            onClick={() => {
              navigate("/");
              mobileMode && setMobileMode && setMobileMode(false);
            }}
          />
          <label htmlFor="all">
            <span>Todo</span>
          </label>
        </span>
        {listCountryCategories()}
      </div>
      <div className={styles["nav-options-container"]}>
        <h2 className={styles.subtitle}>Géneros</h2>
        <ul className={styles.categories}>{listCategories()}</ul>
      </div>
    </nav>
  );
};

export default Sidebar;
