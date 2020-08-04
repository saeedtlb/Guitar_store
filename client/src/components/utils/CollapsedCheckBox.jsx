import React, { Component } from 'react';

// MATERIAL UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/fontawesome-free-solid';

class CollapsedCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checked: [],
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

  handleChange = (id) => {
    const { checked } = this.state;
    const newChecked = [...checked];

    const currentIndex = newChecked.indexOf(id);

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState(
      {
        checked: newChecked,
      },
      () => {
        this.props.handleFileters(newChecked);
      }
    );
  };

  renderList = (brands) =>
    brands
      ? brands.map((value) => (
          <ListItem
            button
            key={value._id}
            onClick={() => this.handleChange(value._id)}
          >
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={() => this.handleChange(value._id)}
                checked={
                  this.state.checked.indexOf(value._id) !== -1 ? true : false
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : '';

  render() {
    const { title, list } = this.props;
    return (
      <div className="collapse_items_wrapper">
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
            <ListItemText primary={title} className="collapse_title" />
            {this.generateAngle()}
          </ListItem>

          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div">{this.renderList(list)}</List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapsedCheckBox;
