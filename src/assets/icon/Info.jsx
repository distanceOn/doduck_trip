const IconInfo = ({ color = "#1C4D4B", w = "67", h = "67", className }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 67 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M33.17 60.82C20.14 60.82 13.62 60.82 9.57 56.77C5.52 52.72 5.52 46.2 5.52 33.17C5.52 20.14 5.52 13.62 9.57 9.57C13.62 5.52 20.14 5.52 33.17 5.52C46.2 5.52 52.72 5.52 56.77 9.57C60.82 13.62 60.82 20.14 60.82 33.17C60.82 46.2 60.82 52.72 56.77 56.77C52.72 60.82 46.2 60.82 33.17 60.82ZM33.17 49.07C34.32 49.07 35.24 48.14 35.24 46.99L35.24 30.41C35.24 29.26 34.32 28.33 33.17 28.33C32.03 28.33 31.1 29.26 31.1 30.41L31.1 46.99C31.1 48.14 32.03 49.07 33.17 49.07ZM33.17 19.35C34.7 19.35 35.93 20.58 35.93 22.11C35.93 23.64 34.7 24.88 33.17 24.88C31.64 24.88 30.41 23.64 30.41 22.11C30.41 20.58 31.64 19.35 33.17 19.35Z"
        fill={color}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default IconInfo;
