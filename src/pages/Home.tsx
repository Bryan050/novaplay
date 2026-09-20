import VideoCard from "../components/Card/VideoCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PromoNative from "../components/Ads/Promo/PromoNative";
import Sidebar, { countryCategories } from "../components/Sidebar/Sidebar";
import styles from "./home.module.css";
import React, { useEffect, useRef, useState } from "react";
import AdCard from "../components/Card/AdCard";
import PromoCard from "../components/Ads/Promo/PromoCard";
import PromoBannerWide from "../components/Ads/Promo/PromoBannerWide";
import PromoBannerBox from "../components/Ads/Promo/PromoBannerBox";
import { Video } from "../models/Video";
import {
  listHomeVideos as list,
  listVideosByTag as listByTag,
  searchVideos as search,
} from "../api/index";
import spinner from "../assets/spinner.svg";
import Pagination from "../components/Pagination/Pagination";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { capitalize, getSearchUrlParams } from "../components/utils/utils";
import { genreLabelBySlug } from "../data/genres";
export const getPathnameComponents = () => {
  let pathnameSplit = location.pathname.split("/");
  const regex = /\/\d+$/;
  pathnameSplit =
    pathnameSplit[pathnameSplit.length - 1].length == 0
      ? pathnameSplit.slice(2)
      : pathnameSplit.slice(1);
  !location.pathname.match(regex) && pathnameSplit.push("/1");
  return pathnameSplit;
};

const Home = () => {
  const adPattern = [6, 8, 5, 10, 5];
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [enoughtVideoLength, setEnoughtVideoLength] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [pageRangeDisplayed, setPageRangeDisplayed] = useState<number>(8);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [selectedNacionality, setSelectedNacionality] =
    useState<string>("Destacados");
  const [searchTerm, setSearchTerm] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef(0);
  useEffect(() => {
    const pathnameComponents = getPathnameComponents();
    const searchUrlParams = getSearchUrlParams();
    const searchTerm = searchUrlParams.searchTerm;
    if (searchTerm) {
      searchVideos(searchTerm);
      setSearchTerm(searchTerm);
      pathnameComponents.length !== 1 &&
        navigate(`/?st=${encodeURIComponent(searchTerm)}`);
      return;
    }
    switch (pathnameComponents.length) {
      case 1:
        listHomeVideos();
        setSelectedNacionality("Destacados");
        setSearchTerm(undefined);
        break;
      case 2:
        let nacionality = pathnameComponents[0];
        setSelectedNacionality(nacionality);
        let tag = countryCategories.find(
          (item) => item.label.toLocaleLowerCase() == nacionality
        )?.tag as string;
        listVideoByTag(tag);
        break;
      default:
        listHomeVideos();
        break;
    }
  }, [location.pathname, location.search]);

  useEffect(() => {
    handleResize();
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 520) {
      setPageRangeDisplayed(3);
    } else {
      setPageRangeDisplayed(8);
    }
  };
  const listHomeVideos = async () => {
    const urlPage = getPageFromURL();
    const searchUrlParams = getSearchUrlParams();
    setLoading(true);
    setSelectedCategory(capitalize(searchUrlParams.category as string, "-"));
    try {
      let response = await list(urlPage, searchUrlParams.category);
      setEnoughtVideoLength(adPattern[0] <= response.data.videos.length);
      setVideoList(response.data.videos || []);
      setPageCount((value) => {
        return response.data.pagination.pageCount || value;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPage(urlPage);
    }
  };
  const listVideoByTag = async (tag: string) => {
    const urlPage = getPageFromURL();
    const pathname = `/tag/${tag}`;
    const searchUrlParams = getSearchUrlParams();
    setSelectedCategory(capitalize(searchUrlParams.category as string, "-"));
    setLoading(true);
    try {
      let response = await listByTag(
        pathname,
        urlPage,
        searchUrlParams.category
      );
      setEnoughtVideoLength(adPattern[0] <= response.data.videos.length);
      setVideoList(response.data.videos);
      setPageCount((value) => {
        return response.data.pagination.pageCount || value;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPage(urlPage);
    }
  };
  const searchVideos = async (searchTerm: string) => {
    const urlPage = getPageFromURL();
    const searchUrlParams = getSearchUrlParams();
    setSelectedCategory(capitalize(searchUrlParams.category as string, "-"));
    setLoading(true);
    try {
      let response = await search(searchTerm, urlPage);
      setEnoughtVideoLength(adPattern[0] <= response.data.videos.length);
      setVideoList(response.data.videos);
      setPageCount((value) => {
        return response.data.pagination.pageCount || value;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setPage(urlPage);
    }
  };
  const getPageFromURL = (): number => {
    const pathname = location.pathname;
    const pathnameSplit = pathname.split("/");
    return parseInt(pathnameSplit[pathnameSplit.length - 1]) || 1;
  };
  const listVideos = () => {
    let adPatterIndex = 0;
    let adCounter = 0;
    return videoList.map((item, index) => {
      let appendAd = false;
      if (index === adPattern[adPatterIndex] + adCounter) {
        appendAd = true;
        adPatterIndex++;
        adCounter = index;
      }
      return (
        <React.Fragment key={index}>
          {index === 3 && <PromoCard />}
          <VideoCard
            urlImg={item?.url_image as string}
            urlVideo={`/video${item?.url_path}?o=${item.origin}`}
            title={item.title}
            duration={item.duration as string}
            views={item.views}
          />
          {enoughtVideoLength && appendAd && <AdCard/>}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles.container}>
      <Header
        className={styles.header}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        pageRef={pageRef}
      />
      <Sidebar
        className={`${styles.sidebar}`}
        mobileMode={showMenu}
        setMobileMode={setShowMenu}
        pageRef={pageRef}
      />

      <>
        {loading ? (
          <div className={styles["loader-container"]}>
            <img src={spinner} alt="Cargando contenido" width={50} height={50} />
          </div>
        ) : (
          <main className={styles.main}>
            <div
              className={`${styles["ads-top"]} ${styles["hide-on-desktop"]}`}
            >
              <PromoBannerWide />
              <PromoBannerBox />
            </div>
            <h1 style={{ display: "none" }}>
              NovaPlay — Descubre películas: tendencias, géneros y búsqueda (datos de TMDB)
            </h1>
            <h2 className={styles["page-title"]}>
              {`${
                capitalize(searchTerm as string) ||
                capitalize(selectedNacionality) +
                  " " +
                  (genreLabelBySlug(getSearchUrlParams().category) ||
                    capitalize(selectedCategory as string))
              }`}{" "}
              Películas
            </h2>
            {videoList.length !== 0 ? (
              <>
                <div className={styles["video-container"]}>{listVideos()}</div>{" "}
                <div className={styles["pagination-container"]}>
                  <Pagination
                    onPageChange={() => {}}
                    pageCount={pageCount}
                    pageRangeDisplayed={pageRangeDisplayed}
                    selectedPage={page}
                    setSelectedPage={setPage}
                    previousLabel={<IoIosArrowBack size={20} />}
                    nextLabel={<IoIosArrowForward size={20} />}
                  />
                </div>
              </>
            ) : (
              <div className={styles["search-not-found-container"]}>
                <p>No se encontraron películas con esta búsqueda.</p>
              </div>
            )}
            <PromoNative className={styles["ads-native-banner"]} />
            <Footer className={styles.footer} />
          </main>
        )}
      </>
    </div>
  );
};

export default Home;
