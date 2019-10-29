import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// Dimensions
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

export default class SplitBill extends React.Component {
	render() {
		return <View style={styles.container}></View>;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
