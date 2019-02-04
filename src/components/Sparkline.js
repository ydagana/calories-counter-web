// SPARKLINE
// -----------------------------------
import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";
// Sparklines
import "jquery-sparkline/jquery.sparkline.min.js";

const RESIZE_EVENT = "resize.sparkline";

/**
 * Wrapper for for jquery-sparkline plugin
 */
export default class Sparkline extends Component {
  static propTypes = {
    /** sparkline options object */
    options: PropTypes.object.isRequired,
    /** tag to use, defaults to div */
    tag: PropTypes.string,
    /** values to display, allows array or csv string */
    values: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.array.isRequired
    ])
  };

  static defaultProps = {
    options: {},
    tag: "div"
  };

  state = {
    values: this.props.values,
    options: this.props.options
  };

  normalizeParams() {
    let { options, values } = this.props;

    options.disableHiddenCheck = true; // allow draw when initially is not visible
    options.type = options.type || "bar"; // default chart is bar
    if (options.colorMap) {
      options.colorMap = $.range_map(options.colorMap);
    }
    values = Array.isArray(values) ? values : values.split(","); // support array of csv strings

    this.setState({ options, values });
  }

  componentDidMount() {
    // init sparkline
    $(this.element).sparkline(this.state.values, this.state.options);

    // allow responsive
    if (this.state.options.resize) {
      $(window).on(RESIZE_EVENT, () => {
        $(this.element).sparkline(this.state.values, this.state.options);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.values !== this.props.values) {
      $(this.element).sparkline("destroy");
      this.setState({ values: this.props.values, options: this.props.options });
      setTimeout(() => {
        this.normalizeParams();
        $(this.element).sparkline(this.state.values, this.state.options);
      }, 0);
    }
  }

  componentWillUnmount() {
    $(window).off(RESIZE_EVENT);
    $(this.element).sparkline("destroy");
  }

  setRef = node => {
    this.element = node;
  };

  render() {
    const { tag: Tag } = this.props;
    return <Tag ref={this.setRef} {...this.props} />;
  }
}
