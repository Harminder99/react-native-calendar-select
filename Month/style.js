import {
  StyleSheet,
  Dimensions
} from 'react-native';
const TEXT_FONT = "Avenir";
const {scale, width} = Dimensions.get('window');

export default StyleSheet.create({
  month: {
    paddingTop: 15,
    paddingBottom: 10
  },
  monthTitle: {
    paddingHorizontal: 20
  },
  commonText:{
    fontFamily: TEXT_FONT
  },
  monthTitleText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '500'
  },
  dayRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 5
  }
});
