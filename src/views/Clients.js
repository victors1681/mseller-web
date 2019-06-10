import React, { useState } from "react";
import Header from "components/Header";
import ClientList from "components/Client/ClientList";
import ClientEdit from "components/Client/ClientEdit";

const ClientView = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <React.Fragment>
      <Header title="List of Clients" handleNew={handleClick} />
      <ClientList />
      {open && <ClientEdit edit={null} closeModal={closeModal} />}
    </React.Fragment>
  );
};

export default ClientView;
