export const categories = [
  {
    id: 'game',
    index: '01',
    title: '游戏设计',
    en: 'GAME DESIGN',
    intro: '把研究、文化与叙事转译为可以被体验的选择。',
    tone: 'lime',
    projects: [
      {
        id: 'umbrella',
        title: '伞间',
        subtitle: '石鼓油纸伞科普游戏',
        year: '2024—2025',
        role: '项目负责人 / 游戏策划 / 美术 / 原型开发',
        tags: ['Unity', 'Game UX', 'Cultural Heritage'],
        summary:
          '从石鼓油纸伞田野调研出发，将“寻材—制伞—经营—共创”的工艺链转译为完整玩法循环，让非遗不只被观看，也能在互动中被理解、学习与传播。',
        facts: ['可运行游戏 Demo', '计算机设计大赛二等奖', '华灿奖与 3D 大赛三等奖'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/umbrella/cover.jpg',
              alt: '《伞间》石鼓油纸伞科普游戏封面',
            },
            {
              type: 'image',
              src: '/projects/umbrella/research-board.jpg',
              alt: '石鼓油纸伞项目背景与实地调研展板',
            },
            {
              type: 'image',
              src: '/projects/umbrella/concept-board.jpg',
              alt: '《伞间》游戏概念、元素提取与角色设计展板',
            },
            {
              type: 'image',
              src: '/projects/umbrella/gameplay-board.jpg',
              alt: '《伞间》游戏流程、制伞拆解与其他玩法展板',
            },
            {
              type: 'image',
              src: '/projects/umbrella/ui-management.jpg',
              alt: '《伞间》经营与制伞游戏界面',
            },
            {
              type: 'image',
              src: '/projects/umbrella/ui-collection.jpg',
              alt: '《伞间》远山觅金采集关卡界面',
            },
            {
              type: 'image',
              src: '/projects/umbrella/ui-store.jpg',
              alt: '《伞间》油纸伞商店界面',
            },
            {
              type: 'image',
              src: '/projects/umbrella/award-computer-design.jpg',
              alt: '第十八届中国大学生计算机设计大赛中南地区赛二等奖证书',
            },
            {
              type: 'image',
              src: '/projects/umbrella/award-huacan.jpg',
              alt: '2025 第十届两岸新锐设计竞赛华灿奖三等奖证书',
            },
            {
              type: 'image',
              src: '/projects/umbrella/award-3d.jpg',
              alt: '全国三维数字化创新设计大赛湖南赛区三等奖证书',
            },
          ],
        },
      },
      {
        id: 'zhejianglu',
        title: '哲匠录',
        subtitle: '中国古建筑修缮科普游戏',
        year: '2025',
        role: '游戏策划 / 交互设计 / 视觉设计',
        tags: ['Game Design', 'Ancient Architecture', 'Cultural Heritage'],
        summary:
          '以中国古建筑修缮为主题，将建筑诊断、历史档案与修缮决策转译为卡牌式关卡体验，引导玩家在辨识病害、选择工艺和复原建筑的过程中理解“最小干预”与“可逆性”的保护原则。',
        facts: ['古建筑修缮科普', '卡牌策略关卡', '计算机设计大赛项目'],
        detail: {
          link: {
            href: 'https://www.xiaohongshu.com/discovery/item/69fb2f78000000003601e004?source=webshare&xhsshare=pc_web&xsec_token=AByG0JdGzx3QjrUOi5v_VDIYKsI7wKt7mfklCQjJwbKz4=&xsec_source=pc_share',
            label: '在小红书查看项目',
          },
          media: [
            {
              type: 'image',
              src: '/projects/zhejianglu/cover.png',
              alt: '《哲匠录》中国古建筑修缮科普游戏封面',
            },
            {
              type: 'image',
              src: '/projects/zhejianglu/research.png',
              alt: '《哲匠录》研究背景、现实案例与设计问题分析',
            },
            {
              type: 'image',
              src: '/projects/zhejianglu/design-system.png',
              alt: '《哲匠录》古建筑修缮玩法与视觉系统设计转化',
            },
            {
              type: 'image',
              src: '/projects/zhejianglu/gameplay-analysis.png',
              alt: '《哲匠录》建筑结构、卡牌系统、回合玩法与历史结局分析',
            },
            {
              type: 'image',
              src: '/projects/zhejianglu/game-interface.png',
              alt: '《哲匠录》关卡流程、修缮档案与科普图鉴游戏界面',
            },
          ],
        },
      },
      {
        id: 'mine',
        title: 'Mine',
        subtitle: '大学生优绩主义压力模拟游戏',
        year: '2026',
        role: '游戏策划 / 系统设计 / 交互与视觉',
        tags: ['Narrative Game', 'AI NPC', 'Social Issues'],
        summary:
          '以大学生活中的优绩主义与持续自我证明压力为议题，通过时间资源分配、关系选择与 AI NPC 动态互动构成非线性成长体验，让每次选择共同塑造角色的学业、情绪与人生结局。',
        facts: ['非线性养成系统', 'AI NPC 动态关系', '多类型压力结局'],
        detail: {
          media: [
            {
              type: 'video',
              src: '/projects/mine/demo.mp4',
              poster: '/projects/mine/cover.jpg',
              alt: '《Mine》大学生模拟器 Demo 演示视频',
            },
            {
              type: 'image',
              src: '/projects/mine/cover.jpg',
              alt: '《Mine》大学生优绩主义压力模拟游戏封面',
            },
            {
              type: 'image',
              src: '/projects/mine/background.jpg',
              alt: '《Mine》优绩主义、内卷与持续自我证明压力的项目背景分析',
            },
            {
              type: 'image',
              src: '/projects/mine/research-design.jpg',
              alt: '《Mine》社会调研、设计创新与设计目标分析',
            },
            {
              type: 'image',
              src: '/projects/mine/system-flow.jpg',
              alt: '《Mine》系统架构、AI NPC 关系系统与回合流程',
            },
            {
              type: 'image',
              src: '/projects/mine/result-ai.jpg',
              alt: '《Mine》结算逻辑、压力结果与 AI 管线设计',
            },
            {
              type: 'image',
              src: '/projects/mine/prototype-interface.jpg',
              alt: '《Mine》低保真交互逻辑、图标设计与高保真游戏界面',
            },
          ],
        },
      },
      {
        id: 'bird-must-masked',
        title: '节奏观鸟',
        subtitle: 'Global Game Jam 48H 双人非对称节奏游戏',
        year: '2026.02',
        role: '游戏策划 / 平面美术',
        tags: ['Global Game Jam', 'Rhythm Game', 'Asymmetric Co-op'],
        summary:
          '围绕 Global Game Jam “Mask”主题，将“隐藏与识破”转化为夜鹭捕食者与观鸟摄影者之间的双人非对称对抗：一方按节奏隐蔽捕食，另一方观察行动规律并抓拍关键瞬间。',
        facts: ['Global Game Jam 48H', '双人非对称玩法', '策划与平面美术'],
        detail: {
          link: {
            href: 'https://www.taptap.cn/app/815399?os=pc',
            label: '前往 TapTap 下载',
          },
          media: [
            {
              type: 'video',
              src: '/projects/bird-must-masked/demo.mp4',
              poster: '/projects/bird-must-masked/cover.jpg',
              alt: '《节奏观鸟》Global Game Jam 48H 游戏演示视频',
            },
            {
              type: 'image',
              src: '/projects/bird-must-masked/cover.jpg',
              alt: '《节奏观鸟》游戏封面',
            },
            {
              type: 'image',
              src: '/projects/bird-must-masked/concept.jpg',
              alt: '《节奏观鸟》Mask 命题发散与玩法转化分析',
            },
            {
              type: 'image',
              src: '/projects/bird-must-masked/gameplay.jpg',
              alt: '《节奏观鸟》准备界面、双人玩法与结算界面分析',
            },
          ],
        },
      },
      {
        id: 'glitch-code',
        title: 'Glitch Code',
        subtitle: '聚光灯 Game Jam 21 天像素动作游戏',
        year: '2025.10',
        role: '平面美术',
        tags: ['Game Jam', 'Pixel Art', 'Action Game'],
        summary:
          '围绕聚光灯 Game Jam 的“Bug”主题展开：一名猝死的程序员意外进入代码世界，与具象化为爬虫的 Bug 战斗。团队将“回退”设计为玩家技能，并以频闪、马赛克和画面错位建立故障空间的视觉语言。',
        facts: ['聚光灯 Game Jam 21 天', '回退技能与 Bug 敌人', '平面美术与故障视觉'],
        detail: {
          link: {
            href: 'https://www.taptap.cn/app/780004?os=pc',
            label: '前往 TapTap 试玩',
          },
          media: [
            {
              type: 'video',
              src: '/projects/glitch-code/demo.mp4',
              poster: '/projects/glitch-code/cover.jpg',
              alt: '《Glitch Code》聚光灯 Game Jam 实机演示视频',
            },
            {
              type: 'image',
              src: '/projects/glitch-code/cover.jpg',
              alt: '《Glitch Code》游戏标题与开始界面',
            },
            {
              type: 'image',
              src: '/projects/glitch-code/gameplay-rewind.jpg',
              alt: '《Glitch Code》回退技能与代码世界战斗实机画面',
            },
            {
              type: 'image',
              src: '/projects/glitch-code/gameplay-glitch.jpg',
              alt: '《Glitch Code》频闪、马赛克与故障视觉实机画面',
            },
          ],
        },
      },
      {
        id: 'candlelight-soul-border',
        title: '烛光：灵魂边境',
        subtitle: '聚光灯 Game Jam 21 天叙事冒险游戏',
        year: '2024.10',
        role: '平面美术',
        tags: ['Game Jam', 'Narrative Adventure', '2D Art'],
        summary:
          '这是我的第一个完整游戏项目。在幽暗的灵魂边境中，玩家操控微弱烛光穿行于被黑暗笼罩的空间，通过光照、移动与环境互动探索零散的叙事线索，并在逐渐消散的世界中寻找前路。',
        facts: ['聚光灯 Game Jam 21 天', '首次游戏项目实践', '平面美术与氛围塑造'],
        detail: {
          link: {
            href: 'https://www.taptap.cn/app/726467?os=pc',
            label: '前往 TapTap 下载',
          },
          media: [
            {
              type: 'video',
              src: '/projects/candlelight-soul-border/demo.mp4',
              poster: '/projects/candlelight-soul-border/cover.jpg',
              alt: '《烛光：灵魂边境》聚光灯 Game Jam 实机演示视频',
            },
            {
              type: 'image',
              src: '/projects/candlelight-soul-border/cover.jpg',
              alt: '《烛光：灵魂边境》游戏封面',
            },
            {
              type: 'image',
              src: '/projects/candlelight-soul-border/gameplay-cage.jpg',
              alt: '《烛光：灵魂边境》烛光与牢笼场景实机画面',
            },
            {
              type: 'image',
              src: '/projects/candlelight-soul-border/gameplay-platform.jpg',
              alt: '《烛光：灵魂边境》平台探索与环境叙事实机画面',
            },
            {
              type: 'image',
              src: '/projects/candlelight-soul-border/gameplay-shadow.jpg',
              alt: '《烛光：灵魂边境》黑暗遮罩与空间探索实机画面',
            },
            {
              type: 'image',
              src: '/projects/candlelight-soul-border/gameplay-forest.jpg',
              alt: '《烛光：灵魂边境》森林与灵魂角色实机画面',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'illustration',
    index: '02',
    title: '插图',
    en: 'ILLUSTRATION',
    intro: '用节奏、色彩与角色建立作品的情绪入口。',
    tone: 'moss',
    projects: [
      {
          id: 'character-design-practice',
          title: '角色设计练习',
          subtitle: '原创角色设定与造型探索',
          year: '2025.07',
          role: '角色设计 / 插画',
          tags: ['Character Design', 'Illustration', 'Costume'],
          summary:
            '围绕不同世界观与性格原型展开角色设计练习，通过服装轮廓、色彩关系、道具与非人特征建立角色身份，并在完整立绘与背景剪影中探索角色叙事。',
          facts: ['6 组角色设定', '服装与道具设计', '原创插画练习'],
          detail: {
            media: [
              {
                type: 'image',
                src: '/projects/character-design-practice/character-01.jpg',
                alt: '角色设计练习——翼与恶魔特征角色',
              },
              {
                type: 'image',
                src: '/projects/character-design-practice/character-02.jpg',
                alt: '角色设计练习——黑白礼服角色',
              },
              {
                type: 'image',
                src: '/projects/character-design-practice/character-03.jpg',
                alt: '角色设计练习——绿色旅人角色',
              },
              {
                type: 'image',
                src: '/projects/character-design-practice/character-04.jpg',
                alt: '角色设计练习——绿色长风衣角色',
              },
              {
                type: 'image',
                src: '/projects/character-design-practice/character-05.jpg',
                alt: '角色设计练习——蓝黑恶魔角色完整立绘',
              },
              {
                type: 'image',
                src: '/projects/character-design-practice/character-06.jpg',
                alt: '角色设计练习——黄色运动造型角色',
              },
            ],
          },
      },
    {
      id: 'jellyfish-composition',
      title: '油膜水母',
      subtitle: '点线面构成与油膜色彩实验',
      year: '2024.09',
      role: '构成设计 / 数字插画 / 色彩实验',
      tags: ['Composition', 'Jellyfish', 'Color Study'],
      summary:
        '以水母为形态母题，从黑白点、线、面的节奏关系出发建立抽象构成，再引入海洋油膜污染所产生的镭射反光色，表现美丽视觉表象与生态污染之间的矛盾。',
      facts: ['8 幅系列作品', '点线面构成', '油膜镭射色彩'],
      detail: {
        media: [
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-01.jpg',
            alt: '黑白线性水母构成',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-02.jpg',
            alt: '黑白块面水母构成',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-03.jpg',
            alt: '点线面水母构成',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-04.jpg',
            alt: '灰阶圆点构成实验',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-05.jpg',
            alt: '油膜镭射色彩实验',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-06.jpg',
            alt: '镭射线性水母构成',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-07.jpg',
            alt: '镭射块面水母构成',
          },
          {
            type: 'image',
            src: '/projects/jellyfish-composition/jellyfish-08.jpg',
            alt: '镭射点线面水母构成',
          },
        ],
      },
    },
      {
        id: 'chinese-white-dolphin-ip',
        title: '多小菲与白团团',
        subtitle: '中华白海豚公益 IP 形象设计',
        year: '2025',
        role: 'IP 形象设计 / 插画 / 文创设计',
        tags: ['IP Design', 'Chinese White Dolphin', 'Illustration'],
        cover: '/projects/chinese-white-dolphin-ip/image-06.jpg',
        summary:
          '以中华白海豚为原型设计“多小菲”与“白团团”，通过拟人化角色、表情系统和文创延展，让濒危物种保护议题以更亲切的方式进入日常生活。',
        facts: ['双角色 IP 设定', '表情与服饰拓展', '文创产品应用'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-01.jpg',
              alt: '多小菲与白团团中华白海豚 IP 形象设定与三视图',
            },
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-02.jpg',
              alt: '中华白海豚 IP 表情包与文创产品应用设计',
            },
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-03.jpg',
              alt: '中华白海豚 IP 标志、海报与二十四节气服饰拓展',
            },
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-04.jpg',
              alt: '多小菲与中华白海豚相遇主题插画',
            },
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-05.jpg',
              alt: '多小菲与白团团海浪主题角色插画',
            },
            {
              type: 'image',
              src: '/projects/chinese-white-dolphin-ip/image-06.jpg',
              alt: '潜水员与中华白海豚共游的海洋主题插画',
            },
          ],
        },
      },
    ],
  },
  {
    id: 'product',
    index: '03',
    title: '产品设计',
    en: 'PRODUCT DESIGN',
    intro: '从真实使用场景出发，让功能、形态与情绪相遇。',
    tone: 'mint',
    projects: [
      {
        id: 'vinyl-bluetooth-speaker',
        title: '黑胶唱片智能蓝牙音响',
        subtitle: '复古未来主义桌面音响设计',
        year: '',
        role: '产品设计 / 结构设计 / CMF / 三维渲染',
        tags: ['Audio Product', 'Retro Futurism', 'CMF'],
        cover: '/projects/vinyl-bluetooth-speaker/cover.png',
        summary:
          '以黑胶唱片机与磁带机为造型灵感，将复古机械语言与智能蓝牙播放结合，通过透明面板、橙黑配色和外露结构建立具有未来感的桌面音响体验。',
        facts: ['黑胶唱片造型', '智能蓝牙播放', '复古未来主义 CMF'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/components.png',
              alt: '黑胶唱片智能蓝牙音响部件组成与内部结构爆炸图',
            },
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/render-front.png',
              alt: '黑胶唱片智能蓝牙音响正面产品渲染',
            },
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/render-side.png',
              alt: '黑胶唱片智能蓝牙音响侧面产品渲染',
            },
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/scene.png',
              alt: '黑胶唱片智能蓝牙音响桌面使用场景',
            },
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/cmf.png',
              alt: '黑胶唱片智能蓝牙音响材质、色彩与表面处理设计',
            },
            {
              type: 'image',
              src: '/projects/vinyl-bluetooth-speaker/board.png',
              alt: '黑胶唱片智能蓝牙音响完整设计展板',
            },
          ],
        },
      },
      {
        id: 'furry-diary',
        title: '毛茸茸日记',
        subtitle: '宠物友好地图与游戏化遛狗记录 App',
        year: '2025.10—2025.12',
        role: '个人项目 / 设计全案',
        tags: ['App Design', 'Pet Friendly', 'Gamification'],
        cover: '/projects/furry-diary/cover.png',
        summary:
          '面向城市年轻养宠人群，以宠物友好地图、遛狗记录、智能项圈与虚拟家园构成完整体验，缓解“去哪遛狗、去哪消费”的信息不对称。',
        facts: ['宠物友好地图', '游戏化遛狗记录', '智能项圈联动'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/furry-diary/background.png',
              alt: '毛茸茸日记项目设计背景与宠物经济趋势分析',
            },
            {
              type: 'image',
              src: '/projects/furry-diary/research-journey.png',
              alt: '毛茸茸日记用户需求、问卷调研、目标人群、痛点与用户旅程分析',
            },
            {
              type: 'image',
              src: '/projects/furry-diary/system-design.png',
              alt: '毛茸茸日记智能项圈结构、视觉规范、低保真流程与界面系统设计',
            },
            {
              type: 'image',
              src: '/projects/furry-diary/interface.png',
              alt: '毛茸茸日记宠物友好地图、遛狗模式、数据记录与虚拟家园高保真界面',
            },
          ],
        },
      },
      {
        id: 'njp-7500-capsule-filling-machine',
        title: 'NJP-7500 胶囊填充机',
        subtitle: '楚天科技面向欧美市场的制药设备设计',
        year: '',
        role: '工业设计 / 外观设计 / 交互界面设计',
        tags: ['Medical Equipment', 'Industrial Design', 'HMI'],
        cover: '/projects/njp-7500-capsule-filling-machine/cover.png',
        summary:
          '面向欧美制药市场，对 NJP-7500 胶囊填充机进行整体外观与人机交互升级，以 304 不锈钢、品牌色强化玻璃和环绕式 LED 灯带建立洁净、专业且易于维护的设备形象。',
        facts: ['欧美市场导向', '洁净生产环境', '一体式控制界面'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/njp-7500-capsule-filling-machine/details.png',
              alt: 'NJP-7500 胶囊填充机配套分选抛光机与设备细节设计',
            },
            {
              type: 'image',
              src: '/projects/njp-7500-capsule-filling-machine/interaction.png',
              alt: 'NJP-7500 胶囊填充机控制界面交互设计展示',
            },
            {
              type: 'image',
              src: '/projects/njp-7500-capsule-filling-machine/scene-wide.png',
              alt: 'NJP-7500 胶囊填充机在洁净生产空间中的使用场景',
            },
            {
              type: 'image',
              src: '/projects/njp-7500-capsule-filling-machine/operation-close.png',
              alt: '操作人员使用 NJP-7500 胶囊填充机触控界面',
            },
            {
              type: 'image',
              src: '/projects/njp-7500-capsule-filling-machine/operation-wide.png',
              alt: 'NJP-7500 胶囊填充机完整设备与操作人员场景',
            },
          ],
        },
      },
      {
        id: 'z-g-shuttle',
        title: 'Z-G Shuttle',
        subtitle: '航空舱内快速移动手部可穿戴装置',
        year: '2026',
        role: '产品设计 / 结构设计 / 三维建模 / 实物制作',
        tags: ['Wearable Device', 'Aerospace', 'Industrial Design'],
        cover: '/projects/z-g-shuttle/board.png',
        summary:
          '面向空间站舱内微重力环境，将锚点发射、绳索牵引与回收机构整合为手部可穿戴移动辅助装置，帮助航天员更主动、稳定地完成舱内位移。',
        facts: ['主动牵引移动', '拉力智能调节', '红外瞄准探头'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/z-g-shuttle/board.png',
              alt: 'Z-G Shuttle 零重力梭项目总展板，包含设计概念、结构细节、实物照片和使用场景',
            },
            {
              type: 'image',
              src: '/projects/z-g-shuttle/render-front.png',
              alt: 'Z-G Shuttle 零重力梭前侧结构与牵引锚点产品渲染',
            },
            {
              type: 'image',
              src: '/projects/z-g-shuttle/render-worn.png',
              alt: 'Z-G Shuttle 零重力梭手部佩戴状态与交互屏幕产品渲染',
            },
            {
              type: 'image',
              src: '/projects/z-g-shuttle/render-top.jpg',
              alt: 'Z-G Shuttle 零重力梭顶部视角产品渲染',
            },
          ],
        },
      },
      {
        id: 'lmg-electric-pallet-truck',
        title: '临工重工电动搬运车',
        subtitle: '面向仓储物流场景的电动托盘搬运设备',
        year: '',
        role: '工业设计 / 外观设计 / CMF / 场景设计',
        tags: ['Industrial Vehicle', 'Warehouse Logistics', 'CMF'],
        cover: '/projects/lmg-electric-pallet-truck/cover.png',
        summary:
          '面向仓储、物流与生产线搬运场景，为临工重工打造兼具品牌识别、操作安全与工业美学的电动搬运车。产品以标志性红黑配色、流畅曲面和环抱式控制结构强化专业、可靠的设备形象。',
        facts: ['电动托盘搬运', '智能控制手柄', '临工品牌视觉'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/lmg-electric-pallet-truck/render.png',
              alt: '临工重工电动搬运车仓储场景产品渲染',
            },
            {
              type: 'image',
              src: '/projects/lmg-electric-pallet-truck/operation.png',
              alt: '临工重工电动搬运车承载货物的操作场景',
            },
            {
              type: 'image',
              src: '/projects/lmg-electric-pallet-truck/board.png',
              alt: '临工重工电动搬运车设计说明、草图推演、尺寸与 CMF 展板',
            },
            {
              type: 'image',
              src: '/projects/lmg-electric-pallet-truck/poster.png',
              alt: '临工重工电动搬运车产品宣传海报',
            },
          ],
        },
      },
      {
        id: 'elderly-home-nursing-cabinet',
        title: '适老化居家基础护理边柜',
        subtitle: '面向居家养老与家庭医生服务的智能护理设备',
        year: '',
        role: '产品设计 / 适老化设计 / 交互设计 / 场景研究',
        tags: ['Elderly Care', 'Medical Product', 'Inclusive Design'],
        cover: '/projects/elderly-home-nursing-cabinet/cover.png',
        summary:
          '面向居家养老、慢病管理、术后康复及家庭医生上门服务场景，将血压、血氧、血糖监测、输液支持与护理物资收纳整合进一体化边柜，提升家庭护理的便捷性、安全性与规范性。',
        facts: ['基础体征监测', '分离式输液架', '分类护理收纳'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/elderly-home-nursing-cabinet/details.png',
              alt: '适老化居家基础护理边柜充电、收纳、交互提示与扶手细节',
            },
            {
              type: 'image',
              src: '/projects/elderly-home-nursing-cabinet/scenarios.png',
              alt: '适老化居家基础护理边柜日常收纳、输液、床边护理与置物场景',
            },
            {
              type: 'image',
              src: '/projects/elderly-home-nursing-cabinet/board.png',
              alt: '适老化居家基础护理设备背景研究、痛点分析、设计架构与草图展板',
            },
          ],
        },
      },
      {
        id: 'gtr-modeling-study',
        title: 'GTR 汽车建模练习',
        subtitle: '跑车曲面建模与材质渲染练习',
        year: '',
        role: '三维建模 / 材质灯光 / KeyShot 渲染',
        tags: ['Automotive Modeling', '3D Rendering', 'KeyShot'],
        cover: '/projects/gtr-modeling-study/cover.png',
        summary:
          '以 GTR 跑车为对象进行汽车建模练习，围绕车身比例、复杂曲面、外观零部件和漆面材质展开塑造，并通过室内环境、灯光与多角度镜头完成整车渲染表达。',
        facts: ['整车曲面建模', '车漆材质表现', '多角度渲染'],
        detail: {
          media: [
            {
              type: 'image',
              src: '/projects/gtr-modeling-study/rear-render.jpg',
              alt: '红色 GTR 汽车后侧视角建模渲染',
            },
            {
              type: 'image',
              src: '/projects/gtr-modeling-study/side-render.jpg',
              alt: '红色 GTR 汽车侧前视角建模渲染',
            },
          ],
        },
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
    projects: [],
  },
  {
    id: 'breakdown',
    index: '05',
    title: '游戏拆解',
    en: 'GAME BREAKDOWN',
    intro: '拆开规则、反馈与叙事，理解“好玩”如何发生。',
    tone: 'acid',
    projects: [],
  },
  {
    id: 'research',
    index: '06',
    title: '科研项目',
    en: 'RESEARCH',
    intro: '以实验、数据与设计方法验证体验问题，把观察转化为可复用的设计结论。',
    tone: 'fern',
    projects: [
      {
        id: 'multimodal-feedback',
        title: '高压警务 VR 反击训练',
        subtitle: '颜色与音量对反击表现的影响研究',
        year: '2026',
        role: '第一作者 / Unity 实验系统 / 用户实验 / 数据分析',
        tags: ['VR Training', 'Audiovisual Feedback', 'User Study'],
        cover: '/projects/multimodal-feedback/cover.png',
        summary:
          '研究高压警务 VR 训练中受击提示的颜色与音量组合，寻找危机感知、精细动作控制与主观负荷之间的平衡。',
        facts: ['4 × 3 被试内实验', '50 名受试者', 'GEE 与重复测量方差分析'],
        detail: {
          abstract:
            '在高压警务 VR 反击训练中，受击后的危机提示既要能被迅速感知，又不能干扰精细动作控制与即时反击。本研究使用 Unity 构建第一人称 VR 实验模块，将视觉色相与声音音量作为可调参数，并同步记录刺激呈现、瞄准运动与反击结果。结果表明，色相与音量都会显著影响 1 秒内反击成功率；中等音量下的瞄准速度偏差更接近零且更稳定；红色提示会显著提高 NASA-TLX 工作负荷。危机反馈不应一味追求更强刺激，而应在可感知性与动作支持之间取得平衡。',
          method: [
            '实验采用 4（色相：红、橙红、橙黄、蓝）× 3（音量：低 55 dB、中 70 dB、高 85 dB）的被试内设计。50 名 18—26 岁大学生参加实验，均具备正常或矫正后正常视力，通过石原色觉测试，并完成知情同意。',
            '每次试次依次经历注视、500—800 ms 随机延迟、200 ms 全屏色彩闪烁与同步枪声提示；参与者需在 1 秒内移动准星并击中目标。12 个条件按色相分为 4 个区组，区组顺序采用拉丁方平衡，音量条件在区组内随机呈现。',
            '系统记录 1 秒内反击是否成功、首次移动时间、瞄准速度偏差与命中时间；每个色相区组结束后填写 NASA-TLX。成功率在试次层面使用二项分布 GEE 分析，连续行为指标先进行个体均值中心化，再使用重复测量方差分析与 Bonferroni 事后比较。',
          ],
          conclusion:
            '研究显示，危机反馈的设计重点不是最大化刺激强度，而是兼顾快速感知与精细控制。实践中可将中等音量作为默认方案，避免在重复训练中持续使用红色等高负荷色相；高显著性提示更适合保留给少数高危险时刻，并结合工作负荷监测控制疲劳累积。后续研究可加入心率、皮电与眼动指标，并在移动目标、复杂光照和专业警务样本中进一步验证。',
          media: [
            {
              type: 'image',
              src: '/projects/multimodal-feedback/figure-01.png',
              alt: '实验测试程序界面，包括高压情境提示、VR 场景、全屏受击提示与 NASA-TLX 量表',
            },
            {
              type: 'image',
              src: '/projects/multimodal-feedback/figure-02.png',
              alt: '实验使用的红色、橙红色、橙黄色和蓝色色相样本',
            },
            {
              type: 'table',
              title: '表 1｜1 秒内反击成功率的效应检验（GEE）',
              columns: ['效应', 'Wald χ²', 'df', 'p'],
              rows: [
                ['色相', '34.685', '3', '< .001'],
                ['音量', '18.187', '2', '< .001'],
                ['色相 × 音量', '9.558', '6', '.145'],
              ],
            },
            {
              type: 'table',
              title: '表 2｜1 秒内反击成功率参数估计（参照：蓝色 × 中等音量）',
              columns: ['参数', 'B', 'OR = exp(B)', 'p'],
              rows: [
                ['红色', '-0.692', '0.501', '.067'],
                ['橙红色', '-0.974', '0.378', '.005'],
                ['橙黄色', '-0.182', '0.834', '.713'],
                ['高音量', '0.216', '1.241', '.609'],
                ['低音量', '-0.722', '0.486', '.067'],
                ['红色 × 高音量', '-0.240', '0.787', '.565'],
                ['红色 × 低音量', '-0.034', '0.967', '.934'],
                ['橙红色 × 高音量', '0.418', '1.519', '.335'],
                ['橙红色 × 低音量', '0.676', '1.966', '.134'],
                ['橙黄色 × 高音量', '-0.216', '0.806', '.721'],
                ['橙黄色 × 低音量', '0.722', '2.059', '.254'],
              ],
            },
            {
              type: 'table',
              title: '表 3｜各色相 × 音量条件的参与者聚合成功率（均值 ± SE）',
              columns: ['色相', '音量', '成功率', 'SE', 'n'],
              rows: [
                ['红色', '高', '0.867', '0.029', '50'],
                ['红色', '低', '0.774', '0.043', '50'],
                ['红色', '中', '0.868', '0.033', '50'],
                ['橙红色', '高', '0.901', '0.028', '50'],
                ['橙红色', '低', '0.833', '0.029', '50'],
                ['橙红色', '中', '0.840', '0.036', '50'],
                ['橙黄色', '高', '0.917', '0.021', '50'],
                ['橙黄色', '低', '0.920', '0.021', '50'],
                ['橙黄色', '中', '0.920', '0.029', '50'],
                ['蓝色', '高', '0.946', '0.015', '50'],
                ['蓝色', '低', '0.872', '0.028', '50'],
                ['蓝色', '中', '0.933', '0.023', '50'],
              ],
            },
            {
              type: 'image',
              src: '/projects/multimodal-feedback/figure-03.png',
              alt: '不同色相与音量组合下 1 秒内反击成功率的均值与标准误',
            },
            {
              type: 'image',
              src: '/projects/multimodal-feedback/figure-04.png',
              alt: '音量对瞄准速度偏差的主效应图',
            },
            {
              type: 'table',
              title: '表 4｜不同色相下 NASA-TLX 总分的边际均值',
              columns: ['色相', 'TLX 均值', 'SE', '95% CI 下限', '95% CI 上限'],
              rows: [
                ['红色', '42.257', '3.620', '34.767', '49.746'],
                ['橙红色', '36.528', '3.804', '28.658', '44.397'],
                ['橙黄色', '31.944', '3.461', '24.785', '39.104'],
                ['蓝色', '29.965', '3.165', '23.419', '36.512'],
              ],
            },
            {
              type: 'table',
              title: '表 5｜NASA-TLX 总分的 Bonferroni 两两比较（节选）',
              columns: ['比较', '均值差（I − J）', 'p'],
              rows: [
                ['红色 vs. 橙红色', '5.729*', '.031'],
                ['红色 vs. 橙黄色', '10.312*', '.002'],
                ['红色 vs. 蓝色', '12.292*', '.002'],
              ],
            },
            {
              type: 'image',
              src: '/projects/multimodal-feedback/figure-05.png',
              alt: '不同色相条件下 NASA-TLX 工作负荷总分的均值与标准误',
            },
          ],
        },
      },
      {
        id: 'touch-to-sort-research',
        title: 'Touch to Sort',
        subtitle: '奶茶包装多模态分类干预研究',
        year: '2026',
        role: '研究设计 / 产品建模 / 用户实验 / 数据分析',
        tags: ['Sustainable Design', 'Haptics', 'User Study'],
        cover: '/projects/touch-to-sort-research/cup-model.png',
        summary:
          '在奶茶包装主要接触区域加入触觉纹样，并与垃圾桶视觉纹样建立对应关系，探索轻量多模态线索能否降低分类判断成本。',
        facts: ['26 名受试者', '416 条分类记录', '正确率提升 7.69 个百分点'],
        detail: {
          abstract:
            '针对奶茶包装部件多、分类规则模糊且投放情境操作负担高的问题，本研究将 UV 胶凸起纹样设置在包装主要接触区域，并在目标垃圾桶表面加入对应视觉纹样，构建触觉与视觉协同的分类提示。预实验问卷显示，83.33% 的受访者认可垃圾分类的环境意义，但只有 16.67% 能稳定执行奶茶包装分类，主要障碍来自部件归属不确定与现场标识不清。正式实验进一步检验多模态提示是否能够改善最终分类正确率。',
          method: [
            '正式实验采用固定顺序的被试内重复测量设计。26 名 18—23 岁在校学生依次完成空白对照与多模态干预条件，对包装袋、提手、杯盖、杯套、杯托、吸管包装、吸管和杯体 8 个部件进行分类。',
            '对照条件中包装无凸起纹样，垃圾桶仅保留文字标识；干预条件在可回收部件主要接触区域增加 UV 胶触觉纹样，并在目标垃圾桶设置视觉对应纹样。实验共获得 416 条最终正确性记录和 208 组可比较的前后观测。',
            '分析以最终分类正确性为主结果：使用 GEE 检验条件效应并控制部件差异；以受试者总正确数进行 Wilcoxon 符号秩检验；各部件采用 exact McNemar 检验，并使用 Holm 方法校正多重比较。',
          ],
          conclusionTitle: '多模态线索展现改善趋势，但仍需更强证据',
          conclusion:
            '干预后总体正确率由 57.21% 提升至 64.90%，净增 7.69 个百分点；改善主要出现在包装袋、提手、杯盖和杯体等高模糊、高接触部件。不过，GEE 条件效应尚未达到统计显著（OR = 1.46，p = 0.177），部件级检验经校正后也未显著。结果支持继续优化触觉—视觉对应线索，但后续研究需要扩大样本、平衡实验顺序，并进一步处理持续错误的困难部件。',
          media: [
            {
              type: 'image',
              src: '/projects/touch-to-sort-research/cup-model.png',
              alt: '带触觉纹样的奶茶杯与吸管三维建模方案',
            },
            {
              type: 'image',
              src: '/projects/touch-to-sort-research/bin-model.png',
              alt: '带视觉对应标识的分类垃圾桶三维建模方案',
            },
            {
              type: 'image',
              src: '/projects/touch-to-sort-research/experiment-record.jpg',
              alt: '奶茶包装多模态分类实验现场记录',
            },
            {
              type: 'image',
              src: '/projects/touch-to-sort-research/chart-overall.png',
              alt: '空白对照与多模态干预条件的总体分类正确率对比',
            },
            {
              type: 'image',
              src: '/projects/touch-to-sort-research/chart-components.png',
              alt: '八个奶茶包装部件在对照与干预条件下的分类正确率对比',
            },
          ],
        },
      },
    ],
  },
]
