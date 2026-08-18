/* ============================================================
   TEAM PAGE — team.js
   Bio modal data and interaction logic
   ============================================================ */

const MEMBERS = {
  'thomas-seiler': {
    name: 'TOM SEILER',
    certs: 'WMS™',
    role: 'Managing Director\nSenior Vice President, Investments',
    phone: '(212) 350-0100',
    email: 'tom.seiler@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n420 Lexington Avenue, New York, NY 10170',
    photo: 'assets/team/thomas.png',
    intro: 'As a founding member of The Seiler Group of Raymond James, Thomas Seiler has been dedicated to meeting the sophisticated needs of today’s high-net-worth individuals with a specialized focus on professional athletes and business titans. He began his career in 1990 with Merrill Lynch, concentrating on high-net-worth clients.',
    bio: [
      '<h5 class="bio-subheading">Decades of financial experience</h5><p class="bio-text">Drawing on more than 33 years of experience in the financial services industry, Tom concentrates on highly developed asset allocation and investment strategies, conducts extensive research and evaluation on investment management firms, comprehensive investment policy statements and provides performance measurement and monitoring for client advisory portfolios.</p>',
      '<h5 class="bio-subheading">Impressive industry accolades</h5><p class="bio-text">As Tom strives for excellence in everything he does, it affirms his efforts when he receives recognition from his industry and peers. He has been named to the Forbes Best-In-State list* from 2018 to 2022, Barron’s Top 1,200 list** from 2018 to 2022 and the Financial Times Top 400 Financial Advisor list*** in 2019 and 2020.</p>',
      '<h5 class="bio-subheading">Extensive educational credentials</h5><p class="bio-text">Tom holds a bachelor’s degree in finance from Montclair State University. He has also successfully completed Harvard Business School’s Business of Entertainment, Media and Sports curriculum and served as an NFL Players Association (NFLPA®) financial advisor since 2003.</p>',
      '<h5 class="bio-subheading">An NFLPA® financial advisor</h5><p class="bio-text">As an NFLPA® financial advisor, Tom has worked with pro football players since 2003, providing comprehensive guidance for the financial matters in their lives. He has met the standards of education, experience and regulations established by the NFL Players Association and abides by their code of conduct.</p>',
      '<h5 class="bio-subheading">A commitment to philanthropy</h5><p class="bio-text">Tom is dedicated to doing his part to make a difference. He is an active member of the Ambassador Circle of St. Mary Medical Center Foundation and a recipient the Philanthropy Award for Cerebral Palsy of New Jersey.</p>',
      '<h5 class="bio-subheading">His personal life</h5><p class="bio-text">Tom lives in Newtown, Pennsylvania, with his wife, Debbie, and has two children, Alexa and Jake. An active triathlete, you may see Tom training or sharing notes with some of the group’s professional athletes on the best conditioning techniques in preparing for upcoming races.</p>'
    ],
    disclaimer: 'Raymond James is not affiliated with the above organizations and/or charitable causes.',
    footnotes: [
      '*The Forbes ranking of Best-In-State Wealth Advisors, developed by SHOOK Research, is based on an algorithm of qualitative criteria, mostly gained through telephone and in-person due diligence interviews, and quantitative data. Those advisors who are considered have a minimum of seven years of experience, and the algorithm weights factors like revenue trends, assets under management, compliance records, industry experience and those who encompass best practices in their practices and approach to working with clients. Portfolio performance is not a criteria due to varying client objectives and lack of audited data. Out of approximately 32,000 nominations, more than 4,000 advisors received the award. This ranking is not indicative of an advisor’s future performance, is not an endorsement and may not be representative of an individual client’s experience. Neither Raymond James nor any of its financial advisors or RIA firms pay a fee in exchange for this award/rating. Raymond James is not affiliated with Forbes or SHOOK Research, LLC. Please visit <a href="https://www.forbes.com/best-in-state-wealth-advisors" target="_blank" rel="noopener">https://www.forbes.com/best-in-state-wealth-advisors</a> for more info.',
      '**Barron’s Top 1,200 Financial Advisors, 2022 Barron’s is a registered trademark of Dow Jones & Company, L.P. All rights reserved. The rankings are based on data provided by 6,186 individual advisors and their firms and include qualitative and quantitative criteria. Factors included in the rankings: assets under management, revenue produced for the firm, regulatory record, quality of practice and philanthropic work. Investment performance is not an explicit component because not all advisors have audited results and because performance figures often are influenced more by clients’ risk tolerance than by an advisor’s investment picking abilities. The ranking may not be representative of any one client’s experience, is not an endorsement and is not indicative of an advisor’s future performance. Neither Raymond James nor any of its financial advisors pay a fee in exchange for this award/rating. Barron’s is not affiliated with Raymond James.',
      '***Financial Times Top 400 Financial Advisors, April 2020. The Financial Times 400 Top Financial Advisors is an independent listing produced annually by Ignites Research, a division of Money-Media, Inc., on behalf of the Financial Times (FT) (April 2020). To qualify for the list, advisers had to have 10 years of experience and at least $300 million in assets under management (AUM) and no more than 60% of the AUM with institutional clients. The FT reaches out to some of the largest brokerages in the U.S. and asks them to provide a list of advisors who meet the minimum criteria outlined above. These advisors are then invited to apply for the ranking. Only advisors who submit an online application can be considered for the ranking. In 2020, roughly 1,040 applications were received and 400 were selected to the final list (38.5%). The 400 qualified advisors were then scored on six attributes: AUM, AUM growth rate, compliance record, years of experience, industry certifications and online accessibility. AUM is the top factor, accounting for roughly 60% to 70% of the applicant’s score. Additionally, to provide a diversity of advisors, the FT placed a cap on the number of advisors from any one state that’s roughly correlated to the distribution of millionaires across the U.S. The ranking may not be representative of any one client’s experience, is not an endorsement and is not indicative of advisor’s future performance. Neither Raymond James nor any of its financial advisors pay a fee in exchange for this award/rating. The FT, Ignite Research and Money-Media, Inc. are not affiliated with Raymond James.'
    ],
    designations: ['WMS™', 'CMFA®', 'CRPC™', 'CFP®', 'CIMA®', 'AIF®', 'CPFA'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'patrick-seiler': {
    name: 'PATRICK M. SEILER',
    certs: 'CFP®, CIMA®, CEPA®, CRPC™, CRPS™, AIF®',
    role: 'Private Wealth Advisor\nSenior Vice President, Investments',
    phone: '(215) 860-7823',
    email: 'patrick.seiler@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/patrick.png',
    intro: 'Patrick Seiler works with corporate clients, including pension and profit-sharing plans, 401(k) plans and foundations. He also provides comprehensive planning to private high-net-worth individuals and families. He has a specialized focus on professional athletes and business titans.',
    bio: [
      '<h5 class="bio-subheading">Highly credentialed</h5><p class="bio-text">As a Certified Financial Planner® professional, Patrick has attained the prestigious CFP® certification, one of the most respected financial planning credentials and the recognized standard of excellence in personal financial planning.</p>',
      '<p class="bio-text">Patrick holds the professional designation of Private Wealth Advisor, awarded by Raymond James. It means you’ll have a specialized guide who has mastered many nuanced planning approaches to meet the privilege and challenges faced by high-net-worth and ultra-high-net-worth individuals and families.</p>',
      '<p class="bio-text">He has also earned the prestigious designations of Certified Investment Management AnalystSM from the Wharton Business School at the University of Pennsylvania, Chartered Retirement Planning Counselor™ and Chartered Retirement Plans Specialist™.</p>',
      '<p class="bio-text">As an Accredited Investment Fiduciary®, Patrick has expertise in investment fiduciary standards of care. He has extensive knowledge in key areas such as plan distributions, plan design and implementation, plan establishment and operation, and fiduciary issues.</p>',
      '<h5 class="bio-subheading">An impressive resume</h5><p class="bio-text">Prior to joining the financial services industry, Patrick received an honorable discharge from the United States Marine Corps and served with the San Diego Police Department. He then began his career in the financial industry in 1995 with A.G. Edwards, later working with Merrill Lynch and Morgan Stanley Smith Barney. Patrick volunteers his time as an arbitrator for FINRA.</p>',
      '<h5 class="bio-subheading">Active in the community</h5><p class="bio-text">Patrick is also a member of the Marine Corps League, Doylestown Freemasons, New Jersey State Law Enforcement Officers Association, Elks Club, American Legion, Investment Management Consultants Association and Bucks County Business Alliance.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Patrick and his family live in Buckingham, Pennsylvania, and enjoy spending time outdoors, riding Harleys, and spending time in their community.</p>'
    ],
    footnotes: [
      'Certified Financial Planner Board of Standards Center for Financial Planning, Inc. owns and licenses the certification marks CFP®, Certified Financial Planner®, and CFP® (with plaque design) in the United States to Certified Financial Planner Board of Standards, Inc., which authorizes individuals who successfully complete the organization\'s initial and ongoing certification requirements to use the certification marks.',
      'Investments & Wealth Institute™ (The Institute) is the owner of the certification marks “CIMA®” and “Certified Investment Management Analyst℠.” Use of CIMA® and/or Certified Investment Management Analyst℠ signifies that the user has successfully completed The Institute\'s initial and ongoing credentialing requirements for investment management professionals.',
      'Raymond James financial advisors may only conduct business with residents of the states and/or jurisdictions for which they are properly registered. Therefore, a response to a request for information may be delayed. Please note that not all of the investments and services mentioned are available in every state. Investors outside of the United States are subject to securities and tax regulations within their applicable jurisdictions that are not addressed on this site. Contact our office for information and availability.'
    ],
    designations: ['CFP®', 'CIMA®', 'CEPA®', 'CRPC™', 'CRPS™', 'AIF®'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'ross-hart': {
    name: 'ROSS P. HART',
    certs: 'WMS™',
    role: 'Financial Advisor',
    phone: '(215) 860-7823',
    email: 'ross.hart@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/ross.png',
    intro: 'Ross Hart works with families and individuals, including business titans and professional athletes, on developing comprehensive financial plans custom tailored to their specific goals and objectives.',
    bio: [
      '<h5 class="bio-subheading">A background in sports and finance</h5><p class="bio-text">Ross joined The Seiler Group in 2011, after graduating from the Rutgers Business School with a degree in finance. Prior to joining the group full time, he completed a year-long internship program. Ross was a member of the National Society for Collegiate Scholars and served as coach and financial director for the Rutgers Men’s Club soccer team.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">A resident of Hamilton, New Jersey, Ross enjoys spending his time outdoors playing soccer, cycling, golfing and surfing. He values a strong work ethic and integrity, and is committed to helping clients secure their financial future.</p>'
    ],
    designations: ['WMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'edward-castellanos': {
    name: 'EDWARD CASTELLANOS',
    certs: '',
    role: 'Senior Marketing Associate',
    phone: '(215) 860-7823',
    email: 'edward.castellanos@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/edward.png',
    intro: 'Ed works closely with athletes and their parents, agents and coaches. By carefully listening to evaluate each individual situation and applying his own life experiences, he seeks to determine what would be best for each client and then personalizes a plan for pursuing their objectives.',
    bio: [
      '<h5 class="bio-subheading">A successful career in fitness</h5><p class="bio-text">Ed joined our team in 2017 as a senior marketing associate. He earned a bachelor’s degree from Montclair State University. His passion for physical fitness led him to personal training. In 1989, Ed started a successful fitness company and developed several fitness patents. He has also appeared on a popular shopping network with his fitness products.</p>',
      '<h5 class="bio-subheading">A personal look</h5><p class="bio-text">Ed is originally from the Jersey Shore and now lives in Fort Myers, Florida, with his wife, Jennifer. He has three children, Grant, Austin and Samantha. In his free time, Ed is a pickleball player who plays in various tournaments. He enjoys working out and riding bikes.</p>'
    ],
    designations: [],
    desNote: ''
  },
  'matthew-geraci': {
    name: 'MATTHEW GERACI',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'matthew.geraci@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/mathew.png',
    intro: 'Matt works with all clients of The Seiler Group to make sure their needs are taken care of and to help them pursue their goals and financial independence through personalized financial planning.',
    bio: [
      '<h5 class="bio-subheading">Serving families, individuals and athletes</h5><p class="bio-text">Matt serves clients of all types, understanding their lifestyles, careers and families to help ensure they are being given the advice that is most suitable to their current situation and future aspirations.</p>',
      '<p class="bio-text">He also devotes a large percentage of his time to serving professional athletes. Matt understands the business side of sports and how contracts are structured. He wants them to be able to retire on their own terms and not be reliant on another contract or job even though they typically have short careers.</p>',
      '<h5 class="bio-subheading">Serving the community</h5><p class="bio-text">He serves as a volunteer at various events each year for the Arman Roy Foundation, an organization dedicated to bringing critical technology resources and skills to at-risk youth in our local communities.</p>',
      '<h5 class="bio-subheading">Loyal and dependable</h5><p class="bio-text">Clients can always count on Matt. They know when something needs to get done, no matter how challenging the task at hand is, they can depend on him to get it done in the most efficient matter. Matt is also fiercely loyal. His clients know that no matter what hurdles in life they face - he will support them all the way and have their back through the ups and downs.</p>',
      '<h5 class="bio-subheading">Always available</h5><p class="bio-text">Matt makes sure he is always reachable, even on weekends and late at night. He is always available to his clients, connecting to them on a personal basis and looking out for their best interest in all facets of life.</p>',
      '<h5 class="bio-subheading">A solid background</h5><p class="bio-text">Matt has always had a passion for finance, investment services and the markets. Before he joined our team full time in 2019, he built a base of knowledge as an intern here and elsewhere, including JP Morgan Corporate and Investment Bank and a real estate private equity firm. He earned a Bachelor of Science degree in economics from the University of Delaware.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Matt is originally from Brooklyn, New York, and now lives in Newtown, Pennsylvania. In his free time, he enjoys going to sports events, golfing, traveling and spending time at the Jersey Shore during the summer. He is also an avid fantasy football player.</p>'
    ],
    footnotes: [
      'AAMS® and Accredited Asset Management Specialist® are registered service marks of the College for Financial Planning.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'joseph-brauner': {
    name: 'JOSEPH W. BRAUNER',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'joseph.brauner@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/joseph.png',
    intro: 'Joe is dedicated to recruiting prospective clients and providing financial education to our current professional athlete clients, such as how to establish a strong financial foundation. He has the ability to break down even the most complex financial concepts so any client can grasp them.',
    bio: [
      '<h5 class="bio-subheading">His carefully measured approach</h5><p class="bio-text">Joe reviews clients’ portfolios to evaluate performance and assess the probability of meeting their goals. He strives to help each client pursue generational wealth and determine what “wealth is freedom” means to them.</p>',
      '<p class="bio-text">Clients appreciate his accessibility and attention to detail. As an Accredited Asset Management Specialist™, he is well-versed in investments, insurance, tax, retirement and estate planning issues.</p>',
      '<h5 class="bio-subheading">A solid background</h5><p class="bio-text">Joe first joined our team in 2018 as an intern and participated in the Raymond James Advisor Mastery Program, designed to provide the training and support to prepare him for a career as a financial advisor.</p>',
      '<p class="bio-text">He is a graduate of Rutgers University, where he earned a bachelor’s degree in economics and was a sports writer for The Daily Targum, the student newspaper.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Joe is originally from Freehold, New Jersey, and now lives in Red Bank, New Jersey. In his free time, he enjoys the beach, playing golf and exercising.</p>'
    ],
    footnotes: [
      'AAMS® and Accredited Asset Management Specialist® are registered service marks of the College for Financial Planning.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'priya-roy': {
    name: 'PRYIA N. ROY',
    certs: 'JD',
    role: 'Financial Planning Consultant',
    phone: '(215) 860-7823',
    email: 'pryia.roy@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/pryia.png',
    intro: 'Pryia is focused on serving professional athletes, entertainers, physicians and other high-net-worth individuals. He builds, implements and manages custom-designed portfolios designed to help meet clients’ short- and long-term financial goals and preserve their wealth for generations to come. His work embodies our group’s “wealth is freedom” motto, as he strives to give clients the freedom to do what is most important for them and their families.',
    bio: [
      '<h5 class="bio-subheading">A stellar background</h5><p class="bio-text">Pryia joined our team in 2020. Previously, he served as assistant chief counsel of the U.S. Department of Homeland Security, where he worked for 21 years. He worked in the criminal litigation department and provided counsel to various agencies including the Department of Justice and the FBI. He holds a bachelor’s degree in English and history from Villanova University and a Doctor of Law degree from the Elisabeth Haub School of Law at Pace University. He holds Series 7 and 65 securities licenses.</p>',
      '<h5 class="bio-subheading">In service to the community</h5><p class="bio-text">Pryia’s charitable interests include bridging the digital divide for vulnerable youth by providing technology resources through the Arman N. Roy Foundation, where he serves as a board member.</p>',
      'His charitable beneficiaries include Covenant House of New Jersey; AnnieCannons, Inc.; DonorsChoose; Eva’s Village Hope Residence in Paterson, New Jersey; Visions and Pathways of Bridgewater, New Jersey; Flemington Food Pantry; and New York Presbyterian Hospital.',
      'He is a founding partner of Heritage Promotions, which promotes diversity and inclusion by hosting Indian American Heritage Night with professional sports leagues, including the Philadelphia 76ers, New York Knicks and New Jersey Devils. He has worked directly with the NBA in developing basketball and basketball infrastructure in India.',
      'He is also the founder of the Metro Classic Basketball Showcase, one of the nation’s premiere high school basketball events. The classic has raised funds for Warfighter Sports, Interfaith Hospitality Network of Ocean County, Union County Interscholastic Athletic Conference Collegiate Scholarship Fund, the neonatal unit of the Children’s Hospital of New Jersey, Newark Beth Israel Medical Center and the People’s Pantry of Toms River, New Jersey/Ocean County.',
      'He is a member New Jersey State Bar Association and the Fraternal Order of Police Federal Agent’s Lodge Number 92.'
    ],
    disclaimer: 'Raymond James and its advisors do not offer legal advice. You should discuss any legal matters with the appropriate professional.<br><br>Raymond James is not affiliated with the above organizations and/or charitable causes.',
    designations: ['JD'],
    desNote: ''
  },
  'matthew-margolis': {
    name: 'MATTHEW J. MARGOLIS',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'matthew.margolis@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/mattewj.png',
    intro: 'Matthew J. Margolis is an Investment Portfolio Associate at The Seiler Group of Raymond James, focusing on quantitative research and client portfolio execution.',
    bio: [
      'Matthew works closely with senior advisors to construct risk-managed portfolios suited to each client\'s long-term financial plan.',
      'Holding the AAMS™ designation, Matthew emphasizes disciplined investment management and attentive client communication.',
      'He strives to deliver clarity, accuracy, and strategic insight for every portfolio managed.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'isaiah-burrows': {
    name: 'ISAIAH BURROWS',
    certs: '',
    role: 'Wealth Management Associate',
    phone: '(215) 860-7823',
    email: 'isaiah.burrows@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/issaih.png',
    intro: 'Isaiah serves professional athletes and entertainers and works with our team in assisting clients with pursuing their goals and managing their financial lives. He is a hard worker who pays attention to detail and his personable nature makes it easy to relate to clients.',
    bio: [
      '<h5 class="bio-subheading">A love of sports</h5><p class="bio-text">Isaiah knew since high school that he wanted to work in investment services. After interning at The Seiler Group and joining the team full time in June 2022, he was fortunate enough to combine his love of sports with the field of investment services. He is a graduate of Seton Hall University, where he was a men’s basketball manager and vice president of finance for the Interfraternity Council. He holds a bachelor’s degree in finance and entrepreneurship and is a member of the Phi Kappa Theta fraternity alumni network.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Isaiah is originally from Medford, New Jersey, and now lives in Philadelphia. In his free time, he enjoys watching and playing basketball, playing golf and traveling. He is a volunteer basketball coach and trainer at Marston Athletics.</p>'
    ],
    designations: [],
    desNote: ''
  },
  'pamela-longmore': {
    name: 'PAMELA LONGMORE',
    certs: '',
    role: 'Client Service Associate',
    phone: '(215) 860-7823',
    email: 'pamela.longmore@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/pamela.png',
    intro: 'Pamela provides support for our clients’ account needs on a daily basis. She focuses on building strong client relationships built on trust and reliability. Her approachability and attentiveness are valued by clients because they appreciate working with someone who is both professional and empathetic toward their individual situation and needs.',
    bio: [
      '<h5 class="bio-subheading">Dedicated to service</h5><p class="bio-text">She devotes the time and attention to discover each client’s financial goals, and through discussion and collaboration, help provide dedicated service tailored to each. Her ongoing goal is to not just meet but exceed their expectations.</p>',
      '<h5 class="bio-subheading">Passionate about helping people</h5><p class="bio-text">Pam joined our team November 2022 after graduating from Temple University with a bachelor’s degree in business administration. She has always been interested in the financial industry and is naturally drawn to a career that allows her to help people pursue their goals. She is early on in her career, open-minded and eager to incorporate the ideas of our more experienced team members with her own fresh energy and approach.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Pam is a native of Newtown, Pennsylvania, and lives here today. She has a passion for physical fitness and taking care of her dog. Pam has been involved with volunteering at the Washington Crossing National Cemetery, inspired by her grandfather’s service.</p>'
    ],
    designations: [],
    desNote: ''
  },
  'jeremy-voccia': {
    name: 'JEREMY VOCCIA',
    certs: 'CFP®',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'jeremy.voccia@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/jeremy.png',
    intro: 'Jeremy is responsible for reviewing clients’ investment policies to ensure their portfolios align with their goals and risk tolerance. As a Certified Financial Planner® professional, he brings a disciplined approach to asset allocation and long-term strategy, helping clients stay on track toward achieving their objectives.',
    bio: [
      '<h5 class="bio-subheading">Background in finance</h5><p class="bio-text">Jeremy joined Raymond James in August 2021. Previously, he was a registered principal at GWM Securities in Palm Beach Gardens, Florida. He holds Series 6, 7, 26, and 66 licenses and earned a Bachelor of Science degree in Finance from Florida Atlantic University.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Jeremy now lives in Delray Beach, Florida. Outside of work, he enjoys running marathons, cheering for the Philadelphia Eagles, and spending quality time with his family.</p>'
    ],
    footnotes: [
      'Certified Financial Planner Board of Standards Center for Financial Planning, Inc. owns and licenses the certification marks CFP®, Certified Financial Planner®, and CFP® (with plaque design) in the United States.'
    ],
    designations: ['CFP®'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'paul-schwing': {
    name: 'PAUL SCHWING',
    certs: 'J.D., WMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'paul.schwing@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/paul.png',
    intro: 'Paul works with our clients on a day to day basis assisting them to reach their goals and achieve financial independence. Paul provides personalized education to each individual so they can feel confident in each step throughout their career and beyond.',
    bio: [
      '<h5 class="bio-subheading">A diverse educational background</h5><p class="bio-text">Paul graduated from the University of Alabama in 2019 earning his bachelor’s degree in political science and mass communications. In 2023, Paul graduated with his Juris Doctorate degree from St. Thomas University College of Law. While in law school, Paul was a member of the Sports and Entertainment Law Society, Business Law Society, and The Journal of Complex Litigation. Additionally, Paul completed the Raymond James Advisor Mastery Foundations Program, preparing him for a career as a financial advisor.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Paul was born and raised in Phoenix, Maryland and played golf at Calvert Hall College High School. He now lives in Miami, Florida and works in our Fort Lauderdale office. In his free time, you can find Paul on the golf course, attending sporting events, or spending time with family and friends.</p>'
    ],
    designations: ['WMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'curtis-sumpter': {
    name: 'CURTIS SUMPTER',
    certs: '',
    role: 'Practice Marketing Associate',
    phone: '(215) 860-7823',
    email: 'curtis.sumpter@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/curtis.png',
    intro: 'Originally from Brooklyn, NY, Curtis attended Villanova University from 2002 to 2007, earning a bachelor’s degree in Sociology with a minor in Criminal Justice. He was blessed with the opportunity to play professional basketball overseas for six years in various countries.',
    bio: [
      '<h5 class="bio-subheading">A diverse professional background</h5><p class="bio-text">After his professional playing career ended, Curtis transitioned into coaching at both the collegiate and professional levels. In 2012, he was part of the Villanova Men’s Basketball Team coaching staff, and the following year, he joined the Philadelphia 76ers as a Player Development Assistant, a role he held from 2013 to 2017.</p>',
      '<p class="bio-text">In 2018, Curtis entered the corporate space and discovered a passion for sales. As the son of a former Senior Analyst and Administrative Assistant to portfolio managers on the trading floor for over 40 years, the finance industry had always been present in his life—but now he speaks about it from his own personal experience.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">In his free time, Curtis enjoys spending time with family, working out, playing basketball, and training kids in the game he loves.</p>'
    ],
    disclaimer: 'Raymond James is not affiliated with the above organizations and/or charitable causes.',
    designations: [],
    desNote: ''
  },
  'kylie-swider': {
    name: 'KYLIE SWIDER',
    certs: '',
    role: 'Client Service Associate',
    phone: '(215) 860-7823',
    email: 'kylie.swider@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/kylie.png',
    intro: 'Kylie joined our team in August 2025 after receiving her master’s in marketing (M.S.) at Stonehill College. Before Stonehill, Kylie attended Villanova University where she received her bachelor’s degree in communications. She has always been interested in the financial industry and is about halfway through her MBA at Villanova University. She is drawn to a career that is customer focused and allows people to set themselves up for a successful future.',
    bio: [
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Kylie played college basketball for 5 years, 4 at Villanova University and her 5th year at Stonehill College. While at Villanova Kylie was part of the 2023 Sweet 16 run and was involved in the Student Athlete Advisory Committee. She was also honored with the Sister Mary Margaret Cribben Award, a Villanova honor given to a student-athlete who unselfishly sacrifices their time, effort, body & soul to lead & motivate her teammates in excelling for Villanova through inspiration.</p>',
      '<p class="bio-text">Having grown up in Rhode Island, Kylie has a passion for the ocean and loves days with her family on their boat, or on the beach.</p>'
    ],
    disclaimer: 'Raymond James is not affiliated with the above organizations and/or charitable causes.',
    designations: [],
    desNote: ''
  },
  'drake-bayard': {
    name: 'DRAKE BAYARD',
    certs: '',
    role: 'Client Service Associate',
    phone: '(215) 860-7823',
    email: 'drake.bayard@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/drake.png',
    intro: 'Drake earned his Bachelor of Science in Finance from The College of New Jersey in 2025. He joined our team in November 2025 and is currently pursuing FINRA licenses with the goal of becoming a financial advisor. His strong educational foundation and eagerness to learn position him to grow alongside our clients and contribute meaningfully to their financial success.',
    bio: [
      '<h5 class="bio-subheading">A blend of experience and fresh perspective</h5><p class="bio-text">Drake is dedicated to providing comprehensive support for clients’ daily account needs and administrative requirements. He delivers responsive, personalized service and builds lasting relationships rooted in trust and professionalism. By understanding each client’s unique circumstances, Drake offers thoughtful assistance tailored to their individual goals. As a Client Service Associate, Drake manages a wide range of responsibilities—from daily administrative tasks and account management to collaborating with the team to ensure exceptional client support. His enthusiasm and attention to detail help him consistently exceed expectations.</p>',
      '<h5 class="bio-subheading">A personal note</h5><p class="bio-text">Originally from Long Island, New York, Drake now resides in Newtown, Pennsylvania with his family and dog, Roxy. Outside of work, he enjoys playing guitar, spending time outdoors, and solving Rubik’s cubes.</p>'
    ],
    designations: [],
    desNote: ''
  },
  'nevin-sari': {
    name: 'NEVIN SARI',
    certs: '',
    role: 'Business Practice Manager',
    phone: '(215) 860-7823',
    email: 'nevin.sari@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/nevin.png',
    intro: 'Nevin Sari is an accomplished financial services professional with a proven track record in operations, risk management, and product development. In her current role as Business Practice Manager, Nevin leverages her extensive experience to optimize business processes, ensure regulatory compliance, and deliver exceptional service to internal and external stakeholders.',
    bio: [
      '<h5 class="bio-subheading">Product Development & Leadership</h5><p class="bio-text">Previously, Nevin served as Vice President of Product Development for Alternative Investments at Citi Private Bank, where she led the launch of private equity and real estate offerings. She partnered with cross-functional teams—including Legal, Research, Tax, Operations, and Global Compliance—to manage complex fund structures, oversee KYC/AML compliance, and drive product approval processes. Her leadership extended to mentoring junior team members and implementing technology solutions to enhance efficiency.</p>',
      '<h5 class="bio-subheading">Over Two Decades of Experience</h5><p class="bio-text">With over two decades in the financial services industry, Nevin has held key roles at CITCO Fund Services and Bank of New York Mellon, where she managed investor relations, supervised client services teams, and spearheaded risk control initiatives. Her expertise spans operational analysis, issue management, process testing, and regulatory compliance, supported by strong technical proficiency in Microsoft Access and Excel.</p>',
      '<h5 class="bio-subheading">Core Strengths</h5><p class="bio-text">Nevin’s core strengths include:</p><ul class="bio-list" style="color:#b4c2d0; font-size:12px; line-height:1.65; margin-bottom:14px; padding-left:20px;"><li>Operational Analysis & Risk Management</li><li>Alternative Investments & Product Development</li><li>Client Onboarding & Investor Relations</li><li>Regulatory Compliance (SEC, Patriot Act, Global KYC/AML)</li><li>Data Analysis & Quality Assurance</li></ul>',
      '<h5 class="bio-subheading">Education</h5><p class="bio-text">Hunter College, City University of New York – Economics and Business Studies</p>',
      '<h5 class="bio-subheading">A Personal Note</h5><p class="bio-text">Nevin currently lives in Bucks County, Pennsylvania with her family but grew up in New York City. She enjoys spending time outdoors and being active in her local community.</p>'
    ],
    designations: [],
    desNote: ''
  }
};

/* ── Modal open/close ── */
const overlay = document.getElementById('bioOverlay');
const modal = document.getElementById('bioModal');
const closeBtn = document.getElementById('bioClose');
const inner = document.getElementById('bioInner');

function openModal(memberId) {
  const m = MEMBERS[memberId];
  if (!m) return;

  const roleLines = m.role.split('\n').join('<br>');
  const addressLines = m.address.split('\n').join('<br>');

  const desHtml = m.designations.length
    ? m.designations.map(d => `<span class="des-bullet">•</span> <span class="des-item">${d}</span>`).join('&nbsp;&nbsp;&nbsp;')
    : '';

  const desNoteHtml = m.desNote
    ? `<p class="bio-des-note">${m.desNote}</p>`
    : '';

  const bioParas = m.bio.map(p => {
    if (p.startsWith('<')) return p;
    return `<p class="bio-text">${p}</p>`;
  }).join('');

  const certsHtml = m.certs
    ? `<p class="bio-certs">${m.certs}</p>`
    : '';

  const firstName = m.name.split(' ')[0];
  const lastName = m.name.split(' ').slice(-1)[0];

  inner.innerHTML = `
    <div class="bio-left">
      <img src="assets/logo.svg" alt="The Seiler Group" class="bio-logo">
      <div class="bio-photo-wrap">
        <img src="${m.photo}" alt="${m.name}" class="bio-photo">
      </div>
      <div class="bio-left-details">
        <h2 class="bio-name">${m.name}</h2>
        ${certsHtml}
        <p class="bio-role">${roleLines}</p>
        <ul class="bio-contact-list">
          <li><i class="fas fa-phone"></i> <span>${m.phone}</span></li>
          <li><i class="far fa-envelope"></i> <a href="mailto:${m.email}">${m.email}</a></li>
          <li><i class="fas fa-map-marker-alt"></i> <span>${addressLines}</span></li>
        </ul>
      </div>
    </div>
    <div class="bio-right">
      <p class="bio-intro">${m.intro}</p>
      <h4 class="bio-section-label">BIOGRAPHY</h4>
      <div class="bio-paras-wrap">
        ${bioParas}
      </div>
      ${m.designations.length ? `
        <div class="bio-des-section">
          <h4 class="bio-section-label">DESIGNATIONS &amp; AFFILIATIONS</h4>
          <p class="bio-designations">${desHtml}</p>
          ${desNoteHtml}
        </div>
      ` : ''}
      <a href="mailto:${m.email}" class="bio-contact-btn">
        <i class="fas fa-users"></i>
        CONTACT ${firstName} ${lastName}
      </a>
      ${m.disclaimer ? `<p class="bio-disclaimer">${m.disclaimer}</p>` : ''}
      ${m.footnotes && m.footnotes.length ? `
        <div class="bio-footnotes-wrap">
          ${m.footnotes.map(f => `<p class="bio-footnote">${f}</p>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  overlay.classList.add('active');
  document.body.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
  document.documentElement.classList.remove('modal-open');
  document.body.style.overflow = '';
}

/* Click cards */
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.member);
  });
});

/* Close on button */
closeBtn.addEventListener('click', closeModal);

/* Close on overlay background click */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

/* Prevent background page scroll on wheel / touch outside modal panels */
overlay.addEventListener('wheel', e => {
  if (!e.target.closest('.bio-right') && !e.target.closest('.bio-left')) {
    e.preventDefault();
  }
}, { passive: false });

overlay.addEventListener('touchmove', e => {
  if (!e.target.closest('.bio-right') && !e.target.closest('.bio-left')) {
    e.preventDefault();
  }
}, { passive: false });

function toggleMobileMenu(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  var drawer = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('drawer-overlay');
  var toggleBtn = document.getElementById('mobile-toggle');
  if (!drawer) return;

  if (drawer.classList.contains('active')) {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  } else {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (toggleBtn) toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function toggleMobileAthletesAccordion(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  var btn = document.getElementById('drawer-athletes-btn');
  var content = document.getElementById('drawer-athletes-content');
  if (btn && content) {
    btn.classList.toggle('active');
    content.classList.toggle('open');
  }
}

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* Mobile Drawer & Sticky Header Handlers */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const header = document.getElementById('main-header');

  function openDrawer() {
    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (toggleBtn) toggleBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (drawer && drawer.classList.contains('active')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Desktop Athletes Dropdown Click Outside Toggle
  const athTrigger = document.getElementById('athletes-trigger');
  const athWrapper = document.getElementById('athletes-dropdown');
  const athMenu = document.getElementById('athletes-menu');

  if (athWrapper && athMenu) {
    document.addEventListener('click', (e) => {
      if (!athWrapper.contains(e.target)) {
        athMenu.classList.remove('show');
        athWrapper.classList.remove('active');
      }
    });
  }

  // Mobile Drawer Accordion Toggle
  const drawerAccordionBtn = document.getElementById('drawer-athletes-btn');
  const drawerAccordionContent = document.getElementById('drawer-athletes-content');

  if (drawerAccordionBtn && drawerAccordionContent) {
    drawerAccordionBtn.addEventListener('click', (e) => {
      e.preventDefault();
      drawerAccordionBtn.classList.toggle('active');
      drawerAccordionContent.classList.toggle('open');
    });
  }
});
