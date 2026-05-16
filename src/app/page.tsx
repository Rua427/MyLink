import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20 selection:bg-brutal-pink selection:text-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 md:p-8 brutal-border border-t-0 border-l-0 border-r-0 border-b-4 bg-white sticky top-0 z-50">
        <div className="text-3xl font-black uppercase tracking-tighter cursor-pointer hover:scale-105 transition-transform">
          다겸.DEV
        </div>
        <div className="hidden md:flex gap-8 font-bold text-lg">
          <a href="#about" className="hover:text-brutal-blue hover:underline decoration-4 underline-offset-4 transition-colors">소개</a>
          <a href="#skills" className="hover:text-brutal-red hover:underline decoration-4 underline-offset-4 transition-colors">기술 스택</a>
          <a href="#projects" className="hover:text-brutal-green hover:underline decoration-4 underline-offset-4 transition-colors">프로젝트</a>
        </div>
        <a 
          href="#contact" 
          className="brutal-border brutal-shadow brutal-hover bg-brutal-yellow px-6 py-2 font-black text-lg uppercase"
        >
          연락하기
        </a>
      </nav>

      <main className="max-w-6xl mx-auto px-6 mt-12 md:mt-24 flex flex-col gap-32">
        {/* Hero Section */}
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-start gap-6 w-full break-keep">
            <div className="inline-block brutal-border bg-brutal-green px-4 py-2 font-bold text-xl brutal-shadow-sm rotate-[-2deg]">
              삼성전자 네트워크사업부
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[1.1] tracking-tight">
              서버 관리 & <br/> 
              <span className="text-brutal-blue inline-block transform hover:rotate-2 transition-transform">자동화 테스트</span> <br/>
              개발자.
            </h1>
            <p className="text-xl font-medium max-w-lg mt-4 border-l-[6px] border-brutal-red pl-4 text-black/80">
              안정적인 서버 환경을 구축하고, 생산되는 제품의 정상성을 검증하는 자동화 테스트 시스템을 개발하고 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full sm:w-auto">
              <a href="#projects" className="text-center brutal-border brutal-shadow brutal-hover bg-brutal-pink px-8 py-4 font-black text-xl uppercase w-full sm:w-auto">
                프로젝트 보기
              </a>
              <a href="https://github.com" target="_blank" className="text-center brutal-border brutal-shadow brutal-hover bg-white px-8 py-4 font-black text-xl w-full sm:w-auto">
                GitHub
              </a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-md lg:max-w-none relative">
            <div className="w-full aspect-square md:aspect-[4/5] bg-brutal-yellow brutal-border brutal-shadow-lg p-4 relative brutal-hover transform translate-y-0">
               {/* Placeholder profile representation */}
               <div className="w-full h-full bg-white brutal-border overflow-hidden flex items-center justify-center relative">
                 <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                 <span className="text-8xl md:text-9xl font-black text-center z-10 select-none transform hover:scale-110 transition-transform cursor-pointer">💻</span>
               </div>
               {/* Decorative elements */}
               <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-brutal-blue brutal-border brutal-shadow z-20"></div>
               <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-brutal-red brutal-border brutal-shadow z-20 rotate-12 flex items-center justify-center">
                 <span className="text-4xl">✨</span>
               </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="brutal-border brutal-shadow-lg bg-brutal-blue p-8 md:p-16 relative mt-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-8 text-white stroke-black drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">소개</h2>
          <div className="bg-white p-6 md:p-10 brutal-border brutal-shadow-sm text-lg md:text-xl font-medium leading-relaxed max-w-4xl break-keep">
            <p>
              안녕하세요, 저는 삼성전자 네트워크사업부에서 근무하고 있는 <strong className="font-black text-2xl md:text-3xl bg-brutal-yellow px-2 border-2 border-black">김다겸</strong>입니다. 시스템의 근간이 되는 서버 인프라를 안정적으로 관리하고 운영하는 일을 즐깁니다.
            </p>
            <p className="mt-6">
              주로 <strong>서버 관리</strong>와 생산 제품의 품질을 보장하기 위한 <strong>자동 테스트 시스템 개발</strong> 업무를 담당하고 있습니다. 반복되는 작업을 자동화하여 효율을 높이고, 신뢰할 수 있는 테스트 환경을 구축하는 데 집중하고 있습니다.
            </p>
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-8 py-2 brutal-border font-black text-2xl md:text-3xl rotate-2 shadow-[4px_4px_0_0_#000]">
            INFO
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 text-center bg-brutal-yellow px-10 py-3 brutal-border brutal-shadow-sm -rotate-2">
            기술 스택
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl">
            {['Linux', 'Bash', 'Python', 'Docker', 'Kubernetes', 'Test Automation', 'CI/CD', 'Git'].map((skill, index) => {
              const colors = ['bg-brutal-pink', 'bg-brutal-green', 'bg-white', 'bg-brutal-yellow', 'bg-brutal-blue'];
              const bgColor = colors[index % colors.length];
              const rotation = index % 2 === 0 ? 'rotate-2' : '-rotate-3';
              return (
                <div key={skill} className={`brutal-border brutal-shadow-sm ${bgColor} px-6 md:px-8 py-3 md:py-4 font-black text-lg md:text-2xl uppercase brutal-hover ${rotation} cursor-default`}>
                  {skill}
                </div>
              );
            })}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-16 flex items-center gap-4 flex-wrap">
            <span className="bg-black text-white px-6 py-2 brutal-shadow">나의</span>
            프로젝트
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Project 1 */}
            <div className="brutal-border brutal-shadow-lg bg-white group brutal-hover flex flex-col h-full">
              <div className="h-64 bg-brutal-pink border-b-[3px] border-black flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}></div>
                <h3 className="text-3xl md:text-4xl font-black z-10 bg-white px-6 py-3 brutal-border transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all text-center break-keep">
                  제품 검증 자동화
                </h3>
              </div>
              <div className="p-8 flex flex-col flex-1 gap-6 break-keep">
                <p className="text-lg md:text-xl font-medium text-black/80">네트워크 제품의 생산 후 정상성 여부를 자동으로 테스트하고 리포팅하는 시스템 파이프라인 개발 및 유지보수.</p>
                <div className="flex gap-3 flex-wrap mt-auto">
                  <span className="border-[3px] border-black px-3 py-1 text-sm font-black bg-brutal-yellow uppercase">Python</span>
                  <span className="border-[3px] border-black px-3 py-1 text-sm font-black bg-brutal-blue uppercase">Jenkins</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="brutal-border brutal-shadow-lg bg-white group brutal-hover flex flex-col h-full">
              <div className="h-64 bg-brutal-green border-b-[3px] border-black flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ backgroundSize: '30px 30px', backgroundImage: 'radial-gradient(circle, #000 3px, transparent 4px)'}}></div>
                <h3 className="text-3xl md:text-4xl font-black z-10 bg-white px-6 py-3 border-[3px] border-black shadow-[6px_6px_0_0_#000] transform rotate-2 group-hover:rotate-0 group-hover:scale-110 transition-all text-center break-keep">
                  사내 서버 인프라 관리
                </h3>
              </div>
              <div className="p-8 flex flex-col flex-1 gap-6 break-keep">
                <p className="text-lg md:text-xl font-medium text-black/80">다양한 개발 및 테스트 환경을 위한 서버 모니터링 구축, 트러블슈팅 및 가용성 향상을 위한 아키텍처 개선.</p>
                <div className="flex gap-3 flex-wrap mt-auto">
                  <span className="border-[3px] border-black px-3 py-1 text-sm font-black bg-white uppercase">Linux</span>
                  <span className="border-[3px] border-black px-3 py-1 text-sm font-black bg-brutal-pink uppercase">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <section id="contact" className="mt-10 border-t-[6px] border-black pt-20 pb-16 flex flex-col items-center text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase mb-8">연락하기</h2>
          <p className="text-xl md:text-2xl font-medium mb-12 max-w-2xl bg-white brutal-border p-6 shadow-[8px_8px_0_0_#000] -rotate-1 break-keep">
            함께 프로젝트를 진행하거나 궁금한 점이 있으시다면 언제든 연락주세요!
          </p>
          <a href="mailto:hello@example.com" className="text-2xl md:text-5xl font-black uppercase bg-brutal-yellow px-8 md:px-16 py-6 md:py-8 brutal-border shadow-[12px_12px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-2 hover:translate-y-2 transition-all">
            hello@example.com
          </a>
        </section>
      </main>
    </div>
  );
}
