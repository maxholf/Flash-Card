import React, { Component } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from "../utils/helper";
import { Button, Card, Text } from "react-native-elements";

import { commonStyles } from "../utils/fixed";
import { default as Flashcard } from "./Card";

class Quiz extends Component {
  state = { score: 0, currentQuestionId: 0, shouldShowQuestion: true };

  handleCard = () => {
    this.setState(previousState => {
      return { shouldShowQuestion: !previousState.shouldShowQuestion };
    });
  };

  handleRes = async ({ isCorrect }) => {
    if (isCorrect === true) {
      this.setState(previousState => {
        return { score: previousState.score + 1 };
      });
    }

    this.setState(previousState => {
      return {
        currentQuestionId: previousState.currentQuestionId + 1,
        shouldShowQuestion: true
      };
    });

    await clearLocalNotification();
    setLocalNotification();
  };

  quiz() {
    const { deck } = this.props;
    const { currentQuestionId } = this.state;

    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <Text>Quiz for deck: {deck.title}</Text>
        <Text>
          Question: {currentQuestionId + 1} of {deck.questions.length}
        </Text>
        <Card>
          <Flashcard
            card={deck.questions[currentQuestionId]}
            shouldShowQuestion={this.state.shouldShowQuestion}
            handleFlipCard={this.handleCard}
          />
        </Card>
        <View
          style={{
            ...commonStyles.flashcardsButtonContainer,
            flexDirection: "row"
          }}
        >
          <Button
            onPress={() => {
              this.handleRes({ isCorrect: true });
            }}
            title="Correct"
            buttonStyle={{
              backgroundColor: "black",
              width: 100
            }}
           
          />
          <View style={{ width: 20 }} />
          <Button
            onPress={() => {
              this.handleRes({ isCorrect: false });
            }}
            title="Incorrect"
            buttonStyle={{
              backgroundColor: "black",
              width: 100
            }}
          
          />
        </View>
      </ScrollView>
    );
  }

  quizResult() {
    const { navigation, deck } = this.props;

    let score = 0;
    if (deck.questions.length !== 0) {
      score =
        Math.round((this.state.score / deck.questions.length) * 10000) / 100;
    }

    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <Text>Quiz result for deck: {deck.title}</Text>
        <Text>Total questions {deck.questions.length}</Text>

        <Card
          wrapperStyle={{
            alignItems: "center"
          }}
        >
          <Text h2>You scored</Text>
          <Text h2>{score} %</Text>
        </Card>

        <View style={commonStyles.flashcardsButtonContainer}>
          <Button
            onPress={() => {
              this.setState({ score: 0, currentQuestionId: 0 });
            }}
            title="Restart Quiz"
            
            buttonStyle={commonStyles.flashButton}
          />
          <Button
            onPress={() => {
              navigation.navigate("Deck");
            }}
            title="Back to Deck"
          
           buttonStyle={commonStyles.flashButton}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (deck.questions.length === 0) {
      return (
        <ScrollView style={commonStyles.genericTextContainer}>
          <Text h5>
            The number of questions for this deck is zero. Please add some cards
            then start the quiz.
          </Text>
        </ScrollView>
      );
    }

    if (this.state.currentQuestionId === deck.questions.length) {
      return this.quizResult();
    }

    return this.quiz();
  }
}

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks[deckId];
  return { deck };
};

export default connect(mapStateToProps)(Quiz);
