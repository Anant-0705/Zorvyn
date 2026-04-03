import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function TrendChart({ data }) {
  return (
    <div className="chart-shell trend-chart">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d5d6d9" />
          <XAxis dataKey="month" tick={{ fill: '#5a5e66', fontSize: 12 }} />
          <YAxis
            tick={{ fill: '#5a5e66', fontSize: 12 }}
            tickFormatter={(value) => formatter.format(value)}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: '1px solid #d5d6d9',
              backgroundColor: '#ffffff',
            }}
            formatter={(value) => formatter.format(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={2.4}
            dot={{ r: 3 }}
            name="Income"
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={2.4}
            dot={{ r: 3 }}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#111111"
            strokeWidth={2.6}
            dot={{ r: 4 }}
            name="Balance"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
