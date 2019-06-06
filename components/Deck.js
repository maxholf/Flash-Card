import React, { Component } from "react";
import { Alert, ScrollView, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Button, Text } from "react-native-elements";
import { removeDeckFromStorage } from "../utils/api";
import { commonStyles } from "../utils/fixed";
import { deleteDeck } from "../actions";
import MainDeck from "./MainDeck";



class Deck extends Component {
   handleStart = () => {
    const { navigate } = this.props.navigation;
    const { deckId } = this.props.navigation.state.params;
    navigate("Quiz", { deckId: deckId });
  };

  handleAdd = () => {
    const { navigate } = this.props.navigation;
    const { deckId } = this.props.navigation.state.params;
    navigate("AddCard", { deckId: deckId });
  };

 

  handleDelete = () => {
    
    const { deck, navigation } = this.props;

    Alert.alert(
      "Delete Deck",
      `Click ok to delete ${deck.title}?`,
      [
        { text: "Cancel" },
        {
          text: "OK",
          onPress: async () => {
            const { deleteDeck } = this.props;
            await removeDeckFromStorage(deck.title);
            deleteDeck(deck.title);
            navigation.navigate("Decks");
          }
        }
      ],
      { cancelable: true }
    );
  };
  render() {
    const { deck } = this.props;

    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <MainDeck deck={deck} />
        <View style={commonStyles.flashcardsButtonContainer}>
          <Button
            onPress={this.handleAdd}
            title="Add Card"
           
           buttonStyle={commonStyles.flashButton}
          />
          <Button
            onPress={this.handleStart}
            title="Start Quiz"
          
            buttonStyle={commonStyles.flashButton}
          />
          <Button
            onPress={this.handleDelete}
            title="Delete Deck"
         
            
           buttonStyle={commonStyles.flashButton}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks[deckId];
  return { deck };
};

export default connect(
  mapStateToProps,
  { deleteDeck }
)(Deck);
