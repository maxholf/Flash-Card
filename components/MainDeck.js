import React, { Component } from "react";
import { Card, Text } from "react-native-elements";

class MainDeck extends Component {
  render() {
    const { deck } = this.props;
    const cardsText = deck.questions.length > 1 ? "cards" : "card";
    

    return (
      <Card
        containerStyle={{ backgroundColor: "lightblue" }}
      >
        <Text h4 >{deck.title}</Text>
        <Text>
          {deck.questions.length} {cardsText}
        </Text>
      </Card>
    );
  }
}



export default MainDeck;
