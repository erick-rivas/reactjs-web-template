/*
__Seed builder__v0.2.0
  (Read_only) Builder helper
*/

import React from "react";
import cx from "classnames";
import ModalContainer from "@material-ui/core/Modal";
import css from "resources/css/seed/Modal.module.css";

/**
 * Helper component to wrap any component in a modal context
 */

class Modal extends React.Component {

  render() {
    const { component, width, height, animation = "zoomIn" } = this.props;

    let children = []
    if (component != null)
      children = [React.cloneElement(component, {
        onClose: this.onClose,
        match: this.props.match
      })];
    else
      children = React.Children.map(this.props.children,
        (child) => {
          return React.cloneElement(child, {
            onClose: this.onClose,
            match: this.props.match
          });
        });

    const containerStyle = width && height ? {
      width: width + "px",
      marginLeft: -(width / 2) + "px",
      height: height + "px",
      marginTop: -(height / 2) + "px"
    } : {};

    const closeStyle = width && height ? {
      marginLeft: (width - 24) + "px"
    } : {};

    return (
      <ModalContainer
        className={css.module}
        open={true}
        transitionDuration={0}
        onClose={this.onClose}>

        <div className={cx(css.container, "animated", animation)}
          style={containerStyle}>
          <button
            className={css.close}
            style={closeStyle}
            onClick={this.onClose}>
            <i className="fas fa-times"></i>
          </button>
          {children}
        </div>

      </ModalContainer>
    );
  }

  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    if (this.props.onClose == null)
      this.props.history.goBack();
    else this.props.onClose(this.props.match);
  }
}

export default Modal;