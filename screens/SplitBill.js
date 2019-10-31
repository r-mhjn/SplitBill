import React from 'react';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from 'react-native-slider';

// Dimensions
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

// Importing styles
import GlobalStyles from '../src/GlobalStyles';

export default class SplitBill extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			friendCount: 3,
			tip: 0,
			totalBill: 80,
		};
	}

	updateBill = () => {};

	getBillWithTip = () => {
		return ((this.state.tip / 100) * this.state.totalBill).toFixed(2);
	};

	splitBill = () => {};

	render() {
		return (
			<SafeAreaView style={GlobalStyles.AndroidSafeArea}>
				<View style={styles.pageContainer}>
					<View style={styles.appNameContainer}>
						<Text style={styles.appNameText}>Split Bill</Text>
					</View>

					<View style={styles.detailContainerBox}>
						<View style={styles.detailContainer}>
							<View style={styles.totalContainer}>
								<Text
									style={{
										color: '#fff',
										fontSize: responsiveFontSize(1.8),
										fontWeight: '200',
										marginTop: screenHeight * 0.02,
										marginLeft: screenWidth * 0.035,
									}}
								>
									TOTAL
								</Text>
								<Text
									style={{
										color: '#fff',
										fontSize: screenHeight * 0.08,
										fontWeight: '200',
										// height: screenHeight * 0.1,
										marginTop: -screenHeight * 0.015,
										marginLeft: screenWidth * 0.03,
									}}
								>
									{'\u20B9'}
								</Text>
							</View>
							<View style={styles.parameterContainer}>
								<View style={styles.parameterNameContainer}>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.025 }}>BILL</Text>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.005 }}>FRIENDS</Text>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.005 }}>
										TIPS{'('}
										{this.state.tip}
										{'%)'}
									</Text>
								</View>
								<View style={styles.parameterValueContainer}>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.025 }}>
										{'\u20B9'}
										{this.state.totalBill}
									</Text>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.005 }}>
										{this.state.friendCount.toFixed(0)}
									</Text>
									<Text style={{ color: '#fff', marginTop: screenHeight * 0.005 }}>
										{'\u20B9'}
										{this.getBillWithTip()}
									</Text>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.sliderContainer}>
						<Slider
							value={this.state.friendCount}
							onValueChange={friendCount => this.setState({ friendCount })}
							minimumValue={1}
							maximumValue={10}
							thumbTouchSize={{ width: 40, height: 40 }}
							thumbStyle={{ height: screenHeight * 0.08, width: screenWidth * 0.03, borderRadius: 0 }}
							thumbTintColor="#00d048"
							trackStyle={{ backgroundColor: '#efefef', height: screenHeight * 0.05 }}
							minimumTrackTintColor="#00d048"
							maximumTrackTintColor="#00d048"
							animateTransitions={true}
							animationType="timing"
						/>
					</View>

					<View style={styles.tipsButtonContainer}>
						<TouchableOpacity
							onPress={() => {
								this.setState({ tip: 0 });
							}}
						>
							<View style={styles.tipsButton}>
								<Text style={styles.tipsButtonText}>0%</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ tip: 10 });
							}}
						>
							<View style={styles.tipsButton}>
								<Text style={styles.tipsButtonText}>10%</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ tip: 20 });
							}}
						>
							<View style={styles.tipsButton}>
								<Text style={styles.tipsButtonText}>20%</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								this.setState({ tip: 30 });
							}}
						>
							<View style={styles.tipsButton}>
								<Text style={styles.tipsButtonText}>30%</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={styles.gridContainer}>
						<View style={styles.rowContainer}>
							<View style={styles.gridButtonColOne}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>1</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButton}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>2</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButtonColThree}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>3</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.rowContainer}>
							<View style={styles.gridButtonColOne}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>4</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButton}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>5</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButtonColThree}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>6</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.rowContainer}>
							<View style={styles.gridButtonColOne}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>7</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButton}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>8</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButtonColThree}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>9</Text>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.rowContainer}>
							<View style={styles.gridButtonColOne}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>+</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButton}>
								<TouchableOpacity onPress={() => {}}>
									<Text style={styles.buttonText}>0</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.gridButtonColThree}>
								<TouchableOpacity onPress={() => {}}>
									<MaterialCommunityIcons
										size={screenWidth * 0.07}
										name="backspace-outline"
										color={'#EA425C'}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.splitButtonContainer}>
						<TouchableOpacity onPress={() => {}}>
							<Text style={styles.splitButtonText}>SPLIT BILL</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	appNameContainer: {
		alignItems: 'flex-start',
		// borderWidth: 2,
		// borderColor: '#000',
		width: screenWidth,
		height: screenHeight * 0.08,
	},
	appNameText: {
		color: '#000000',
		fontSize: responsiveFontSize(2.8),
		fontWeight: '500',
		padding: screenWidth * 0.03,
		// textAlign: 'left',
	},
	detailContainerBox: {
		width: screenWidth * 0.96,
		// borderWidth: 1,
		// borderColor: '#000',
		flexDirection: 'row',
		marginHorizontal: screenWidth * 0.02,
		height: screenHeight * 0.18,
		borderRadius: 8,
		marginTop: screenHeight * 0.01,
		backgroundColor: '#00d048',
	},

	detailContainer: {
		// borderWidth: 1,
		// borderColor: '#fff',
		flexDirection: 'row',
		marginHorizontal: screenWidth * 0.03,
		height: screenHeight * 0.16,
		marginVertical: screenHeight * 0.01,
	},
	totalContainer: {
		// borderWidth: 1,
		// borderColor: '#fff',
		width: screenWidth * 0.45,
		height: screenHeight * 0.16,
	},
	parameterContainer: {
		flexDirection: 'row',
		// borderWidth: 1,
		// borderColor: '#fff',
		width: screenWidth * 0.45,
		height: screenHeight * 0.16,
	},
	parameterNameContainer: {
		// borderWidth: 1,
		// borderColor: '#fff',
		width: screenWidth * 0.225,
		height: screenHeight * 0.14,
		marginVertical: screenHeight * 0.02,
	},
	parameterValueContainer: {
		// borderWidth: 1,
		// borderColor: '#fff',
		width: screenWidth * 0.225,
		height: screenHeight * 0.14,
		marginVertical: screenHeight * 0.02,
	},
	sliderContainer: {
		// borderColor: '#000',
		// borderWidth: 1,
		height: screenHeight * 0.1,
		width: screenWidth * 0.9,
		marginHorizontal: screenWidth * 0.05,
		justifyContent: 'center',
		marginVertical: screenHeight * 0.04,
		// alignItems: 'center',
	},
	tipsButtonContainer: {
		flexDirection: 'row',
		// borderColor: '#000',
		// borderWidth: 1,
		// height: screenHeight * 0.05,
		width: screenWidth * 0.9,
		marginHorizontal: screenWidth * 0.05,
	},
	tipsButton: {
		borderColor: '#B8B8B8',
		borderWidth: 1,
		width: screenWidth * 0.175,
		marginHorizontal: screenWidth * 0.025,
		height: screenHeight * 0.04,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	tipsButtonText: {
		fontWeight: '300',
	},
	splitButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		width: screenWidth * 0.94,
		marginHorizontal: screenWidth * 0.03,
		backgroundColor: '#00d048',
		height: screenHeight * 0.075,
	},
	splitButtonText: {
		color: '#fff',
		fontSize: responsiveFontSize(2),
		fontWeight: '300',
		marginLeft: screenWidth * 0.02,
	},
	gridContainer: {
		// flex: 1,
		flexDirection: 'column',
		// borderWidth: 2,
		// borderColor: '#000',
		width: screenWidth * 0.8,
		marginHorizontal: screenWidth * 0.1,
		height: screenHeight * 0.36,
		marginVertical: screenHeight * 0.015,
	},
	rowContainer: { flexDirection: 'row' },
	gridButton: {
		justifyContent: 'center',
		alignItems: 'center',
		// borderColor: '#000',
		// borderWidth: 1,
		width: screenWidth * 0.26,
		height: screenHeight * 0.09,
	},
	gridButtonColOne: {
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: screenWidth * 0.26,
		height: screenHeight * 0.09,
		// borderColor: '#000',
		// borderWidth: 1,
	},
	gridButtonColThree: {
		justifyContent: 'center',
		alignItems: 'flex-end',
		width: screenWidth * 0.26,
		height: screenHeight * 0.09,
		// borderColor: '#000',
		// borderWidth: 1,
	},
	buttonText: {
		fontSize: responsiveFontSize(3),
		color: '#000',
		fontWeight: '500',
	},
});
