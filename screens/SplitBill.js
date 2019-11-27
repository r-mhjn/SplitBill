import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";
import Slider from "react-native-slider";

// Dimensions
var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

// Importing styles
import GlobalStyles from "../src/GlobalStyles";

export default class SplitBill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friendCount: 3,
      tip: 0,
      totalBill: 0,
      showSplit: false
    };
    this.animated = new Animated.Value(0);
  }

  updateBill = val => {
    let totalBill = this.state.totalBill;
    totalBill = totalBill * 10 + val;
    if (totalBill > 99999) {
      return;
    }
    this.setState({ totalBill });
  };

  erase = () => {
    let totalBill = this.state.totalBill;
    totalBill /= 10;
    console.log(totalBill);
    if (totalBill <= 1) {
      this.setState({ totalBill: 0 });
      return;
    }
    this.setState({ totalBill: Math.trunc(totalBill) });
  };

  getBillWithTip = () => {
    // console.log(((this.state.tip / 100) * this.state.totalBill).toFixed(2));
    return ((this.state.tip / 100) * this.state.totalBill).toFixed(2);
  };

  setShowSplit = () => {
    let showSplit = this.state.showSplit;
    showSplit = !showSplit;
    this.setState({ showSplit });
  };

  createCardsArray = () => {
    let bill = this.getBillWithTip();
    // console.log(bill);
    let splitAmount = (bill / this.state.friendCount).toFixed(2);
    let persons = [];
    for (let i = 0; i < this.state.friendCount; i++) {
      persons.push(splitAmount);
    }
    return persons;
  };

  getScrollList = () => {
    let persons = this.createCardsArray();
    var cards = persons.map((item, index) => {
      return (
        <Card
          key={index}
          style={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
            height: screenHeight * 0.15
          }}
        >
          <CardItem
            style={{
              flexDirection: "column"
            }}
          >
            <Text
              style={{ fontWeight: "500", fontSize: responsiveFontSize(1.3) }}
            >
              PERSON {String.fromCharCode(65 + index)}
            </Text>
            <Text
              style={{ fontWeight: "600", fontSize: responsiveFontSize(4) }}
            >
              {"\u20B9"}
              {item}
            </Text>
          </CardItem>
        </Card>
      );
    });
    return cards;
  };

  animate = () => {
    this.animated.setValue(0);
    Animated.timing(this.animated, { toValue: 1, duration: 2000 }).start();
  };

  render() {
    const opacity = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });
    const translateX = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1.5]
    });
    const transform = [{ translateX }];
    return (
      <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
        <View
          style={[
            styles.pageContainer,
            {
              backgroundColor:
                this.state.showSplit === true ? "#E4E8F2" : "#fff"
            }
          ]}
        >
          <View style={styles.appNameContainer}>
            <Text style={styles.appNameText}>Split Bill</Text>
          </View>

          <View style={styles.detailContainerBox}>
            <View style={styles.detailContainer}>
              <View style={styles.totalContainer}>
                <Text
                  style={{
                    color: "#fff",
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: "200",
                    marginTop: screenHeight * 0.02,
                    marginLeft: screenWidth * 0.035
                  }}
                >
                  TOTAL
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: screenHeight * 0.08,
                      fontWeight: "200",
                      // height: screenHeight * 0.1,
                      marginTop: -screenHeight * 0.015,
                      marginLeft: screenWidth * 0.03
                    }}
                  >
                    {"\u20B9"}
                  </Text>
                  <Animated.Text
                    style={[
                      {
                        color: "#fff",
                        fontSize: responsiveFontSize(4),
                        fontWeight: "200",
                        // height: screenHeight * 0.1,
                        marginTop: screenHeight * 0.025,
                        marginLeft: screenWidth * 0.01
                      },
                      { transform }
                    ]}
                  >
                    {this.state.totalBill}
                  </Animated.Text>
                </View>
              </View>
              <View style={styles.parameterContainer}>
                <View style={styles.parameterNameContainer}>
                  <Text
                    style={{ color: "#fff", marginTop: screenHeight * 0.025 }}
                  >
                    BILL
                  </Text>
                  <Text
                    style={{ color: "#fff", marginTop: screenHeight * 0.005 }}
                  >
                    FRIENDS
                  </Text>
                  <Text
                    style={{ color: "#fff", marginTop: screenHeight * 0.005 }}
                  >
                    TIPS{"("}
                    {this.state.tip}
                    {"%)"}
                  </Text>
                </View>
                <View style={styles.parameterValueContainer}>
                  <Animated.Text
                    style={[
                      { color: "#fff", marginTop: screenHeight * 0.025 },
                      { transform }
                    ]}
                  >
                    {"\u20B9"}
                    {this.state.totalBill}
                  </Animated.Text>
                  <Text
                    style={{ color: "#fff", marginTop: screenHeight * 0.005 }}
                  >
                    {this.state.friendCount.toFixed(0)}
                  </Text>
                  <Text
                    style={{ color: "#fff", marginTop: screenHeight * 0.005 }}
                  >
                    {"\u20B9"}
                    {this.getBillWithTip()}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[
              {
                display: this.state.showSplit === true ? "flex" : "none",
                marginHorizontal: screenWidth * 0.05,
                width: screenWidth * 0.9
              }
            ]}
          >
            {this.getScrollList()}
          </ScrollView>

          <View
            style={[
              styles.sliderContainer,
              { display: this.state.showSplit === true ? "none" : "flex" }
            ]}
          >
            <Slider
              value={this.state.friendCount}
              onValueChange={friendCount => this.setState({ friendCount })}
              minimumValue={1}
              maximumValue={10}
              thumbTouchSize={{ width: 40, height: 40 }}
              thumbStyle={{
                height: screenHeight * 0.08,
                width: screenWidth * 0.03,
                borderRadius: 0
              }}
              thumbTintColor="#00d048"
              trackStyle={{
                backgroundColor: "#efefef",
                height: screenHeight * 0.05
              }}
              minimumTrackTintColor="#00d048"
              maximumTrackTintColor="#00d048"
              animateTransitions={true}
              animationType="timing"
            />
          </View>

          <View
            style={[
              styles.tipsButtonContainer,
              { display: this.state.showSplit === true ? "none" : "flex" }
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.setState({ tip: 0 });
              }}
            >
              <View
                style={[
                  styles.tipsButton,
                  {
                    borderColor: this.state.tip === 0 ? "#00d048" : "#B8B8B8",
                    borderWidth: this.state.tip === 0 ? 2 : 1
                  }
                ]}
              >
                <Text style={styles.tipsButtonText}>0%</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ tip: 10 });
              }}
            >
              <View
                style={[
                  styles.tipsButton,
                  {
                    borderColor: this.state.tip === 10 ? "#00d048" : "#B8B8B8",
                    borderWidth: this.state.tip === 10 ? 2 : 1
                  }
                ]}
              >
                <Text style={styles.tipsButtonText}>10%</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ tip: 20 });
              }}
            >
              <View
                style={[
                  styles.tipsButton,
                  {
                    borderColor: this.state.tip === 20 ? "#00d048" : "#B8B8B8",
                    borderWidth: this.state.tip === 20 ? 2 : 1
                  }
                ]}
              >
                <Text style={styles.tipsButtonText}>20%</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ tip: 30 });
              }}
            >
              <View
                style={[
                  styles.tipsButton,
                  {
                    borderColor: this.state.tip === 30 ? "#00d048" : "#B8B8B8",
                    borderWidth: this.state.tip === 30 ? 2 : 1
                  }
                ]}
              >
                <Text style={styles.tipsButtonText}>30%</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.gridContainer,
              { display: this.state.showSplit === true ? "none" : "flex" }
            ]}
          >
            <View style={styles.rowContainer}>
              <View style={styles.gridButtonColOne}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColOne}
                  onPress={() => {
                    this.animate();
                    this.updateBill(1);
                  }}
                >
                  <Text style={styles.buttonText}>1</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButton}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColTwo}
                  onPress={() => {
                    this.animate();
                    this.updateBill(2);
                  }}
                >
                  <Text style={styles.buttonText}>2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButtonColThree}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColThree}
                  onPress={() => {
                    this.animate();
                    this.updateBill(3);
                  }}
                >
                  <Text style={styles.buttonText}>3</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.gridButtonColOne}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColOne}
                  onPress={() => {
                    this.animate();
                    this.updateBill(4);
                  }}
                >
                  <Text style={styles.buttonText}>4</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButton}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColTwo}
                  onPress={() => {
                    this.animate();
                    this.updateBill(5);
                  }}
                >
                  <Text style={styles.buttonText}>5</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButtonColThree}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColThree}
                  onPress={() => {
                    this.animate();
                    this.updateBill(6);
                  }}
                >
                  <Text style={styles.buttonText}>6</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.gridButtonColOne}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColOne}
                  onPress={() => {
                    this.animate();
                    this.updateBill(7);
                  }}
                >
                  <Text style={styles.buttonText}>7</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButton}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColTwo}
                  onPress={() => {
                    this.animate();
                    this.updateBill(8);
                  }}
                >
                  <Text style={styles.buttonText}>8</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButtonColThree}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColThree}
                  onPress={() => {
                    this.animate();
                    this.updateBill(9);
                  }}
                >
                  <Text style={styles.buttonText}>9</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.gridButtonColOne}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColOne}
                  onPress={() => {}}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButton}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColTwo}
                  onPress={() => {
                    this.updateBill(0);
                  }}
                >
                  <Text style={styles.buttonText}>0</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.gridButtonColThree}>
                <TouchableOpacity
                  style={styles.touchableStyleButtonColThree}
                  onPress={() => {
                    this.erase();
                  }}
                >
                  <MaterialCommunityIcons
                    size={screenWidth * 0.07}
                    name="backspace-outline"
                    color={"#EA425C"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setShowSplit();
            }}
          >
            <View
              style={[
                styles.splitButtonContainer,
                {
                  width:
                    this.state.showSplit === true
                      ? screenWidth * 0.2
                      : screenWidth * 0.94,
                  marginHorizontal:
                    this.state.showSplit === true
                      ? screenWidth * 0.4
                      : screenWidth * 0.03,
                  height:
                    this.state.showSplit === true
                      ? screenHeight * 0.05
                      : screenHeight * 0.075,
                  borderTopLeftRadius:
                    this.state.showSplit === true ? screenWidth * 0.3 * 2 : 0,
                  borderTopRightRadius:
                    this.state.showSplit === true ? screenWidth * 0.3 * 2 : 0,
                  marginTop:
                    this.state.showSplit === true ? screenHeight * 0.04 : 0,
                  marginVertical:
                    this.state.showSplit === true ? 0 : screenHeight * 0.01
                }
              ]}
            >
              <Text
                style={[
                  styles.splitButtonText,
                  { display: this.state.showSplit === true ? "none" : "flex" }
                ]}
              >
                SPLIT BILL
              </Text>
              <Entypo
                name="pencil"
                size={responsiveFontSize(2.8)}
                style={{
                  color: "#fff",
                  display: this.state.showSplit === true ? "flex" : "none"
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1
  },
  appNameContainer: {
    alignItems: "flex-start",
    // borderWidth: 2,
    // borderColor: '#000',
    // backgroundColor:"#fff",
    width: screenWidth,
    height: screenHeight * 0.08
  },
  appNameText: {
    color: "#000000",
    fontSize: responsiveFontSize(2.8),
    fontWeight: "500",
    padding: screenWidth * 0.03
    // textAlign: 'left',
  },
  detailContainerBox: {
    width: screenWidth * 0.96,
    // borderWidth: 1,
    // borderColor: '#000',
    flexDirection: "row",
    marginHorizontal: screenWidth * 0.02,
    height: screenHeight * 0.18,
    borderRadius: 8,
    marginTop: screenHeight * 0.01,
    backgroundColor: "#00d048"
  },

  detailContainer: {
    // borderWidth: 1,
    // borderColor: '#fff',
    flexDirection: "row",
    marginHorizontal: screenWidth * 0.03,
    height: screenHeight * 0.16,
    marginVertical: screenHeight * 0.01
  },
  totalContainer: {
    // borderWidth: 1,
    // borderColor: '#fff',
    width: screenWidth * 0.5,
    height: screenHeight * 0.16
  },
  parameterContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: '#fff',
    width: screenWidth * 0.4,
    height: screenHeight * 0.16
  },
  parameterNameContainer: {
    // borderWidth: 1,
    // borderColor: '#fff',
    width: screenWidth * 0.2,
    height: screenHeight * 0.14,
    marginVertical: screenHeight * 0.02
  },
  parameterValueContainer: {
    // borderWidth: 1,
    // borderColor: '#fff',
    width: screenWidth * 0.2,
    height: screenHeight * 0.14,
    marginVertical: screenHeight * 0.02
  },
  sliderContainer: {
    // borderColor: '#000',
    // borderWidth: 1,
    height: screenHeight * 0.1,
    width: screenWidth * 0.9,
    marginHorizontal: screenWidth * 0.05,
    justifyContent: "center",
    marginVertical: screenHeight * 0.025
    // alignItems: 'center',
  },
  tipsButtonContainer: {
    flexDirection: "row",
    // borderColor: '#000',
    // borderWidth: 1,
    // height: screenHeight * 0.05,
    width: screenWidth * 0.9,
    marginHorizontal: screenWidth * 0.05
  },
  tipsButton: {
    borderColor: "#B8B8B8",
    borderWidth: 1,
    width: screenWidth * 0.175,
    marginHorizontal: screenWidth * 0.025,
    height: screenHeight * 0.04,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },

  tipsButtonText: {
    fontWeight: "300"
  },
  splitButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    width: screenWidth * 0.94,
    marginHorizontal: screenWidth * 0.03,
    marginVertical: screenHeight * 0.01,
    backgroundColor: "#00d048",
    height: screenHeight * 0.075
  },
  splitButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "300",
    marginLeft: screenWidth * 0.02
  },
  gridContainer: {
    // flex: 1,
    flexDirection: "column",
    // borderWidth: 2,
    // borderColor: "#000",
    width: screenWidth * 0.8,
    marginHorizontal: screenWidth * 0.1,
    height: screenHeight * 0.36,
    marginVertical: screenHeight * 0.015
  },
  rowContainer: { flexDirection: "row" },
  gridButton: {
    justifyContent: "center",
    alignItems: "center",
    // borderColor: '#000',
    // borderWidth: 1,
    width: screenWidth * 0.26,
    height: screenHeight * 0.09
  },
  gridButtonColOne: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: screenWidth * 0.26,
    height: screenHeight * 0.09
    // borderColor: '#000',
    // borderWidth: 1,
  },
  gridButtonColThree: {
    justifyContent: "center",
    alignItems: "flex-end",
    width: screenWidth * 0.26,
    height: screenHeight * 0.09
    // borderColor: '#000',
    // borderWidth: 1,
  },
  touchableStyleButtonColOne: {
    // borderColor: "#000",
    // borderWidth: 1,
    width: screenHeight * 0.07,
    height: screenHeight * 0.07
  },
  touchableStyleButtonColTwo: {
    // borderColor: "#000",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    width: screenHeight * 0.07,
    height: screenHeight * 0.07
  },
  touchableStyleButtonColThree: {
    // borderColor: "#000",
    // borderWidth: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    width: screenHeight * 0.07,
    height: screenHeight * 0.07
  },

  buttonText: {
    fontSize: responsiveFontSize(3),
    color: "#000",
    fontWeight: "500"
  }
});
