import { ButtonGroup, IconButton } from '@material-tailwind/react'
import React from 'react'

const CustomPagination = ({ handlePageChange, activePage, totalPages }) => {


    return (
        <ButtonGroup variant="outlined" className='justify-center mt-5'>
            <IconButton onClick={() => handlePageChange(activePage - 1)} disabled={activePage == 1}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.88295 1.00012C7.04087 1.00012 7.1988 1.06041 7.31927 1.18094C7.56024 1.422 7.56024 1.8129 7.31927 2.05396L2.37531 7.00012L7.31927 11.9463C7.56024 12.1873 7.56024 12.5782 7.31927 12.8193C7.0783 13.0604 6.68761 13.0604 6.44663 12.8193L1.06635 7.43663C0.825377 7.19557 0.825377 6.80466 1.06635 6.56361L6.44664 1.18094C6.56711 1.06041 6.72504 1.00012 6.88295 1.00012Z" fill="#141515" stroke="#141515" stroke-width="0.2" />
                </svg>
            </IconButton>
            {
                Array.from({ length: totalPages },
                    (_, index) => (
                        <IconButton key={index} className={index + 1 == activePage && "bg-brand text-white shadow-none"} onClick={() => handlePageChange(index + 1)}>{index + 1}</IconButton>
                    )
                )
            }
            <IconButton onClick={() => handlePageChange(activePage + 1)} disabled={activePage == totalPages}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.50279 1.00012C1.34487 1.00012 1.18695 1.06041 1.06647 1.18094C0.825499 1.422 0.825499 1.8129 1.06647 2.05396L6.01044 7.00012L1.06647 11.9463C0.825499 12.1873 0.825499 12.5782 1.06647 12.8193C1.30745 13.0604 1.69813 13.0604 1.93911 12.8193L7.31939 7.43663C7.56036 7.19557 7.56036 6.80466 7.31939 6.56361L1.9391 1.18094C1.81863 1.06041 1.66071 1.00012 1.50279 1.00012Z" fill="#141515" stroke="#141515" stroke-width="0.2" />
                </svg>
            </IconButton>
        </ButtonGroup>
    )
}

export default CustomPagination