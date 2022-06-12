import { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./JoinModal.module.css";
import { useHMSActions } from "@100mslive/react-sdk";
import { toast } from "react-toastify";

function JoinModal() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputvalues] = useState({ name: "", token: "" });

  const { name, token } = inputValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      hmsActions.join({
        userName: name,
        authToken: token,
      });
    } catch (error) {
      toast.error("Invalid Credentials!");
    }
  };

  return ReactDOM.createPortal(
    <div className={styles.form_wrapper}>
      <form className={styles.form}>
        <h1>Join Room</h1>
        <input
          type="text"
          value={name}
          placeholder="Your name"
          onChange={(e) =>
            setInputvalues((inputValues) => ({
              ...inputValues,
              name: e.target.value,
            }))
          }
        />
        <input
          type="text"
          value={token}
          placeholder="Auth Token"
          onChange={(e) =>
            setInputvalues((inputValues) => ({
              ...inputValues,
              token: e.target.value,
            }))
          }
        />
        <button onClick={handleSubmit} className={styles.join_button}>
          Join
        </button>
      </form>
    </div>,
    document.getElementById("root")
  );
}

export default JoinModal;
