import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built by  "}
      <Link color="inherit" href="https://mobile-seller.com/">
        IT Soluclick
      </Link>
    </Typography>
  );
};

export default Footer;
