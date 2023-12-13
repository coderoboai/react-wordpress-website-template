import {
    imagesStyles,
    backgrounds,
    roseColor
} from '../css-kit-react'

const blogStyles={
    ...imagesStyles,
    ...backgrounds,
    cardImage:{
        height:"100px",
        width: "100px"
    },
    postMeta:{
        color:roseColor,
        fontSize:"0.85rem",
        fontWeight:"900"
    },
    avatar:{
        width: '100%',
        height: '400px',
        borderRadius: '8px', // Set this to a specific value for rounded corners
        objectFit: 'cover',
    },
    content:{
        "& figure":{
            display:"flex",
            justifyContent:"center"
        },
        "& img":{
            maxWidth:"100%",
            height:"auto"
        }
    },

    cardExcerpt: {
        height: 'auto', // Set the fixed height for the card
        overflow: 'hidden',
    },

    cardExcerptInner: {
        height: 'auto', // Ensure the inner content fills the available height
        overflow: 'hidden', // Handle overflow within the inner content
    },
}

export default blogStyles