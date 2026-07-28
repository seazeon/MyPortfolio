import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { categories } from './data'

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

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="回到首页">
        <span>QIAN</span>
        <small>PORTFOLIO / 2026</small>
      </a>
      <nav aria-label="主导航">
        <a href="#about">关于</a>
        <a href="#work">作品</a>
        <a href="#contact">联系</a>
      </nav>
      <a className="header-cta" href="mailto:2674854240@qq.com">
        一起创造 <Arrow diagonal />
      </a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-photo" />
      <div className="hero-vignette" />
      <Scene />
      <Header />
      <div className="hero-grid max-width">
        <div className="hero-kicker">
          <span className="status-dot" />
          OPEN TO UI/UX & GAME DESIGN
        </div>
        <h1>
          <span>Design for</span>
          <span className="outline">meaningful</span>
          <span>interactions.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            你好，我是钱盈颖。
            <br />
            我把研究变成体验，把故事变成选择。
          </p>
          <a className="scroll-cue" href="#about">
            <span>向下探索</span>
            <span className="scroll-line" />
          </a>
          <div className="hero-meta">
            <span>INDUSTRIAL DESIGN</span>
            <span>GAME · UI/UX · RESEARCH</span>
            <span>XIANGTAN / CHINA</span>
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

function About() {
  return (
    <section className="about section-light" id="about">
      <div className="max-width">
        <div className="section-label">
          <span>01</span>
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

function Work({ onOpen }) {
  const [active, setActive] = useState('game')

  return (
    <section className="work" id="work">
      <div className="max-width">
        <div className="section-label light">
          <span>02</span>
          <span>SELECTED WORK / 精选项目</span>
        </div>
        <div className="work-heading">
          <h2>四种尺度，同一种好奇。</h2>
          <p>选择一个方向，展开其中的项目切片。</p>
        </div>
        <div className="category-list">
          {categories.map((category) => {
            const isActive = active === category.id
            return (
              <article className={`category ${isActive ? 'active' : ''}`} key={category.id}>
                <button
                  className="category-trigger"
                  onClick={() => setActive(isActive ? '' : category.id)}
                  aria-expanded={isActive}
                >
                  <span className="category-index">{category.index}</span>
                  <span className="category-title">
                    <small>{category.en}</small>
                    {category.title}
                  </span>
                  <span className="category-intro">{category.intro}</span>
                  <span className="category-toggle">{isActive ? '×' : '+'}</span>
                </button>
                <div className="project-drawer">
                  <div className="project-grid">
                    {category.projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        tone={category.tone}
                        onOpen={onOpen}
                      />
                    ))}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined
    document.body.classList.add('modal-open')
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  if (!project) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="关闭项目详情">
          ×
        </button>
        <div className="modal-visual">
          <span className="modal-orbit" />
          <span className="modal-number">{project.year}</span>
          <span className="modal-letter">{project.title.slice(0, 1)}</span>
        </div>
        <div className="modal-copy">
          <span className="eyebrow">SELECTED CASE / 项目详情</span>
          <h3 id="modal-title">{project.title}</h3>
          <p className="modal-subtitle">{project.subtitle}</p>
          <p className="modal-summary">{project.summary}</p>
          <div className="modal-meta">
            <div>
              <span>ROLE</span>
              <p>{project.role}</p>
            </div>
            <div>
              <span>KEYWORDS</span>
              <p>{project.tags.join(' · ')}</p>
            </div>
          </div>
          <ul className="fact-list">
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
          <p className="modal-note">完整过程与项目图片将在下一版素材补充后展开。</p>
        </div>
      </article>
    </div>
  )
}

function Contact() {
  return (
    <footer className="contact" id="contact">
      <div className="contact-light" />
      <div className="max-width contact-inner">
        <div className="section-label light">
          <span>03</span>
          <span>CONTACT / 保持联系</span>
        </div>
        <div className="contact-main">
          <p>有一个值得一起做的想法？</p>
          <a href="mailto:2674854240@qq.com">
            LET’S MAKE
            <br />
            IT <span>REAL.</span>
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

export default function App() {
  const [project, setProject] = useState(null)

  return (
    <>
      <Hero />
      <About />
      <Work onOpen={setProject} />
      <Contact />
      <ProjectModal project={project} onClose={() => setProject(null)} />
    </>
  )
}

