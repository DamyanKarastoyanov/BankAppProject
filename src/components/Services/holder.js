/*
      <Grid centered divided>
        <Grid.Row centered>
          <Grid.Column textAlign="center" width={3}>
            Номер на винетката
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}>
            Вид на винетката
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}>
            Дата на купуване
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}>
            Дата на изтичане
          </Grid.Column>
          <Grid.Column textAlign="center" width={3}>
            Регистрационен номер
          </Grid.Column>
        </Grid.Row>
        {vignettesList &&
          vignettesList.map((evignette) => {
            return (
              <Grid.Row textAlign="center">
                <Grid.Column textAlign="center" width={3}>
                  {evignette.id}
                </Grid.Column>

                <Grid.Column textAlign="center" width={3}>
                  {evignette.type}
                </Grid.Column>

                <Grid.Column textAlign="center" width={3}>
                  {evignette.purchaseDate}
                </Grid.Column>

                <Grid.Column textAlign="center" width={3}>
                  {evignette.endDate}
                </Grid.Column>

                <Grid.Column textAlign="center" width={3}>
                  {evignette.carNumber}
                </Grid.Column>
              </Grid.Row>
            );
          })}
      </Grid>
      */
/*
  {
    key: 1,
    text: "321 - ul. Han Krum 12, 9000 Varna Center, Varna",
    value: "321",
  },
  {
    key: 2,
    text: "513 - ulitsa 'Vitosha', 1000 Sofia Center, Sofia",
    value: "513",
  },
  { key: 3, text: "984 - ul. 'Tsar Ivaylo' 8, 4000, Plovdiv", value: "984" },
  {
    key: 3,
    text: "1023 - Kaylaka Park - ul. ;Tsar Boris III; 70, 5800 Pleven",
    value: "1023",
  },
*/
