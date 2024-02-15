import { Form, Input } from "antd";
import React from "react";

function BasicTab() {
  return (
    <div className="p-5 bg-white shadow-sm">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input lottery name!" }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input lottery description!" },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Form.Item
          label="Start Date & Time"
          name="startDateTime"
          rules={[
            { required: true, message: "Please input start date & time!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          label="End Date & Time"
          name="endDateTime"
          rules={[{ required: true, message: "Please input end date & time!" }]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          label="Draw Date & Time"
          name="drawDateTime"
          rules={[
            { required: true, message: "Please input draw date & time!" },
          ]}
        >
          <Input type="datetime-local" />
        </Form.Item>

        <Form.Item
          label="Ticket Price"
          name="ticketPrice"
          rules={[{ required: true, message: "Please input ticket price!" }]}
        >
          <Input type="number" />
        </Form.Item>
      </div>
    </div>
  );
}

export default BasicTab;
