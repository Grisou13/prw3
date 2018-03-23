/**
 * Created by Thomas on 04.05.2017.
 */
import React from 'react';

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';
import Dispatcher from 'redux-devtools-dispatch';
import MultipleMonitors from 'redux-devtools-multiple-monitors';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

import * as data from '../actions/taxData'
import * as form from '../actions/taxForm'

const actionCreators = Object.assign({}, data, form)
// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
    // Monitors are individually adjustable with props.
    // Consult their repositories to learn about those props.
    // Here, we put LogMonitor inside a DockMonitor.
    // Note: DockMonitor is visible by default.
    <DockMonitor toggleVisibilityKey='ctrl-alt-h'
                 changePositionKey='ctrl-q'
                 defaultIsVisible={true}>
    <MultipleMonitors>
      <LogMonitor />
      <Dispatcher actionCreators={actionCreators}/>
    </MultipleMonitors>
    </DockMonitor>
);

export default DevTools;
