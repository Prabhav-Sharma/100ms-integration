import "./App.css";
import { useEffect } from "react";
import { JoinModal, Conference, Footer, Clock } from "./components";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <div className="App">
      {isConnected ? (
        <main>
          <Conference />
          <Footer />
          <Clock />
        </main>
      ) : (
        <JoinModal />
      )}
    </div>
  );
}

export default App;
