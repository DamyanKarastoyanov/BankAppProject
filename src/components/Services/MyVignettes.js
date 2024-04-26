import {
  Grid,
  Header,
  Icon,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";

const vignettesList = [
  {
    id: "493ifk9c",
    type: "1 Месец",
    purchaseDate: "5-5-2023",
    endDate: "5-6-2023",
    carNumber: "B 1943 TM",
  },
  {
    id: "jf94kcs0",
    type: "6 Месеца",
    purchaseDate: "5-5-2023",
    endDate: "4-11-2023",
    carNumber: "B 1563 TИ",
  },
  {
    id: "3jd0jemx",
    type: "3 Месеца",
    purchaseDate: "5-5-2023",
    endDate: "6-8-2023",
    carNumber: "ТХ 1943 TД",
  },
  {
    id: "idc3dqj9",
    type: "12 Месеца",
    purchaseDate: "5-5-2023",
    endDate: "3-5-2024",
    carNumber: "B 1943 TM",
  },
];

let routeCards = [
  {
    id: "KF03DM90I",
    route: "Карти за градове и общини",
    status: { icon: "check", color: "yelow", text: "Processing" },
    startDate: "5-1-2023",
    carNumber: "С 4945 ЛЦ",
  },
  {
    id: "CKJ34XJ8U",
    route: "Карти на АМ 'Хемус' -> София и Варна",
    status: { icon: "check", color: "red", text: "Starting" },
    startDate: "5-1-2023",
    carNumber: "ТХ 5428 ЖГ",
  },
  {
    id: "U98JKLNUU",
    route: "Карта за АМ 'Тракия'-> София и Бургас",
    status: { icon: "check", color: "green", text: "Released" },
    startDate: "5-1-2023",
    carNumber: "B 8753 ГТ",
  },
];
const MyVignettes = ({ text }) => {
  return (
    <div>
      <Header textAlign="center"> {text} </Header>
      <Table textAlign="center">
        <Table.Header>
          <TableHeaderCell>Номер на винетката</TableHeaderCell>
          <TableHeaderCell>Вид на винетката</TableHeaderCell>
          <TableHeaderCell>Дата на купуване</TableHeaderCell>
          <TableHeaderCell>Дата на изтичане</TableHeaderCell>
          <TableHeaderCell>Регистрационен номер</TableHeaderCell>
        </Table.Header>
        <Table.Body>
          {vignettesList &&
            vignettesList.map((evignette) => {
              return (
                <TableRow>
                  <TableCell>{evignette.id}</TableCell>
                  <TableCell>{evignette.type}</TableCell>
                  <TableCell>{evignette.purchaseDate}</TableCell>
                  <TableCell>{evignette.endDate}</TableCell>
                  <TableCell>{evignette.carNumber}</TableCell>
                </TableRow>
              );
            })}
        </Table.Body>
      </Table>

      <Header textAlign="center"> Маршрутни карти </Header>

      <Table textAlign="center">
        <Table.Header>
          <TableHeaderCell>Номер</TableHeaderCell>
          <TableHeaderCell>Маршрут</TableHeaderCell>
          <TableHeaderCell>Дата на издаване</TableHeaderCell>
          <TableHeaderCell>Номер на превозното средство</TableHeaderCell>
          <TableHeaderCell>Статус</TableHeaderCell>
        </Table.Header>
        <Table.Body>
          {routeCards &&
            routeCards.map((card) => {
              return (
                <TableRow>
                  <TableCell>{card.id}</TableCell>
                  <TableCell>{card.route}</TableCell>
                  <TableCell>{card.startDate}</TableCell>
                  <TableCell>{card.carNumber}</TableCell>
                  <TableCell>
                    <Icon name={card.status.icon} color={card.status.color} />
                  </TableCell>
                </TableRow>
              );
            })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default MyVignettes;
