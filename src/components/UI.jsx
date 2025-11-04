import tw from 'tailwind-styled-components';

export const FlexColumn = tw.div`
    flex
    flex-col
    items-center
    w-full
`;

export const FlexColStart = tw.div`
    flex
    flex-col
    items-start
    w-full
    gap-2
`;

export const FlexRow = tw.div`
    flex 
    items-center 
    gap-2
`;

export const GridContainer = tw.div`
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-5
    gap-2
    p-4
`;

export const PageContainer = tw.div`
    pt-24
    max-w-[1800px]
    mx-auto
    
`;

export const ProductDetailsContainer = tw.div`
    flex
    flex-col
    items-start
    
    p-4
    rounded-md
    lg:w-1/2
    w-full
    bg-gray-200
    dark:bg-gray-800
    max-h-[600px]
`;

export const AddToCartButton = tw.button`
    bg-black 
    rounded-md 
    my-2 p-2 
    text-white 
    w-1/3 
    flex 
    items-center 
    justify-center 
    gap-2 
    hover:bg-black/90 
    transition 
    duration-300
`;

export const StyledInput = tw.input`
    border-2 
    border-gray-400 
    p-2 
    rounded-md 
    w-full 
    my-1
`;

export const StyledTextArea = tw.textarea`
    border-2 
    border-gray-400 
    p-2 
    rounded-md 
    w-full 
    my-1
`;

export const ItemCard = tw.div`
    flex
    flex-col
    w-full
    shadow-md
    shadow-black/20
    rounded-md
    dark:bg-gray-800
    bg-gray-200
`;

export const ProductCardDetails = tw.div`
    flex
    flex-col
    items-start
    p-3
    gap-1
    w-full
`;

export const ProductImage = tw.img`
    rounded-t-md
    w-full
    h-[300px]
    object-cover
`;

export const ViewProductButton = tw.button`
    bg-primary
    text-secondary
    p-2 
    rounded-md
    hover:bg-primary/70
    transition
    duration-300
    w-full
    font-bold
    cursor-pointer
`;

export const MapContainer = tw.div`
    relative 
    h-full 
    supports-[height:100cqh]:h-[100cqh]
    supports-[height:100svh]:h-[100svh]
`;

export const CategoryGrid = tw.div`
    grid
    xs:grid-cols-1
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-5
    gap-4
    p-4
    m-4
`;

export const CategoryGridContainer = tw.div`
    grid
    grid-cols-2
    gap-4
    p-4
`;

export const PageHeader = tw.h1`
    text-2xl
    ml-8
`;
