/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react'
import CustomTable from './CustomTable'
import medicineProcessor from "../apis/medicineProcessor";

const test = () => {

    const [data, setData] = useState([])
    const title = [
        {
            dataKey: '_id',
            displayName: 'Mã thuốc',
        },
        {
            dataKey: 'name',
            displayName: 'Tên thuốc',
            fixedWidth: 500
        },
        {
            dataKey: 'imageUrl',
            displayName: 'Ảnh'
        },
        {
            dataKey: 'price',
            displayName: 'Giá',
            custom: (value, data) => {
                return <>{value.$numberDecimal}</>
            }
        },
        {
            dataKey: 'usage',
            displayName: 'Sử dụng'
        },
        {
            dataKey: 'quantity',
            displayName: 'Số lượng'
        },
    ]

    const loadData = async() => {
        const result = await medicineProcessor.getAllObj()
        setData([...result])
    }

    useEffect(() => {
        loadData()
    }, [])


  return (
    <CustomTable data={data} title={title}/>
  )
}

export default test