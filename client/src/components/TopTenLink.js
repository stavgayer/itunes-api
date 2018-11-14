import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
const TopTenLink = () => {
  return (
    <Link to="/top-ten">
      <Button
        variant="contained"
        color="secondary"
        style={{ position: "fixed", bottom: 1, right: 1 }}
      >
        Top ten most search results
      </Button>
    </Link>
  );
};

export default TopTenLink;
