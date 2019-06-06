import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";

class Card extends Component {
 


  showAnswer(handleFlipCard) {
    const { card } = this.props;
    return (
      <View>
        <Text h4>{card.answer}</Text>
        <Button
          onPress={handleFlipCard}
          title="View Question"
          buttonStyle={style.qaButton}
        />
      </View>
    );
  }
  
  showQuestion(handleFlipCard) {
    const { card } = this.props;
    return (
      <View>
        <Text h2>{card.question}</Text>
        <Button
          onPress={handleFlipCard}
          title="View Answer"
          buttonStyle={style.qaButton}
        />
      </View>
    );
  }

  render() {
    const { shouldShowQuestion, handleFlipCard } = this.props;
    return shouldShowQuestion
      ? this.showQuestion(handleFlipCard)
      : this.showAnswer(handleFlipCard);
  }
}

const style = StyleSheet.create({
  qaButton: { backgroundColor: "black", marginTop: 25 }
});

export default Card;
