import VideoCard from "../components/Card/VideoCard";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PromoNative from "../components/Ads/Promo/PromoNative";
import styles from "./video-player.module.css";
import adsStyles from "../components/Ads/ads.module.css";
import React, { useEffect, useRef, useState } from "react";
import AdCard from "../components/Card/AdCard";
import PromoBannerWide from "../components/Ads/Promo/PromoBannerWide";
import PromoBannerBox from "../components/Ads/Promo/PromoBannerBox";
import { LuEye } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { VideoDetails } from "../models/Video";
import { getVideoDetails as getDetails } from "../api";
import spinner from "../assets/spinner.svg";
import Sidebar from "../components/Sidebar/Sidebar";

type VideoSectionProps = {
  title: string;
  views: string;
  likes: string;
  urlVideo: string;
  trailerKey?: string;
  overview?: string;
  releaseDate?: string;
  backdrop?: string;
};

const VideoSection: React.FC<VideoSectionProps> = ({
  title,
  views,
  likes,
  urlVideo,
  trailerKey,
  overview,
  releaseDate,
  backdrop,
}) => {
  return (
    <section className={styles["video-section"]}>
      <div className={styles["video-container"]}>
        {trailerKey ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
          />
        ) : backdrop ? (
          <img src={backdrop} alt={title} className={styles.video} />
        ) : (
          <div className={styles.video} />
        )}
        <div className={styles["video-details-container"]}>
          <h2 className={styles["video-title"]}>
            <span>
              {title}
              {releaseDate ? ` (${releaseDate.slice(0, 4)})` : ""}
            </span>
          </h2>
          {overview && <p className={styles["video-overview"]}>{overview}</p>}
          <div className={styles["video-stats"]}>
            <span>
              <LuEye size={16} />
              {views}
            </span>
            <Link to={urlVideo} target="_blank" className={styles["like-stat"]}>
              <AiOutlineLike size={20} />
              {likes}
            </Link>
            <Link
              to={urlVideo}
              target="_blank"
              className={styles["dislike-stat"]}
            >
              <AiOutlineDislike size={20} />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${adsStyles.ad} ${adsStyles["ads-medium"]} ${styles["ads-container"]}`}
      >
        <PromoBannerWide />
        <PromoBannerBox />
      </div>
    </section>
  );
};

const VideoPlayer = () => {
  const adPattern = [4, 8, 5, 10, 5];
  const location = useLocation();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const pageRef = useRef(0);
  const [videoDetails, setVideoDetails] = useState<VideoDetails>({
    video: { title: "", views: "" },
    related: [],
  });
  const [trailerKey, setTrailerKey] = useState<string | undefined>();
  const [enoughtVideoLength, setEnoughtVideoLength] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getVideoDetails();
  }, []);
  const getVideoDetails = async () => {
    try {
      const response = await getDetails(location.search, location.pathname);
      setEnoughtVideoLength(adPattern[0] <= response.data.related.length);
      setVideoDetails(response.data);
      setTrailerKey(response.message || undefined);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const listVideos = () => {
    let adPatterIndex = 0;
    let adCounter = 0;
    return videoDetails?.related.map((item, index) => {
      let appendAd = false;
      if (index === adPattern[adPatterIndex] + adCounter) {
        appendAd = true;
        adPatterIndex++;
        adCounter = index;
      }
      return (
        <React.Fragment key={index}>
          <VideoCard
            urlImg={item.url_image as string}
            urlVideo={`/video${item?.url_path}?o=${item.origin}`}
            title={item.title}
            duration={item?.duration as string}
            views={item.views}
          />
          {enoughtVideoLength && appendAd && <AdCard />}
        </React.Fragment>
      );
    });
  };
  return (
    <>
      <Header
        className={styles.header}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        pageRef={pageRef}
      />
      {showMenu && (
        <Sidebar
          className={`${styles["hide-on-desktop"]}`}
          mobileMode={showMenu}
          setMobileMode={setShowMenu}
          pageRef={pageRef}
        />
      )}
      <main className={styles.main}>
        <div
          className={`${styles["video-ads-top"]} ${styles["hide-on-desktop"]}`}
        >
          <PromoBannerWide />
          <PromoBannerBox />
        </div>
        {
          <VideoSection
            title={videoDetails.video.title}
            likes={videoDetails.video.likes as string}
            urlVideo={videoDetails.video.url_video as string}
            views={videoDetails.video.views as string}
            trailerKey={trailerKey}
            overview={videoDetails.video.overview}
            releaseDate={videoDetails.video.release_date}
            backdrop={videoDetails.video.backdrop_path}
          />
        }
        <div className={`${styles["video-ads-bottom"]}`}>
          <PromoBannerWide />
        </div>
        <section>
          <span className={styles["related-videos-title"]}>Películas relacionadas</span>
          {loading ? (
            <div className={styles["loader-container"]}>
              <img
                src={spinner}
                alt="Cargando contenido"
                width={50}
                height={50}
              />
            </div>
          ) : (
            <div className={styles["related-videos"]}>{listVideos()}</div>
          )}
        </section>
      </main>
      <PromoNative />
      <Footer className={styles.footer} />
    </>
  );
};

export default VideoPlayer;
