import React, { useEffect } from "react";
import {
  selectPeers,
  useHMSStore,
  selectPeerScreenSharing,
  selectScreenShareByPeerID,
  useVideo,
} from "@100mslive/react-sdk";
import styles from "./Conference.module.css";
import { Peer } from "../.";
import { toast } from "react-toastify";
import calcMeetingDuration from "./calcDuration";

function Conference() {
  const peers = useHMSStore(selectPeers);
  const presenter = useHMSStore(selectPeerScreenSharing);
  const screenshareVideoTrack = useHMSStore(
    selectScreenShareByPeerID(presenter?.id)
  );

  useEffect(() => {
    localStorage.setItem("StartTime", new Date().getTime());

    return () => {
      toast.info(
        `Meeting Ended in ${calcMeetingDuration(
          new Date().getTime() - localStorage.getItem("StartTime")
        )}`
      );
      localStorage.removeItem("StartTime");
    };
  }, []);

  const { videoRef } = useVideo(
    {
      trackId: screenshareVideoTrack?.id,
    },
    [screenshareVideoTrack]
  );

  return (
    <div className={styles.conference_wrapper}>
      {screenshareVideoTrack && (
        <div className={styles.video_container}>
          <video
            className={styles.video}
            ref={videoRef}
            autoPlay
            muted
            playsInline
          />
        </div>
      )}
      <div className={styles.peers_container}>
        {peers.map((peer) => (
          <Peer
            key={peer.id}
            peer={peer}
            sizeSmall={screenshareVideoTrack && true}
          />
        ))}
      </div>
    </div>
  );
}

export default Conference;
