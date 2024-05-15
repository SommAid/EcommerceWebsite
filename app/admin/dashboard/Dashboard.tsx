'use client'
import Link from 'next/link'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import useSWR from 'swr'
import { formatNumber } from '@/lib/utils'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
}

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`)

  if (error) return error.message
  if (!summary) return 'Loading...'

  

  return (
    <div>
      <div className="my-4 stats inline-grid md:flex  shadow stats-vertical   md:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Sales</div>
          <div className="stat-value text-primary">
            ${formatNumber(summary.ordersPrice)}
          </div>
          <div className="stat-desc">
            <Link href="/admin/orders">View sales</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title"> Orders</div>
          <div className="stat-value text-primary">{summary.ordersCount}</div>
          <div className="stat-desc">
            <Link href="/admin/orders">View orders</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Products</div>
          <div className="stat-value text-primary">{summary.productsCount}</div>
          <div className="stat-desc">
            <Link href="/admin/products">View products</Link>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value text-primary">{summary.usersCount}</div>
          <div className="stat-desc">
            <Link href="/admin/users">View users</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
