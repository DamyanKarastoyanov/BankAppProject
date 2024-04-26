import { useNavigate } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

const TermsOfServices = () => {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };
  return (
    <div className="terms">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste minus nisi
      perspiciatis impedit vel eligendi numquam exercitationem tempore dolor
      adipisci non sapiente quam corporis ab at autem, reiciendis sint dolores.
      <Button type="submit" color="yellow" onClick={redirectPage}>
        <Icon disabled name="arrow left" /> Back
      </Button>
    </div>
  );
};

export default TermsOfServices;
