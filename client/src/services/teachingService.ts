import api from './api'
import type { Teaching, TeachingFilters, TeachingListResponse } from '../types'

// Get teachings with optional filters and pagination
export const getTeachings = async (filters?: TeachingFilters, page = 1, limit = 10): Promise<TeachingListResponse> => {
  try {
    // For demo purposes, we'll use mock data instead of an actual API call
    // In production, this would be:
    // const response = await api.get('/teachings', { params: { ...filters, page, limit } })
    // return response.data
    
    return mockGetTeachings(filters, page, limit)
  } catch (error) {
    console.error('Error fetching teachings:', error)
    throw error
  }
}

// Get a single teaching by slug
export const getTeachingBySlug = async (slug: string): Promise<Teaching> => {
  try {
    // For demo purposes, we'll use mock data instead of an actual API call
    // In production, this would be:
    // const response = await api.get(`/teachings/${slug}`)
    // return response.data
    
    return mockGetTeachingBySlug(slug)
  } catch (error) {
    console.error(`Error fetching teaching with slug ${slug}:`, error)
    throw error
  }
}

// Get related teachings
export const getRelatedTeachings = async (teachingId: string, limit = 3): Promise<Teaching[]> => {
  try {
    // For demo purposes, we'll use mock data instead of an actual API call
    // In production, this would be:
    // const response = await api.get(`/teachings/${teachingId}/related`, { params: { limit } })
    // return response.data
    
    return mockGetRelatedTeachings(teachingId, limit)
  } catch (error) {
    console.error(`Error fetching related teachings for ${teachingId}:`, error)
    throw error
  }
}

// Mock implementation for demo purposes
const mockTeachings: Teaching[] = [
  {
    id: '1',
    title: 'Understanding God\'s Grace in Everyday Life',
    slug: 'understanding-gods-grace',
    excerpt: 'Discover how God\'s grace manifests in your daily experiences and how to recognize divine interventions.',
    content: `
      <h2>Understanding Grace in Our Lives</h2>
      <p>Grace is the unmerited favor of God. It's receiving something we don't deserve. In Ephesians 2:8-9, Paul tells us, "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast."</p>
      
      <div class="scripture-quote">
        "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me." - 2 Corinthians 12:9
      </div>
      
      <p>When we understand the depth of God's grace, it transforms how we view both our successes and failures. It reminds us that our worth is not tied to our performance but to God's love for us.</p>
      
      <h2>Recognizing Grace in Daily Life</h2>
      <p>God's grace surrounds us daily, often in ways we fail to notice. The sunrise, a kind word from a stranger, or unexpected provision in times of need—these are all manifestations of grace.</p>
      
      <p>Take time today to pause and reflect on moments of grace in your own life. How has God shown you favor that you didn't deserve? How might recognizing these moments change your perspective on challenges you're currently facing?</p>
      
      <h2>Extending Grace to Others</h2>
      <p>As recipients of God's abundant grace, we are called to be conduits of that same grace to those around us. This means offering forgiveness when it's difficult, showing patience when we're frustrated, and loving unconditionally as we have been loved.</p>
      
      <div class="scripture-quote">
        "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you." - Ephesians 4:32
      </div>
      
      <p>Challenge yourself this week to be intentional about extending grace to others, especially in situations where it feels unnatural or undeserved.</p>
    `,
    publishedAt: '2023-02-15T08:00:00Z',
    readingTime: 8,
    tags: ['grace', 'faith', 'daily living'],
    seriesId: '1',
    seriesName: 'Foundations of Faith',
    authorName: 'Pastor Michael Johnson'
  },
  {
    id: '2',
    title: 'The Power of Prayer in Spiritual Warfare',
    slug: 'power-of-prayer',
    excerpt: 'Learn how prayer serves as your strongest weapon against spiritual battles and how to develop an effective prayer life.',
    content: `
      <h2>Prayer as Spiritual Warfare</h2>
      <p>Prayer is not merely a religious practice; it's a powerful weapon in spiritual warfare. In Ephesians 6:18, after describing the armor of God, Paul urges believers to "pray in the Spirit on all occasions with all kinds of prayers and requests."</p>
      
      <div class="scripture-quote">
        "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms." - Ephesians 6:12
      </div>
      
      <p>Understanding prayer as warfare changes how we approach it. It's not a passive activity but an active engagement with the spiritual realm.</p>
      
      <h2>Elements of Effective Prayer</h2>
      <p>Effective prayer incorporates several key elements:</p>
      <ul>
        <li>Faith - Believing God hears and will respond (Hebrews 11:6)</li>
        <li>Persistence - Continuing to pray without giving up (Luke 18:1-8)</li>
        <li>Alignment with God's will - Seeking His purposes above our own (1 John 5:14-15)</li>
        <li>Specificity - Being clear and direct in our requests (Philippians 4:6)</li>
      </ul>
      
      <h2>Developing a Prayer Strategy</h2>
      <p>Just as a military general develops a strategy before entering battle, we should approach prayer strategically. This includes:</p>
      
      <p>1. Identifying specific areas of spiritual attack in your life or family</p>
      <p>2. Finding relevant Scripture to pray over these situations</p>
      <p>3. Setting aside regular times for focused, strategic prayer</p>
      <p>4. Enlisting others to join you in prayer for significant battles</p>
      
      <div class="scripture-quote">
        "Again, truly I tell you that if two of you on earth agree about anything they ask for, it will be done for them by my Father in heaven." - Matthew 18:19
      </div>
      
      <p>Remember that prayer is not about changing God's mind but about aligning ourselves with His will and participating in His work in the world.</p>
    `,
    publishedAt: '2023-03-01T09:30:00Z',
    readingTime: 10,
    tags: ['prayer', 'spiritual warfare', 'faith'],
    seriesId: '2',
    seriesName: 'Spiritual Disciplines',
    authorName: 'Pastor Michael Johnson'
  },
  {
    id: '3',
    title: 'Finding Peace in a Chaotic World',
    slug: 'finding-peace',
    excerpt: 'Explore biblical strategies for maintaining inner peace despite external chaos and uncertainty.',
    content: `
      <h2>The Promise of Peace</h2>
      <p>In John 14:27, Jesus makes a profound promise to His followers: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."</p>
      
      <p>This peace is not the absence of trouble but the presence of God in the midst of trouble. It's a peace that surpasses understanding (Philippians 4:7) and guards our hearts and minds.</p>
      
      <h2>Cultivating Peace Through Presence</h2>
      <p>One of the primary ways we experience God's peace is through practicing His presence. This means developing an awareness of God with us in every moment and circumstance.</p>
      
      <div class="scripture-quote">
        "You will keep in perfect peace those whose minds are steadfast, because they trust in you." - Isaiah 26:3
      </div>
      
      <p>Practices that help us cultivate awareness of God's presence include:</p>
      <ul>
        <li>Meditation on Scripture</li>
        <li>Contemplative prayer</li>
        <li>Worship, both corporate and personal</li>
        <li>Gratitude and thanksgiving</li>
      </ul>
      
      <h2>Peace Through Perspective</h2>
      <p>Our perspective significantly impacts our peace. When we view circumstances through the lens of fear, worry, or doubt, peace eludes us. But when we view the same circumstances through the lens of faith, remembering God's character and promises, peace becomes possible.</p>
      
      <div class="scripture-quote">
        "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus." - Philippians 4:6-7
      </div>
      
      <p>Consider how you might reframe current challenges through the perspective of God's sovereignty, goodness, and power.</p>
      
      <h2>Practical Peace-Preserving Practices</h2>
      <p>Beyond our spiritual disciplines, practical habits can help maintain peace:</p>
      <ul>
        <li>Limiting media consumption, especially news and social media</li>
        <li>Creating margins in your schedule</li>
        <li>Practicing Sabbath rest</li>
        <li>Simplifying commitments</li>
        <li>Seeking community and support</li>
      </ul>
      
      <p>Remember, peace is both a gift from God and a fruit we cultivate through intentional practices. Which of these strategies might help you experience more of God's peace today?</p>
    `,
    publishedAt: '2023-03-10T14:00:00Z',
    readingTime: 9,
    tags: ['peace', 'anxiety', 'faith'],
    seriesId: '3',
    seriesName: 'Christian Living',
    authorName: 'Pastor Michael Johnson'
  },
  {
    id: '4',
    title: 'Understanding Biblical Leadership',
    slug: 'biblical-leadership',
    excerpt: 'Examine the biblical principles of servant leadership and how they apply in family, church, and professional contexts.',
    content: `
      <h2>The Heart of Biblical Leadership</h2>
      <p>Jesus radically redefined leadership in Matthew 20:25-28 when He told His disciples: "You know that the rulers of the Gentiles lord it over them, and their high officials exercise authority over them. Not so with you. Instead, whoever wants to become great among you must be your servant, and whoever wants to be first must be your slave—just as the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many."</p>
      
      <p>Biblical leadership starts with a servant's heart. It's not about position, power, or prestige, but about influence for the good of others and glory of God.</p>
      
      <h2>Character Over Competence</h2>
      <p>While skills and competence matter, Scripture places a far greater emphasis on character. In 1 Timothy 3 and Titus 1, Paul outlines qualifications for church leaders that focus almost exclusively on character traits rather than skills or achievements.</p>
      
      <div class="scripture-quote">
        "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law." - Galatians 5:22-23
      </div>
      
      <p>These qualities form the foundation of godly leadership in any context. A leader may be highly competent, but without character, their influence will ultimately harm rather than help.</p>
      
      <h2>Leadership in Different Contexts</h2>
      
      <h3>In the Family</h3>
      <p>Parents are called to lead their children with love, consistency, and godly example. Ephesians 6:4 instructs fathers not to exasperate their children but to bring them up in the training and instruction of the Lord.</p>
      
      <h3>In the Church</h3>
      <p>Church leaders are called to shepherd God's flock willingly and eagerly, not lording it over those entrusted to them but being examples (1 Peter 5:2-3). They're accountable for how they care for people's spiritual wellbeing.</p>
      
      <h3>In the Workplace</h3>
      <p>Christian professionals are called to work "as for the Lord" (Colossians 3:23) and to treat those under their authority with respect and fairness, remembering they too have a Master in heaven (Colossians 4:1).</p>
      
      <h2>Developing as a Biblical Leader</h2>
      <p>Biblical leadership development involves:</p>
      <ul>
        <li>Spiritual formation - Growing in Christlikeness</li>
        <li>Character development - Cultivating integrity and the fruit of the Spirit</li>
        <li>Skill acquisition - Developing competence in necessary areas</li>
        <li>Mentoring - Learning from more experienced leaders</li>
        <li>Practice - Taking on appropriate responsibilities</li>
      </ul>
      
      <div class="scripture-quote">
        "Follow my example, as I follow the example of Christ." - 1 Corinthians 11:1
      </div>
      
      <p>The ultimate measure of biblical leadership is not results or recognition but faithfulness to God's calling and reflection of Christ's character.</p>
    `,
    publishedAt: '2023-03-18T10:15:00Z',
    readingTime: 11,
    tags: ['leadership', 'service', 'character'],
    seriesId: '4',
    seriesName: 'Leadership Principles',
    authorName: 'Pastor Michael Johnson'
  },
  {
    id: '5',
    title: 'The Heart of Worship: Beyond Sunday Mornings',
    slug: 'heart-of-worship',
    excerpt: 'Discover how true worship extends beyond music and church services into every aspect of daily life.',
    content: `
      <h2>Redefining Worship</h2>
      <p>Many Christians equate worship primarily with the musical portion of a church service. While corporate singing is certainly an expression of worship, the biblical concept is far broader and deeper.</p>
      
      <p>In Romans 12:1, Paul writes, "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship."</p>
      
      <p>True worship encompasses all of life offered to God as an act of reverent devotion.</p>
      
      <h2>Worship as Response</h2>
      <p>At its core, worship is our response to God's revelation of Himself. When we truly see God for who He is—His holiness, love, power, wisdom, and grace—the natural response is worship.</p>
      
      <div class="scripture-quote">
        "Ascribe to the LORD the glory due his name; worship the LORD in the splendor of his holiness." - Psalm 29:2
      </div>
      
      <p>Our worship deepens as our knowledge of God grows. This is why the study of Scripture is so vital—it continually reveals more of God's character and ways, fueling our worship.</p>
      
      <h2>Expressions of Worship</h2>
      <p>Worship finds expression in countless ways:</p>
      
      <h3>Corporate Worship</h3>
      <p>When we gather as the body of Christ to sing, pray, hear God's Word, and respond in faith, we participate in a beautiful, communal expression of worship that has characterized God's people throughout history.</p>
      
      <h3>Work as Worship</h3>
      <p>Colossians 3:23-24 tells us, "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward. It is the Lord Christ you are serving."</p>
      
      <p>When we approach our daily work—whether as executives, teachers, parents, or students—as service to Christ, it becomes worship.</p>
      
      <h3>Creation Care</h3>
      <p>Stewarding the earth and its resources responsibly is an act of worship, acknowledging God as Creator and honoring His handiwork.</p>
      
      <h3>Relationships</h3>
      <p>Loving others sacrificially, extending forgiveness, showing hospitality—these relational acts become worship when done as an extension of our love for God.</p>
      
      <h2>Obstacles to Whole-Life Worship</h2>
      <p>Several barriers can prevent us from embracing worship as a lifestyle:</p>
      <ul>
        <li>Compartmentalization - separating "sacred" and "secular" aspects of life</li>
        <li>Ritualism - focusing on external forms without heart engagement</li>
        <li>Emotionalism - equating worship with emotional experiences</li>
        <li>Individualism - neglecting the communal dimension of worship</li>
      </ul>
      
      <div class="scripture-quote">
        "Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks." - John 4:23
      </div>
      
      <p>As we recognize and remove these obstacles, we open ourselves to experiencing worship as God intended—a holistic lifestyle of devotion that touches every aspect of life.</p>
    `,
    publishedAt: '2023-03-22T11:45:00Z',
    readingTime: 9,
    tags: ['worship', 'lifestyle', 'devotion'],
    seriesId: '2',
    seriesName: 'Spiritual Disciplines',
    authorName: 'Pastor Michael Johnson'
  },
  {
    id: '6',
    title: 'Biblical Principles for Financial Stewardship',
    slug: 'financial-stewardship',
    excerpt: 'Learn God\'s perspective on money management and how to honor Him with your resources.',
    content: `
      <h2>A Biblical View of Money</h2>
      <p>The Bible contains over 2,000 verses related to money and possessions, indicating God's concern for this area of our lives. Scripture presents a balanced view that neither demonizes wealth nor glorifies it.</p>
      
      <p>Several key principles emerge:</p>
      <ul>
        <li>God owns everything (Psalm 24:1)</li>
        <li>We are stewards, not owners (1 Corinthians 4:2)</li>
        <li>Money can be used for good or evil (1 Timothy 6:10, 17-19)</li>
        <li>Our handling of money reflects and affects our spiritual lives (Luke 16:11)</li>
      </ul>
      
      <h2>The Dangers of Materialism</h2>
      <p>Jesus warned, "Watch out! Be on your guard against all kinds of greed; life does not consist in an abundance of possessions" (Luke 12:15).</p>
      
      <div class="scripture-quote">
        "For the love of money is a root of all kinds of evil. Some people, eager for money, have wandered from the faith and pierced themselves with many griefs." - 1 Timothy 6:10
      </div>
      
      <p>Materialism presents several spiritual dangers:</p>
      <ul>
        <li>It can become idolatry, replacing God as our source of security and identity</li>
        <li>It fosters anxiety and worry (Matthew 6:25-34)</li>
        <li>It can harden our hearts toward the needs of others</li>
        <li>It creates a false sense of self-sufficiency</li>
      </ul>
      
      <h2>Principles for Financial Management</h2>
      
      <h3>Give Generously</h3>
      <p>Giving is not about meeting a minimum requirement but about cultivating a generous heart. The early Christians modeled radical generosity (Acts 4:32-35), and Paul encouraged giving that is willing, cheerful, and according to ability (2 Corinthians 9:6-7).</p>
      
      <h3>Save Wisely</h3>
      <p>Proverbs commends the wisdom of saving: "The wise store up choice food and olive oil, but fools gulp theirs down" (Proverbs 21:20). Prudent saving provides for future needs and emergencies.</p>
      
      <h3>Spend Thoughtfully</h3>
      <p>God provides for our enjoyment (1 Timothy 6:17) but calls us to wise stewardship. This means:</p>
      <ul>
        <li>Avoiding impulse purchases</li>
        <li>Distinguishing between needs and wants</li>
        <li>Seeking contentment (Philippians 4:11-13)</li>
        <li>Practicing gratitude</li>
      </ul>
      
      <h3>Avoid Debt When Possible</h3>
      <p>Proverbs 22:7 warns, "The borrower is slave to the lender." While some debt (like mortgages) may be necessary, Scripture cautions against the bondage that can come with excessive borrowing.</p>
      
      <h2>Creating a God-Honoring Financial Plan</h2>
      <p>Practical steps toward biblical stewardship include:</p>
      <ol>
        <li>Praying for wisdom and contentment</li>
        <li>Creating a budget that prioritizes giving</li>
        <li>Building emergency savings</li>
        <li>Paying down debt strategically</li>
        <li>Setting long-term financial goals aligned with your values</li>
        <li>Practicing regular financial check-ups</li>
      </ol>
      
      <div class="scripture-quote">
        "But seek first his kingdom and his righteousness, and all these things will be given to you as well." - Matthew 6:33
      </div>
      
      <p>When our financial decisions flow from kingdom priorities, we experience freedom from the anxiety and bondage that often accompany money matters.</p>
    `,
    publishedAt: '2023-03-28T13:30:00Z',
    readingTime: 10,
    tags: ['finance', 'stewardship', 'generosity'],
    seriesId: '3',
    seriesName: 'Christian Living',
    authorName: 'Pastor Michael Johnson'
  }
]

const mockGetTeachings = (filters?: TeachingFilters, page = 1, limit = 10): TeachingListResponse => {
  let filteredTeachings = [...mockTeachings]
  
  // Apply filters if provided
  if (filters) {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredTeachings = filteredTeachings.filter(teaching => 
        teaching.title.toLowerCase().includes(searchLower) ||
        teaching.excerpt.toLowerCase().includes(searchLower) ||
        teaching.content.toLowerCase().includes(searchLower) ||
        teaching.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    if (filters.seriesId) {
      filteredTeachings = filteredTeachings.filter(teaching => teaching.seriesId === filters.seriesId)
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filteredTeachings = filteredTeachings.filter(teaching => 
        teaching.tags.some(tag => filters.tags!.includes(tag))
      )
    }
    
    if (filters.startDate) {
      const startDate = new Date(filters.startDate)
      filteredTeachings = filteredTeachings.filter(teaching => 
        new Date(teaching.publishedAt) >= startDate
      )
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate)
      filteredTeachings = filteredTeachings.filter(teaching => 
        new Date(teaching.publishedAt) <= endDate
      )
    }
  }
  
  // Sort by date (newest first)
  filteredTeachings.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  
  // Calculate pagination
  const total = filteredTeachings.length
  const totalPages = Math.ceil(total / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTeachings = filteredTeachings.slice(startIndex, endIndex)
  
  return {
    teachings: paginatedTeachings,
    pagination: {
      page,
      limit,
      total,
      totalPages
    }
  }
}

const mockGetTeachingBySlug = (slug: string): Teaching => {
  const teaching = mockTeachings.find(t => t.slug === slug)
  
  if (!teaching) {
    throw new Error(`Teaching with slug "${slug}" not found`)
  }
  
  return teaching
}

const mockGetRelatedTeachings = (teachingId: string, limit = 3): Teaching[] => {
  const teaching = mockTeachings.find(t => t.id === teachingId)
  
  if (!teaching) {
    throw new Error(`Teaching with id "${teachingId}" not found`)
  }
  
  // Find teachings in the same series or with overlapping tags
  const related = mockTeachings
    .filter(t => t.id !== teachingId) // Exclude current teaching
    .filter(t => 
      t.seriesId === teaching.seriesId || 
      t.tags.some(tag => teaching.tags.includes(tag))
    )
    .sort(() => Math.random() - 0.5) // Randomize order
    .slice(0, limit)
  
  return related
}

export default {
  getTeachings,
  getTeachingBySlug,
  getRelatedTeachings
}