import { useState } from "react";
import { Accordion, Header, Icon } from "semantic-ui-react";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import SessionData from "./SessionStorage";

const ChangeAccountSettings = () => {
  let [activeIndex, setActiveIndex] = useState();

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  let options = [
    {
      currIndex: 0,
      name: "Промяна на потребителско име",
      content: <ChangeUsername />,
    },
    {
      currIndex: 1,
      name: "Промяна на парола",
      content: <ChangePassword />,
    },
    {
      currIndex: 2,
      name: "Проверка на потребителски сесии",
      content: <SessionData />,
    },
  ];
  return (
    <Accordion>
      {options &&
        options.map((option) => {
          return (
            <>
              <Accordion.Title
                active={activeIndex === option.currIndex}
                index={option.currIndex}
                onClick={handleClick}
              >
                <Header>
                  {option.name} <Icon name="dropdown" />
                </Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === option.currIndex}>
                {option.content}
              </Accordion.Content>
            </>
          );
        })}
    </Accordion>
  );
};

export default ChangeAccountSettings;
