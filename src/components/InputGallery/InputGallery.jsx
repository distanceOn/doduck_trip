import PropTypes from "prop-types";
const InputGallery = ({ className }) => {
  return (
    <input
      type="text"
      placeholder="Введите текст..."
      className={`flex font-sans transition-all max-w-72 w-full px-4 py-2 mt-2 border  rounded-md shadow hover:shadow-lg focus:shadow-lg  ${className}`}
    />
  );
};
InputGallery.propTypes = {
  className: PropTypes.string,
};

InputGallery.defaultProps = {
  className: "",
};

export default InputGallery;
