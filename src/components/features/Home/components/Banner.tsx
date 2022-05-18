import React from 'react';

export const Banner = () => {
    return (
        <div className='flex mt-18 mb-24 '>
            <div className='relative w-1/3'>
                <img
                    src='https://file.hstatic.net/200000270019/file/1_e40575a52de74e8aadf8010ef6f6d5b5.png'
                    alt=''
                />
                <div className='absolute w-full py-0 px-12 bottom-12 text-white'>
                    <div className='text-md'>Tốt cho bạn</div>
                    <div className='text-xl font-semibold py-2'>
                        Hoa tươi giá tốt
                    </div>
                    <button
                        className='custom-button'
                        style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    >
                        Xem thêm
                    </button>
                </div>
            </div>
            <div className='relative w-1/3'>
                <img
                    src='https://file.hstatic.net/200000270019/file/2_29abea61f0b34796ac07c1333899ea4b.png'
                    alt=''
                />
                <div className='absolute w-full py-0 px-12 bottom-12 text-white'>
                    <div className='text-md'>Tốt cho bạn</div>
                    <div className='text-xl font-semibold py-2'>
                        Hoa tươi giá tốt
                    </div>
                    <button
                        className='custom-button'
                        style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    >
                        Xem thêm
                    </button>
                </div>
            </div>
            <div className='relative w-1/3'>
                <img
                    src='https://file.hstatic.net/200000270019/file/3_b73c1c853a394e64984b79f7cf40141a.png'
                    alt=''
                />
                <div className='absolute w-full py-0 px-12 bottom-12 text-white'>
                    <div className='text-md'>Tốt cho bạn</div>
                    <div className='text-xl font-semibold py-2'>
                        Hoa tươi giá tốt
                    </div>
                    <button
                        className='custom-button'
                        style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    >
                        Xem thêm
                    </button>
                </div>
            </div>
        </div>
    );
};
