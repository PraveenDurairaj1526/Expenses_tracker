import { Link } from 'react-router-dom'
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'
import { RightArrow } from '../../assets/CustomSvgIcons'
import { useDispatch, useSelector } from 'react-redux'

const CategoryExpenseChart = () => {

    const dispatch = useDispatch()
    const { allExpenses } = useSelector((state) => state.expenses)
    const total = allExpenses.reduce((acc, item) => acc + item.price, 0)
    const categoryData = Object.values(
        allExpenses.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = {
                    category: item.category,
                    price: 0,
                    categoryColor: item.categoryColor,
                };
            }
            acc[item.category].price += Number(item.price);
            return acc;
        }, {})
    );

    return (
        <div className='rounded-[32px] border-2 border-border_primary bg-background_light_200 p-6'>
            <div className='mb-3 flex justify-between gap-3 items-center' >
                <h3 className='text-[20px] font-bold text-primary'>Category Expenses</h3>
                <Link to={'/manage-category'} className='flex gap-2 items-center font-bold text-brand text-sm'>View all <RightArrow /></Link>
            </div>
            <div className='relative mx-auto h-[200px] w-full max-w-[200px]'>
                {allExpenses &&
                    <ResponsiveContainer width='100%' height='100%'>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                dataKey={'price'}
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={4}
                                cornerRadius={12}
                                stroke='none'
                            >
                                {categoryData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.categoryColor} />))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    console.log(payload);

                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-2 border rounded">
                                                <p>{payload[0].payload.category}</p>
                                                <p>₹{payload[0].value}</p>
                                            </div>
                                        );
                                    }

                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>}

                <div className='absolute inset-0 flex flex-col items-center justify-center'>
                    <span className='text-sm font-medium text-secondary'>
                        Total
                    </span>
                    <h2 className='text-[28px] font-bold text-primary'>
                        ₹{total}
                    </h2>
                </div>
            </div>

            <div className='mt-2 grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-4'>
                {categoryData?.slice(0, 2)?.map((item) => (
                    <div key={item.id} className='flex items-center justify-between rounded-2xl bg-background_light_100 px-4 py-3'>
                        <div className='flex items-center gap-3'>
                            <span className='h-3 w-3 rounded-full' style={{ backgroundColor: item.categoryColor }} />
                            <span className='text-sm font-medium text-primary'> {item.category}</span>
                        </div>
                        <span className='text-sm font-bold text-primary'>₹{item.price}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryExpenseChart