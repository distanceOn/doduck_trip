const Rectangle = ({ className, w = "2", h = "70" }) => {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 2 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="1.37544"
        height="68.7719"
        transform="matrix(-1 0 0 1 1.59302 0.378906)"
        fill="#6C6C6C"
      />
    </svg>
  );
};

export default Rectangle;
