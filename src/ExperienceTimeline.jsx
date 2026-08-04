import ScrollReveal from './ScrollReveal'
import './ExperienceTimeline.css'

const timelineItems = [
  {
    date: '2023.09', endDate: '至今', type: 'LEADERSHIP', icon: 'leadership', ongoing: true,
    title: '从班级与实验室开始承担责任',
    items: ['工业设计 2 班学习委员', '院学生开放实验室主席（至 2026.06）'],
  },
  {
    date: '2024.05', type: 'AWARD', icon: 'badge',
    title: '志愿服务先进个人', items: ['第一次获评校级志愿服务先进个人'],
  },
  {
    date: '2024.12', type: 'AWARD', icon: 'trophy',
    title: '实践与综合表现获得认可',
    items: ['湖南省节能减排社会实践与科技竞赛国家三等奖', '三好学生'],
  },
  {
    date: '2025.05', type: 'AWARD', icon: 'badge',
    title: '持续参与志愿服务', items: ['志愿服务先进个人'],
  },
  {
    date: '2025.06', endDate: '至今', type: 'PROJECT', icon: 'umbrella', ongoing: true,
    title: '非遗游戏项目启动并持续推进',
    items: ['湘潭非遗石鼓油纸伞科普游戏及共创平台负责人', '第十八届中国大学生计算机设计大赛中南地区赛二等奖', '杰出学生干部'],
  },
  {
    date: '2025.08', type: 'AWARD', icon: 'trophy',
    title: '项目成果集中转化',
    items: [
      '未来设计师大赛游戏设计湖南赛区二等奖',
      '未来设计师大赛文创设计湖南赛区二等奖',
      '全国大学生节能减排社会实践与科技竞赛国家三等奖',
      '湖南省大学生节能减排社会实践与科技竞赛二等奖',
      '担任 25 级新生班主任助理（至 2026.06）',
    ],
  },
  {
    date: '2025.10', endDate: '2026.03', type: 'RESEARCH', icon: 'vr',
    title: '高压警务 VR 反击表现研究',
    items: [
      '开展色彩与音量对反击表现影响的被试内实验',
      '华灿奖赛区三等奖',
      '全国三维数字化创新设计大赛湖南赛区三等奖',
      '湖南省大学生化学化工学科竞赛（虚拟仿真）三等奖',
    ],
  },
  {
    date: '2025.11', endDate: '至今', type: 'RESEARCH', icon: 'recycle', ongoing: true,
    title: '可持续包装垃圾分类交互研究',
    items: ['项目核心成员', '以触觉与视觉线索研究奶茶包装垃圾分类行为'],
  },
  {
    date: '2025.12', type: 'AWARD', icon: 'patent',
    title: '科研成果与综合荣誉',
    items: ['熔炼炉精炼装置国家发明专利第二作者', '国家励志奖学金', '优秀学生干部'],
  },
  {
    date: '2026.02', endDate: '至今', type: 'PROJECT', icon: 'backpack', ongoing: true,
    title: '儿童可持续护脊背包企业横向项目',
    items: ['负责市场与技术调研、产品设计及 CMF 迭代'],
  },
  {
    date: '2026.03', type: 'RESEARCH', icon: 'paper',
    title: 'AIVRID 国际会议论文录用',
    items: ['高压警务 VR 研究论文第一作者'],
  },
  {
    date: '2026.04', type: 'RESEARCH', icon: 'aerospace',
    title: '多模态影像与航天负面情绪研究',
    items: ['参与文献综述、实验范式设计与数据采集辅助'],
  },
  {
    date: '2026.05', type: 'AWARD', icon: 'badge',
    title: '志愿服务先进个人', items: ['连续第三年获得志愿服务相关荣誉'],
  },
  {
    date: '2026.06', type: 'AWARD', icon: 'trophy',
    title: '竞赛与社会实践阶段成果',
    items: [
      '第十九届中国大学生计算机设计大赛中南地区赛二等奖',
      '“挑战杯”中国大学生创业计划竞赛湖南赛区铜奖',
      '暑期“三下乡”社会实践优秀个人',
    ],
  },
]

function TimelineIcon({ name }) {
  const paths = {
    leadership: <><circle cx="24" cy="15" r="6"/><path d="M12 40c1-10 5-15 12-15s11 5 12 15M8 45h32M13 45v-7m22 7v-7"/></>,
    badge: <><circle cx="24" cy="21" r="12"/><path d="m17 31-3 13 10-6 10 6-3-13M19 21l3 3 7-7"/></>,
    trophy: <><path d="M15 8h18v10c0 8-4 13-9 13s-9-5-9-13V8Z"/><path d="M15 12H8c0 9 4 13 11 13m14-13h7c0 9-4 13-11 13M24 31v8m-9 4h18"/></>,
    umbrella: <><path d="M7 24c3-12 10-18 17-18s14 6 17 18c-5-4-8-4-11 0-4-4-8-4-12 0-3-4-6-4-11 0Z"/><path d="M24 7v30c0 7 9 7 9 0"/></>,
    vr: <><path d="M6 17c0-5 4-8 9-8h18c5 0 9 3 9 8v12c0 4-3 7-7 7-6 0-6-7-11-7s-5 7-11 7c-4 0-7-3-7-7V17Z"/><path d="M13 19h8m6 0h8"/></>,
    recycle: <><path d="m22 7 5 8-6 1M12 20l-5 8 4 7M34 34H22l3-5M10 35h11M28 15l8 14"/></>,
    patent: <><path d="M12 5h18l7 7v31H12V5Z"/><path d="M30 5v8h7M18 21h13M18 27h13M18 33h8"/></>,
    backpack: <><path d="M14 17V12c0-5 4-8 10-8s10 3 10 8v5M10 20c0-4 3-7 7-7h14c4 0 7 3 7 7v24H10V20Z"/><path d="M16 28h16M15 44v-5m18 5v-5"/></>,
    paper: <><path d="M12 5h19l6 6v32H12V5Z"/><path d="M31 5v7h6M18 20h13M18 27h13M18 34h9"/></>,
    aerospace: <><path d="M24 5c7 7 10 16 7 27l-7 11-7-11c-3-11 0-20 7-27Z"/><circle cx="24" cy="21" r="4"/><path d="m17 28-8 7 8 2m14-9 8 7-8 2"/></>,
  }
  return <svg viewBox="0 0 48 48" aria-hidden="true">{paths[name] || paths.badge}</svg>
}

export default function ExperienceTimeline() {
  return (
    <section className="experience-timeline" aria-labelledby="timeline-title">
      <div className="timeline-heading">
        <span>GROWTH ARCHIVE / 2023—NOW</span>
        <h3 id="timeline-title">A timeline in motion.</h3>
        <p>在项目、研究与公共事务中，让每一次行动成为下一次成长的坐标。</p>
      </div>
      <div className="timeline-track">
        {timelineItems.map((item, index) => {
          const year = item.date.slice(0, 4)
          const showYear = index === 0 || timelineItems[index - 1].date.slice(0, 4) !== year
          return (
            <div className={`timeline-entry timeline-entry-${item.type.toLowerCase()}`} key={`${item.date}-${item.title}`}>
              {showYear && <span className="timeline-year" aria-hidden="true">{year}</span>}
              <span className="timeline-node" aria-hidden="true" />
              <ScrollReveal
                baseOpacity={0.08}
                baseRotation={index % 2 === 0 ? -7 : 7}
                baseRotateX={index % 2 === 0 ? 10 : -10}
                baseTranslateY={42}
                blurStrength={9}
                rotationEnd="top 55%"
                wordAnimationEnd="top 55%"
                containerClassName="timeline-reveal"
              >
                <article className="timeline-card word">
                  <div className="timeline-card-icon"><TimelineIcon name={item.icon} /></div>
                  <div className="timeline-card-meta">
                    <span>{item.type}</span>
                    <time>{item.date}{item.endDate ? `—${item.endDate}` : ''}</time>
                    {item.ongoing && <em>ONGOING</em>}
                  </div>
                  <h4>{item.title}</h4>
                  <ul>{item.items.map((line) => <li key={line}>{line}</li>)}</ul>
                </article>
              </ScrollReveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
