import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip } from 'recharts'
import { HourlyStatistics } from '../types'
interface Props {
  data?: HourlyStatistics[]
}

export default function BarChartCard(props: Props) {
  return (
    <ResponsiveContainer width="100%" aspect={16 / 9}>
      <BarChart
        height={250}
        data={props.data}>
        <XAxis dataKey="hour" />
        <YAxis width={50} />
        <Tooltip
          labelFormatter={val => `${val}h - ${val + 1}h`} />
        <CartesianGrid vertical={false} />
        <Bar name="Broj narudžbina" dataKey="value" fill='#3BD4AE' barSize={25} radius={[5, 5, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
