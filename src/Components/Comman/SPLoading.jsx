import { ThreeCircles } from "react-loader-spinner";
export default function SPLoading() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "80vh",
      }}
    >
      <ThreeCircles
        height="100"
        width="100"
        color="#fa2d64"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
