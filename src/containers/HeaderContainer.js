import React from 'react';
import { withRouter } from 'react-router-dom';

import AttributeSelection from '../components/AttributeSelection';

import {
  getCurrentLanguage,
  changeLanguage,
  changeCurrency,
  getCurrentCurrency,
} from '../services/attribute-service';

import languages from '../utils/languageList';
import currencies from '../utils/currencyList';

const selectAttributeMapper = {
  language: {
    getCurrentValue: getCurrentLanguage,
    changeValue: changeLanguage,
    listOfValues: languages,
  },
  currency: {
    getCurrentValue: getCurrentCurrency,
    changeValue: changeCurrency,
    listOfValues: currencies,
  },
};

class HeaderContainer extends React.Component {
  onClick = () => {
    this.props.history.push('/');
  };

  render() {
    const {
      location: { pathname },
    } = this.props;
    return (
      <div className="top-bar-container">
        {pathname !== '/' && (
          <div onClick={this.onClick} className="top-bar__back">
            <i className="fa fa-angle-left" />
          </div>
        )}
        <div className="top-bar__selection">
          {_.map(selectAttributeMapper, (attributes, type) => {
            const { getCurrentValue, changeValue, listOfValues } = attributes;
            return (
              <div className="attribute" key={type}>
                <AttributeSelection
                  getCurrentValue={getCurrentValue}
                  changeValue={changeValue}
                  listOfValues={listOfValues}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderContainer);
