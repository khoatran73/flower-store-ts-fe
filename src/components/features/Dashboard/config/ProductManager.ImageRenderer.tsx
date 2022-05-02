export const ProductManagerImageRenderer = (props: any) => {
    return (
        <div className='grid-cell-image-wrapper'>
            <img src={props.value} className='grid-cell-image' alt='' />
        </div>
    );
};
