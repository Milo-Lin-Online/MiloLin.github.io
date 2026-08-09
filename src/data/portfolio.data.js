/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE SITE'S CONTENT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Everything below is plain data. Portfolio.from() in src/domain/Portfolio.js
 * turns it into real objects, so adding a project or a role is one entry here —
 * you never touch a component.
 *
 * FORMATTING
 *   Wrap anything in **double asterisks** to render it as a highlighted stat.
 *   Use it on real numbers: "**380 animations**", "**$234k in a single day**".
 *
 * LANES
 *   'art'     → 3D Art
 *   'techart' → Tech Art
 *   'product' → Product + Marketing
 *   A role or project can sit in more than one lane. Recruiters filtering by
 *   lane will see it in each one you list.
 *
 * EXPERIENCE TYPES  coop | internship | research | studio | client | leadership | volunteer
 * PROJECT TYPES     art | techart | product
 */

// Resolves correctly whether you run `npm run dev` or deploy to GitHub Pages.
const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

export const portfolioData = {
  profile: {
    name: 'Milo Lin',
    // Shown under the name in the hero.
    lanesLine: '3D Art · Tech Art · Product + Marketing',
    location: 'Boston, MA — Oakland, CA',
    email: 'm.jiexi.lin@gmail.com',
    linkedin: 'https://www.linkedin.com/in/milo-lin-99b5b526a/',
    site: 'https://www.milolinonline.com',
    photo: asset('media/profile.webp'),
    photo2x: asset('media/profile@2x.webp'),
    photoAlt: 'Milo Lin at SIGGRAPH, standing behind the conference logo sculpture',

    education: {
      school: 'Northeastern University',
      degree: 'BFA Game Art and Animation',
      minor: 'Minors in Philosophy and Computer Science',
      detail: 'Dean\u2019s List · GPA 3.92 · Study abroad in Madrid, Spain',
      period: 'Sep 2022 — Apr 2027',
    },

    // ── "Who I am" ──────────────────────────────────────────────────────────
    whoIAm: [
      'I\u2019m a Game Art and Animation major at Northeastern, minoring in Philosophy and Computer Science, and I\u2019m happiest working in the space between the artists and the people shipping the product.',
      'I got here by saying yes to a lot of different rooms \u2014 a motion capture lab, a law firm\u2019s video studio, a game studio\u2019s marketing floor, a 24-inch tabletop console. What connects all of them is that someone needed a person who could speak both languages: make the thing look right, and make sure it actually ships on time.',
      'The part I love most is being the bridge. I\u2019ll model and light the environment, then write the design doc, then build the template that saves my team from doing the boring version of it ever again.',
    ],

    // ── "What I do" ─────────────────────────────────────────────────────────
    whatIDo: [
      {
        lane: 'art',
        title: 'I build worlds',
        body: 'Environments, props, and short-form animation \u2014 modeling, texturing, lighting, and comp. Blender and Maya day to day, Substance for materials, Unreal and Unity for anything that has to be walked through.',
      },
      {
        lane: 'techart',
        title: 'I build the pipes',
        body: 'Motion capture workflows, procedural setups, and tools that give my team hours back. Python for FreeMoCap, Blueprint and live link in Unreal, node-based work in GeoNodes, Houdini, and Substance Designer.',
      },
      {
        lane: 'product',
        title: 'I ship the thing',
        body: 'Live-service events, campaigns, dashboards, and the docs that keep everyone pointed the same direction. Looker and Airtable for the numbers, After Effects and Premiere for the pixels, weekly sprints for the humans.',
      },
    ],

    resumes: [
      { label: 'Tech Art + VFX', file: 'Milo_MU_Lin_Resume_2025.pdf' },
      { label: 'Product + Marketing', file: 'Product_Marketing.pdf' },
      { label: 'Marketing + PR', file: 'Milo_Lin_PR_Resume_2025.pdf' },
    ],

    skills: {
      '3D + VFX': ['Blender', 'Maya', 'Houdini', 'Unreal Engine', 'Unity', 'Substance Painter', 'Substance Designer', 'Substance Sampler'],
      'Motion + Video': ['After Effects', 'Premiere Pro', 'Clip Studio Pro', 'Photoshop', 'NewTek TriCaster', 'Rode mics'],
      'Capture + Code': ['FreeMoCap', 'Qualisys', 'LiDAR', 'Python', 'JavaScript', 'Blueprint', 'HTML', 'Supabase'],
      'Product + Ops': ['Looker', 'Airtable', 'Jira', 'Monday', 'Workfront', 'Miro', 'Trello', 'Notion', 'Hootsuite', 'Excel'],
    },

    awards: [
      'PEAK Summit Grant — Fall 2025',
      'Student Showcase 2024, Artistry Magazine — theme "Saturate"',
      'Dean\u2019s List, Northeastern University',
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // EXPERIENCE — rendered as the accordion
  // ═══════════════════════════════════════════════════════════════════════════
  experienceGroups: [
    {
      key: 'professional',
      label: 'Professional Experience',
      note: 'Co-ops, internships, and studio work',
      items: [
        {
          id: 'wb-games',
          type: 'coop',
          role: 'Product Management Co-op',
          org: 'WB Games Boston',
          orgShort: 'WB Games',
          brand: '#0F4C9E',
          start: 'Jun 2026',
          end: null,
          startISO: '2026-06',
          location: 'Boston, MA',
          mode: 'Internship',
          lanes: ['product'],
          summary:
            'Live-service product work on Game of Thrones: Conquest \u2014 building the events players actually see, and the dashboards that tell us how they landed.',
          bullets: [
            'Help create in-game events and MTX offers across live service and big-picture game design, including one offer/event that made **$234k in a single day**',
            'Build dashboards in **Looker** tracking new and returning player data for *Game of Thrones: Conquest*',
            'Write tools and plugins in Sheets and Airtable that match teams for events and replace a high-error manual workflow',
          ],
          tools: ['Looker', 'Airtable', 'Google Sheets', 'Live service', 'MTX design'],
          highlight: { value: '$234K', label: 'earned in a single day from one live event offer' },
        },
        {
          id: 'draftkings',
          type: 'coop',
          role: 'Motion Graphics Co-op',
          org: 'DraftKings Inc.',
          orgShort: 'DraftKings',
          brand: '#53D337',
          start: 'Jan 2026',
          end: 'May 2026',
          startISO: '2026-01',
          location: 'Boston, MA',
          mode: 'Hybrid',
          lanes: ['product', 'art'],
          summary:
            'Motion design at production volume \u2014 and finding the scripting that makes production volume survivable.',
          bullets: [
            'Used **JavaScript** to batch render **380 animations** for email banner and promo page graphics, finishing client work in a fraction of the manual time',
            'Took designs from copywriters and turned them into moving graphics for billboards, socials, and new in-app events',
            'Contributed to feedback cycles, **A/B testing**, and project updates across weeklies, rehearsals, and marketing strategic planning',
            'Researched new plugins and workflow efficiencies for my team to use across separate client projects',
          ],
          tools: ['After Effects', 'JavaScript', 'Premiere Pro', 'A/B testing', 'Workfront'],
          highlight: { value: '380', label: 'animations batch-rendered from a single script' },
        },
        {
          id: 'lyko',
          type: 'studio',
          role: 'Environment Art and Implementor',
          org: 'Lyko Studios — I Wanna Be a Game Dev',
          orgShort: 'Lyko Studios',
          brand: '#7A5CFF',
          start: 'Aug 2025',
          end: null,
          startISO: '2025-08',
          location: 'Remote',
          mode: 'Shipped on Steam',
          lanes: ['art', 'product'],
          summary:
            'Environment art on a title that is actually out in the world, plus the file structure that keeps the team from tripping over each other.',
          bullets: [
            'Concept, model, texture, and implement environments \u2014 pushing changes and lighting scenes directly in **Unity**',
            'Work cross-department to produce renders for socials, community events, and marketing material',
            'Set up the Unity and Google Drive file structure for **project 2** from scratch, saving time whenever a new member onboards',
          ],
          tools: ['Unity', 'Blender', 'Substance Painter', 'Lighting', 'Steam'],
          highlight: { value: 'Steam', label: 'shipped title — environment art and implementation' },
        },
        {
          id: 'schell',
          type: 'internship',
          role: 'Marketing / Product Intern',
          org: 'Schell Games',
          orgShort: 'Schell Games',
          brand: '#E8502E',
          start: 'Jun 2025',
          end: 'Aug 2025',
          startISO: '2025-06',
          location: 'Pittsburgh, PA',
          mode: 'Internship',
          lanes: ['product', 'art'],
          summary:
            'A summer of campaign work on Among Us 3D/VR, and the realization that a good template is worth more than a good render.',
          bullets: [
            'Created and filmed *Among Us 3D/VR* and unreleased in-engine game content, later edited into short-form video and game trailers',
            'Tracked and collaborated on **6 consecutive campaigns** and creative projects, building 3D graphics and writing design docs',
            'Designed and coded **JavaScript** motion graphic templates with full customizability, so my team could reuse them without me',
            'Playtested and QA\u2019d theme park prototype experiences, and ran community management through **Hootsuite**',
          ],
          tools: ['After Effects', 'JavaScript', 'Blender', 'Hootsuite', 'Design docs'],
          highlight: { value: '6', label: 'consecutive campaigns tracked and delivered' },
        },
        {
          id: 'goodwin',
          type: 'coop',
          role: 'Digital Multimedia and Marketing Co-op',
          org: 'Goodwin Law',
          orgShort: 'Goodwin',
          brand: '#0B7B6B',
          start: 'Jan 2025',
          end: 'May 2025',
          startISO: '2025-01',
          location: 'Boston, MA',
          mode: 'Co-op',
          lanes: ['product'],
          summary:
            'Full-stack internal media \u2014 booking it, shooting it, cutting it, publishing it, and broadcasting it live.',
          bullets: [
            'Scheduled up to **18 interviews** and film sessions while tracking stakeholder deadlines for more efficient workflows',
            'Created **9 independent videos** driving engagement and enthusiasm for company and co-op culture',
            'Managed our internal streaming platform \u2014 video posting, tagging, new content banners \u2014 and assisted with live broadcasting',
            'Shot B-roll and event interviews at the **RECM conference** in NY on a **4 a.m.** crew call, coordinating with the in-house AV team at 583 Park Ave',
            'Worked across departments from client development to DEI, adapting content to very different audiences',
          ],
          tools: ['Premiere Pro', 'After Effects', 'NewTek TriCaster', 'Live broadcast', 'AV'],
          highlight: { value: '9', label: 'independent videos produced in one co-op cycle' },
        },
        {
          id: 'sentry',
          type: 'internship',
          role: 'Video Production and Animation Intern',
          org: 'SENTRY — A Department of Homeland Security Research Organization',
          orgShort: 'SENTRY',
          brand: '#2C4C7C',
          start: 'Jun 2024',
          end: 'Dec 2024',
          startISO: '2024-06',
          location: 'Boston, MA',
          mode: 'Hybrid',
          lanes: ['product', 'art'],
          summary:
            'Turning dense research communication into something people will actually sit through.',
          bullets: [
            'Edited video for conference calls and overview videos, and storyboarded new pieces from scratch',
            'Animated infographics and corporate video for a federally funded research organization',
          ],
          tools: ['Premiere Pro', 'After Effects', 'Storyboarding', 'Infographics'],
          highlight: { value: '7 mos', label: 'video production for a DHS research organization' },
        },
        {
          id: 'humon',
          type: 'research',
          role: 'Lab Research Assistant',
          org: 'HuM0N Lab — FreeMoCap',
          orgShort: 'HuM0N Lab',
          brand: '#1FA8A0',
          start: 'Apr 2023',
          end: null,
          startISO: '2023-04',
          location: 'Northeastern University',
          mode: 'Apr 2023 – Dec 2024, Sep 2025 – Present',
          lanes: ['techart', 'art'],
          summary:
            'Markerless motion capture research \u2014 running the sessions, cleaning the data, and turning it into something an animator can use.',
          bullets: [
            'Run setup and take-down for video-based and **Qualisys** data collection, using **Python** to run FreeMoCap',
            'Retarget and edit Qualisys data from client sessions and NU sports teams',
            'Create game cinematics in **Blender** from self-recorded and processed capture data',
          ],
          tools: ['FreeMoCap', 'Qualisys', 'Python', 'Blender', 'Retargeting'],
          highlight: { value: 'Markerless', label: 'video-based mocap research, two separate terms' },
        },
        {
          id: 'immersive-media-lab',
          type: 'research',
          role: 'Immersive Media Lab PT Associate',
          org: 'Northeastern University',
          orgShort: 'Northeastern',
          brand: '#C8102E',
          start: 'Sep 2023',
          end: 'Dec 2023',
          startISO: '2023-09',
          location: 'Boston, MA',
          mode: 'Part-time · On-site',
          lanes: ['techart'],
          summary: 'Keeping an XR lab running, and getting to play with every tracker in it.',
          bullets: [
            'Managed virtual reality tech, augmented reality tech, **360 cameras**, trackers, and other extended reality equipment',
            'Worked in **Unreal Engine** with Vive motion trackers',
          ],
          tools: ['Unreal Engine', 'Vive trackers', 'VR / AR', '360 cameras', 'Motion tracking'],
          highlight: { value: 'XR', label: 'lab hardware, from headsets to 360 rigs' },
        },
        {
          id: 'robotics-lab',
          type: 'research',
          role: 'Robotics Lab Tech, Institute of Experiential Robotics',
          org: 'Northeastern University',
          orgShort: 'Northeastern',
          brand: '#C8102E',
          start: 'Jan 2024',
          end: 'Apr 2024',
          startISO: '2024-01',
          location: 'Boston, MA',
          mode: 'Part-time · On-site',
          lanes: ['techart'],
          summary: 'Hands on the hardware, and the safety documentation that lets other people put their hands on it too.',
          bullets: [
            'Reassembled and disassembled lab robots',
            'Experimented with and wrote a **safety protocol** for lab machinery and shared spaces',
            'Created and augmented the lab\u2019s **WordPress** website',
          ],
          tools: ['Robotics', 'WordPress', 'Safety protocol', 'Documentation'],
          highlight: { value: 'Safety', label: 'protocol written for lab machinery and spaces' },
        },
      ],
    },

    {
      key: 'client',
      label: 'Client Projects',
      note: 'Real clients, real deadlines',
      items: [
        {
          id: 'generate-board',
          type: 'client',
          role: 'Art Director',
          org: 'Generate Product Development Studio: A Sherman Center Program',
          orgShort: 'Generate',
          brand: '#2F6BFF',
          start: 'Jan 2026',
          end: 'Apr 2026',
          startISO: '2026-01',
          location: 'Boston, MA',
          mode: 'On-site',
          client: 'Board (board.fun)',
          lanes: ['art', 'product'],
          summary:
            'Art directing a board game project for Board \u2014 a 24-inch face-to-face game console where physical pieces drive an interactive display.',
          bullets: [
            'Art directed a game project with **Board** as the client, designing for a console where physical pieces sit directly on a 24-inch interactive screen',
            'Bridged programming, art, engineering, and sound through shared organizational tools and consistent communication',
            'Ran **weekly sprints**, built a user flow for vision clarity, and talked with the client directly about what they wanted and needed',
            'Organized files and tracked game design docs and logs, keeping every task member updated on progress and requests',
          ],
          tools: ['Blender', 'Art direction', 'User flow', 'Sprints', 'Design docs'],
          highlight: { value: '24"', label: 'face-to-face console the whole design targets' },
        },
      ],
    },

    {
      key: 'leadership',
      label: 'Leadership & Volunteering',
      note: 'Clubs, conferences, and the people side',
      items: [
        {
          id: 'nuvr',
          type: 'leadership',
          role: 'President',
          org: 'NUVR / NUXR Club, Northeastern University',
          orgShort: 'NUXR Club',
          brand: '#8B5CF6',
          start: 'Sep 2024',
          end: null,
          startISO: '2024-09',
          location: 'Boston, MA',
          mode: 'Student organization',
          lanes: ['techart', 'product'],
          summary:
            'Running the VR/XR club \u2014 which turns out to be equal parts emerging tech research, event production, and budget spreadsheets.',
          bullets: [
            'Lead and schedule work sessions, eboard, and general meetings, mentoring a **23-person team**',
            'Run outreach and communications with panelists from **ILM Immersive**, ICXR, Meta, JP Morgan VR, and Petricore',
            'Help build the budget for new and emerging technologies so the VR/AR community on campus can actually get their hands on them',
            'Create weekly presentations and manage the calendar for project deadlines, club fairs, and hackathons',
          ],
          tools: ['Notion', 'Canva', 'Event planning', 'Budgeting', 'Outreach'],
          highlight: { value: '23', label: 'person team led and mentored' },
        },
        {
          id: 'animation-club',
          type: 'leadership',
          role: 'Vice President',
          org: 'Animation Club, Northeastern University',
          orgShort: 'Animation Club',
          brand: '#F2A65A',
          start: 'Sep 2024',
          end: null,
          startISO: '2024-09',
          location: 'Boston, MA',
          mode: 'Student organization',
          lanes: ['art'],
          summary: 'Keeping a room full of animators organized, critiqued, and shipping.',
          bullets: [
            'Schedule and run meetings, critiques, and screenings for club members',
            'Coordinate club projects and jams alongside the president and eboard',
          ],
          tools: ['Critique', 'Scheduling', 'Community'],
          highlight: null,
        },
        {
          id: 'conference-ambassador',
          type: 'volunteer',
          role: 'Conference Ambassador & Student Volunteer',
          org: 'SIGGRAPH, GDC, PAX, Lightbox Expo, BAAFF, APIQTWC',
          orgShort: 'Conferences',
          brand: '#4FB3C4',
          start: 'Mar 2024',
          end: null,
          startISO: '2024-03',
          location: 'Los Angeles · San Francisco · Boston · NY',
          mode: 'Volunteer',
          lanes: ['product'],
          summary:
            'SIGGRAPH \u201925 and \u201926, GDC \u201925 and \u201926, Lightbox Expo \u201924 and \u201925, PAX \u201925, BAAFF \u201924, APIQTWC \u2014 the industry, from the other side of the badge.',
          bullets: [
            'Organized lines and set up panel spaces for **400+ people**, adhering to fire and safety regulations',
            'Answered a wide range of attendee questions, giving direct and empathetic advice or encouragement',
            'Made quick, informed calls to stay on schedule while handling technical issues and complicated situations',
            'Promoted organizations at the **GDC IGDA booth** and PAX, supported networking events, and worked set up and take down',
          ],
          tools: ['Event ops', 'Crowd flow', 'AV', 'Safety regs', 'Booth'],
          highlight: { value: '400+', label: 'attendees routed through panel spaces I set up' },
        },
      ],
    },
  ],

  // ═══════════════════════════════════════════════════════════════════════════
  // LANES — the three portfolio sections and their projects
  // ═══════════════════════════════════════════════════════════════════════════
  lanes: [
    {
      key: 'art',
      label: '3D Art',
      short: '3D',
      accentVar: '--lane-art',
      tagline: 'Environments, props, and short-form animation',
      blurb:
        'Most of what I make starts as a place. I model it, texture it, light it, and figure out what the camera should care about \u2014 usually in Blender, sometimes in Maya, always with a deadline attached.',
      reelId: null, // ← put your YouTube video ID here, e.g. 'aB3xY_9kQ1c'
      projects: [
        {
          id: 'boardfun',
          type: 'art',
          title: 'CLIENT PROJECT: Board.fun',
          subtitle: 'Art Direction — Generate Product Development Studio',
          year: '2026',
          role: 'Art Director',
          featured: true,
          lanes: ['art', 'product'],
          tools: ['Blender', 'Art direction', 'User flow', 'Design docs'],
          tags: ['Client work', 'Tabletop', 'Game design'],
          media: [
            {
              src: asset('media/boardfun-blockout.webp'),
              alt: 'Character blockout posed in the Blender viewport for the Board.fun project',
              caption: 'Character blockout in Blender',
            },
            {
              src: asset('media/boardfun-sculpt.webp'),
              alt: 'Grey-shaded sculpted prop form for the Board.fun project',
              caption: 'Prop form study',
            },
          ],
          bullets: [
            'Board is a **24-inch** face-to-face game console \u2014 physical pieces sit on an interactive display, so the screen and the tabletop are the same surface',
            'The console ships with **7 games** and their custom piece sets, with new titles and free expansions releasing monthly, and no subscription',
            'That format changes the art brief completely: everything has to read from **every seat around the table**, at a glance, upside down included',
            'I art directed our team\u2019s game project with Board as the client \u2014 modeling and shading assets in Blender, and keeping art, engineering, and sound aligned',
            'Ran weekly sprints and built a user flow document so the client\u2019s vision and the dev team\u2019s build stayed the same thing',
          ],
          links: [{ label: 'board.fun', href: 'https://board.fun/' }],
          note: 'Work in progress — final renders coming.',
        },
        {
          id: 'timelapse',
          type: 'art',
          title: 'TimeLapse in Judgement',
          subtitle: 'Short film',
          year: '2025',
          tools: ['Blender', 'Substance Painter'],
          tags: ['Environment', 'Lighting'],
          bullets: [
            'Environment modeling and set design carrying the whole story beat',
            'Lighting and composition built around a single moment of judgement',
            'Material development in Substance Painter',
            'Final rendering and post-processing',
          ],
        },
        {
          id: 'blizzard',
          type: 'art',
          title: 'Blizzard Student Art Challenge',
          subtitle: 'Competition entry — environment art',
          year: '2025',
          tools: ['Blender', 'Substance Painter', 'Geometry Nodes'],
          tags: ['Competition', 'Stylized'],
          bullets: [
            'Custom hand-painted textures against a stylized art direction brief',
            'Procedural foliage built with Geometry Nodes',
            'Full environment composition to the competition\u2019s theme and constraints',
            'Attended mentorship and critique sessions to sharpen the final piece',
          ],
        },
        {
          id: 'kinetic-rush',
          type: 'art',
          title: 'Kinetic Rush',
          subtitle: 'Pwnisher community challenge',
          year: '2025',
          tools: ['Blender', 'After Effects'],
          tags: ['Competition', 'Motion'],
          bullets: [
            'Dynamic environment designed around a fixed camera move given to every entrant',
            'Camera animation and motion emphasis to sell speed',
            'Compositing and grade in After Effects',
          ],
        },
        {
          id: '24hr',
          type: 'art',
          title: '24 Hour Animation Challenge',
          subtitle: 'Placed **49th of 700**',
          year: '2024',
          tools: ['Blender'],
          tags: ['Competition', 'Speed'],
          bullets: [
            'Placed **49th out of 700** entrants on a **24-hour** clock',
            'Complete scene from concept to final render in a single day',
            'Rapid prototyping and iteration with no time for a second attempt',
            'Held composition together under real time pressure',
          ],
        },
        {
          id: 'renderman',
          type: 'art',
          title: 'RenderMan Pixar Challenge',
          subtitle: 'Competition entry',
          year: '2024',
          tools: ['Maya', 'RenderMan'],
          tags: ['Competition', 'Shading'],
          bullets: [
            'Stylized environment built to the challenge brief',
            'Advanced RenderMan shading and lighting design',
            'Mood and story set entirely through light',
          ],
        },
        {
          id: 'unstable-jam',
          type: 'art',
          title: 'Unstable Animation Jam',
          subtitle: 'Collaborative short',
          year: '2024',
          tools: ['Blender', 'Cloth sim'],
          tags: ['Jam', 'Collaboration'],
          bullets: [
            'Collaborative animation project run on a jam schedule',
            'Cloth simulation setup and integration',
            'Environment based on memories of Taiwan',
            'Character integration and lighting',
          ],
        },
      ],
    },

    {
      key: 'techart',
      label: 'Tech Art',
      short: 'TECH',
      accentVar: '--lane-tech',
      tagline: 'Capture pipelines, procedural systems, and tools',
      blurb:
        'This is the half of my brain that wants to know why the render took nine hours. Motion capture pipelines, node-based systems, and small tools that give a team its afternoon back.',
      reelId: null,
      projects: [
        {
          id: 'peak-mocap',
          type: 'techart',
          title: 'PEAK Summit Grant — Motion Capture Research',
          subtitle: 'Funded research — affordable mocap for theme park experiences',
          year: '2026',
          featured: true,
          lanes: ['techart', 'art'],
          tools: ['Unreal Engine', 'Live Link', 'Dollars MoCap', 'Blueprint', 'FreeMoCap'],
          tags: ['Research', 'Grant funded', 'Theme park'],
          bullets: [
            'Won the **PEAK Summit Grant** to develop video-based motion capture into affordable workflows for theme park experiences',
            'Prototyping a mocap game experience in Unreal Engine, including simple physical components using **pressure plates**',
            'Technical problem solving across modeling, texturing, lighting, and set design \u2014 plus playtesting with diverse participants',
            'Met **twice weekly** with my research mentor, cohort, and animation professor for progress, QA, and goal setting',
          ],
        },
        {
          id: 'freemocap-pipeline',
          type: 'techart',
          title: 'FreeMoCap → Blender Retarget Pipeline',
          subtitle: 'HuM0N Lab',
          year: '2025',
          tools: ['Python', 'FreeMoCap', 'Qualisys', 'Blender'],
          tags: ['Pipeline', 'Markerless capture'],
          bullets: [
            'Ran video-based and Qualisys capture sessions end to end, driving FreeMoCap through **Python**',
            'Retargeted and cleaned capture data from client sessions and NU sports teams',
            'Turned processed data into finished game cinematics in Blender',
          ],
        },
        {
          id: 'candy-rider',
          type: 'techart',
          title: 'Candy Rider — Ride Engineering Competition',
          subtitle: 'NU Theme Park Engineering Club — theming and safety team',
          year: '2025',
          tools: ['Blender', 'Onshape', 'SolidWorks → USDz'],
          tags: ['Theme park', 'Safety', 'Physical build'],
          bullets: [
            'Designed, concepted, and built a "candy rider" take on a **Da Vinci-inspired** ride for marketing and documentation',
            'Worked with mechanical engineers and the safety team, using game design techniques to make safety legible \u2014 walkway routing and signage',
            'Created safety signage, marketing packets, painted the physical ride, and modeled a cinematic for the final video explainer',
            'Moved SolidWorks files to **USDz** exports so the proposal and theme could be shown to anyone, on anything',
          ],
        },
        {
          id: 'node-studies',
          type: 'techart',
          title: 'Node-Based Material & FX Studies',
          subtitle: 'Ongoing self-directed work',
          year: '2025',
          tools: ['Blender GeoNodes', 'Houdini', 'Substance Designer'],
          tags: ['Procedural', 'Shading'],
          bullets: [
            'Procedural distribution and scattering systems in Blender Geometry Nodes',
            'Magic effects and terrain generation in Houdini',
            'Fully procedural material authoring in Substance Designer',
            'Built as reusable node groups rather than one-off setups',
          ],
        },
        {
          id: 'jam-pipeline',
          type: 'techart',
          title: 'Game + Animation Jam Pipelines',
          subtitle: 'Multiple jams — the unglamorous half',
          year: '2025',
          tools: ['Jira', 'Notion', 'Trello', 'Maya', 'Blender', 'Houdini'],
          tags: ['Pipeline', 'Project management'],
          bullets: [
            'Bridged programming, art, sound, and story through project management, keeping teams on track',
            'Set up file share systems and documentation for brainstorming and trailer presentations',
            'Created game design docs and tracked player playtest feedback across semester-long projects',
            'Researched AI tools and workflows to speed up teammates\u2019 personal pipelines based on what they actually asked for',
          ],
        },
      ],
    },

    {
      key: 'product',
      label: 'Product + Marketing',
      short: 'PRODUCT',
      accentVar: '--lane-product',
      tagline: 'Live-service events, campaigns, dashboards, and docs',
      blurb:
        'Work that gets measured. Live-service events and the dashboards behind them, campaign systems that scale past one person, and the documentation that keeps a team from building three different versions of the same thing.',
      reelId: null,
      projects: [
        {
          id: 'got-conquest',
          type: 'product',
          title: 'Game of Thrones: Conquest — Live Events & Dashboards',
          subtitle: 'WB Games Boston',
          year: '2026',
          role: 'Product Management Co-op',
          featured: true,
          lanes: ['product'],
          tools: ['Looker', 'Airtable', 'Google Sheets'],
          tags: ['Live service', 'Analytics', 'MTX'],
          bullets: [
            'Helped create in-game events and MTX offers \u2014 one offer/event generated **$234k in a single day**',
            'Built **Looker** dashboards tracking new and returning player data so the team could read event performance directly',
            'Wrote Sheets and Airtable tools that match teams for events, removing a manual workflow that kept producing errors',
          ],
        },
        {
          id: 'way-of-boats',
          type: 'product',
          title: 'Way of Boats — Productivity Site',
          subtitle: 'Self-directed build — gamified habits with an in-game economy',
          year: '2025',
          featured: true,
          role: 'Builder',
          lanes: ['product'],
          tools: ['Supabase', 'JavaScript', 'HTML', 'Systems design'],
          tags: ['Side project', 'Systems design', 'Full stack'],
          bullets: [
            'Built a functional collaborative website on **Supabase** giving a productivity club a real in-game economy',
            'Designed the incentive and balance systems so the economy stayed fun instead of farmable',
            'Made an admin account to monitor player merges and keep the overall experience balanced',
          ],
        },
        {
          id: 'batch-render',
          type: 'product',
          title: '380-Animation Batch Render System',
          subtitle: 'DraftKings',
          year: '2026',
          role: 'Motion Graphics Co-op',
          lanes: ['product', 'art'],
          tools: ['JavaScript', 'After Effects'],
          tags: ['Automation', 'Scale'],
          bullets: [
            'Learned and used **JavaScript** to batch render **380 animations** for email banners and promo page graphics',
            'Turned a per-asset manual export into a single repeatable job for client delivery',
            'Fed into A/B testing cycles and strategic planning across billboards, socials, and in-app events',
          ],
        },
        {
          id: 'mograph-templates',
          type: 'product',
          title: 'Customizable Motion Graphics Template System',
          subtitle: 'Schell Games',
          year: '2025',
          role: 'Marketing / Product Intern',
          lanes: ['product', 'art'],
          tools: ['After Effects', 'JavaScript'],
          tags: ['Tooling', 'Team enablement'],
          bullets: [
            'Designed and coded motion graphic templates in **JavaScript** with full customizability',
            'Built for ease of use, so the marketing team could produce on-brand motion without an artist in the loop',
            'Supported **6 consecutive campaigns** alongside 3D graphics and design doc work',
          ],
        },
        {
          id: 'mit-reality',
          type: 'product',
          title: 'MIT Reality Hackathon & Start-Up Lab',
          subtitle: '\u201925 and \u201926 — Product Manager, Founders Start-Up Challenge',
          year: '2026',
          role: 'Product Manager',
          lanes: ['product'],
          tools: ['Brand strategy', 'Pitch', 'Budgeting'],
          tags: ['Hackathon', 'Product management'],
          bullets: [
            'Product Manager in the Founders Start-Up Challenge across **two consecutive years**',
            'Owned the mission statement, budget proposals, and nonprofit funding case',
            'Won investors through mock-up marketing campaigns and a produced video explainer',
            'Ran business research and brand strategy for the team under hackathon time limits',
          ],
        },
        {
          id: 'goodwin-streaming',
          type: 'product',
          title: 'Goodwin Internal Streaming Platform',
          subtitle: 'Goodwin Law',
          year: '2025',
          role: 'Digital Multimedia & Marketing Co-op',
          lanes: ['product'],
          tools: ['Premiere Pro', 'NewTek TriCaster', 'Live broadcast'],
          tags: ['Internal comms', 'Video ops'],
          bullets: [
            'Managed the internal streaming platform \u2014 posting, tagging, and new content banners',
            'Produced **9 independent videos** and scheduled up to **18 interviews** and film sessions',
            'Assisted with live broadcasting and covered the RECM conference on a **4 a.m.** crew call',
          ],
        },
      ],
    },
  ],
};

export default portfolioData;
