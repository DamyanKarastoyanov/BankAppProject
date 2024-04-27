import {
  Header,
  Table,
  TableCell,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import useFetch from "../../useFetch";
import { fetchOptions } from "./RequestService/RequestCard";

const MyVignettes = ({ text }) => {
  const currUser = JSON.parse(sessionStorage.getItem("username"));
  const { data, loading, error } = useFetch(
    "http://localhost:3002/purchased_vignettes?user=" + currUser,
    fetchOptions
  );
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
          {data &&
            data.map((evignette) => {
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
    </div>
  );
};

export default MyVignettes;
