import React from 'react';
import { render } from 'react-dom';
import CountUp from './CountUp.jsx';

render(
    <CountUp value={1000000} interval={5} incrementMin={1} incrementMax={10} />,
    document.getElementById('app')
);
