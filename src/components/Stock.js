import { Col, Row, Statistic, Divider, Table, Space, Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react'
import _ from 'lodash'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};
const Stock = () => {
  const [form] = Form.useForm();

  /**
   * 删除股票信息
   * @param record
   * @param index
   * @param stockStoreList
   * @param setStockStoreList
   */
  const deleteStock = (record, index, stockStoreList, setStockStoreList) => {
    setStockStoreList(stockStoreList.filter(item => item.key !== record.key))
  }

  // 股票储存记录
  const [stockStoreList, setStockStoreList] = useState([])
  // 最新的key
  const [stockStoreKey, setStockStoreKey] = useState(0)
  // 平均价格
  const [avaPrice, setAvaPrice] = useState(0)
  // 总数
  const [amount, setAmount] = useState(0)

  // 股票表列
  const stockColumns = [
    {
      title: 'Key',
      dataIndex: 'key',
      width: 20
    },
    {
      title: '股票名称',
      dataIndex: 'stockName'
    },
    {
      title: '价格',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: '数量',
      dataIndex: 'quantity'
    },
    {
      title: '操作',
      key: 'operation',
      width: 80,
      render: (text, record, index) => (
        <Space size="middle">
          <a onClick={ event => deleteStock(record, index, stockStoreList, setStockStoreList) }>删除</a>
        </Space>
      )
    }
  ]

  useEffect(() => {
    // 设置最新key
    setStockStoreKey((_.last(stockStoreList)?.key || stockStoreKey) + 1)

    // TODO
    // const stockListLen = stockStoreList.length
    // setAvaPrice()
  }, [stockStoreList])

  const onFinish = (values) => {
    setStockStoreList([...stockStoreList, Object.assign(values, {
      key: stockStoreKey
    })])

    form.resetFields();
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="平均价格(CNY)" value={avaPrice} precision={2} />
            </Col>
            <Col span={12}>
              <Statistic title="总数" value={amount} />
            </Col>
          </Row>
          <Divider plain>
            明细
          </Divider>

          <Table columns={stockColumns} dataSource={stockStoreList} />
        </Col>
        <Col span={12}>
          <Form {...layout} form={form} initialValues={
            {
              stockName: '运达股份'
            }
          } name="control-hooks" onFinish={onFinish}>
            <Form.Item
              name="stockName"
              label="股票名称"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              name="price"
              label="价格"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="quantity"
              label="数量"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Stock;
