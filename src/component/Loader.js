import React from 'react';
import { Oval } from 'react-loader-spinner';

function Loader() {
    return (
        <div className='loader'>
            <Oval
                height={80}
                width={80}
                color="#bd9314"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#bd9314"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
        </div>
    );
}

export default Loader;