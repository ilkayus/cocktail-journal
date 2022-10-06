import { gifs } from "img";

const Loading = () => {
  return (
    <img
      className="loading--screen--gif"
      src={gifs.loading}
      alt="loading screen"
    />
  );
};

export default Loading;
