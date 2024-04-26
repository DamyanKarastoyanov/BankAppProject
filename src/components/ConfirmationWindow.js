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
          onClick={() => {
            if (creditCard !== null) {
              creditCard.clickable = false;
              creditCard.currentStatus = {
                icon: btnProps.icon,
                color: btnProps.color,
              };
            }
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
