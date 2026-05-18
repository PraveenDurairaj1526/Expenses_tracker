import { Link } from 'react-router-dom'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import { RightArrow } from '../../assets/CustomSvgIcons'

const data = [
    {
        name: 'Food',
        value: 420,
        color: '#05070D',
    },
    {
        name: 'Shopping',
        value: 280,
        color: '#8A6A00',
    },
    {
        name: 'Transport',
        value: 180,
        color: '#D9D9D9',
    },
    {
        name: 'Entertainment',
        value: 200,
        color: '#BDBDBD',
    }
]

const CategoryExpenseChart = () => {
    const total = data.reduce((acc, item) => acc + item.value, 0)

    return (
        <div className='rounded-[32px] border-2 border-border_primary bg-background_light_200 p-6'>
            <div className='mb-3 flex justify-between gap-3 items-center' >
                <h3 className='text-[20px] font-bold text-primary'>Category Expenses</h3>
                <Link to={'/manage-category'} className='flex gap-2 items-center font-bold text-brand text-sm'>View all <RightArrow /></Link>
            </div>
            <div className='relative mx-auto h-[200px] w-full max-w-[200px]'>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey='value'
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            cornerRadius={12}
                            stroke='none'
                        >
                            {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [`$${value}`, 'Spent']}
                            contentStyle={{
                                borderRadius: '16px',
                                border: 'none',
                                background: '#111',
                                color: '#fff',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                
                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <span className='text-sm font-medium text-secondary'>
                        Total
                    </span>
                    <h2 className='text-[28px] font-bold text-primary'>
                        ${total}
                    </h2>
                </div>
            </div>

            <div className='mt-2 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-4'>
                {data?.slice(0,2)?.map((item) => (
                    <div key={item.name} className='flex items-center justify-between rounded-2xl bg-background_light_100 px-4 py-3'>
                        <div className='flex items-center gap-3'>
                            <span className='h-3 w-3 rounded-full' style={{ backgroundColor: item.color }} />
                            <span className='text-sm font-medium text-primary'> {item.name}</span>
                        </div>
                        <span className='text-sm font-bold text-primary'>${item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryExpenseChart