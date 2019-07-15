import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SideBar.scss';
import metadata from './metadata';

class SideBar extends Component {
  state = {
    items: {

    },
  };

  componentDidMount() {
    const { type, match } = this.props;
    const items = metadata[type];

    this.setState({
      items: Object.keys(items).reduce((acc, cur) => ({
        ...acc,
        [cur]: {
          ...items[cur],
          active: false,
        },
      }), {}),
    });

    const currentLink = match.path;
    let found = Object.keys(items).find(item => items[item].link === currentLink);

    if (!found) {
      found = Object.keys(items).find(item => items[item].active);
    }
    this.setState(({ items: prevItems }) => ({
      items: {
        ...prevItems,
        [found]: {
          ...prevItems[found],
          active: true,
        },
      },
    }));
  }

  renderItem = ({ label, link, active }) => (
    <div className={`side-bar__item ${active ? 'active' : ''}`}>
      <Link to={link}>
        {label}
      </Link>
    </div>
  );

  render() {
    const { items } = this.state;
    return (
      <div className="side-bar">
        {
          Object.keys(items).map(item => this.renderItem(items[item]))
        }
      </div>
    );
  }
}

SideBar.propTypes = {

};

export default SideBar;