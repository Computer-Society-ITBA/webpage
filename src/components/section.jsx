import React from 'react';
import classlist from '../js/classlist';

function Section (props) {
    const alignment = props.textAlignment === 'left' ? 'text-left' : (props.textAlignment === 'right' ? 'text-right' : (props.textAlignment === 'center' ? 'text-center' : ''))
    const bgColor = props.bgColor ? 'bg-' + props.bgColor : 'bg-white'
    const padding = props.padding === 'large' ? 'px-24 py-32' : 'px-12 py-16'
    const size = props.size === 'half' ? 'w-full h-screen-half' : 'h-screen w-full'
    const flex = props.flex === 'col' ? 'flex flex-col' : (props.flex === 'row' ? 'flex flex-row' : '')

    return (
    <section id={props.id} className={classlist([
        alignment,
        bgColor,
        padding,
        size,
        flex,
        props.className
        ])}>
        {props.children}
    </section>
    )
}

export default Section; 