/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from "react-native";
import { Button, Icon } from "native-base";
import Moment from "moment";
import styles from "./CalendarStyle";
import MonthList from "./MonthList";

export default class Calendar extends Component {
  static propTypes = {
    i18n: PropTypes.string,
    format: PropTypes.string,
    customI18n: PropTypes.object,
    color: PropTypes.object,
    minDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date)
    ]),
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
  };
  static defaultProps = {
    format: "YYYY-MM-DD",
    i18n: "en",
    customI18n: {},
    color: {}
  };
  static I18N_MAP = {
    zh: {
      w: ["", "一", "二", "三", "四", "五", "六", "日"],
      weekday: [
        "",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      text: {
        start: "开 始",
        end: "结 束",
        date: "日 期",
        save: "保 存",
        clear: "清除"
      },
      date: "M月D日"
    },
    en: {
      w: ["", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
      weekday: [
        "",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      text: {
        start: "Start",
        end: "End",
        date: "Date",
        save: "Save",
        clear: "Reset"
      },
      date: "DD MMMM YYYY"
    },
    jp: {
      w: ["", "月", "火", "水", "木", "金", "土", "日"],
      weekday: [
        "",
        "月曜日",
        "火曜日",
        "水曜日",
        "木曜日",
        "金曜日",
        "土曜日",
        "日曜日"
      ],
      text: {
        start: "スタート",
        end: "エンド",
        date: "時　間",
        save: "確　認",
        clear: "クリア"
      },
      date: "M月D日"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      firstView: 90,
      secondView: 100
    };
    this._today = Moment();
    this._year = this._today.year();
    this._i18n = this._i18n.bind(this);
    this._getDateRange = this._getDateRange.bind(this);
    this._onChoose = this._onChoose.bind(this);
    this._resetCalendar = this._resetCalendar.bind(this);
    this.close = this.close.bind(this);
    this.cancel = this.cancel.bind(this);
    this.open = this.open.bind(this);
    this.clear = this.clear.bind(this);
    this.confirm = this.confirm.bind(this);

    this._getDateRange();
  }
  componentDidMount() {
    this._resetCalendar();
  }
  _i18n(data, type) {
    const { i18n, customI18n } = this.props;
    if (~["w", "weekday", "text"].indexOf(type)) {
      return (
        (customI18n[type] || {})[data] || Calendar.I18N_MAP[i18n][type][data]
      );
    }
    if (type === "date") {
      return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type]);
    }
  }
  _resetCalendar() {
    const { startDate, endDate, format } = this.props;
    let start = Moment(startDate, format);
    let end = Moment(endDate, format);
    let isStartValid =
      start.isValid() && start >= this._minDate && start <= this._maxDate;
    let isEndValid =
      end.isValid() && end >= this._minDate && end <= this._maxDate;
    this.setState({
      startDate: isStartValid ? start : null,
      startDateText: isStartValid ? this._i18n(start, "date") : "",
      startWeekdayText: isStartValid
        ? this._i18n(start.isoWeekday(), "weekday")
        : "",
      endDate: isEndValid ? end : null,
      endDateText: isEndValid ? this._i18n(end, "date") : "",
      endWeekdayText: isEndValid ? this._i18n(end.isoWeekday(), "weekday") : ""
    });
  }
  _getDateRange() {
    const { maxDate, minDate, format } = this.props;
    let max = Moment(maxDate, format);
    let min = Moment(minDate, format);
    let maxValid = max.isValid();
    let minValid = min.isValid();
    if (!maxValid && !minValid) {
      max = Moment().add(3, "months");
      min = Moment();
    }
    if (!maxValid && minValid) {
      max = min.add(3, "months");
    }
    if (maxValid && !minValid) {
      min = max.subtract(3, "months");
    }
    if (min.isSameOrAfter(max)) return {};
    this._minDate = min;
    this._maxDate = max;
  }
  _onChoose(day) {
    const { startDate, endDate } = this.state;
    if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
      this.setState({
        startDate: day,
        endDate: null,
        startDateText: this._i18n(day, "date"),
        startWeekdayText: this._i18n(day.isoWeekday(), "weekday"),
        endDateText: "",
        endWeekdayText: ""
      });
    } else if (startDate && !endDate && day > startDate) {
      this.setState({
        endDate: day,
        endDateText: this._i18n(day, "date"),
        endWeekdayText: this._i18n(day.isoWeekday(), "weekday")
      });
    }
  }
  cancel() {
    this.close();
    this._resetCalendar();
  }
  close() {
    this.setState({
      isModalVisible: false
    });
  }
  open() {
    this.setState({
      isModalVisible: true
    });
  }
  clear() {
    this.setState({
      startDate: null,
      endDate: null,
      startDateText: "",
      startWeekdayText: "",
      endDateText: "",
      endWeekdayText: ""
    });
  }
  confirm() {
    const { startDate, endDate } = this.state;
    let startMoment = startDate ? startDate.clone() : null;
    let endMoment = endDate ? endDate.clone() : null;
    this.props.onConfirm &&
      this.props.onConfirm({
        startDate: startMoment ? startMoment.toDate() : null,
        endDate: endMoment ? endMoment.toDate() : null,
        startMoment,
        endMoment
      });
    this.close();
  }
  render() {
    const {
      startDate,
      endDate,
      startDateText,
      startWeekdayText,
      endDateText,
      endWeekdayText
    } = this.state;
    const {
      mainColor = "#15aaaa",
      subColor = "blue",
      mainFont = "#000000",
      subFont = "#000000",
      mainBackColor = "#fff",
      buttonBackColor = "#11A7F7",
      borderColor = "rgba(255, 255, 255, 0.0)"
    } = this.props.color;

    let color = { mainColor, subColor, borderColor };
    let buttonBack = { backgroundColor: buttonBackColor };
    let mainBack = { backgroundColor: mainBackColor };
    let subBack = { backgroundColor: subColor };
    let mainFontColor = { color: mainFont };
    let subFontColor = { color: subFont };
    let isValid = !startDate || endDate;
    let isClearVisible = startDate || endDate;

    return (
      <Modal
        animationType={"slide"}
        visible={this.state.isModalVisible}
        onRequestClose={this.close}
      >
        <View style={[styles.container, mainBack]}>
          <View style={[styles.ctrl]}>
            {isClearVisible && (
              <TouchableHighlight
                underlayColor="transparent"
                activeOpacity={0.8}
                onPress={this.clear}
              >
                <Text style={[styles.clearText, subFontColor]}>
                  {this._i18n("clear", "text")}
                </Text>
              </TouchableHighlight>
            )}
            <Icon
              type="EvilIcons"
              name="close"
              style={{ position: "absolute", right: 20 }}
              onPress={this.cancel}
            />
          </View>
          <View style={[styles.result, { marginTop: 5 }]}>
            <View
              style={[
                styles.resultPart,
                {
                  padding: 10,
                  paddingLeft: 20,
                  borderColor: "#11A7F7",
                  borderWidth: 1,
                  height: this.state.firstView,
                  justifyContent: "center"
                }
              ]}
            >
              <Text
                style={[{ color: "grey", fontSize: 14 }, styles.commonText]}
              >
                {this._i18n("start", "text") + " " + this._i18n("date", "text")}
              </Text>
              <Text
                style={[
                  styles.resultText,
                  styles.startText,
                  subFontColor,
                  { color: "#11A7F7", fontSize: 20 }
                ]}
              >
                {startDateText || "-- --- ----"}
              </Text>
            </View>
            {/* <View style={[styles.resultSlash, subBack]}/> */}
            <View
              style={[
                styles.resultPart,
                buttonBack,
                {
                  padding: 10,
                  paddingLeft: 20,
                  borderColor: buttonBack.backgroundColor,
                  borderWidth: 1,
                  height: this.state.firstView,
                  justifyContent: "center"
                }
              ]}
            >
              <Text
                style={[{ color: "white", fontSize: 14 }, styles.commonText]}
              >
                {this._i18n("end", "text") + " " + this._i18n("date", "text")}
              </Text>
              <Text
                style={[
                  styles.resultText,
                  styles.endText,
                  { color: "white", fontSize: 20 }
                ]}
              >
                {endDateText || "-- --- ----"}
              </Text>
            </View>
          </View>
          <View style={styles.week}>
            {[7, 1, 2, 3, 4, 5, 6].map(item => (
              <Text style={[styles.weekText, { color: "grey" }]} key={item}>
                {this._i18n(item, "w")}
              </Text>
            ))}
          </View>
          <View style={[styles.scroll, { borderColor }]}>
            <MonthList
              today={this._today}
              minDate={this._minDate}
              maxDate={this._maxDate}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChoose={this._onChoose}
              i18n={this.props.i18n}
              color={color}
            />
          </View>
          {isValid ? (
            <Button
              block
              style={[
                styles.bgBlue,
                { marginHorizontal: 20, marginVertical: 20 }
              ]}
              onPress={this.confirm}
            >
              <Text
                ellipsisMode="tail"
                numberOfLines={1}
                style={[styles.confirmText, { color: "white", padding: 10 }]}
              >
                {this._i18n("save", "text")}
              </Text>
            </Button>
          ) : (
            <Button block disabled>
              <Text
                ellipsisMode="tail"
                numberOfLines={1}
                style={[
                  styles.confirmText,
                  styles.confirmTextDisabled,
                  { color: "white" }
                ]}
              >
                {this._i18n("save", "text")}
              </Text>
            </Button>
          )}
        </View>
      </Modal>
    );
  }
}
