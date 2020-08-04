import React, { Component } from 'react';

import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  state = {
    show: true,
  };

  static getDerivedStateFromProps(props, state) {
    return (state = {
      show: props.show,
    });
  }

  componentWillUnmount() {
    this.setState({ show: false });
  }

  render() {
    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    };

    const onError = (err) => {
      this.props.transactionError(err);
    };

    const onCancel = (data) => {
      this.props.transactionCanceled(data);
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = this.props.toPay;
    const client = {
      sandbox:
        'AXl9kwlX1zaMqoXejqEXvWNra2wt9cnjTFYxPwiPG1v-9MpVk-n5bh6MBnUn4U5Q_jkH_zZrbpSOGnQV',
      //   production: '',
    };

    return (
      <div>
        {this.state.show ? (
          <PaypalExpressBtn
            env={env}
            currency={currency}
            total={total}
            client={client}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
              size: 'large',
              color: 'blue',
              shape: 'rect',
              label: 'checkout',
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Paypal;
