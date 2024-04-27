import { useState } from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

const ConfirmationWindow = ({
  message,
  btnProps,
  parentState,
  creditCard = null,
}) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const openBtn = (
    <Button
      content={btnProps.content}
      labelPosition="left"
      icon={btnProps.icon}
      onClick={() => {
        setOpenConfirmation(false);
      }}
      color={btnProps.color || undefined}
    />
  );
  return (
    <Modal
      basic
      onClose={() => setOpenConfirmation(false)}
      onOpen={() => setOpenConfirmation(true)}
      open={openConfirmation}
      size="small"
      trigger={openBtn}
    >
      <Header icon>
        <Icon name={btnProps.icon} />
        Are you sure?
      </Header>
      <Modal.Content>
        <p>{message}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          inverted
          onClick={async () => {
            if (creditCard !== null) {
              let user = JSON.parse(sessionStorage.getItem("username"));
              delete creditCard.color;
              delete creditCard.icon;
              fetch("http://localhost:3002/created_cards/" + creditCard.id, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...creditCard,
                  user,
                  status: btnProps.action,
                }),
              });
            }
            window.location.reload();
            setOpenConfirmation(false);
            parentState.setOpen(false);
          }}
        >
          <Icon name="checkmark" /> Confirm
        </Button>
        <Button
          basic
          content="Back"
          icon="remove"
          color="red"
          inverted
          onClick={() => {
            setOpenConfirmation(false);
            parentState.setOpen(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmationWindow;
