import React from 'react';
import classlist from '../js/classlist';
import { Link } from "react-router-dom";

const class_outlined = 'px-4 py-2 transition duration-300 text-brand_primary hover:text-white hover:bg-brand_primary focus:text-white focus:bg-brand_primary focus:outline-none rounded border-2 border-brand_primary'
const class_outlined_dark = 'px-4 py-2 transition duration-300 text-typography_primary hover:text-white hover:bg-typography_primary focus:text-white focus:bg-typography_primary focus:outline-none rounded border-2 border-typography_primary'
const class_full_primary = 'px-4 py-2 transition duration-300 text-white bg-brand_primary hover:bg-brand_secondary focus:bg-brand_secondary rounded focus:outline-none'

function LinkButton (props) {
    let className = ''
    switch (props.type) {
        case 'outlined':
            className = class_outlined
        break;
        case 'outlined-dark':
            className = class_outlined_dark
        break;
        case 'full-primary':
            className = class_full_primary
        break;
        default:
            className = class_outlined
    }

    if (props.external) {
        return (
            <a href={props.href} target="_blank" rel="noopener noreferrer" className={classlist([
                className,
                props.className
                ])}>
                {props.text}
            </a>
            )
    } else {
        return (
            <Link to={props.href} className={classlist([
                className,
                props.className
                ])}>
                {props.text}
            </Link>
            )
    }
}

export default LinkButton; 
