import { Offline } from "react-detect-offline";
import { RiWifiOffLine } from "react-icons/ri";

export default function Error({ ErrorMsg, ErrorStatus }) {
  return (
    <>
      {ErrorMsg && (
        <div
          style={{
            backgroundColor: "#d5d5dd",
            textAlign: "center",
            padding: "5em 2em",
            color: "white ",
            textShadow: "0 0 5px black",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
          }}
        >
          <h1>{`${ErrorMsg} ${ErrorStatus}`}</h1>
        </div>
      )}
      <Offline>
        <div
          style={{
            backgroundColor: "#d5d5dd",
            textAlign: "center",
            padding: "3em 0",
            color: "white ",
            textShadow: "0 0 5px black",
            fontSize: "clamp(1rem, 4vw, 2rem)",
            marginTop: "2rem",
          }}
        >
          <RiWifiOffLine color="#fa2d64" size="7rem" />
          <h1>you lost connection</h1>
        </div>
      </Offline>
    </>
  );
}
