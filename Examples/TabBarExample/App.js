/* eslint react/destructuring-assignment: 0 */
/* eslint react/no-multi-comp: 0 */
/* eslint import/no-named-as-default-member: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
  button: {
    marginTop: 20,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
  },
});

class ColoredView extends PureComponent {
  static propTypes = {
    color: PropTypes.string.isRequired,
    pageText: PropTypes.string.isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func.isRequired,
      pop: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    Icon.getImageSource('md-arrow-back', 30).then(source =>
      this.setState({ backIcon: source })
    );
  }

  navigateToSubview = () => {
    this.props.navigator.push({
      component: ColoredView,
      title: this.props.pageText,
      leftButtonIcon: this.state.backIcon,
      onLeftButtonPress: () => this.props.navigator.pop(),
      passProps: this.props,
    });
  };

  render() {
    return (
      <View style={[styles.tabContent, { backgroundColor: this.props.color }]}>
        <Text style={styles.tabText}>{this.props.pageText}</Text>
        <TouchableOpacity onPress={this.navigateToSubview}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Tap Me</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
