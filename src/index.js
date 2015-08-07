require('./styles/styles.scss');
import React from 'react/addons';
import Root from './components/Root';

var attachElement = document.getElementById('main');
var initialName = "World";
var initialItems = [
        {text: "Build First React App", done: true},
        {text: "Build One Yourself"},
        {text: "Build A Better One"}
];

React.render(<Root name={initialName} items={initialItems} />, attachElement);