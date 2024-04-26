import { useState } from "react";
import { Button, Grid, Table } from "semantic-ui-react";

const TableExampleSingleLine = () => {
  let [sessionsList, setSessionList] = useState([
    {
      id: "3FC58SF54",
      time: "21/3/2023 2:45 PM CET",
      location: "Varna,Bulgaria",
    },
    { id: "9HU5F898K", time: "15/4/2023 11:14 PM CET", location: "Rom, Italy" },
    {
      id: "7F489DKE5",
      time: "3/5/2023 10:43 AM CET",
      location: "Sofia,Bulgaria",
    },
  ]);
  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row textAlign="center">
          <Table.HeaderCell>Session ID</Table.HeaderCell>
          <Table.HeaderCell>Session Date</Table.HeaderCell>
          <Table.HeaderCell>Session Location</Table.HeaderCell>
          <Table.HeaderCell>Session Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {sessionsList &&
          sessionsList.map((session) => {
            return (
              <Table.Row textAlign="center">
                <Table.Cell>{session.id}</Table.Cell>
                <Table.Cell>{session.time}</Table.Cell>
                <Table.Cell>{session.location}</Table.Cell>
                <Table.Cell textAlign="center">
                  <Button icon="ban" color="red" />
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
};

const TableTest = () => {
  let [sessionsList, setSessionList] = useState([
    {
      id: "3FC58SF54",
      time: "21/3/2023 2:45 PM CET",
      location: "Varna,Bulgaria",
    },
    { id: "9HU5F898K", time: "15/4/2023 11:14 PM CET", location: "Rom, Italy" },
    {
      id: "7F489DKE5",
      time: "3/5/2023 10:43 AM CET",
      location: "Sofia,Bulgaria",
    },
  ]);
  return (
    <Grid reversed="computer" columns="equal" textAlign="center" divided>
      <Grid.Row>
        <Grid.Column>Противодействия</Grid.Column>
        <Grid.Column>Време</Grid.Column>
        <Grid.Column>Локация</Grid.Column>
        <Grid.Column>ID</Grid.Column>
      </Grid.Row>
      {sessionsList &&
        sessionsList.map((session) => {
          return (
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button icon="ban" color="red" />
              </Grid.Column>
              <Grid.Column>{session.time}</Grid.Column>
              <Grid.Column>{session.location}</Grid.Column>
              <Grid.Column>{session.id}</Grid.Column>
            </Grid.Row>
          );
        })}
    </Grid>
  );
};

export default TableExampleSingleLine;
