import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Menu, Segment } from "semantic-ui-react";
import PaymentViaCode from "./PaymentViaCode";
import VignettesForm from "./VignettesForm";
import MyVignettes from "./MyVignettes";
import BigAmounts from "./CaseServices/BigAmounts";
import RequestCard from "./RequestService/RequestCard";
import RequestMoney from "./CaseServices/RequestMoney";
import PrintDocuments from "./CaseServices/PrintDocuments";
import InstallmentInCredit from "./CaseServices/InstallmentInCredit";
import InstallmentInCard from "./CaseServices/InstallmentInCard";
import RequestCredit from "./RequestService/RequestCredit";
import RequestMortgage from "./RequestService/RequestMortgage";

let actionsList = {
  services: "",
  "services/pay-with-code": <PaymentViaCode text="Плащане с 10 цифрен код" />,
  "services/e-vignettes": <VignettesForm text="Електронни Винетки" />,
  "services/vignettes-valid-check": (
    <MyVignettes text="Преглед на валидност за винетка" />
  ),
  "services/big-amount-withdrawal": (
    <BigAmounts text="Изтегляне на голяма сума от каса" />
  ),
  "services/withdraw-money": <RequestMoney text="Теглене от каса" />,
  "services/request-debit-card": (
    <RequestCard text="Заявка за дебитна карта" type="debit" />
  ),
  "services/request-credit-card": (
    <RequestCard text="Заявка за кредитна карта" type="credit" />
  ),
  "services/print-documents": (
    <PrintDocuments text="Приготвяне на документи за каса" />
  ),
  "services/installment-in-credit-card": (
    <InstallmentInCard text="Вноска в кредитна карта" />
  ),
  "services/installment-in-credit": (
    <InstallmentInCredit text="Вноска в кредит" />
  ),
  "services/request-user-credit": <RequestCredit text="Потребителски кредит" />,
  "services/request-mortgage": <RequestMortgage text="Ипотечен кредит" />,
};

function MenuBar({ currentItem }) {
  let navigate = useNavigate();
  let [activeItem, setActiveItem] = useState(currentItem);
  const handleItemClick = (e, { name }) => {
    if (name === "logout") navigate("/");
    else {
      setActiveItem(name);
      navigate("/" + name);
    }
  };
  return (
    <Grid className="services-container" stretched>
      <Grid.Column width={3} verticalAlign="middle">
        <Menu vertical size="huge">
          <Menu.Item>
            <Menu.Header>Комунални услуги</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                content="Плащане с 10-цифрен код"
                name="services/pay-with-code"
                active={activeItem === "services/pay-with-code"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Траспортни услуги</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                content="Електронни винетки"
                name="services/e-vignettes"
                active={activeItem === "services/e-vignettes"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Проверка на валидност на винетки"
                name="services/vignettes-valid-check"
                active={activeItem === "services/vignettes-valid-check"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Касови услуги</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                content="Теглене на каса"
                name="services/withdraw-money"
                active={activeItem === "services/withdraw-money"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Изтегляне на голяма сума "
                name="services/big-amount-withdrawal"
                active={activeItem === "services/big-amount-withdrawal"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Приготвяне на документи"
                name="services/print-documents"
                active={activeItem === "services/print-documents"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Вноска на кредитна карта"
                name="services/installment-in-credit-card"
                active={activeItem === "services/installment-in-credit-card"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Вноска на кредит"
                name="services/installment-in-credit"
                active={activeItem === "services/installment-in-credit"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>

          <Menu.Item>
            <Menu.Header>Заявка за</Menu.Header>

            <Menu.Menu>
              <Menu.Item
                content="Дебитна карта"
                name="services/request-debit-card"
                active={activeItem === "services/request-debit-card"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Кредитна карта"
                name="services/request-credit-card"
                active={activeItem === "services/request-credit-card"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Потребителски кредит"
                name="services/request-user-credit"
                active={activeItem === "services/request-user-credit"}
                onClick={handleItemClick}
              />
              <Menu.Item
                content="Ипотечен кредит"
                name="services/request-mortgage"
                active={activeItem === "services/request-mortgage"}
                onClick={handleItemClick}
              />
            </Menu.Menu>
          </Menu.Item>
        </Menu>
      </Grid.Column>

      <Grid.Column
        stretched
        width={11}
        verticalAlign={activeItem === undefined ? "none" : "middle"}
      >
        <Segment>{actionsList[activeItem]}</Segment>
      </Grid.Column>
    </Grid>
  );
}
export default MenuBar;
