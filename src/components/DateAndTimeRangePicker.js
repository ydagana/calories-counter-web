import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { DateRangePicker } from "react-date-range";
import TimeRange from "react-time-range";
import moment from "moment";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

class DateAndTimeRangePicker extends Component {
  static propTypes = {
    onRangeChanged: PropTypes.func
  };
  state = {
    isOpen: false,
    buttonText: "Filter by date and time",
    dateRangePicker: {
      selection: {
        startDate: new Date("1970"),
        endDate: new Date(),
        key: "selection"
      }
    },
    startTime: moment().startOf("day"),
    endTime: moment()
      .startOf("day")
      .add(1, "day")
      .add(-1, "hour")
  };

  toggleModal = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onDateRangeChange = payload => {
    this.setState({
      dateRangePicker: {
        ...this.state.dateRangePicker,
        ...payload
      }
    });
  };

  onTimeRangeChange = payload => {
    this.setState({ startTime: payload.startTime, endTime: payload.endTime });
  };

  submitRange = () => {
    const dateTimeRanges = {
      startDate: moment(this.state.dateRangePicker.selection.startDate)
        .startOf("day")
        .toDate(),
      endDate: moment(this.state.dateRangePicker.selection.endDate)
        .endOf("day")
        .toDate()
    };
    let buttonText = "";
    if (dateTimeRanges.startDate.getFullYear() === 1970) {
      buttonText = "Until ";
    } else {
      buttonText = `${moment(
        this.state.dateRangePicker.selection.startDate
      ).format("L")} - `;
    }
    buttonText += moment(this.state.dateRangePicker.selection.endDate).format(
      "L"
    );
    const startHour = moment(this.state.startTime).hour(),
      endHour = moment(this.state.endTime).hour();

    if (startHour !== 0 || endHour !== 23) {
      dateTimeRanges.startTime = startHour;
      dateTimeRanges.endTime = endHour;
      buttonText += `, between ${dateTimeRanges.startTime}:00 & ${
        dateTimeRanges.endTime
      }:59`;
    }
    this.props.onRangeChanged(dateTimeRanges);

    this.setState({ buttonText });
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-outline-secondary mr-2"
          onClick={this.toggleModal}
        >
          {this.state.buttonText}
        </button>

        <Modal
          className="modal-lg"
          isOpen={this.state.isOpen}
          toggle={this.toggleModal}
        >
          <ModalHeader toggle={this.toggleModal}>
            <strong>Select Date and Time Range</strong>
          </ModalHeader>
          <ModalBody>
            <h3>Select Date Range</h3>
            <DateRangePicker
              onChange={this.onDateRangeChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className="PreviewArea"
              months={2}
              ranges={[this.state.dateRangePicker.selection]}
              inputRanges={[]}
              direction="horizontal"
            />
            <h3 className="mt-2">Select Time Range</h3>
            <TimeRange
              minuteIncrement={60}
              startMoment={this.state.startTime}
              endMoment={this.state.endTime}
              onChange={this.onTimeRangeChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="btn-fw btn-fh btn-lg"
              onClick={this.submitRange}
            >
              Select
            </Button>
            <Button
              color="secondary"
              className="btn-fw btn-fh btn-lg"
              onClick={this.toggleModal}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default DateAndTimeRangePicker;
