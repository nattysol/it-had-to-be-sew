export default {
  name: 'faq',
  title: 'Frequently Asked Questions',
  type: 'document',
  fields: [
    { 
      name: 'question', 
      title: 'Question', 
      type: 'string' 
    },
    { 
      name: 'answer', 
      title: 'Answer', 
      type: 'array', 
      of: [{type: 'block'}] // <--- This enables Bold, Italic, Links, etc.
    },
    { 
      name: 'order', 
      title: 'Order', 
      type: 'number' 
    }
  ]
}