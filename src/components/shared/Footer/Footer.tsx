import { FC } from 'react';
import { Link } from 'react-router-dom';

const Footer: FC = () => {
    const footerCategories = [
        {
            name: 'LIÊN KẾT TRANG WEB',
            children: [
                {
                    name: 'Về chúng tôi',
                    link: '',
                },

                {
                    name: 'Đối tác tiêu biểu',
                    link: '',
                },

                {
                    name: 'Cầu hôn cùng chúng tôi',
                    link: '',
                },

                {
                    name: 'Doanh nghiệp',
                    link: '',
                },

                {
                    name: 'Hướng dẫn chăm sóc hoa',
                    link: '',
                },
                {
                    name: 'Blog',
                    link: '',
                },
            ],
        },
        {
            name: 'CHĂM SÓC KHÁCH HÀNG',
            children: [
                {
                    name: 'Liên hệ với chúng tôi',
                    link: '',
                },

                {
                    name: 'Câu hỏi thường gặp',
                    link: '',
                },

                {
                    name: 'Phương thức thanh toán',
                    link: '',
                },

                {
                    name: 'Lưu ý chính',
                    link: '',
                },

                {
                    name: 'Chính sách bảo mật',
                    link: '',
                },
                {
                    name: 'Các điều khoản chi tiết',
                    link: '',
                },
            ],
        },
        {
            name: 'Bạn có câu hỏi?',
            children: [
                {
                    name: 'Thứ Hai - Chủ Nhật',
                    content: '(9:00 - 18:00)',
                    link: '',
                },

                {
                    name: 'Hotline:',
                    content: '1900 63 35 37',
                    link: '',
                },

                {
                    name: 'Facebook: ',
                    content: '1900 63 35 37',
                    link: '',
                },

                {
                    name: 'Facebook: ',
                    link: '',
                },

                {
                    name: 'Email: ',
                    content: 'khoa@gmail.com',
                    link: '',
                },
            ],
        },
    ];

    return (
        <div className='bg-gray-300 mt-20  p-6'>
            <div className='flex justify-between'>
                <div>
                    <img
                        className='w-[180px]'
                        src='https://d1kwj86ddez2oj.cloudfront.net/14052020/c6Bg8DmWut8COQbz88b2PB9Yd4Rb3QLMXCPg2gah.jpg'
                        alt='Logo'
                    />
                    <div className='text-2xl mt-6'>
                        Hasu thay bạn trao lời yêu thương !
                    </div>
                    <div className='text-md mt-2'>
                        Hasu thay bạn trao lời yêu thương !
                    </div>
                </div>
                <div className='flex justify-between ml-10'>
                    {footerCategories.map((item, index) => (
                        <div className='ml-14'>
                            <div
                                className='text-xl font-semibold uppercase mb-2'
                                key={index}
                            >
                                {item.name}
                            </div>
                            <ul>
                                {item.children.map((child, i) => (
                                    <li className='py-1'>
                                        {child.content ? (
                                            <>
                                                <span>{child.name}</span>
                                                <strong className='ml-1'>
                                                    {child.content}
                                                </strong>
                                            </>
                                        ) : (
                                            <Link to={child.link} key={i}>
                                                {child.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className='mt-4 flex justify-center'>© 2022 FlowerStore</div>
        </div>
    );
};

export default Footer;
