import React, { Component } from 'react';

// MATERIAL UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/fontawesome-free-solid';

class CollapsedRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: '0',
    };
  }

  componentDidMount() {
    this.setState({
      open: this.props.initState,
    });
  }

  generateAngle = () => (
    <FontAwesomeIcon icon={this.state.open ? faAngleUp : faAngleDown} />
  );

  renderList = (prices) =>
    prices
      ? prices.map((price) => (
          <FormControlLabel
            key={price._id}
            control={<Radio />}
            label={price.name}
            value={`${price._id}`}
          />
        ))
      : null;

  handleChange = (e) => {
    this.setState({ value: e.target.value }, () => {
      this.props.handleFileters(this.state.value);
    });
  };

  render() {
    return (
      <div>
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            button
            style={{ padding: '10px 23px 10px 0' }}
            onClick={() =>
              this.setState((prvState) => {
                return { open: !prvState.open };
              })
            }
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.generateAngle()}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <FormControl component="fieldset">
              <RadioGroup
                aria_label="price"
                name="price"
                value={this.state.value}
                onChange={this.handleChange}
              >
                {this.renderList(this.props.list)}
              </RadioGroup>
            </FormControl>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapsedRadio;
