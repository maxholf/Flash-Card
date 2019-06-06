import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Platform, StatusBar, View } from "react-native";
import { Constants } from "expo";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from "react-navigation-tabs";
import {
  createAppContainer,
  createStackNavigator,
  HeaderBackButton
} from "react-navigation";
import { clearLocalNotification, setLocalNotification } from "./utils/helper";
import { Icon } from "react-native-elements";

import reducer from "./reducers";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import Decks from "./components/Decks";
import Deck from "./components/Deck";

const store = createStore(reducer);

const tabNavigatorSettings = {
  routeConfigs: {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: (
          <Icon
            name="cards-outline"
            type="material-community"
            iconStyle={{ color: "white" }}
          />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: (
          <Icon name="add" type="material" iconStyle={{ color: "white" }} />
        )
      }
    }
  },
  navigationOptions: {
    navigationOptions: { header: null },
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "white",
      inactiveBackgroundColor: "gray",
      activeBackgroundColor: "black",
      style: {
        backgroundColor: "black"
      }
    }
  }
};

const stackNavigatorSettings = {
  navigationOptions: {
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "black"
    }
  }
};

const MainNavigator = createStackNavigator({
  Home: {
    screen:
      Platform.OS === "ios"
        ? createBottomTabNavigator(
            tabNavigatorSettings.routeConfigs,
            tabNavigatorSettings.navigationOptions
          )
        : createMaterialTopTabNavigator(
            tabNavigatorSettings.routeConfigs,
            tabNavigatorSettings.navigationOptions
          )
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation, screenProps }) => ({
      ...stackNavigatorSettings.navigationOptions,
      title: "Deck",
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            navigation.navigate("Decks");
          }}
          tintColor="white"
        />
      )
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      ...stackNavigatorSettings.navigationOptions,
      title: "Add Card"
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      ...stackNavigatorSettings.navigationOptions,
      title: "Quiz"
    }
  }
});

const AppContainer = createAppContainer(MainNavigator);

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  async componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar
            backgroundColor="black"
            barStyle="light-content"
          />
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
