import {
  useAVToggle,
  useHMSActions,
  useHMSStore,
  selectIsLocalScreenShared,
} from "@100mslive/react-sdk";
import styles from "./Footer.module.css";
import {
  BiMicrophone,
  BiMicrophoneOff,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  MdCallEnd,
  MdOutlineStopScreenShare,
  MdOutlineScreenShare,
} from "../../icons";

function Footer() {
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
  const hmsActions = useHMSActions();
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  const screenShareHandler = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);
    } catch (error) {
      console.log("Video not shared", error);
    }
  };

  const stopScreenSharingHandler = async () => {
    try {
      await hmsActions.setScreenShareEnabled(false);
    } catch (error) {
      console.log("Couldn't stop sharing", error);
    }
  };

  return (
    <div className={styles.control_bar}>
      {isLocalAudioEnabled ? (
        <BiMicrophone className={styles.action_btn} onClick={toggleAudio} />
      ) : (
        <BiMicrophoneOff className={styles.action_btn} onClick={toggleAudio} />
      )}
      {isLocalVideoEnabled ? (
        <BsCameraVideoFill
          className={styles.action_btn}
          onClick={toggleVideo}
        />
      ) : (
        <BsCameraVideoOffFill
          className={styles.action_btn}
          onClick={toggleVideo}
        />
      )}
      {amIScreenSharing ? (
        <MdOutlineStopScreenShare
          className={styles.action_btn}
          onClick={() => stopScreenSharingHandler()}
        />
      ) : (
        <MdOutlineScreenShare
          className={styles.action_btn}
          onClick={() => screenShareHandler()}
        />
      )}
      <MdCallEnd
        className={`${styles.action_btn} ${styles.leave_btn}`}
        onClick={() => hmsActions.leave()}
      />
    </div>
  );
}

export default Footer;
