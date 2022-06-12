import { useVideo, useAVToggle } from "@100mslive/react-sdk";
import styles from "./Peer.module.css";
import { BiMicrophone, BiMicrophoneOff } from "../../icons";

function Peer({ peer, sizeSmall = false }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  return (
    <div
      className={`${styles.container} ${
        sizeSmall ? styles.small_container : styles.normal_container
      } `}
    >
      <video
        ref={videoRef}
        className={`${styles.video}   ${
          peer.isLocal ? styles.local_video : ""
        }`}
        autoPlay
        muted
        playsInline
      />
      <div
        className={`${
          isLocalVideoEnabled ? styles.name_bottom : styles.name_center
        } ${styles.name} `}
      >
        {isLocalAudioEnabled ? (
          <BiMicrophone className={styles.mic} />
        ) : (
          <BiMicrophoneOff className={styles.mic_red} />
        )}
        {peer.name} {peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
