import React, { Component } from "react";
import {Alert,KeyboardAvoidingView,ScrollView,TextInput,View} from "react-native";
import { saveCardInStorage } from "../utils/api";
import { commonStyles } from "../utils/fixed";
import SubmitButton from "./Submit";
import { Button, Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { createCardObject } from "../utils/helper";
import { addCard } from "../actions";



class AddCard extends Component {
  state = { question: "", answer: "" };

  

  onChangetexta = text => {
    this.setState({ answer: text });
  };
  onChangetextq = text => {
    this.setState({ question: text });
  };

  handleCard = async () => {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;

    if (!question || !answer) {
      Alert.alert(
        " You Must Put Question and Answer ",
        " both a question and an answer.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      return;
    }

    const { addCard } = this.props;
    const { goBack } = this.props.navigation;
    const card = createCardObject(question, answer);
    await saveCardInStorage(card, deckId);
    addCard(card, deckId);
    goBack();
  };

  render() {
    const { deckId } = this.props.navigation.state.params;

    return (
      <ScrollView style={commonStyles.genericTextContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Text h4 style={{ marginBottom: 25 }}>
            Add a card to Deck
          </Text>
          <Input
            placeholder=" Type your question"
            onChangeText={this.onChangetextq}
            inputStyle={{}}
           
          />
          <Input
            onChangeText={this.onChangetexta}
            placeholder="Type your answer "
            multiline={true}
            inputStyle={{
              height: 100,
              textAlignVertical: "top"
            }}
           
          />
          <View style={commonStyles.flashcardsButtonContainer}>
            <SubmitButton handleOnPress={this.handleCard} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default connect(
  null,
  { addCard }
)(AddCard);
