import React from 'react';
import classlist from '../js/classlist';

function Section (props) {
    const alignment = props.textAlignment === 'left' ? 'text-left' : (props.textAlignment === 'right' ? 'text-right' : (props.textAlignment === 'center' ? 'text-center' : ''))
    const bgColor = props.bgColor ? props.bgColor : 'bg-white'
    const padding = props.padding === 'large' ? 'px-12 py-18 sm:px-24 sm:py-32' : (props.padding === 'no' ? '' : 'px-8 py-12 sm:px-12 sm:py-16')
    const size = props.size === 'half' ? 'sm:w-full sm:h-screen-half' : (props.size === 'almost' ? 'sm:h-screen-3/4 sm:w-full' : (props.size === 'third' ? 'sm:h-screen-third sm:w-full' : 'sm:h-screen sm:w-full'))
    const sizeLg = props.sizeLg === 'half' ? 'lg:w-full lg:h-screen-half' : (props.sizeLg === 'almost' ? 'lg:h-screen-3/4 lg:w-full' : (props.size === 'third' ? 'lg:h-screen-third lg:w-full' : 'lg:h-screen lg:w-full'))
    const sizeMobile = props.sizeMobile === 'half' ? 'w-full h-screen-half' : (props.sizeMobile === 'almost' ? 'h-screen-3/4 w-full' : (props.size === 'third' ? 'h-screen-third w-full' :'h-screen w-full'))
    const flex = props.flex === 'col' ? 'flex flex-col' : (props.flex === 'row' ? 'flex flex-row' : (props.flex === 'only' ? 'flex' : ''))

    return (
    <section id={props.id} className={classlist([
        alignment,
        bgColor,
        padding,
        size,
        sizeLg,
        sizeMobile,
        flex,
        props.className
        ])}>
        {props.children}
    </section>
    )
}

export default Section; 