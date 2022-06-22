import React from 'react'
import spinner from './spinner.gif'


const Spinner = ({ text }) => {
    return (
        // <div>
        //     <img
        //         src={spinner}
        //         style={{ width: '200px', margin: 'auto', display: 'block' }}
        //         alt='Loading...'
        //     />
        // </div>

        // <div className="loadingio-eclipse">
        //     <div className="ldio-rpinwye8j0b">
        //         <div />
        //     </div>
        // </div>

        // <div className="loader mb-5">
        //     <div className="spin" />
        // </div>


        <div className='landing'
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '600px',
                width: '100%'
            }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '500px',
                width: '100%'
            }}>
                <div className="loader mb-5">
                    <div className="spin" />
                </div>
                <p className="ml-3 mb-5 text-white text-center h5">{text}</p>

            </div>
        </div>

    )
}

export default Spinner