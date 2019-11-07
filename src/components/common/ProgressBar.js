import "rc-progress/assets/index.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Line, Circle } from "rc-progress";

export class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
    };
    this.increase = this.increase.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount() {
    this.increase();
  }

  increase() {
    const { percent } = this.state;
    const newPercent = percent + 1;
    if (newPercent >= 100) {
      clearTimeout(this.tm);
      return;
    }
    this.setState({ percent: newPercent });
    this.tm = setTimeout(this.increase, 10);
  }

  restart() {
    clearTimeout(this.tm);
    this.setState({ percent: 0 }, () => {
      this.increase();
    });
  }

  render() {
    const { percent } = this.state;

    return (
      <>
        <Line strokeWidth="2" percent={percent} strokeColor="#087b94" />
      </>
    );
  }
}
