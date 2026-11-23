// 프로토타입 데이터 — 제목·썸네일은 현행 hu.dev.hunet.com 기준, 설명·수치 일부는 예시
const CDN = 'https://hunetdown.cdn.hunet.co.kr/cms/thumbnail';
const IMG = 'https://img.hunet.co.kr';
const EL = id => `${CDN}/elearning/${id}.png`;
const ML = id => `${CDN}/microlearning/${id}.png`;
const BOOK = id => `${IMG}/files/Process/Course/Sample/${id}.jpg`;
const JOB = id => `${CDN}/job/job_${id}.jpg`;

// 콘텐츠 카테고리 (현행 콘텐츠 탭 순서)
const CATS = ['전체','리더십','비즈니스','업무생산성','AI','데이터 사이언스','인문/교양','어학','라이프','커리어'];
const TYPES = ['과정','아티클','영상','카드뉴스'];

// p: 가격 표기 (null = 표기 없음), t: 학습 시간, n: 학습자 수, sk: 관련 스킬명
const CONTENTS = [
  {id:1, type:'과정', cat:'비즈니스', title:'세일즈맨을 위한 상위 1% 영업 전략', p:'무료', was:'120,000원', t:'9시간', n:5, img:EL('HLAP00412'),
   d:'체계적인 영업 프로세스와 구매 심리 과정을 바탕으로 나의 영업 방식을 돌아보고, 나만의 영업 전략을 수립해보세요. 고객 발굴부터 설득, 관리까지 상위 1% 영업 고수들의 노하우를 담았어요.',
   sk:['고객 유지','고객 통찰력','설득 커뮤니케이션','효과적인 커뮤니케이션','적극적 경청']},
  {id:2, type:'아티클', cat:'업무생산성', title:'어떻게 글을 써야 할까: 엣지 있는 글을 쓰는 방법', p:null, t:'11분', n:5, img:`${IMG}/Files/B2C/Temp/250626190502240_b9882864ad59425dbc8856059f210985.jpg`, sk:['효과적인 커뮤니케이션','창의적 사고','데이터 스토리텔링']},
  {id:3, type:'과정', cat:'AI', title:'AI 시대의 인재, 문제 해결 마스터', p:'무료', t:'6시간', n:4, img:EL('HLAP00417'), sk:['분석적 사고','창의적 사고','생성 인공지능','데이터 기반 의사결정']},
  {id:4, type:'아티클', cat:'인문/교양', title:'2024 노벨 경제학상이 주목한 ‘번영하는 사회의 비밀’', p:null, t:'17분', n:4, img:`${IMG}/Files/B2C/Temp/241114131846_478_thumbnail.jpg`, sk:['분석적 사고','데이터 해석']},
  {id:5, type:'과정', cat:'AI', title:'프롬프트 엔지니어링의 핵심, ‘좋은 질문’에 집중하라!', p:'무료', t:'9시간', n:3, img:EL('HLAP00400'), sk:['프롬프트 엔지니어링','ChatGPT','생성 인공지능']},
  {id:6, type:'영상', cat:'인문/교양', title:'‘8월의 크리스마스’ 속 빛나는 지점 찾기', p:'무료', t:'13분', n:3, img:ML('Y00062242'), sk:['창의적 사고']},
  {id:7, type:'카드뉴스', cat:'비즈니스', title:'‘바이오 커스터마이징’ 시대를 가져올 합성생물학', p:null, t:'총 10장', n:3, img:`${IMG}/Files/B2C/CeoWeeklyPick/260625143316341_fc8b52853bc04584bcc4d2faabd56f54.jpg`, sk:['디지털 전환']},
  {id:8, type:'과정', cat:'커리어', title:'[온보딩저니] 경력사원 과정', p:'무료', t:'8시간', n:2, img:EL('HLAP05049'), sk:['목표 설정','교차 기능 협업','효과적인 커뮤니케이션']},
  {id:9, type:'영상', cat:'비즈니스', title:'‘YOLO’는 어떻게 트렌드가 되는가?', p:'무료', t:'8분', n:2, img:ML('Y00074208'), sk:['고객 통찰력','브랜드 전략']},
  {id:10, type:'영상', cat:'리더십', title:'분석적인 CEO가 흔히 빠지는 4가지 함정', p:'무료', t:'7분', n:2, img:ML('Y00111425'), sk:['분석적 사고','데이터 기반 의사결정','리더십 개발']},
  {id:11, type:'영상', cat:'비즈니스', title:'신의 한수가 된 콜라보레이션', p:'무료', t:'7분', n:2, img:ML('Y00127808'), sk:['브랜드 전략','브랜드 커뮤니케이션']},
  {id:12, type:'영상', cat:'업무생산성', title:'[IT 서비스와 조직의 특성] IT 조직을 이끄는 프로덕트 전략과 로드맵', p:'멤버십 전용', t:'9분', n:2, img:ML('Y00228655'), sk:['제품 전략','제품 로드맵 개발','제품 관리']},
  {id:13, type:'과정', cat:'AI', title:'AX 시대의 디지털 혁신', p:'무료', t:'5시간', n:2, img:EL('HLAP00609'), sk:['디지털 전환','생성 인공지능','데이터 문해력']},
  {id:14, type:'과정', cat:'데이터 사이언스', title:'AX 시대를 준비하는 필수템, 데이터 마인드셋', p:'무료', t:'4시간', n:2, img:EL('HLAP01122'), sk:['데이터 문해력','데이터 기반 의사결정','데이터 분석','데이터 시각화']},
  {id:15, type:'과정', cat:'인문/교양', title:'[지혜의 샘] 시대를 앞선 혁신가, 돈키호테의 진짜 이야기', p:'무료', t:'25분', n:2, img:EL('HLAP09779'), sk:['창의적 사고']},
  {id:16, type:'과정', cat:'어학', title:'[스낵영어] Quiz로 배우고 GPT로 말하는 여행영어', p:'무료', t:'15분', n:2, img:EL('HLAP11671'), sk:['ChatGPT']},
  {id:17, type:'과정', cat:'리더십', title:'퇴사율 0% 전설의 팀장이 되기 위한 조직문화 설계법', p:'무료', t:'1시간 50분', n:2, img:EL('HLAP14212'), sk:['조직 문화 변화','직원 코칭','리더십 개발','목표 설정']},
  {id:18, type:'과정', cat:'리더십', title:'발표부터 분석까지, 리더의 AI 실무 활용법', p:'무료', t:'2시간 30분', n:2, img:EL('HLAP14213'), sk:['생성 인공지능','데이터 프레젠테이션','리더십 개발']},
  {id:19, type:'과정', cat:'비즈니스', title:'골드 휴먼', p:'30,000원', t:'20시간', n:0, img:BOOK('HLAC30973'), sk:['디지털 전환','분석적 사고']},
  {id:20, type:'과정', cat:'비즈니스', title:'넥스트 유니콘', p:'33,000원', t:'20시간', n:0, img:BOOK('HLAC30981'), sk:['제품 전략','브랜드 전략']},
  {id:21, type:'과정', cat:'비즈니스', title:'달러, 코인, 전쟁', p:'33,000원', t:'20시간', n:0, img:BOOK('HLAC30986'), sk:['분석적 사고','데이터 해석']},
  {id:22, type:'과정', cat:'비즈니스', title:'부의 갈림길', p:'41,000원', t:'20시간', n:0, img:BOOK('HLAC31015'), sk:['분석적 사고']},
  {id:23, type:'과정', cat:'비즈니스', title:'스페이스X 일론머스크', p:'39,000원', t:'20시간', n:0, img:BOOK('HLAC30209'), sk:['리더십 개발','창의적 사고']},
  {id:24, type:'과정', cat:'비즈니스', title:'경제대전망 2026-2030', p:'38,000원', t:'20시간', n:0, img:BOOK('HLAC27653'), sk:['데이터 해석','분석적 사고']},
  {id:25, type:'과정', cat:'어학', title:'[전화 필리핀] 최신 이슈로 말하는 News & Trend Talk 초중급', p:'170,000원', t:'4시간', n:0, img:`${CDN}/elearning/process/HLAC26353.png`, sk:['효과적인 커뮤니케이션','적극적 경청']}
];

// 스킬 그룹
const GROUPS = ['브랜드·마케팅','데이터','제품·기획','고객','리더십·조직','커뮤니케이션·사고','AI·디지털'];
const GROUP_DESC = {
  '브랜드·마케팅':'브랜드가 지향하는 가치를 정하고, 고객 경험 전반에서 일관되게 전달하는 역량이에요.',
  '데이터':'데이터를 수집·해석해 근거 있는 판단을 내리고, 이해하기 쉽게 전달하는 역량이에요.',
  '제품·기획':'고객 문제를 정의하고 우선순위를 세워 제품을 계획·개선해 나가는 역량이에요.',
  '고객':'고객을 깊이 이해하고 여정 전반의 경험을 설계해 관계를 오래 유지하는 역량이에요.',
  '리더십·조직':'구성원의 성장을 돕고 목표를 정렬해 조직의 성과를 이끄는 역량이에요.',
  '커뮤니케이션·사고':'생각을 구조화하고 상대에 맞게 전달해 협업을 만들어 내는 역량이에요.',
  'AI·디지털':'AI와 디지털 도구를 업무에 적용해 일하는 방식을 바꾸는 역량이에요.'
};
const SKILLS = [
  ['브랜드 전략','Brand Strategy','브랜드·마케팅'],['데이터 기반 의사결정','Data-Driven Decision Making','데이터'],
  ['데이터 분석','Data Analysis','데이터'],['브랜드 아이덴티티','Brand Identity','브랜드·마케팅'],
  ['데이터 해석','Data Interpretation','데이터'],['브랜드 포지셔닝','Brand Positioning','브랜드·마케팅'],
  ['브랜드 관리','Brand Management','브랜드·마케팅'],['제품 관리','Product Management','제품·기획'],
  ['데이터 스토리텔링','Data Storytelling','데이터'],['제품 전략','Product Strategy','제품·기획'],
  ['제품 계획','Product Planning','제품·기획'],['제품 분석','Product Analytics','제품·기획'],
  ['리더십 개발','Leadership Development','리더십·조직'],['데이터 프레젠테이션','Data Presentation','데이터'],
  ['브랜드 커뮤니케이션','Brand Communication','브랜드·마케팅'],['데이터 시각화','Data Visualization','데이터'],
  ['개인 브랜딩','Personal Branding','브랜드·마케팅'],['제품 로드맵 개발','Product Roadmap Development','제품·기획'],
  ['고객 경험 전략 (CX)','Customer Experience Strategy','고객'],['고객 여정 맵','Customer Journey Mapping','고객'],
  ['데이터 문해력','Data Literacy','데이터'],['인재 확보','Talent Acquisition','리더십·조직'],
  ['조직 문화 변화','Organizational Culture Change','리더십·조직'],['고객 세분화','Customer Segmentation','고객'],
  ['고객 통찰력','Customer Insight','고객'],['ChatGPT','ChatGPT','AI·디지털'],
  ['생성 인공지능','Generative AI','AI·디지털'],['고객 유지','Customer Retention','고객'],
  ['A/B 테스트','A/B Testing','제품·기획'],['효과적인 커뮤니케이션','Effective Communication','커뮤니케이션·사고'],
  ['설득 커뮤니케이션','Persuasive Communication','커뮤니케이션·사고'],['창의적 사고','Creative Thinking','커뮤니케이션·사고'],
  ['디지털 전환','Digital Transformation','AI·디지털'],['적극적 경청','Active Listening','커뮤니케이션·사고'],
  ['직원 코칭','Employee Coaching','리더십·조직'],['프롬프트 엔지니어링','Prompt Engineering','AI·디지털'],
  ['분석적 사고','Analytical Thinking','커뮤니케이션·사고'],['목표 설정','Goal Setting','리더십·조직'],
  ['교차 기능 협업','Cross-Functional Collaboration','커뮤니케이션·사고']
].map(([k,e,g],i)=>({id:i+1,k,e,g,n:Math.round(2340*Math.pow(0.955,i))}));

const CAREERS = [
  {id:1,k:'IT 서비스 기획',e:'IT Service Planning',img:JOB(47),sk:['제품 전략','제품 계획','고객 여정 맵','데이터 분석','A/B 테스트']},
  {id:2,k:'브랜드 디자인',e:'Brand Design',img:JOB(90),sk:['브랜드 아이덴티티','브랜드 전략','브랜드 포지셔닝','창의적 사고']},
  {id:3,k:'MD',e:'Merchandiser',img:JOB(109),sk:['고객 세분화','데이터 분석','고객 통찰력','브랜드 관리']},
  {id:4,k:'UI/UX 기획',e:'UI/UX Planning',img:JOB(50),sk:['고객 여정 맵','고객 경험 전략 (CX)','A/B 테스트','제품 분석']},
  {id:5,k:'기술 영업',e:'Technical Sales',img:JOB(102),sk:['설득 커뮤니케이션','고객 유지','적극적 경청','고객 통찰력']}
];

const PREMIUM = [
  {t:'hunet MBA', d:'경영 전반을 이끄는 리더를 위한 정규 MBA 과정', meta:'24개월 · 학위 과정', price:null, img:`${CDN}/elearning/process/HLAP25735.png`},
  {t:'hunet MBA_Online', d:'실무를 바꾸는 온라인 MBA. 전략·마케팅·재무를 한 번에', meta:'12개월 · 온라인', price:{was:'2,000,000원', off:'50%', now:'1,000,000원'}, img:`${CDN}/elearning/process/HLAP22422.png`}
];

const HU_PLUS = [
  {k:'휴넷 CEO', d:'경영자를 위한 인사이트 멤버십', href:'https://ceo.hunet.co.kr/membership/intro'},
  {k:'리더십저니', d:'리더의 성장 여정 프로그램', href:'https://leadership.hunet.co.kr/journey/intro'},
  {k:'위즈덤스프링', d:'지혜를 나누는 인문 교양', href:'https://wisdom.hunet.co.kr/about'}
];
const HRD_URL = 'https://hrd.hunet.co.kr/';

// 홈 큐레이션 (트렌딩은 Top Pick과 중복 제거)
const HOME = { pick:[1,2,3,4], trend:[5,13,14,17,18], free:[15,16,17,18] };

// 헬퍼
const byId = id => CONTENTS.find(c=>c.id===+id);
const skillById = id => SKILLS.find(s=>s.id===+id);
const skillByName = k => SKILLS.find(s=>s.k===k);
const contentsOfSkill = s => {
  const direct = CONTENTS.filter(c=>c.sk.includes(s.k));
  const sameGroup = CONTENTS.filter(c=>!direct.includes(c) && c.sk.some(k=>skillByName(k)?.g===s.g));
  return [...direct, ...sameGroup].slice(0,8);
};
const careersOfSkill = s => {
  const hit = CAREERS.filter(c=>c.sk.includes(s.k));
  return hit.length ? hit : CAREERS.filter(c=>c.sk.some(k=>skillByName(k)?.g===s.g)).slice(0,2);
};
// 콘텐츠별 스킬 획득 포인트 (예시 값)
const skillPts = c => c.sk.map((k,i)=>({s:skillByName(k), pt:(102.6 - i*12.7 - (c.id%5)*1.3).toFixed(1)})).filter(x=>x.s);
const CURRICULUM = c => c.type==='과정'
  ? ['오리엔테이션: 왜 지금 이 주제인가','핵심 개념과 프레임워크','현업 사례로 보는 적용 포인트','실습: 나의 업무에 적용하기','정리와 다음 학습 가이드']
  : ['본문','핵심 요약','함께 보면 좋은 콘텐츠'];
