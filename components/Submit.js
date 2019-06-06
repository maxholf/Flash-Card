import React, { Component } from "react";
import { Button } from "react-native-elements";
import { commonStyles } from "../utils/fixed";

class Submit extends Component {
  render() {
    const { handleOnPress } = this.props;
    return (
      <Button
        onPress={handleOnPress}
        title="Submit"
        
      
        buttonStyle={commonStyles.flashButton}
      />
    );
  }
}

export default Submit;
