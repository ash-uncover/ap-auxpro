import React from 'react'
import PropTypes from 'prop-types'

import './_carousel.scss'


class Carousel extends React.Component {

    constructor() {
        super(...arguments)

        this.state = {
            previousIndex: 0,
            currentIndex: 0
        }

        this.buildItem = this.buildItem.bind(this)
        this.buildButton = this.buildButton.bind(this)

        this.moveToNextItem = this.moveToNextItem.bind(this)
    }

    /* COMPONENT LIFECYCLE */

    componentDidMount() {
        if (this.props.slideInterval) {
            this.interval = setInterval(() => {
                this.moveToNextItem()
            }, this.props.slideInterval)
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    /* VIEW CALLBACKS */

    moveToNextItem() {
        this.setState((prevState) => ({
            previousIndex: prevState.currentIndex,
            currentIndex: (prevState.currentIndex + 1) % this.props.children.length
        }))
    }
    moveToItem(index) {
        this.setState({
            currentIndex: index % this.props.children.length
        })
    }

    /* RENDERING */

    buildItem(item, index) {
        let className = 'carousel-item'

        if (index === this.state.currentIndex) {
            className += ' current'
        } else if (index > this.state.currentIndex) {
            className += ' next'
        } else {
            className += ' previous'
        }
        if (index !== this.state.currentIndex && index !== this.state.previousIndex) {
            className += ' behind'   
        }

        return (
            <div key={index} className={className}>
                {item}
            </div>
        )
    }
    buildButton(item, index) {
        let className = 'carousel-button'
        
        if (index === this.state.currentIndex) {
            className += ' current'
        }

        return (
            <button 
                key={index} 
                className={className} />
        )
    }

    render() {
        return (
            <div className='carousel'>
                <div className='carousel-items'>
                    {this.props.children.map(this.buildItem)}
                </div>
                {this.props.showButtons ?
                    <div className='carousel-buttons'>
                        {this.props.children.map(this.buildButton)}
                    </div>
                : null }
            </div>
        )
    }
}

Carousel.propTypes = {
    slideInterval: PropTypes.number,
    showButtons: PropTypes.bool
}

Carousel.defaultProps = {
    slideInterval: 0,
    showButtons: false
}

export default Carousel