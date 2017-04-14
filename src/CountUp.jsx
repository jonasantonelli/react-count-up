import React, { PropTypes } from 'react';
import Cookie from 'js-cookie';

class CountUp extends React.Component {

    constructor(props){
        super(props);

        const cookie = Math.abs(Cookie.get(this.props.cookieName));
        const currentValue = cookie > this.props.value ? cookie : this.props.value;

        this.state = {
            value: currentValue
        };

        this.newValue = null;
        this.requestAnimationID = 0;
        this.timeoutID = 0;

        this.loop = this.loop.bind(this);
        this.animate = this.animate.bind(this);
        this.updateNumbers = this.updateNumbers.bind(this);

        window.onbeforeunload = this.unload.bind(this);
    }

    componentDidMount() {
        this.loop();
    }

    unload() {
        Cookie.set(this.props.cookieName, this.state.value);
    }

    loop(){
        clearInterval(this.timeoutID);
        const interval = parseInt(this.props.interval) || 1,
              rand = Math.round(Math.random() * (10000 - 500)) + 500;

        this.timeoutID = setTimeout(() => {
            this.animate();
        }, interval * rand);
    }

    updateNumbers() {
        const value = this.state.value + 1;
        this.setState({
            value
        });
        if(this.newValue && value < this.newValue) {
            this.requestAnimationID = window.requestAnimationFrame(this.updateNumbers);
        }
        else {
            window.cancelAnimationFrame(this.requestAnimationID);
            this.requestAnimationID = null;
            this.loop();
        }
    }

    animate() {
        const { incrementMin, incrementMax } = this.props;
        let randomValue = this.state.value + (Math.round(Math.random() * (incrementMax - incrementMin)) + incrementMin);
        if (randomValue === this.state.value || (randomValue - 1) === this.state.value) {
            this.setState({
                value: ++randomValue
            });
        }
        this.newValue = randomValue;
        this.requestAnimationID = window.requestAnimationFrame(this.updateNumbers);
    }

    render() {
        return (
            <span className={`count-up ${this.props.className}`}>
                { this.state.value.toLocaleString(this.props.localeString) }
            </span>
        );
    }
}

CountUp.propTypes = {
    className: PropTypes.string,
    value: PropTypes.number,
    interval: PropTypes.number,
    incrementMin: PropTypes.number,
    incrementMax: PropTypes.number,
    cookieName: PropTypes.string,
    localeString: PropTypes.string
};

CountUp.defaultProps = {
    className: '',
    value: 0, //Initial value
    interval: 5, // Times random seconds = interval * random / 1000
    incrementMin: 1,
    incrementMax: 10,
    cookieName: 'react-count-up',
    localeString: 'pt-BR'
};

export default CountUp;
