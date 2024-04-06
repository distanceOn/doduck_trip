import { useParams } from "react-router-dom";

export const Place = () => {
  const { id } = useParams();
  return <div> place {id}</div>;
};
