export default {
  name: 'order',
  title: 'Customer Orders',
  type: 'document',
  fields: [
    { name: 'orderDate', title: 'Date', type: 'datetime' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['new', 'processing', 'completed'] } },
    { name: 'customerName', title: 'Customer', type: 'string' },
    { name: 'dimensions', title: 'Dimensions', type: 'object', fields: [{name: 'width', type: 'number'}, {name: 'height', type: 'number'}] },
    { name: 'pattern', title: 'Pattern', type: 'reference', to: [{type: 'pantograph'}] },
    { name: 'batting', title: 'Batting', type: 'string' },
    { name: 'services', title: 'Services', type: 'object', fields: [{name: 'binding', type: 'boolean'}, {name: 'trimming', type: 'boolean'}] },
    { name: 'totalPrice', title: 'Total Price', type: 'number' }
  ]
}