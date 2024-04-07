import { useNavigate } from "react-router-dom";
import { Card as AntCard, Image } from "antd";
import { useEffect } from "react";

const Card = (props) => {
  // eslint-disable-next-line react/prop-types
  const { photos, name, id, description } = props;

  const image = photos[0];

  useEffect(() => {
    console.log(image);
  }, [image]);
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
      <Image width={288} height={180} src={image} alt={name} />
      <AntCard.Meta title={name} description={description} className="p-4" />
    </AntCard>
  );
};

export default Card;
