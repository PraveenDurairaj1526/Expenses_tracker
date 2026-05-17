import React from 'react'
import { ButtonGroup, IconButton } from '@material-tailwind/react'
import { LeftArrow, RightArrow } from '../../assets/CustomSvgIcons'

const CustomPagination = ({ handlePageChange, activePage, totalPages }) => {


    return (
        <ButtonGroup variant="outlined" className='justify-center mt-5'>
            <IconButton onClick={() => handlePageChange(activePage - 1)} disabled={activePage == 1}>
               <LeftArrow/>
            </IconButton>
            {
                Array.from({ length: totalPages },
                    (_, index) => (
                        <IconButton key={index} className={index + 1 == activePage && "bg-brand text-white shadow-none"} onClick={() => handlePageChange(index + 1)}>{index + 1}</IconButton>
                    )
                )
            }
            <IconButton onClick={() => handlePageChange(activePage + 1)} disabled={activePage == totalPages}>
                <RightArrow/>
            </IconButton>
        </ButtonGroup>
    )
}

export default CustomPagination