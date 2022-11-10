import { Col, Row, Table, Button, Form, Input } from 'antd';
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

  // 股票表列
  const stockColumns = [
    {
      title: '股票名称',
      key: 'stockName',
      dataIndex: 'stockName'
    },
    {
      title: '价格',
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: '数量',
      key: 'quantity',
      dataIndex: 'quantity'
    }
  ]
  // 股票储存记录
  const [stockStoreList, setStockStoreList] = useState([])
  const [stockStoreKey, setStockStoreKey] = useState(1)

  // useEffect(() => {
  //   setStockStoreKey((_.last(stockStoreList)?.key || stockStoreKey) + 1)
  //   console.log('stockStoreList', stockStoreList)
  // })

  const onFinish = (values) => {
    setStockStoreList([...stockStoreList, Object.assign(values, {
      key: stockStoreKey
    })])

    console.log('stockStoreList', stockStoreList)
    setStockStoreKey((_.last(stockStoreList)?.key || stockStoreKey) + 1)

    form.resetFields();
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      <Row>
        <Col span={12}>
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
