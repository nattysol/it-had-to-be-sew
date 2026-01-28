export default {
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'order', title: 'Order', type: 'number', description: '1, 2, 3... to sort them' }
  ]
}