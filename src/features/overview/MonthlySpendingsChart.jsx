import clsx from 'clsx'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import { color } from 'chart.js/helpers'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
)
// Background capsule plugin
const backgroundBarPlugin = {
    id: 'backgroundBar',

    beforeDatasetsDraw(chart) {
        const {
            ctx,
            scales: { y },
        } = chart

        const meta = chart.getDatasetMeta(0)

        meta.data.forEach((bar) => {
            const { x, width } = bar

            const top = y.getPixelForValue(100)
            const bottom = y.getPixelForValue(0)

            ctx.save()

            ctx.fillStyle = '#ECECEC'

            ctx.beginPath()

            ctx.roundRect(
                x - width / 2,
                top,
                width,
                bottom - top,
                width / 2
            )

            ctx.fill()
            ctx.restore()
        })
    },
}
ChartJS.register(backgroundBarPlugin)

const MonthlySpendingChart = () => {
    const tabActive = 'bg-black text-white'
    const values = [60, 45, 85, 30, 95, 20, 50]
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: values.map((value) => [0, value]),
                backgroundColor: '#8A6A00',
                borderRadius: 999,
                borderSkipped: false,
                categoryPercentage: 0.8,
                barPercentage: 1,
                maxBarThickness: 200,
            },
        ],
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#000',
                displayColors: false,
                callbacks: {
                    label: (context) => {
                        const value = context.raw[1]

                        return `$${value * 10}`
                    },
                },
            },
        },

        scales: {
            x: {
                offset: true,
                grid: { display: false },
                border: { display: false },
                ticks: {
                    color: '#6B7280',
                    font: { size: 12, weight: '600', },
                },
            },
            y: {
                display: false,
                min: 0,
                max: 100,
                grid: { display: false },
                border: { display: false },
            },
        },
    }

    return (
        <div className='rounded-[32px] border-2 border-border_primary bg-background_light_200 p-4 md:p-6 flex flex-col justify-between'>
            <div className='mb-6 flex items-center justify-between flex-wrap gap-3'>
                <div>
                    <h3 className='mb-2 text-[16px] font-bold text-primary md:text-[20px]'> Monthly Spending</h3>
                    <p className='text-xs font-medium text-secondary md:text-sm'>Daily expense activity for September</p>
                </div>
                <div className='flex items-center rounded-3xl bg-background_light_100 p-1'>
                    <button className='rounded-3xl px-4 py-2 text-xs font-bold text-primary md:text-sm'> Daily</button>
                    <button className={clsx('rounded-3xl px-4 py-2 text-xs font-bold md:text-sm', tabActive)}> Weekly</button>
                </div>
            </div>
            <div className='h-[180px] md:h-[220px]'>
                <Bar data={data} options={options} />
            </div>
        </div>
    )
}

export default MonthlySpendingChart