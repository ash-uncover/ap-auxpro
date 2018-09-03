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

        this.moveToPrevItem = this.moveToPrevItem.bind(this)
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

    moveToPrevItem() {
        const index = (this.state.currentIndex + this.props.children.length - 1) % this.props.children.length
        this.props.onSlideChanged(index)
        this.setState((prevState) => ({
            previousIndex: prevState.currentIndex,
            currentIndex: index
        }))
    }
    moveToNextItem() {
        const index = (this.state.currentIndex + 1) % this.props.children.length
        this.props.onSlideChanged(index)
        this.setState((prevState) => ({
            previousIndex: prevState.currentIndex,
            currentIndex: index
        }))
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
                {this.props.showSlideButtons && this.state.currentIndex !== 0 ?
                    <div 
                        className='carousel-slide-btn carousel-slide-prev'
                        onClick={this.moveToPrevItem}>
                        <span className='glyphicon glyphicon-chevron-left'></span>
                    </div>
                : null }
                {this.props.showSlideButtons && this.state.currentIndex !== this.props.children.length - 1 ?
                    <div 
                        className='carousel-slide-btn carousel-slide-next'
                        onClick={this.moveToNextItem}>
                        <span className='glyphicon glyphicon-chevron-right'></span>
                    </div>
                : null }

            </div>
        )
    }
}

Carousel.propTypes = {
    slideInterval: PropTypes.number,
    showButtons: PropTypes.bool,
    showSlideButtons: PropTypes.bool,

    onSlideChanged: PropTypes.func
}

Carousel.defaultProps = {
    slideInterval: 0,
    showButtons: false,
    showSlideButtons: false,

    onSlideChanged: () => {}
}

export default Carousel