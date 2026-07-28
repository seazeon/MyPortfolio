export const categories = [
  {
    id: 'game',
    index: '01',
    title: '游戏设计',
    en: 'GAME DESIGN',
    intro: '把文化、研究与叙事，转译为可玩的选择。',
    tone: 'lime',
    projects: [
      {
        id: 'umbrella',
        title: '伞间漫游',
        subtitle: '石鼓油纸伞非遗科普游戏及共创平台',
        year: '2024—2026',
        role: '项目负责人 / 游戏策划 / 美术 / 原型开发',
        tags: ['Unity', 'Game UX', 'Cultural Heritage'],
        summary:
          '从田野调研出发，将油纸伞“采集—制作—经营”的工艺链转译为完整玩法循环，让非遗不只被观看，也能被理解与共同创作。',
        facts: ['省级大创项目', '可运行 Demo', '2 项省级二等奖'],
      },
      {
        id: 'vr-feedback',
        title: 'Feedback Under Pressure',
        subtitle: '高压警务 VR 训练中的视听反馈研究',
        year: '2025',
        role: '第一作者 / 交互研究 / 数据分析',
        tags: ['VR', 'Interaction Research', 'SPSS'],
        summary:
          '基于 Unity 搭建第一人称反恐任务，以 4 种色相 × 3 种音量研究即时反馈对反击成功率、动作稳定性和工作负荷的影响。',
        facts: ['50 名受试者', 'AIVRID 论文录用', '色相与音量 p < .001'],
      },
      {
        id: 'virtual-lab',
        title: 'Virtual Chemistry Lab',
        subtitle: '化工虚拟仿真实验室',
        year: '2025',
        role: '交互设计 / Unity 开发',
        tags: ['Unity', 'Simulation', 'Interaction'],
        summary:
          '以清晰的任务路径、操作反馈和安全引导，将复杂实验步骤转化为可重复练习的虚拟仿真体验。',
        facts: ['湖南省三等奖', '独立原型开发', '完整任务流程'],
      },
    ],
  },
  {
    id: 'product',
    index: '02',
    title: '产品设计',
    en: 'PRODUCT DESIGN',
    intro: '从真实使用场景出发，让功能、形态与情绪相遇。',
    tone: 'mint',
    projects: [
      {
        id: 'backpack',
        title: 'Growing Together',
        subtitle: '儿童可持续护脊背包系统',
        year: '2025—2026',
        role: '市场与技术调研 / 产品设计 / CMF',
        tags: ['Product Design', 'CMF', 'Research'],
        summary:
          '围绕儿童成长中的负重与陪伴需求，完成全球市场、护脊技术与材料调研，并推进品牌、结构、款式与 CMF 的系统迭代。',
        facts: ['企业横向项目', '全球市场调研', '面向量产优化'],
      },
      {
        id: 'package',
        title: 'Touch to Sort',
        subtitle: '多模态引导的可持续包装交互研究',
        year: '2026',
        role: '核心成员 / 触觉交互 / 用户实验',
        tags: ['Sustainable Design', 'Haptics', 'User Study'],
        summary:
          '在奶茶包装主要接触区加入触觉纹样，并与垃圾桶视觉纹样匹配，以轻量的多模态提示降低分类判断成本。',
        facts: ['416 条分类记录', '总体正确率提升 7.69%', '26 名受试者'],
      },
      {
        id: 'furnace',
        title: 'Refining Device',
        subtitle: '熔炼炉精炼装置',
        year: '2024',
        role: '结构构思 / 工业设计',
        tags: ['Industrial Design', 'Patent', 'Engineering'],
        summary:
          '面向熔炼流程中的操作效率与稳定性需求，参与装置结构创新与成果转化。',
        facts: ['国家发明专利', '第二作者', '结构创新'],
      },
    ],
  },
  {
    id: 'illustration',
    index: '03',
    title: '插图',
    en: 'ILLUSTRATION',
    intro: '用节奏、色彩与角色，建立作品的情绪入口。',
    tone: 'moss',
    projects: [
      {
        id: 'umbrella-art',
        title: 'Shigu Visual Notes',
        subtitle: '石鼓工艺角色与场景视觉',
        year: '2025',
        role: '美术设定 / 场景插图 / UI 资产',
        tags: ['Illustration', 'Visual Development', 'Game Art'],
        summary:
          '从竹骨、桐油与伞面纹样中提取视觉母题，建立兼具地方气质与游戏可读性的角色、场景和界面资产。',
        facts: ['完整视觉系统', '游戏资产落地', '文化元素再设计'],
      },
      {
        id: 'forest-study',
        title: 'Light Studies',
        subtitle: '自然光影与空间氛围练习',
        year: '2026',
        role: '视觉研究 / 数字绘画',
        tags: ['Digital Art', 'Light', 'Atmosphere'],
        summary:
          '围绕绿意、窗景与时间感展开的系列练习，研究光斑如何组织空间层次与视觉叙事。',
        facts: ['系列创作', '光影研究', '持续更新'],
      },
    ],
  },
  {
    id: 'merch',
    index: '04',
    title: '周边设计',
    en: 'MERCHANDISE',
    intro: '让故事离开屏幕，成为可以握在手里的记忆。',
    tone: 'jade',
    projects: [
      {
        id: 'umbrella-merch',
        title: 'A Little Umbrella',
        subtitle: '油纸伞主题文创系列',
        year: '2025',
        role: '文创策划 / 平面与包装设计',
        tags: ['Merchandise', 'Packaging', 'Brand'],
        summary:
          '将游戏中的工艺符号延伸到徽章、票券、包装等轻量载体，形成从数字体验到线下传播的闭环。',
        facts: ['NCDA 省级二等奖', '系列化设计', '线上线下联动'],
      },
      {
        id: 'lab-identity',
        title: 'Open Lab Identity',
        subtitle: '开放实验室视觉物料',
        year: '2024—2025',
        role: '视觉设计 / 活动物料',
        tags: ['Graphic Design', 'Identity', 'Print'],
        summary:
          '为学院开放实验室与创新活动建立克制、易延展的图形语言，覆盖招新、竞赛与日常运营场景。',
        facts: ['多场景应用', '视觉规范', '社群传播'],
      },
    ],
  },
]

