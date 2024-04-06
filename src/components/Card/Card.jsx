import { useNavigate } from "react-router-dom";
import { Card as AntCard, Image } from "antd";

const Card = (props) => {
  // eslint-disable-next-line react/prop-types
  const { image, title, id, description } = props;
  const navigate = useNavigate();

  const goToPlace = () => {
    navigate("/places/" + id);
  };

  return (
    <AntCard
      hoverable={true}
      onClick={goToPlace}
      className="cursor-pointer shadow-lg rounded-md overflow-hidden mb-4"
    >
      <Image width={288} height={180} src={image} alt={title} />
      <AntCard.Meta title={title} description={description} className="p-4" />
    </AntCard>
  );
};

export default Card;
