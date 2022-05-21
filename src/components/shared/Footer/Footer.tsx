import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

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
        <div className='bg-white p-6 border-y border-gray-200'>
            <Container>
                <div className='flex justify-between'>
                    <div>
                        <img
                            src='https://res.cloudinary.com/dqrkqvtjg/image/upload/v1651974807/Flower-store/logo_otxw9r.webp'
                            alt=''
                        />
                        <div className='text-xl mt-6 font-semibold'>
                            FlowerStore thay bạn trao lời yêu thương !
                        </div>
                        <div className='text-md mt-2'>
                            Shop hoa tươi uy tín - chất lượng - giá ưu đãi
                        </div>
                    </div>
                    <div className='flex justify-between '>
                        <div className='ml-14'>
                            <div className='text-xl font-medium  mb-2'>
                                Find us at:
                            </div>
                            <ul>
                                <li className='py-1'>
                                    <div className='flex'>
                                        <LocationOnIcon fontSize='small' />
                                        <div className='ml-1'>
                                            Quận 7, TP HCM
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <PhoneIcon fontSize='small' />
                                        <div className='ml-1'>0865 997 531</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <iframe
                            title='page'
                            src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftonducthanguniversity&tabs=timeline&width=500&height=200&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=313007600488566'
                            width='500'
                            height='200'
                            scrolling='no'
                            allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'
                        ></iframe>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
