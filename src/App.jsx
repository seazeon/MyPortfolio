import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { categories } from './data'
import HeroScene from './HeroScene'
import SideRays from './SideRays'
import BounceCards from './BounceCards'
import SpotlightCard from './SpotlightCard'
import Silk from './Silk'
import FilmReel3D from './FilmReel3D'
import Lanyard from './Lanyard'
import ScrollReveal from './ScrollReveal'
import ExperienceTimeline from './ExperienceTimeline'
import SplitText from './SplitText'
import PixelTrail from './PixelTrail'
import SiteLoader from './SiteLoader'

const Arrow = ({ diagonal = false }) => (
  <span aria-hidden="true" className={diagonal ? 'arrow diagonal' : 'arrow'}>
    →
  </span>
)

function Scene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 100)
    camera.position.z = 7
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)
    const geometry = new THREE.IcosahedronGeometry(1.1, 1)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xb9f5a5,
      transparent: true,
      opacity: 0.18,
      roughness: 0.12,
      metalness: 0.05,
      transmission: 0.65,
      wireframe: true,
    })
    const orb = new THREE.Mesh(geometry, material)
    orb.scale.set(2.15, 2.15, 2.15)
    group.add(orb)

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8ffb8,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    })
    ;[
      [1.75, -2.7, -0.4, 0.7],
      [0.8, 2.5, 0.8, 0.35],
      [0.42, -3.1, 1.75, 0.25],
    ].forEach(([size, x, y, opacity], index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(size, 0.012 + index * 0.006, 8, 96),
        ringMaterial.clone(),
      )
      ring.material.opacity = opacity * 0.3
      ring.position.set(x, y, -index)
      ring.rotation.x = index * 0.6
      group.add(ring)
    })

    scene.add(new THREE.AmbientLight(0xc8ffb4, 1.6))
    const light = new THREE.PointLight(0xecffd5, 14, 20)
    light.position.set(-3, 4, 6)
    scene.add(light)

    const pointer = { x: 0, y: 0 }
    const onPointer = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5
      pointer.y = event.clientY / window.innerHeight - 0.5
    }
    const resize = () => {
      const { clientWidth, clientHeight } = mount
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointer)
    let frame
    const clock = new THREE.Clock()
    const animate = () => {
      const t = clock.getElapsedTime()
      group.rotation.y += (pointer.x * 0.45 - group.rotation.y) * 0.03
      group.rotation.x += (-pointer.y * 0.25 - group.rotation.x) * 0.03
      orb.rotation.z = t * 0.055
      orb.position.y = Math.sin(t * 0.5) * 0.08
      renderer.render(scene, camera)
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="three-scene" ref={mountRef} aria-hidden="true" />
}

function Header({ activeSection, onNavigate }) {
  const [lanyardOpen, setLanyardOpen] = useState(false)
  const [lanyardAnchor, setLanyardAnchor] = useState(null)
  const createButtonRef = useRef(null)

  useEffect(() => {
    if (!lanyardOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setLanyardOpen(false)
    }
    const updateAnchor = () => {
      const rect = createButtonRef.current?.getBoundingClientRect()
      if (!rect) return
      setLanyardAnchor({
        x: rect.left + rect.width * 0.08,
        y: rect.bottom - 2,
      })
    }
    updateAnchor()
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', updateAnchor)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', updateAnchor)
    }
  }, [lanyardOpen])

  const toggleLanyard = () => {
    if (lanyardOpen) {
      setLanyardOpen(false)
      return
    }
    const rect = createButtonRef.current?.getBoundingClientRect()
    if (rect) {
      setLanyardAnchor({
        x: rect.left + rect.width * 0.08,
        y: rect.bottom - 2,
      })
    }
    setLanyardOpen(true)
  }

  const handleNavigation = (event, section) => {
    event.preventDefault()
    onNavigate(section, { history: 'push' })
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="回到首页" onClick={(event) => handleNavigation(event, 'top')}>
          <span>QIAN</span>
          <small>PORTFOLIO / 2026</small>
        </a>
        <nav aria-label="主导航">
          <a className={activeSection === 'top' ? 'active' : ''} href="#top" onClick={(event) => handleNavigation(event, 'top')}>首页</a>
          <a className={activeSection === 'work' ? 'active' : ''} href="#work" onClick={(event) => handleNavigation(event, 'work')}>作品</a>
          <a className={activeSection === 'about' ? 'active' : ''} href="#about" onClick={(event) => handleNavigation(event, 'about')}>关于我</a>
          <a className={activeSection === 'contact' ? 'active' : ''} href="#contact" onClick={(event) => handleNavigation(event, 'contact')}>联系</a>
        </nav>
        <button
          ref={createButtonRef}
          className={`header-cta ${lanyardOpen ? 'active' : ''}`}
          type="button"
          aria-expanded={lanyardOpen}
          aria-controls="create-lanyard"
          onClick={toggleLanyard}
        >
          一起创造 <Arrow diagonal />
        </button>
      </header>

      {lanyardOpen && (
        <div className="lanyard-stage" id="create-lanyard" aria-label="一起创造联系卡牌">
          <Lanyard
            frontImage="/contact/wechat-qr.jpg"
            anchorPoint={lanyardAnchor}
            onClose={() => setLanyardOpen(false)}
          />
          <p className="lanyard-stage-hint">
            DRAG THE CARD · RELEASE TO SWING · 点击空白处关闭
          </p>
        </div>
      )}
    </>
  )
}

function Hero({ sceneApiRef, workViewportRef, onTransitionPhase }) {
  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        <div className="depth-layer depth-far" />
        <div className="depth-layer depth-mid" />
        <SideRays
          className="hero-side-rays"
          speed={1.35}
          rayColor1="#99fb02"
          rayColor2="#f6f7c1"
          intensity={1.65}
          spread={1.65}
          origin="top-right"
          tilt={-19}
          saturation={1.25}
          blend={0.7}
          falloff={1.75}
          opacity={0.8}
        />
         <div className="hero-window-light" />
         <HeroScene
           apiRef={sceneApiRef}
           workViewportRef={workViewportRef}
           onTransitionPhase={onTransitionPhase}
         />
         <div className="depth-layer depth-near" />
        <div className="hero-vignette" />
        <div className="hero-grid max-width">
          <div className="hero-identity">
            <span className="status-dot" />
            <strong>钱盈颖</strong>
            <span className="identity-rule" />
            <em>SEAZEON</em>
          </div>
          <div className="hero-system-copy">
            <span>CREATIVE PORTFOLIO</span>
            <span>DESIGN STUDENT / 2026</span>
          </div>
          <h1>
            <span>SEAZEON</span>
            <span className="outline">CREATIVE DESIGNER</span>
            <span>GAME LOVER</span>
          </h1>
          <div className="hero-role">
            <strong>设计体验 · 构建叙事 · 制作可玩的世界</strong>
            <small>EXPERIENCE DESIGN / INTERACTIVE STORYTELLING</small>
          </div>
          <div className="hero-bottom">
            <p>
              BUILDING WITH CURIOSITY
              <br />
              BETWEEN LOGIC AND SENSIBILITY
            </p>
            <div className="screen-hint">
              <span>MOVE ON SCREEN</span>
              <strong>← DRAG →</strong>
            </div>
            <a className="scroll-cue" href="#work">
              <span>滚动进入屏幕</span>
              <span className="scroll-line" />
            </a>
            <div className="hero-meta">
              <span>DESIGN STUDENT</span>
              <span>EXPERIENCE · STORY · PLAY</span>
              <span>XIANGTAN / CHINA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Portrait() {
  return (
    <div className="portrait" aria-label="钱盈颖的抽象人物形象">
      <div className="portrait-glow" />
      <svg viewBox="0 0 520 680" role="img">
        <defs>
          <linearGradient id="skin" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#d9edb0" />
            <stop offset="1" stopColor="#618f66" />
          </linearGradient>
          <linearGradient id="coat" x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#173f31" />
            <stop offset="1" stopColor="#071b16" />
          </linearGradient>
        </defs>
        <path d="M91 654c16-138 81-211 169-211s154 73 169 211" fill="url(#coat)" />
        <path d="M198 430h124v75H198z" fill="url(#skin)" />
        <ellipse cx="260" cy="295" rx="111" ry="145" fill="url(#skin)" />
        <path
          d="M147 294c-7-114 39-180 115-180 85 0 130 58 117 183-24-19-45-68-50-113-39 59-99 88-182 110Z"
          fill="#0a241b"
        />
        <path d="M174 243c-25 17-31 55-18 91" fill="none" stroke="#0a241b" strokeWidth="18" />
        <path d="M345 239c27 13 34 50 22 88" fill="none" stroke="#0a241b" strokeWidth="18" />
        <path d="M206 309h31M285 309h31" stroke="#173f31" strokeLinecap="round" strokeWidth="7" />
        <path d="M242 366c13 9 26 9 39 0" fill="none" stroke="#315a45" strokeLinecap="round" strokeWidth="5" />
        <path d="M88 654h344" stroke="#b6f091" strokeWidth="2" />
      </svg>
      <span className="portrait-mark">QY / 25</span>
    </div>
  )
}

function LegacyAbout() {
  return (
    <section className="about section-light crt-surface" id="about">
      <div className="max-width">
        <div className="section-label">
          <span>02</span>
          <span>ABOUT / 关于我</span>
        </div>
        <div className="about-heading">
          <h2>
            在逻辑与感性之间，
            <br />
            设计<span>可被感知的体验</span>。
          </h2>
          <p>
            工业设计本科生，也是游戏体验的长期观察者。
            我关心交互如何影响人的判断、情绪与行动，并习惯从调研、原型到验证完整推进一个想法。
          </p>
        </div>
        <div className="about-layout">
          <Portrait />
          <div className="about-content">
            <div className="bio">
              <p className="bio-lead">I’m Qian Yingying —</p>
              <p>
                现就读于湘潭大学工业设计专业，GPA 3.85/4，专业排名 2/63。
                我的实践横跨游戏设计、交互研究、产品与视觉，希望成长为能够连接体验策略与落地制作的 UI/UX
                设计师或游戏制作人。
              </p>
            </div>
            <div className="about-stats">
              <div>
                <strong>3.85</strong>
                <span>GPA / 4.0</span>
              </div>
              <div>
                <strong>02</strong>
                <span>RANK / 63</span>
              </div>
              <div>
                <strong>2500+</strong>
                <span>HOURS IN GAMES</span>
              </div>
            </div>
            <div className="info-grid">
              <div>
                <span className="info-title">FOCUS</span>
                <p>Game UX · Interaction Research · Visual Systems · Product Thinking</p>
              </div>
              <div>
                <span className="info-title">TOOLS</span>
                <p>Figma · Unity · Blender · Rhino · Photoshop · Illustrator · SPSS</p>
              </div>
              <div>
                <span className="info-title">OFF SCREEN</span>
                <p>游戏体验分析 · 数字绘画 · 影像 · 城市漫游 · 志愿服务</p>
              </div>
              <div>
                <span className="info-title">CONTACT</span>
                <p>
                  <a href="mailto:2674854240@qq.com">2674854240@qq.com</a>
                  <br />
                  WeChat / qing19050828
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const hobbies = [
    ['01', '绘画', 'DRAWING', '用色彩记录情绪，也用视觉草图寻找体验的第一种形状。'],
    ['02', '游戏', 'GAMING', '在规则、叙事与反馈里，观察人为什么愿意继续探索。'],
    ['03', 'COSPLAY', 'COSPLAY', '从角色理解到服装、妆造和镜头表达，完成一次完整的再创作。'],
    ['04', '手工', 'CRAFT', '喜欢材料的触感，也享受把平面的想法慢慢做成立体实物。'],
  ]
  const photos = [
    '/about/photo-01.jpg',
    '/about/photo-03.jpg',
    '/about/photo-04.jpg',
    '/about/photo-05.jpg',
    '/about/photo-06.jpg',
  ]
  const photoLabels = [
    'MUSIC & COSPLAY',
    'SUNNY AFTERNOON',
    'COSPLAY STORY',
    'AWARD MOMENT',
    'CHARACTER MAKING',
  ]
  const transforms = [
    'rotate(-6deg) translateX(-440px)',
    'rotate(3deg) translateX(-220px)',
    'rotate(-2deg)',
    'rotate(4deg) translateX(220px)',
    'rotate(-4deg) translateX(440px)',
  ]

  return (
    <section className="about about-editorial crt-surface" id="about">
      <div className="about-silk" aria-hidden="true">
        <Silk
          speed={5}
          scale={0.8}
          color="#1e9210"
          noiseIntensity={2.4}
          rotation={2.01}
        />
      </div>
      <div className="max-width about-editorial-inner">
        <div className="section-label light">
          <span>02</span>
          <span>ABOUT / WHO AM I</span>
        </div>
        <div className="about-editorial-heading">
          <div>
            <span className="about-kicker">QIAN YINGYING · SEAZEON</span>
            <h2>
              WHO <span className="about-title-accent">AM I</span>
            </h2>
          </div>
          <p>DESIGN STUDENT / GAME LOVER / EXPERIENCE MAKER</p>
        </div>
        <div className="about-editorial-copy">
          <ScrollReveal
            baseOpacity={0.12}
            baseRotation={-7}
            baseRotateX={10}
            baseTranslateY={38}
            blurStrength={7}
            rotationEnd="bottom 72%"
            wordAnimationEnd="bottom 68%"
          >
            {'我是钱盈颖，也叫 SEAZEON，一名工业设计专业学生。 我相信好的设计不只是让界面更漂亮，而是让复杂的信息变得清晰，让行动拥有自然的路径，让人与系统之间产生真实的感受。'}
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.16}
            baseRotation={6}
            baseRotateX={-8}
            baseTranslateY={34}
            blurStrength={5}
            rotationEnd="bottom 74%"
            wordAnimationEnd="bottom 70%"
            containerClassName="about-secondary-reveal"
          >
            {'目前的实践横跨 UI/UX、游戏设计、产品与视觉表达。'}
          </ScrollReveal>
        </div>

        <ExperienceTimeline />

        <div className="hobby-heading">
          <span>OFF THE SCREEN</span>
          <p>好奇心不只发生在设计软件里。</p>
        </div>
        <div className="hobby-grid">
          {hobbies.map(([number, title, english, description]) => (
            <SpotlightCard className="hobby-card" key={title}>
              <div className="hobby-card-top">
                <span>{number}</span>
                <em>{english}</em>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </SpotlightCard>
          ))}
        </div>

        <div className="about-photo-wall">
          <div className="about-photo-label">
            <div>
              <span>PERSONAL ARCHIVE / 2023—2026</span>
              <h3>A little life beyond the screen.</h3>
            </div>
            <p>移动鼠标触碰照片，展开我的生活切片。</p>
          </div>
          <BounceCards
            className="about-bounce-cards"
            containerWidth={1400}
            images={photos}
            labels={photoLabels}
            transformStyles={transforms}
          />
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, tone, onOpen }) {
  return (
    <button className={`project-card tone-${tone}`} onClick={() => onOpen(project)}>
      <div className="project-art">
        <span className="orb one" />
        <span className="orb two" />
        <span className="project-glyph">{project.title.slice(0, 1)}</span>
        <span className="view-tag">VIEW CASE</span>
      </div>
      <div className="project-card-copy">
        <span>{project.year}</span>
        <h4>{project.title}</h4>
        <p>{project.subtitle}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </button>
  )
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const categoryCoverImages = [
  '/projects/mine/cover.jpg',
  '/projects/chinese-white-dolphin-ip/image-06.jpg',
  '/projects/vinyl-bluetooth-speaker/category-cover.png',
  '/projects/merch-coming-soon-v2.png',
  '/projects/breakdown-coming-soon-v2.png',
  '/projects/touch-to-sort-research/cup-model.png',
]

function WorkVisual({ label, index, large = false }) {
  return (
    <div className={`work-generated-visual visual-${index % 5} ${large ? 'large' : ''}`}>
      <span className="visual-grid" />
      <span className="visual-orbit orbit-a" />
      <span className="visual-orbit orbit-b" />
      <span className="visual-core">{label.slice(0, 1)}</span>
      <small>SEAZEON / VISUAL STUDY / 0{index + 1}</small>
    </div>
  )
}

function ProjectTiltCard({ item, index, offset, projectCover, visualIndex, onOpen }) {
  const cardRef = useRef(null)
  const shellRef = useRef(null)
  const animationRef = useRef(null)
  const pointerRef = useRef({ currentX: 0.5, currentY: 0.5, targetX: 0.5, targetY: 0.5 })

  const updateCard = useCallback((x, y) => {
    const shell = shellRef.current
    if (!shell) return
    const normalizedX = (x - 0.5) * 2
    const normalizedY = (y - 0.5) * 2
    shell.style.setProperty('--project-pointer-x', `${x * 100}%`)
    shell.style.setProperty('--project-pointer-y', `${y * 100}%`)
    shell.style.setProperty('--project-tilt-x', `${normalizedY * -6.5}deg`)
    shell.style.setProperty('--project-tilt-y', `${normalizedX * 8.5}deg`)
    shell.style.setProperty('--project-shadow-x', `${normalizedX * -18}px`)
    shell.style.setProperty('--project-shadow-y', `${12 + normalizedY * 12}px`)
  }, [])

  const animatePointer = useCallback(() => {
    if (animationRef.current !== null) return
    const step = () => {
      const pointer = pointerRef.current
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.16
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.16
      updateCard(pointer.currentX, pointer.currentY)
      if (
        Math.abs(pointer.targetX - pointer.currentX) > 0.001 ||
        Math.abs(pointer.targetY - pointer.currentY) > 0.001
      ) {
        animationRef.current = requestAnimationFrame(step)
      } else {
        pointer.currentX = pointer.targetX
        pointer.currentY = pointer.targetY
        updateCard(pointer.currentX, pointer.currentY)
        animationRef.current = null
      }
    }
    animationRef.current = requestAnimationFrame(step)
  }, [updateCard])

  const handlePointerMove = (event) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    pointerRef.current.targetX = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    pointerRef.current.targetY = clamp((event.clientY - rect.top) / rect.height, 0, 1)
    animatePointer()
  }

  const handlePointerEnter = (event) => {
    cardRef.current?.classList.add('is-hovered')
    handlePointerMove(event)
  }

  const handlePointerLeave = () => {
    cardRef.current?.classList.remove('is-hovered')
    pointerRef.current.targetX = 0.5
    pointerRef.current.targetY = 0.5
    animatePointer()
  }

  useEffect(() => () => {
    if (animationRef.current !== null) cancelAnimationFrame(animationRef.current)
  }, [])

  return (
    <button
      ref={cardRef}
      className={`secondary-card ${offset === 0 ? 'active' : ''} ${offset < 0 ? 'film-left' : offset > 0 ? 'film-right' : 'film-center'}`}
      style={{ '--offset': offset, '--abs-offset': Math.abs(offset) }}
      onClick={() => onOpen(index)}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <span ref={shellRef} className="secondary-card-shell">
        <span className="secondary-card-aura" />
        <span className="secondary-card-surface">
          <span className="secondary-card-media">
            {projectCover ? (
              <img
                className="secondary-card-cover"
                src={projectCover}
                alt={`${item.title}项目封面`}
              />
            ) : (
              <WorkVisual label={item.title} index={visualIndex} />
            )}
          </span>
          <span className="secondary-card-shine" />
          <span className="secondary-card-glare" />
          <span className="secondary-card-info">
            <strong>{item.title}</strong>
            <em>{item.summary}</em>
          </span>
        </span>
      </span>
    </button>
  )
}

function ProjectDetailStrip({ project, category, visualIndex, onMediaLoad }) {
  const media = project.detail?.media ?? []
  const hasStudyCopy = Boolean(project.detail?.abstract || project.detail?.method?.length)

  return (
    <>
      <section className={`detail-intro-block ${hasStudyCopy ? 'has-study-copy' : ''}`}>
        <span>{category.en}{project.year ? ` / ${project.year}` : ''}</span>
        <h2 id="work-detail-title">{project.title}</h2>
        <h3>{project.subtitle}</h3>
        {hasStudyCopy ? (
          <div className="detail-study-copy">
            {project.detail.abstract && (
              <section>
                <h4>中文摘要</h4>
                <p>{project.detail.abstract}</p>
              </section>
            )}
            {project.detail.method?.length > 0 && (
              <section>
                <h4>实验方法</h4>
                {project.detail.method.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </section>
            )}
          </div>
        ) : (
          <p>{project.summary}</p>
        )}
        {project.detail?.link && (
          <a
            className="detail-project-link"
            href={project.detail.link.href}
            target="_blank"
            rel="noreferrer"
          >
            {project.detail.link.label} <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      {media.length > 0 ? (
        media.map((item, index) => (
          <figure className={`detail-media detail-media-${item.type ?? 'image'}`} key={`${item.src ?? item.title}-${index}`}>
            {item.type === 'video' ? (
              <video
                src={item.src}
                poster={item.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={item.alt ?? `${project.title} 项目视频 ${index + 1}`}
                onLoadedMetadata={onMediaLoad}
              />
            ) : item.type === 'table' ? (
              <div className="detail-table-wrap">
                <figcaption>{item.title}</figcaption>
                <table>
                  <thead>
                    <tr>
                      {item.columns.map((column) => <th key={column} scope="col">{column}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <img
                src={item.src}
                alt={item.alt ?? `${project.title} 项目图片 ${index + 1}`}
                onLoad={onMediaLoad}
              />
            )}
          </figure>
        ))
      ) : (
        [0, 1, 2].map((index) => (
          <figure className="detail-media detail-media-placeholder" key={index}>
            <WorkVisual label={project.title} index={visualIndex + index} large />
          </figure>
        ))
      )}

      {project.detail?.conclusion && (
        <section className="detail-summary-block">
          <span>CONCLUSION / 研究总结</span>
          <h3>{project.detail.conclusionTitle ?? '在危机感知与动作稳定之间取得平衡'}</h3>
          <p>{project.detail.conclusion}</p>
        </section>
      )}
    </>
  )
}

function Work({ viewportRef, phase, onNavigate, onPhaseChange }) {
  const sectionRef = viewportRef
  const wheelLockRef = useRef(false)
  const wheelAmountRef = useRef(0)
  const downwardWheelReadyAtRef = useRef(0)
  const reverseAmountRef = useRef(0)
  const detailTrackRef = useRef(null)
  const detailScrollTargetRef = useRef(0)
  const detailScrollCurrentRef = useRef(0)
  const detailScrollMaxRef = useRef(0)
  const detailScrollFrameRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, lastX: 0 })
  const [level, setLevel] = useState('categories')
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [projectIndex, setProjectIndex] = useState(0)
  const [zooming, setZooming] = useState(false)
  const [returning, setReturning] = useState(false)

  const category = categories[categoryIndex]
  const project = category.projects[projectIndex]

  const measureDetailScrollMax = useCallback(() => {
    const track = detailTrackRef.current
    if (!track) return 0
    const viewportWidth = track.closest('.work-detail')?.clientWidth || window.innerWidth
    const nextMax = Math.max(0, (track.scrollWidth - viewportWidth) / window.innerWidth)
    detailScrollMaxRef.current = nextMax
    detailScrollTargetRef.current = clamp(detailScrollTargetRef.current, 0, nextMax)
    detailScrollCurrentRef.current = clamp(detailScrollCurrentRef.current, 0, nextMax)
    track.style.setProperty('--detail-progress', detailScrollCurrentRef.current.toFixed(5))
    return nextMax
  }, [])

  const animateDetailScroll = useCallback(() => {
    if (detailScrollFrameRef.current !== null) return
    let previousTime = performance.now()

    const step = (now) => {
      const delta = Math.min((now - previousTime) / 1000, 0.034)
      previousTime = now
      const current = detailScrollCurrentRef.current
      const target = detailScrollTargetRef.current
      const smoothing = 1 - Math.exp(-11.5 * delta)
      const next = current + (target - current) * smoothing

      detailScrollCurrentRef.current = next
      detailTrackRef.current?.style.setProperty('--detail-progress', next.toFixed(5))

      if (Math.abs(target - next) > 0.0005) {
        detailScrollFrameRef.current = requestAnimationFrame(step)
      } else {
        detailScrollCurrentRef.current = target
        detailTrackRef.current?.style.setProperty('--detail-progress', target.toFixed(5))
        detailScrollFrameRef.current = null
      }
    }

    detailScrollFrameRef.current = requestAnimationFrame(step)
  }, [])

  const moveDetailTo = useCallback((nextProgress, instant = false) => {
    const target = clamp(nextProgress, 0, detailScrollMaxRef.current)
    detailScrollTargetRef.current = target

    if (instant) {
      if (detailScrollFrameRef.current !== null) {
        cancelAnimationFrame(detailScrollFrameRef.current)
        detailScrollFrameRef.current = null
      }
      detailScrollCurrentRef.current = target
      detailTrackRef.current?.style.setProperty('--detail-progress', target.toFixed(5))
      return
    }

    animateDetailScroll()
  }, [animateDetailScroll])

  useEffect(() => {
    if (level !== 'detail') return undefined
    const frame = requestAnimationFrame(measureDetailScrollMax)
    const handleResize = () => measureDetailScrollMax()
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', handleResize)
    }
  }, [level, measureDetailScrollMax, project?.id])

  useEffect(() => () => {
    if (detailScrollFrameRef.current !== null) {
      cancelAnimationFrame(detailScrollFrameRef.current)
    }
  }, [])

  const moveIndex = (direction) => {
    if (wheelLockRef.current) return false
    if (level === 'projects' && category.projects.length === 0) return false
    const max = level === 'categories' ? categories.length - 1 : category.projects.length - 1
    const current = level === 'categories' ? categoryIndex : projectIndex
    const next =
      level === 'categories'
        ? (current + direction + categories.length) % categories.length
        : clamp(current + direction, 0, max)
    if (next === current) return false
    wheelLockRef.current = true
    if (level === 'categories') setCategoryIndex(next)
    else setProjectIndex(next)
    window.setTimeout(() => {
      wheelLockRef.current = false
    }, 330)
    return true
  }

  const enterAbout = () => {
    if (zooming) return
    onPhaseChange('work-to-about')
    setZooming(true)
    window.setTimeout(() => {
      onNavigate('about', { history: 'replace', behavior: 'instant' })
      window.setTimeout(() => setZooming(false), 180)
    }, 680)
  }

  const returnToWork = () => {
    if (returning || zooming || level !== 'categories') return
    if (sectionRef.current) {
      sectionRef.current.dataset.heroReverseBlockedUntil = String(
        performance.now() + 1400,
      )
    }
    setReturning(true)
    onNavigate('work', { history: 'replace', behavior: 'instant', returning: true })
    window.setTimeout(() => {
      reverseAmountRef.current = 0
      setReturning(false)
    }, 760)
  }

  useEffect(() => {
    if (phase !== 'work') {
      wheelAmountRef.current = 0
      return
    }

    // A trackpad keeps dispatching the same gesture after the Hero portal has
    // reached Work. Do not let that tail immediately start Work -> About.
    // Upward input is intentionally left available so the portal can reverse.
    downwardWheelReadyAtRef.current = performance.now() + 520
    wheelAmountRef.current = 0

    const section = sectionRef.current
    if (!section) return

    // HeroScene drives these as inline custom properties while the portal is
    // moving. Snap the stable Work state to exact values at the hand-off so a
    // late render frame cannot leave the fixed viewport scaled or clipped.
    section.style.setProperty('--work-portal-content-opacity', '1')
    section.style.setProperty('--work-portal-background-opacity', '1')
    section.style.setProperty('--work-portal-scale-x', '1')
    section.style.setProperty('--work-portal-scale-y', '1')
    section.style.setProperty('--work-portal-blur', '0px')
    section.style.setProperty('--work-portal-brightness', '1')
  }, [phase, sectionRef])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const onWheel = (event) => {
      const rect = section.getBoundingClientRect()
      const isWorkFocused =
        rect.top <= window.innerHeight * 0.18 && rect.bottom >= window.innerHeight * 0.82
      if (!isWorkFocused || zooming || phase !== 'work') return

      const amount = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (Math.abs(amount) < 4) return
      event.preventDefault()

      if (level === 'projects') {
        event.stopPropagation()
        wheelAmountRef.current = 0
        return
      }

      if (level === 'detail') {
        event.stopPropagation()
        wheelAmountRef.current = 0
        const normalizedAmount =
          event.deltaMode === 1
            ? amount * 18
            : event.deltaMode === 2
              ? amount * window.innerHeight
              : amount
        detailScrollTargetRef.current = clamp(
          detailScrollTargetRef.current + normalizedAmount * 0.00135,
          0,
          measureDetailScrollMax(),
        )
        animateDetailScroll()
        return
      }

      if (amount > 0) {
        if (performance.now() < downwardWheelReadyAtRef.current) {
          wheelAmountRef.current = 0
          return
        }
        wheelAmountRef.current += Math.abs(amount)
        if (wheelAmountRef.current > 62) enterAbout()
      } else {
        wheelAmountRef.current = 0
        // HeroScene owns the reverse television zoom. Let this wheel event
        // bubble to its window listener instead of starting native scrolling.
      }
    }

    section.addEventListener('wheel', onWheel, { passive: false })
    return () => section.removeEventListener('wheel', onWheel)
  }, [animateDetailScroll, category, categoryIndex, level, measureDetailScrollMax, onNavigate, onPhaseChange, phase, zooming])

  useEffect(() => {
    const onReverseWheel = (event) => {
      if (
        event.deltaY >= 0 ||
        phase !== 'about' ||
        level !== 'categories' ||
        zooming ||
        returning
      ) return
      const about = document.getElementById('about')
      if (!about) return
      const rect = about.getBoundingClientRect()
      const aboutTop = about.offsetTop
      const currentScrollY = window.scrollY
      const projectedScrollY = currentScrollY + event.deltaY
      const atAboutEntrance =
        (rect.top <= 12 && rect.top >= -28) ||
        (
          currentScrollY >= aboutTop - 28 &&
          projectedScrollY <= aboutTop + 12
        ) ||
        (
          currentScrollY < aboutTop - 28 &&
          currentScrollY >= document.getElementById('work')?.offsetTop
        )
      if (!atAboutEntrance) {
        reverseAmountRef.current = 0
        return
      }
      event.preventDefault()
      reverseAmountRef.current += Math.abs(event.deltaY)
      if (reverseAmountRef.current > 54) returnToWork()
    }
    window.addEventListener('wheel', onReverseWheel, { passive: false })
    return () => window.removeEventListener('wheel', onReverseWheel)
  }, [level, onNavigate, phase, returning, zooming])

  useEffect(() => {
    document.body.classList.toggle('work-immersive', level !== 'categories')
    return () => document.body.classList.remove('work-immersive')
  }, [level])

  const startDrag = (event) => {
    if (level === 'detail') return
    dragRef.current = { active: true, startX: event.clientX, lastX: event.clientX }
    event.currentTarget.classList.add('is-dragging')
  }

  const dragMove = (event) => {
    if (!dragRef.current.active) return
    dragRef.current.lastX = event.clientX
  }

  const endDrag = (event) => {
    if (!dragRef.current.active) return
    const distance = dragRef.current.lastX - dragRef.current.startX
    dragRef.current.active = false
    event.currentTarget.classList.remove('is-dragging')
    if (Math.abs(distance) > 54) moveIndex(distance < 0 ? 1 : -1)
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        if (level === 'detail') setLevel('projects')
        else if (level === 'projects') setLevel('categories')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [level])

  const openCategory = (index) => {
    setCategoryIndex(index)
    setProjectIndex(0)
    setLevel('projects')
  }

  const openProject = (index) => {
    setProjectIndex(index)
    moveDetailTo(0, true)
    setLevel('detail')
  }

  return (
    <section
      className={`work work-cinema work-viewport crt-surface level-${level} phase-${phase} ${zooming ? 'work-zooming' : ''} ${returning ? 'work-returning' : ''}`}
      ref={sectionRef}
    >
      <div className="work-tv-frame">
        <div className="work-scanlines" />
        <div className="work-tv-content">
          {level === 'categories' && (
            <div className="film-level film-category-level">
              <button
                key={category.id}
                className="work-title-row work-category-title"
                onClick={() => openCategory(categoryIndex)}
              >
                <h2>{category.title}</h2>
                <span>{category.en} · VIEW CATEGORY ↗</span>
              </button>
              <div className="film-viewport film-viewport-webgl">
                <FilmReel3D
                  activeIndex={categoryIndex}
                  imageUrls={categoryCoverImages}
                  onIndexChange={setCategoryIndex}
                  onOpen={openCategory}
                />
              </div>
              <div className="film-controls">
                <button onClick={() => moveIndex(-1)} aria-label="上一个分类">←</button>
                <div className="film-dots">
                  {categories.map((item, index) => (
                    <button
                      aria-label={`查看${item.title}`}
                      className={index === categoryIndex ? 'active' : ''}
                      key={item.id}
                      onClick={() => setCategoryIndex(index)}
                    />
                  ))}
                </div>
                <button onClick={() => moveIndex(1)} aria-label="下一个分类">→</button>
              </div>
              <p className="work-exit-hint">
                滚轮放大胶卷进入关于我 · 按住拖动或点击箭头切换
              </p>
            </div>
          )}

          {level === 'projects' && (
            <div className="film-level project-level">
              <button className="work-close" onClick={() => setLevel('categories')}>
                CLOSE <span>×</span>
              </button>
              <div className="project-level-heading">
                <span>{category.index} / {category.en}</span>
                <h2>{category.title}</h2>
                <p>{category.intro}</p>
              </div>
              <div
                className={`secondary-film ${category.projects.length === 0 ? 'is-empty' : ''}`}
                onPointerDown={startDrag}
                onPointerMove={dragMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={endDrag}
              >
                {category.projects.length === 0 ? (
                  <div className="project-coming-soon" role="status">
                    <span>COMING SOON</span>
                    <strong>敬请期待</strong>
                    <p>新的项目正在整理中</p>
                  </div>
                ) : category.projects.map((item, index) => {
                  const offset = index - projectIndex
                  const projectCover = item.cover ?? item.detail?.media?.find((mediaItem) => mediaItem.type === 'image')?.src
                  return (
                    <ProjectTiltCard
                      key={item.id}
                      item={item}
                      index={index}
                      offset={offset}
                      projectCover={projectCover}
                      visualIndex={categoryIndex + index}
                      onOpen={openProject}
                    />
                  )
                })}
              </div>
              {category.projects.length > 0 && (
                <div className="film-controls secondary-controls">
                  <button onClick={() => moveIndex(-1)}>←</button>
                  <span>{String(projectIndex + 1).padStart(2, '0')} / {String(category.projects.length).padStart(2, '0')}</span>
                  <button onClick={() => moveIndex(1)}>→</button>
                </div>
              )}
            </div>
          )}

          {level === 'detail' && (
            <article className="work-detail" aria-labelledby="work-detail-title">
              <button className="work-close detail-close" onClick={() => setLevel('projects')}>
                CLOSE <span>×</span>
              </button>
              <div
                className="detail-track"
                ref={detailTrackRef}
                style={{
                  '--detail-progress': detailScrollCurrentRef.current,
                }}
              >
                <ProjectDetailStrip
                  project={project}
                  category={category}
                  visualIndex={projectIndex + categoryIndex}
                  onMediaLoad={measureDetailScrollMax}
                />
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <footer className="contact crt-surface" id="contact">
      <div className="contact-light" />
      <div className="max-width contact-inner">
        <div className="section-label light">
          <span>03</span>
          <span>CONTACT / 保持联系</span>
        </div>
        <div className="contact-main">
          <p>有一个值得一起做的想法？</p>
          <a className="contact-title-link" href="mailto:2674854240@qq.com">
            <SplitText
              tag="span"
              text={'LET’S MAKE\nIT REAL.'}
              className="contact-split-title"
              delay={46}
              duration={1.05}
              ease="power4.out"
              splitType="lines, chars"
              from={{ opacity: 0, y: 110, rotateX: -88, rotateZ: 4 }}
              to={{ opacity: 1, y: 0, rotateX: 0, rotateZ: 0 }}
              threshold={0.18}
              rootMargin="-40px"
              textAlign="left"
            />
          </a>
        </div>
        <div className="contact-bottom">
          <div>
            <span>EMAIL</span>
            <a href="mailto:2674854240@qq.com">2674854240@qq.com</a>
          </div>
          <div>
            <span>WECHAT</span>
            <p>qing19050828</p>
          </div>
          <div>
            <span>GITHUB</span>
            <a href="https://github.com/seazeon" target="_blank" rel="noreferrer">
              github.com/seazeon
            </a>
          </div>
          <a className="back-top" href="#top">
            BACK TO TOP ↑
          </a>
        </div>
        <div className="footer-note">
          <span>© 2026 QIAN YINGYING</span>
          <span>DESIGNED WITH CURIOSITY</span>
        </div>
      </div>
    </footer>
  )
}

function PageTurnTransition() {
  useEffect(() => {
    const about = document.getElementById('about')
    const contact = document.getElementById('contact')
    if (!about || !contact) return undefined

    const root = document.documentElement
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let active = false
    let wheelAmount = 0
    let resetWheelTimer = null

    const jumpTo = (target, hash) => {
      const previousScrollBehavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(0, target)
      window.history.replaceState(null, '', hash)
      requestAnimationFrame(() => {
        root.style.scrollBehavior = previousScrollBehavior
      })
    }

    const turnPage = (direction) => {
      if (active) return
      active = true
      wheelAmount = 0
      const forward = direction > 0
      const className = forward ? 'page-turn-forward' : 'page-turn-reverse'
      const target = forward
        ? contact.offsetTop + 1
        : Math.max(about.offsetTop, about.offsetTop + about.offsetHeight - window.innerHeight - 1)
      const hash = forward ? '#contact' : '#about'

      if (forward) {
        const previousScrollBehavior = root.style.scrollBehavior
        root.style.scrollBehavior = 'auto'
        window.scrollTo(
          0,
          Math.max(about.offsetTop, about.offsetTop + about.offsetHeight - window.innerHeight),
        )
        root.getBoundingClientRect()
        root.style.scrollBehavior = previousScrollBehavior
      }

      if (!document.startViewTransition || prefersReducedMotion.matches) {
        jumpTo(target, hash)
        window.setTimeout(() => {
          active = false
        }, 500)
        return
      }

      root.classList.add(className)
      const transition = document.startViewTransition(() => {
        jumpTo(target, hash)
      })
      transition.finished
        .catch(() => {})
        .finally(() => {
          root.classList.remove(className)
          active = false
        })
    }

    const onWheel = (event) => {
      if (active) {
        event.preventDefault()
        return
      }

      const aboutRect = about.getBoundingClientRect()
      const contactRect = contact.getBoundingClientRect()
      const distanceToAboutEnd = aboutRect.bottom - window.innerHeight
      const crossingAllowance = Math.min(Math.max(Math.abs(event.deltaY), 4), 140)
      const atAboutExit =
        event.deltaY > 0 &&
        distanceToAboutEnd <= crossingAllowance + 2 &&
        distanceToAboutEnd >= -180
      const atContactEntrance =
        event.deltaY < 0 &&
        contactRect.top >= -150 &&
        contactRect.top <= 150

      if (!atAboutExit && !atContactEntrance) {
        wheelAmount = 0
        return
      }

      event.preventDefault()
      wheelAmount += event.deltaY
      window.clearTimeout(resetWheelTimer)
      resetWheelTimer = window.setTimeout(() => {
        wheelAmount = 0
      }, 220)

      if (atAboutExit && wheelAmount >= 48) turnPage(1)
      if (atContactEntrance && wheelAmount <= -48) turnPage(-1)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      window.clearTimeout(resetWheelTimer)
      root.classList.remove('page-turn-forward', 'page-turn-reverse')
      window.removeEventListener('wheel', onWheel)
    }
  }, [])

  return null
}

const getInitialSection = () => {
  const hash = window.location.hash.replace('#', '')
  return ['top', 'work', 'about', 'contact'].includes(hash) ? hash : 'top'
}

export default function App() {
  const initialSectionRef = useRef(getInitialSection())
  const sceneApiRef = useRef(null)
  const workViewportRef = useRef(null)
  const navigationPhaseTimerRef = useRef(null)
  const [phase, setPhase] = useState(
    initialSectionRef.current === 'work'
      ? 'work'
      : initialSectionRef.current === 'top'
        ? 'hero'
        : 'about',
  )
  const [activeSection, setActiveSection] = useState(initialSectionRef.current)
  const phaseRef = useRef(phase)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  const updateHistory = (section, mode) => {
    if (mode === 'none') return
    const method = mode === 'push' ? 'pushState' : 'replaceState'
    window.history[method](null, '', `#${section}`)
  }

  const navigateTo = useCallback((section, options = {}) => {
    const {
      behavior = 'instant',
      history = 'replace',
      returning = false,
    } = options
    window.clearTimeout(navigationPhaseTimerRef.current)
    navigationPhaseTimerRef.current = null
    sceneApiRef.current?.cancelForNavigation(section)

    if (section === 'top') {
      phaseRef.current = 'hero'
      setPhase('hero')
      setActiveSection('top')
    } else if (section === 'work') {
      const nextPhase = returning ? 'about-to-work' : 'work'
      phaseRef.current = nextPhase
      setPhase(nextPhase)
      setActiveSection('work')
      if (returning) {
        navigationPhaseTimerRef.current = window.setTimeout(() => {
          navigationPhaseTimerRef.current = null
          phaseRef.current = 'work'
          setPhase('work')
        }, 760)
      }
    } else {
      phaseRef.current = 'about'
      setPhase('about')
      setActiveSection(section)
    }

    updateHistory(section, history)
    const target = document.getElementById(section)
    if (!target || behavior === 'none') return
    const root = document.documentElement
    const previousBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = behavior === 'smooth' ? 'smooth' : 'auto'
    window.scrollTo(0, target.offsetTop)
    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior
    })
  }, [])

  useEffect(() => () => {
    window.clearTimeout(navigationPhaseTimerRef.current)
  }, [])

  const handleTransitionPhase = useCallback((nextPhase) => {
    setPhase(nextPhase)
    phaseRef.current = nextPhase
    if (
      nextPhase === 'work' ||
      nextPhase === 'hero-to-work' ||
      nextPhase === 'about-to-work'
    ) {
      setActiveSection('work')
    } else if (nextPhase === 'hero' || nextPhase === 'work-to-hero') {
      setActiveSection('top')
    }
    if (nextPhase === 'work' || nextPhase === 'about-to-work') {
      updateHistory('work', 'replace')
    }
    if (nextPhase === 'hero' || nextPhase === 'work-to-hero') {
      updateHistory('top', 'replace')
    }
  }, [])

  useEffect(() => {
    navigateTo(initialSectionRef.current, {
      behavior: 'instant',
      history: 'none',
    })
  }, [navigateTo])

  useEffect(() => {
    const onPopState = () => {
      const section = getInitialSection()
      navigateTo(section, { behavior: 'instant', history: 'none' })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [navigateTo])

  useEffect(() => {
    let frame = null
    const updateFromScroll = () => {
      frame = null
      if (phaseRef.current.includes('-to-')) return
      const probe = window.scrollY + window.innerHeight * 0.38
      let current = 'top'
      ;['top', 'work', 'about', 'contact'].forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= probe) current = id
      })
      if (phaseRef.current === 'work') current = 'work'
      setActiveSection(current)
    }
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(updateFromScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <SiteLoader />
      <PixelTrail />
      <PageTurnTransition />
      <div className="page-fold-indicator" aria-hidden="true" />
      <Header activeSection={activeSection} onNavigate={navigateTo} />
      <Hero
        sceneApiRef={sceneApiRef}
        workViewportRef={workViewportRef}
        onTransitionPhase={handleTransitionPhase}
      />
      <div className="work-anchor" id="work" aria-hidden="true" />
      <Work
        viewportRef={workViewportRef}
        phase={phase}
        onNavigate={navigateTo}
        onPhaseChange={handleTransitionPhase}
      />
      <About />
      <Contact />
    </>
  )
}
