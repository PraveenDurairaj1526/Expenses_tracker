import React from 'react'
import Layout from '../components/Layout/Layout'
import StatsCard from '../features/overview/StatsCard'
import MonthlySpendingChart from '../features/overview/MonthlySpendingsChart'
import CategoryExpenseChart from '../features/overview/CategoryExpenseChart'

const Overview = () => {
    return (
        <Layout>
            <div>
                <StatsCard/>
                <div className='grid lg:grid-cols-[2fr_1fr] gap-6'>
                    <MonthlySpendingChart/>
                    <CategoryExpenseChart/>
                </div>
            </div>
        </Layout>

    )
}

export default Overview