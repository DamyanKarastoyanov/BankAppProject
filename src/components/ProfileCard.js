import { Grid, Header, Icon, Image, Popup, Table } from "semantic-ui-react";
import erika from "./erika.jpg";
import useFetch from "../useFetch";

const setServiceType = (service) => {
  switch (service.status) {
    case "ready":
      return { ...service, icon: "print", color: "green" };
    case "pending":
      return { ...service, icon: "clipboard outline", color: "red" };
    case "reviewing":
      return { ...service, icon: "clipboard", color: "yellow" };
    default:
      return null;
  }
};

const branchesInfo = {
  132: "ул. Хан Крум 12, 9000, Варна",
  515: "ул. Витоша, 1000, София",
  654: "ул. Цар Ивайло 8, 4000, Пловдив",
  974: "ул. Цар Борис III, 70, 5800 Плевен",
};

const ProfileCard = () => {
  let currUser = JSON.parse(sessionStorage.getItem("username"));
  let { data, loading, error } = useFetch(
    "http://localhost:3002/cashier_requests?user=" + currUser,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  let caseMessages = {
    red: "Искането се приготвя. Може да отнеме от 5-10 работни дни",
    yellow: "Искането ще бъде изпълнено до 2-5 работни дни",
    green:
      "Желаните от вас документи са готови за вземане от избрания клон на банката",
  };
  return (
    <div centered>
      <Grid rows={1} columns={3}>
        <Grid.Row width={1} centered>
          <Grid.Column>
            <Image circular size="medium" src={erika} />{" "}
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={3}>
            <Header size="huge">{currUser}</Header>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={7}>
            <Header> Касови заявки: </Header>
            <Table textAlign="center">
              <Table.Header>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Услуга</Table.HeaderCell>
                <Table.HeaderCell>Клон</Table.HeaderCell>
                <Table.HeaderCell>Статус</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {data &&
                  data.map((caseService) => {
                    caseService = setServiceType(caseService);
                    return (
                      <Table.Row key={caseService.id}>
                        <Table.Cell>{caseService.id}</Table.Cell>
                        <Table.Cell>{caseService.service}</Table.Cell>
                        <Popup
                          trigger={
                            <Table.Cell>{caseService.branch}</Table.Cell>
                          }
                          content={
                            "Адреса на клон " +
                            caseService.branch +
                            " се намира на адрес: " +
                            branchesInfo[caseService.branch]
                          }
                          position="top center"
                          size="tiny"
                          hoverable
                        />
                        <Table.Cell>
                          <Popup
                            trigger={
                              <Icon
                                name={caseService.icon}
                                color={caseService.color}
                              />
                            }
                            content={caseMessages[caseService.color]}
                            position="top center"
                            size="tiny"
                            hoverable
                          />
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProfileCard;
