import { StyleSheet, Dimensions } from "react-native";
const TEXT_FONT = "Avenir";
const { scale, width } = Dimensions.get("window");
let iconSize = 22;
let resultFontSize = 18;
let weekTextFontSize = 16;
let slashLength = 80;
if (width < 350) {
  resultFontSize = 20;
  weekTextFontSize = 14;
  iconSize = 20;
  slashLength = 70;
}

export default StyleSheet.create({
  container: {
    flex: 1
  },
  ctrl: {
    flex: 1.5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15
  },
  result: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  resultSlash: {
    width: 1 / scale,
    height: slashLength
    // transform: [
    //   {
    //     rotateZ: '-45deg'
    //   }
    // ]
  },
  commonText: {
    fontFamily: TEXT_FONT
  },
  resultPart: {
    flex: 1
  },
  resultText: {
    fontSize: resultFontSize,
    marginVertical: 4,
    fontWeight: "bold",
    fontFamily: TEXT_FONT
  },
  clearText: {
    fontSize: 18,
    fontFamily: TEXT_FONT,
    fontWeight: "400"
  },
  startText: {
    textAlign: "left"
  },
  endText: {
    textAlign: "left"
  },
  week: {
    flex: 1,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  weekText: {
    flex: 1,
    fontSize: weekTextFontSize,
    textAlign: "center",
    fontFamily: TEXT_FONT
  },
  scroll: {
    flex: 9,
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  scrollArea: {
    flex: 1
  },
  btn: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  confirmContainer: {
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.40)",
    borderRadius: 4,
    margin: 10,
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  confirmContainerDisabled: {
    backgroundColor: "rgba(255, 255, 255, 0.20)"
  },
  confirmText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: TEXT_FONT
  },
  confirmTextDisabled: {
    color: "rgba(255, 255, 255, 0.40)"
  },
  closeIcon: {
    width: iconSize,
    height: iconSize,
    color: "black"
  }
});
