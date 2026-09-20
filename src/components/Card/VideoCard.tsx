import React from "react";
import styles from "./video-card.module.css";
import { LuEye } from "react-icons/lu";

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  urlImg: string;
  urlVideo: string;
  title: string;
  views: string;
  duration: string;
}
const VideoCard: React.FC<VideoCardProps> = ({
  urlImg,
  urlVideo,
  title,
  views,
  duration,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles["video-card"]} ${className}`} {...props}>
      <a className={styles["video-card-link"]} href={urlVideo}>
        <div className={styles["thumbnail-container"]}>
          <img
            className={styles.thumbnail}
            src={urlImg}
            alt="Video thumbnail"
          />
          <span className={styles.duration}>{duration}</span>
        </div>
        <div className={styles["video-card-details"]}>
          <span className={styles.title} title={title}>{title}</span>
          <span className={styles.views}>
            <LuEye size={16} />
            {views}
          </span>
        </div>
      </a>
    </div>
  );
};

export default VideoCard;
