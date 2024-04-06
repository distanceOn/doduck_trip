import { useParams } from "react-router-dom";
import Spot from "../../components/Spot/Spot";
import Hub from "../../components/Hub/Hub";
import Resort from "../../components/Resort/Resort";

export const Place = () => {
  const { id } = useParams();
  const type = "resort";

  if (type === "spot") {
    return <Spot id={id} />;
  }
  if (type === "hub") {
    return <Hub id={id} />;
  }
  if (type === "resort") {
    return <Resort id={id} />;
  }

  return <div> place {id}</div>;
};
