# React-Count-Up
This component will simulate realtime count up.

![N](https://cldup.com/DNnZtNvXYI.gif)]

# Install

```sh
$ npm i react-count-up -S
```

# Usage

```js
import React from 'react';
import { render } from 'react-dom';
import CountUp from 'react-count-up';

render(
    <CountUp value={1000000} interval={5} incrementMin={1} incrementMax={10} />,
    document.getElementById('app')
);
```

# Props

```js
CountUp.defaultProps = {
    className: '',
    value: 0, //Initial value
    interval: 5,
    incrementMin: 1,
    incrementMax: 10,
    cookieName: 'react-count-up',
    localeString: 'pt-BR', //String with a language sensitive representation of this number.
    persistent: false // Save cookie before unload page and init with the last value
};

```

MIT
**Free Software, Hell Yeah!**

