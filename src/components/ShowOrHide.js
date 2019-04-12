import React, { useState, useImperativeHandle } from 'react'

const ShowOrHide = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideIfVisible = { display: visible ? 'none' : ''}
    const showIfVisible = { display: visible ? '' : 'none'}

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => { 
        return { 
            toggleVisibility 
        }
    })

    return (
        <div>
            <div style={hideIfVisible}>
                <button className="btn btn-primary" onClick={toggleVisibility}>{props.btnLabel}</button>
            </div>
            <div style={showIfVisible}>
                {props.children}
                <button className="btn btn-primary my-md-2" onClick={toggleVisibility}>Cancel</button>
            </div>
        </div>
    )
})

export default ShowOrHide