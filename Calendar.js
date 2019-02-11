/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  Modal,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from "react-native";
import Moment from "moment";
import styles from "./CalendarStyle";
import MonthList from "./MonthList";
const ICON = {
  close:
    "data:image/png;base64,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"
};
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
          <View style={styles.ctrl}>
            <TouchableHighlight
              underlayColor="transparent"
              onPress={this.cancel}
            >
              <Image
                style={styles.closeIcon}
                source={{ uri: ICON.close }}
                resizeMode="cover"
              />
            </TouchableHighlight>
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
          </View>
          <View style={[styles.result, { marginTop: 10 }]}>
            <View
              style={[
                styles.resultPart,
                {
                  padding: 10,
                  borderColor: "grey",
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
              <Text style={[styles.resultText, styles.startText, subFontColor]}>
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
                style={[styles.resultText, styles.endText, { color: "white" }]}
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
          <View style={styles.btn}>
            {isValid ? (
              <TouchableHighlight
                underlayColor="rgba(255, 255, 255, 0.45)"
                style={[styles.confirmContainer, buttonBack]}
                onPress={this.confirm}
              >
                <View style={styles.confirmBtn}>
                  <Text
                    ellipsisMode="tail"
                    numberOfLines={1}
                    style={[
                      styles.confirmText,
                      { color: "white", padding: 10 }
                    ]}
                  >
                    {this._i18n("save", "text")}
                  </Text>
                </View>
              </TouchableHighlight>
            ) : (
              <View
                style={[
                  styles.confirmContainer,
                  styles.confirmContainerDisabled,
                  buttonBack
                ]}
              >
                <View style={styles.confirmBtn}>
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
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}
