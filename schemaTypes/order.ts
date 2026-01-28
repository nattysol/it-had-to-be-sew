export default {
  name: 'order',
  title: 'Customer Orders',
  type: 'document',
  fields: [
    { name: 'orderDate', title: 'Date', type: 'datetime' },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['new', 'processing', 'completed'] }, initialValue: 'new' },
    
    // --- 1. CONTACT & SHIPPING ---
    { name: 'customer', title: 'Customer Info', type: 'object', fields: [
      { name: 'firstName', type: 'string', title: 'First Name' },
      { name: 'lastName', type: 'string', title: 'Last Name' },
      { name: 'email', type: 'string', title: 'Email' },
      { name: 'phone', type: 'string', title: 'Phone' },
      { name: 'address', type: 'string', title: 'Street Address' },
      { name: 'city', type: 'string', title: 'City' },
      { name: 'state', type: 'string', title: 'State' },
      { name: 'zip', type: 'string', title: 'Zip Code' },
      { name: 'shippingMethod', type: 'string', title: 'Shipping Method', options: { list: ['standard', 'expedited', 'dropoff'] } }
    ]},

    // --- 2. QUILT SPECS ---
    { name: 'dimensions', title: 'Quilt Dimensions', type: 'object', fields: [
      { name: 'width', type: 'number', title: 'Width (in)' }, 
      { name: 'height', type: 'number', title: 'Height (in)' }
    ]},
    { name: 'backing', title: 'Backing Dimensions', type: 'object', fields: [
      { name: 'width', type: 'number', title: 'Width (in)' }, 
      { name: 'height', type: 'number', title: 'Height (in)' }
    ]},
    { name: 'pattern', title: 'Pattern', type: 'reference', to: [{type: 'pantograph'}] },
    { name: 'designDetails', title: 'Design Details', type: 'object', fields: [
      { name: 'threadColor', type: 'string', title: 'Thread Preference' },
      { name: 'isDirectional', type: 'boolean', title: 'Is Quilt Directional?' },
      { name: 'safetyPinning', type: 'string', title: 'Safety Pinning Location', options: { list: ['Top of Quilt', 'Top of Back', 'None'] } }
    ]},

    // --- 3. MATERIALS & SERVICES ---
    { name: 'batting', title: 'Batting', type: 'string' },
    
    { name: 'trimming', title: 'Trimming', type: 'object', fields: [
      { name: 'wanted', type: 'boolean', title: 'Trim Quilt?' },
      { name: 'method', type: 'string', options: { list: ['To Edge', '1/4 inch beyond', 'Custom'] } },
      { name: 'returnScraps', type: 'string', options: { list: ['Fabric Only', 'Fabric & Batting', 'No'] } }
    ]},

    { name: 'binding', title: 'Binding', type: 'object', fields: [
      { name: 'wanted', type: 'boolean', title: 'Binding Required?' },
      { name: 'method', type: 'string', title: 'Method', options: { list: ['Machine', 'Hand', 'None'] } },
      { name: 'providedByCustomer', type: 'boolean', title: 'Customer Providing Binding?' },
      { name: 'stripWidth', type: 'string', title: 'Strip Width' }
    ]},

    { name: 'consent', title: 'Consent', type: 'object', fields: [
      { name: 'socialMedia', type: 'boolean', title: 'Social Media Permission' },
      { name: 'terms', type: 'boolean', title: 'Terms Agreed' }
    ]},

    { name: 'totalPrice', title: 'Estimated Total', type: 'number' }
  ]
}