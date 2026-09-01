// Content in this file is migrated verbatim from the live WordPress site
// (soulgoodwclub.org, captured 2026-09-01) via chrome-devtools MCP page
// snapshots — titles, descriptions, prices, and image files are real, not
// authored. Where a course/post exists only in one language on the source
// site, the other language field is left undefined (the page components
// filter it out for that locale) rather than inventing a translation.
// The source site currently has 9 Chinese blog posts total; only the 2
// captured in full here are included — the rest are deferred to U7's real
// data migration rather than reproduced from a partial scrape.

export type Locale = "en" | "zh-hans";

export type MockCourse = {
  slug: string;
  titleEn?: string;
  titleZh?: string;
  overviewEn?: string;
  overviewZh?: string;
  whatYoullLearnEn?: string;
  whatYoullLearnZh?: string;
  levelEn?: string;
  levelZh?: string;
  price: number;
  compareAtPrice?: number;
  image: string;
};

export type MockBlogPost = {
  slug: string;
  titleEn?: string;
  titleZh?: string;
  contentEn?: string;
  contentZh?: string;
  author: string;
  publishedAt: string;
  image?: string;
};

export type MockPartner = {
  name: string;
  logo: string;
  linkUrl: string | null;
};

export const courses: MockCourse[] = [
  {
    slug: "meditation-classes",
    titleEn: "Meditation Classes",
    titleZh: "冥想课程",
    overviewEn:
      "In today's fast-paced world, anxiety and distraction have become the norm. Designed specifically for beginners, this course uses scientifically grounded mindfulness practices to help you rebuild your brain's ability to focus, relieve mental stress, and cultivate lasting inner peace. Unlike dry lectures, this course combines neuroscience theory with hands-on exercises.",
    overviewZh:
      "在快节奏的现代生活中，焦虑和分神已成为常态。本课程专为零基础学员设计，通过科学的正念（Mindfulness）训练，帮助你重塑大脑的专注力，缓解心理压力，并建立持久的内在平静。不同于枯燥的讲座，本课程结合了神经科学理论与实战练习。通过 SaaS 平台的互动功能，你将获得每日打卡提醒、进度追踪以及沉浸式的音频导引。",
    whatYoullLearnEn:
      "Master these 5 core meditation techniques to significantly lower cortisol levels and improve sleep quality.",
    whatYoullLearnZh: "掌握 5 种核心冥想技法，显著降低皮质醇水平，改善睡眠质量。",
    levelEn: "All Levels",
    levelZh: "所有级别",
    price: 199,
    image: "/migrated/courses/meditation.webp",
  },
  {
    slug: "古典舞身韵：零基础优雅体态课",
    titleZh: "古典舞身韵：零基础优雅体态课",
    overviewZh:
      "萃取中国古典舞中的“身韵”精华，本课程旨在通过“呼吸、发力、神韵”的训练，帮助学员改善圆肩驼背，塑造修长纤细的肌肉线条。不同于高强度的健身，这门课程更像是一场关于东方美学的身体修行。",
    whatYoullLearnZh: "帮助学员改善圆肩驼背，塑造修长纤细的肌肉线条。",
    levelZh: "所有级别",
    price: 49.9,
    compareAtPrice: 99.99,
    image: "/migrated/courses/dance.webp",
  },
  {
    slug: "流瑜伽初学者：身心合一的艺术",
    titleZh: "流瑜伽初学者：身心合一的艺术",
    overviewZh:
      "这不仅是一场体能训练，更是一次动态的冥想。本课程专为想要改善体态、增强柔韧性的居家练习者设计。通过超清 4K 录播教学，我们将从最基础的体式（Asana）开始，逐步过渡到流畅的流瑜伽序列。",
    whatYoullLearnZh: "改善体态、增强柔韧性",
    levelZh: "所有级别",
    price: 299,
    compareAtPrice: 399,
    image: "/migrated/courses/yoga.webp",
  },
];

export const blogPosts: MockBlogPost[] = [
  {
    slug: "hello-world",
    titleEn: "Hello world!",
    contentEn: "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!",
    author: "admin",
    publishedAt: "2027-07-31",
  },
  {
    slug: "2024年12月慧之灵俱乐部圣诞派对",
    titleZh: "2024年12月慧之灵俱乐部圣诞派对",
    contentZh:
      "Soul Good 2024 年圣诞晚宴拉开节日序幕！这个节日季充满温暖和欢乐，我们想与我们亲爱的会员们一起分享这份喜悦。",
    author: "admin",
    publishedAt: "2024-12-25",
    image: "/migrated/blogs/christmas-party.webp",
  },
  {
    slug: "20241006合作伙伴慧之美疗愈中心开业典礼",
    titleZh: "20241006合作伙伴慧之美疗愈中心开业典礼",
    contentZh:
      "惠之美健康疗愈中心2024年10月6日在万锦市正式开张剪彩。作为探索健康疗愈的的新兴力量，这是大多伦多地区是唯一 一家集身、心、灵疗愈于一体的诊所。\n\n惠之美健康疗愈中心负责人Cathleen Qin在致辞时阐述了惠之美的愿景与使命。她表示，惠之美肩负着为社区带来健康与幸福的责任和使命。惠之美不仅是一个医疗诊所，更是一个让人们重拾健康与内心平静的疗愈之所。\n\nCathleen表示，真正的健康不仅仅体现在身体的康复上，更在于心灵的平静与精神的成长。她介绍说，惠之美健康疗愈中心不仅仅是一个普通的医疗场所，它是一个结合身、心、灵的疗愈平台。中心的疗愈方式包括了针灸中医，推拿按摩等传统手法还结合心理咨询，LIFE COACH能量疗愈，水晶疗愈、塔罗牌指导等多种形式。\n\nCathleen相信，未来的医疗将越来越多地融合这些不同的疗愈方法，而惠之美希望成为这一领域的先锋。惠之美将继续秉持关怀与专业的理念，为每一位病人提供个性化的治疗方案，让他们在这里找到内外平衡，恢复健康与活力。\n\n作为一家致力于社区健康与福祉的医疗平台，Cathleen表示，该中心拥有 10 多名杰出的技术人员和专业人士，不仅为社区成员提供专业及时的医疗服务，中心还为那些刚刚毕业的中医针灸专业学生提供实践基地，并将开设短期培训课程，将能量疗愈的理念引入传统中医领域。惠之美通过线上线下结合远程来帮助来访者，个人定制解决方案，全方位的平衡身心健康状态。主要针对各种痛症，焦虑症，自闭症，抑郁症，暴食症，上瘾症，长期失眠等问题，无痛治疗，效果显著。结合塔罗占卜和水晶催眠等方法更好的帮助患者根治病痛。\n\nSoul Beauty慧之美健康疗愈中心（Soul Beauty Healing Center） 2900 Steeles Ave E, Markham, ON L3T 4X1",
    author: "admin",
    publishedAt: "2024-10-06",
    image: "/migrated/blogs/soulbeauty-opening.webp",
  },
];

export const partners: MockPartner[] = [
  { name: "Pioneer Group", logo: "/migrated/partners/pioneer-group-logo.svg", linkUrl: "https://pioneergroups.ca/" },
  {
    name: "Soul Beauty Healing Center",
    logo: "/migrated/partners/soulbeauty-logo.svg",
    linkUrl: "https://www.soulbeautyhealing.ca/",
  },
  { name: "Pioneer HR Solutions", logo: "/migrated/partners/hr-solutions-logo.svg", linkUrl: null },
  {
    name: "University of Waterloo",
    logo: "/migrated/partners/waterloo-logo.svg",
    linkUrl: "https://uwaterloo.ca/",
  },
  { name: "BMO", logo: "/migrated/partners/bmo-logo.svg", linkUrl: "https://www.bmo.com/" },
];

export function localizedCourse(course: MockCourse, locale: Locale) {
  const title = locale === "zh-hans" ? course.titleZh : course.titleEn;
  if (!title) return null;
  return {
    slug: course.slug,
    title,
    overview: (locale === "zh-hans" ? course.overviewZh : course.overviewEn) ?? "",
    whatYoullLearn: (locale === "zh-hans" ? course.whatYoullLearnZh : course.whatYoullLearnEn) ?? "",
    level: (locale === "zh-hans" ? course.levelZh : course.levelEn) ?? "",
    price: course.price,
    compareAtPrice: course.compareAtPrice,
    image: course.image,
  };
}

export function localizedBlogPost(post: MockBlogPost, locale: Locale) {
  const title = locale === "zh-hans" ? post.titleZh : post.titleEn;
  if (!title) return null;
  return {
    slug: post.slug,
    title,
    content: (locale === "zh-hans" ? post.contentZh : post.contentEn) ?? "",
    author: post.author,
    publishedAt: post.publishedAt,
    image: post.image,
  };
}
