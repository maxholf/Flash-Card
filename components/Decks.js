import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-elements";

import {
  fetchDecksFromStorage,
  removeAllDecksFromStorage,
  saveAllDecksInStorage
} from "../utils/api";
import { loadDecks } from "../actions";
import { getDummyData } from "../utils/helper";
import MainDeck from "./MainDeck";

class Decks extends Component {
  state = { ready: false };

  async componentDidMount() {

    const { loadDecks } = this.props;

    let decks = await fetchDecksFromStorage();
    if (decks === null) {
      
      await saveAllDecksInStorage(getDummyData());
      decks = await fetchDecksFromStorage();
    }
    loadDecks(decks);

    this.setState({ ready: true });
  }

  handleOnPress = deckId => {
    const { navigate } = this.props.navigation;
    navigate("Deck", { deckId });
  };

  render() {
    if (!this.state.ready) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const { decks } = this.props;

    return (
      <ScrollView>
        {Object.keys(decks).map(deckId => {
          const deck = decks[deckId];
          return (
            <TouchableOpacity
              key={deckId}
              onPress={() => this.handleOnPress(deckId)}
            >
              <MainDeck deck={deck} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  return { decks };
};

export default connect(
  mapStateToProps,
  { loadDecks }
)(Decks);
