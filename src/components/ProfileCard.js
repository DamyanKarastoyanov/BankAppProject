import { Grid, Header, Icon, Image, Popup, Table } from "semantic-ui-react";
import erika from "./erika.jpg";
const ProfileCard = () => {
  let caseServives = [
    {
      id: 2349,
      service: "Теглене на над 5000лв.",
      cloneOffice: 321,
      state: { icon: "print", color: "green" },
    },
    {
      id: 2143,
      service: "Документи за почване на работа",
      cloneOffice: 513,
      state: { icon: "clipboard", color: "yellow" },
    },
    {
      id: 2245,
      service: "Принтиране на банкова сметка",
      cloneOffice: 984,
      state: { icon: "clipboard outline", color: "red" },
    },
  ];
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
            <Header size="huge">
              {" "}
              Добре дошла, <br /> Ерика
            </Header>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={7}>
            <Header> Касови услуги: </Header>
            <Table textAlign="center">
              <Table.Header>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Услуга</Table.HeaderCell>
                <Table.HeaderCell>Клон</Table.HeaderCell>
                <Table.HeaderCell>Статус</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {caseServives &&
                  caseServives.map((caseService) => {
                    return (
                      <Table.Row>
                        <Table.Cell>{caseService.id}</Table.Cell>
                        <Table.Cell>{caseService.service}</Table.Cell>
                        <Popup
                          trigger={
                            <Table.Cell>{caseService.cloneOffice}</Table.Cell>
                          }
                          content={
                            "Адреса на клон " +
                            caseService.cloneOffice +
                            " се намира..."
                          }
                          position="top center"
                          size="tiny"
                          hoverable
                        />
                        <Table.Cell>
                          <Popup
                            trigger={
                              <Icon
                                name={caseService.state.icon}
                                color={caseService.state.color}
                              />
                            }
                            content={caseMessages[caseService.state.color]}
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
