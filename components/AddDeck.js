import React, { Component } from "react";
import { Alert, KeyboardAvoidingView, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { commonStyles } from "../utils/fixed";
import { addDeck } from "../actions";
import SubmitButton from "./Submit";
import { Input, Text } from "react-native-elements";
import { saveDeckInStorage } from "../utils/api";
import { createDeckObject } from "../utils/helper";


class AddDeck extends Component {
  state = { deckTitle: "" };

  onChangeText = text => {
    this.setState({ deckTitle: text });
  };

  handleDeck = async () => {
    const { deckTitle } = this.state;
    const { navigate } = this.props.navigation;

    if (!deckTitle) {
      Alert.alert(
        "Must Put Deck Title ",
        "Deck title was Null",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { decks } = this.props;
    if (decks[deckTitle]) {
      Alert.alert(
        "Deck Already Exists",
        "Another deck with the same title already exists",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

   
    const { addDeck } = this.props;
    const deck = createDeckObject(deckTitle);
    await saveDeckInStorage(deck);
    addDeck(deck);
    this.setState({ deckTitle: "" });
    navigate("Deck", { deckId: deckTitle });
  };

  render() {
    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Text h4 style={{ marginBottom: 25 }}>
            What's the Title of Your New Deck?
          </Text>
          <Input
            placeholder="Type the title of your deck"
            value={this.state.deckTitle}
            onChangeText={this.onChangeText}
          
          />
          <View style={commonStyles.flashcardsButtonContainer}>
            <SubmitButton handleOnPress={this.handleDeck} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

export default connect(
  mapStateToProps,
  { addDeck }
)(AddDeck);
