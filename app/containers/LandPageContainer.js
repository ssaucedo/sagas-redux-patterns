import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import ActionLineStyle from 'material-ui/svg-icons/action/line-style';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ActionTimeline from 'material-ui/svg-icons/action/timeline';
import AvReplay from 'material-ui/svg-icons/av/replay';

import {
  MainContainer,
  ContentContainer,
  SidebarContainer,
} from './StyledComponents';

import PatternResolver from './PatternResolver';

class LandPageContainer extends Component {
  render() {
    const style = {
      paper: {
        height: '100%',
        display: 'inline-block',
        float: 'left',
      },
    };

    const { dispatch } = this.props;
    const updatePattern = pattern => () => dispatch({ type: 'CHANGE_PATTERN', payload: { pattern } });
    return (
      <MuiThemeProvider>
        <MainContainer>
          <SidebarContainer>
            <Paper style={style.paper}>
              <Menu>
                <MenuItem
                  onClick={updatePattern('PATTERN_1')}
                  primaryText="Pattern 1"
                  rightIcon={<ActionAutorenew />}
                />

                <MenuItem
                  onClick={updatePattern('PATTERN_2')}
                  primaryText="Pattern 2"
                  rightIcon={<ActionLineStyle />}
                />
                <MenuItem
                  onClick={updatePattern('PATTERN_3')}
                  primaryText="Pattern 3"
                  rightIcon={<ActionTimeline />}
                />
                <MenuItem
                  onClick={updatePattern('PATTERN_4')}
                  primaryText="Pattern 4"
                  rightIcon={<ActionCompareArrows />}
                />
                <MenuItem
                  onClick={updatePattern('PATTERN_6')}
                  primaryText="Pattern 6"
                  rightIcon={<AvReplay />}
                />
              </Menu>
            </Paper>
          </SidebarContainer>
          <ContentContainer>
            <Paper style={{
              ...style.paper,
              width: '100%',
            }}
            >
              <PatternResolver />
            </Paper>
          </ContentContainer>
        </MainContainer>
      </MuiThemeProvider>

    );
  }
}

LandPageContainer.propTypes = {
  dispatch: PropTypes.func,
};


const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(LandPageContainer);
