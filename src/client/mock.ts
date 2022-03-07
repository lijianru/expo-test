export const resumes = [
  // 简历刚被创建 / 简历待筛选
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'PENDING',
        comment: '',
        date: '',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: '面试官A',
    // 关闭时间
    closed_date: '',
  },
  // 简历筛选未通过
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'PASS',
        comment: 'xxx',
        date: 'XXX',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: '',
    // 关闭时间
    closed_date: 'xxxx',
  },
  // 简历筛选通过 （回到HR）
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'APPROVED',
        comment: '',
        date: 'XXX',
      },
      {
        name: '一面',
        status: 'PENDING',
        comment: '',
        date: '',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: 'HR',
    // 关闭时间
    closed_date: '',
  },
  // 简历筛选通过 （到一面面试官）/ 一面还未进行
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'APPROVED',
        comment: '',
        date: 'XXX',
      },
      {
        name: '一面',
        status: 'PENDING',
        comment: '',
        date: '',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: '一面面试官',
    // 关闭时间
    closed_date: '',
  },
  // 一面通过
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'APPROVED',
        comment: '',
        date: 'XXX',
      },
      {
        name: '一面',
        status: 'APPROVED',
        comment: '',
        date: 'xxx',
      },
      {
        name: '二面',
        status: 'PENDING',
        comment: '',
        date: '',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: 'HR',
    // 关闭时间
    closed_date: '',
  },
  // 一面未通过
  {
    name: '张三',
    phone: '13111234431',
    // 应该在setting页面能够创建对应的岗位
    job: '前端工程师',
    // 简历当前的处在什么阶段？初筛 || 一面 || 二面 .....
    timeline: [
      {
        name: '初筛',
        status: 'APPROVED',
        comment: '',
        date: 'XXX',
      },
      {
        name: '一面',
        status: 'APPROVED',
        comment: 'xx',
        date: 'xxx',
      },
    ],
    // 创建时间
    create_date: 'XXX',
    // 由谁上传
    created_by: 'XXX',
    // 目前由谁处理简历
    assign: '',
    // 关闭时间
    closed_date: '',
  },
];
