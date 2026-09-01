export type Locale = "en" | "zh-hans";

export type MockCourse = {
  slug: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  price: number;
  level: string;
};

export type MockBlogPost = {
  slug: string;
  titleEn: string;
  titleZh: string;
  excerptEn: string;
  excerptZh: string;
  contentEn: string;
  contentZh: string;
  author: string;
  publishedAt: string;
};

export type MockPartner = {
  name: string;
  linkUrl: string | null;
};

export const courses: MockCourse[] = [
  {
    slug: "meditation-classes",
    titleEn: "Meditation Classes",
    titleZh: "冥想课程",
    descriptionEn:
      "A guided meditation program for beginners and returning practitioners, focused on breathing techniques and building a sustainable daily practice.",
    descriptionZh:
      "面向初学者与老学员的引导式冥想课程，专注于呼吸技巧训练，帮助你建立可持续的日常冥想习惯。",
    price: 199,
    level: "All Levels",
  },
  {
    slug: "mindful-living-workshop",
    titleEn: "Mindful Living Workshop",
    titleZh: "正念生活工作坊",
    descriptionEn:
      "A hands-on workshop that brings mindfulness practices into everyday routines — eating, working, and connecting with others.",
    descriptionZh:
      "一个实践型工作坊，将正念练习融入日常的饮食、工作与人际交往之中。",
    price: 149,
    level: "Beginner",
  },
  {
    slug: "stress-resilience-program",
    titleEn: "Stress Resilience Program",
    titleZh: "抗压力建设课程",
    descriptionEn:
      "A multi-week program combining meditation, breathwork, and group discussion to help you build long-term resilience to everyday stress.",
    descriptionZh:
      "为期数周的课程，结合冥想、呼吸练习与小组讨论，帮助你建立应对日常压力的长期韧性。",
    price: 249,
    level: "Intermediate",
  },
];

export const blogPosts: MockBlogPost[] = [
  {
    slug: "five-minute-morning-meditation",
    titleEn: "A Five-Minute Morning Meditation to Start Your Day",
    titleZh: "开启一天的五分钟晨间冥想",
    excerptEn:
      "You don't need an hour on the cushion to feel the benefits of meditation. Here's a short practice you can do before breakfast.",
    excerptZh: "冥想的好处不需要一小时的静坐才能获得，这是一个早餐前就能完成的简短练习。",
    contentEn:
      "You don't need an hour on the cushion to feel the benefits of meditation. Start by sitting comfortably, closing your eyes, and taking five slow breaths. Notice the sensation of the air entering and leaving your body. When your mind wanders — and it will — gently bring your attention back to your breath. Over time, this small daily habit builds real calm and focus that carries through your whole day.",
    contentZh:
      "冥想的好处不需要一小时的静坐才能获得。找一个舒适的坐姿，闭上双眼，做五次缓慢的呼吸，感受空气进出身体的感觉。当思绪飘走时——这很正常——温柔地把注意力带回呼吸上。久而久之，这个小小的日常习惯会为你带来贯穿一整天的平静与专注。",
    author: "Soul Good Team",
    publishedAt: "2026-06-02",
  },
  {
    slug: "building-a-supportive-community",
    titleEn: "Why a Supportive Community Matters for Your Wellness Journey",
    titleZh: "为什么支持型社群对身心健康之旅如此重要",
    excerptEn:
      "Wellness habits are easier to keep when you're not doing them alone. Here's how our member community helps people stay consistent.",
    excerptZh: "身心健康的习惯，在有人同行时更容易坚持。看看我们的会员社群如何帮助大家保持一致。",
    contentEn:
      "Wellness habits are easier to keep when you're not doing them alone. Many of our members tell us that showing up for a group class, or simply knowing others are on the same journey, is what keeps them coming back. Community accountability turns a personal goal into a shared one — and shared goals are far more likely to stick.",
    contentZh:
      "身心健康的习惯，在有人同行时更容易坚持。许多会员告诉我们，正是因为参加集体课程，或者知道有其他人在同一条路上，才让他们持续坚持下去。社群的相互督促把个人目标变成共同目标，而共同目标更容易长久维持。",
    author: "Soul Good Team",
    publishedAt: "2026-05-18",
  },
  {
    slug: "mindfulness-at-work",
    titleEn: "Bringing Mindfulness Into a Busy Workday",
    titleZh: "在忙碌的工作日中融入正念",
    excerptEn:
      "A few simple techniques to stay grounded during back-to-back meetings and a packed inbox.",
    excerptZh: "几个简单的小技巧，帮助你在连轴转的会议与爆满的收件箱中保持内心的稳定。",
    contentEn:
      "A few simple techniques can help you stay grounded during back-to-back meetings and a packed inbox: take three conscious breaths before opening your laptop each morning, stand up and stretch between meetings, and set a daily reminder to check in with how your body feels. None of these take more than a minute, but together they add up to a calmer, more focused workday.",
    contentZh:
      "几个简单的小技巧可以帮助你在连轴转的会议与爆满的收件箱中保持内心稳定：每天早上打开电脑前先做三次有意识的深呼吸、会议之间起身活动一下、每天设置一个提醒来关注自己身体的感受。这些每一个都花不了一分钟，但加在一起能让整个工作日更平静、更专注。",
    author: "Soul Good Team",
    publishedAt: "2026-04-30",
  },
];

export const partners: MockPartner[] = [
  { name: "Pioneer Group", linkUrl: "https://pioneergroups.ca/" },
  { name: "Soul Beauty Healing Center", linkUrl: "https://www.soulbeautyhealing.ca/" },
  { name: "Pioneer HR Solutions", linkUrl: null },
  { name: "University of Waterloo", linkUrl: "https://uwaterloo.ca/" },
  { name: "BMO", linkUrl: "https://www.bmo.com/" },
];

export function localizedCourse(course: MockCourse, locale: Locale) {
  return {
    slug: course.slug,
    title: locale === "zh-hans" ? course.titleZh : course.titleEn,
    description: locale === "zh-hans" ? course.descriptionZh : course.descriptionEn,
    price: course.price,
    level: course.level,
  };
}

export function localizedBlogPost(post: MockBlogPost, locale: Locale) {
  return {
    slug: post.slug,
    title: locale === "zh-hans" ? post.titleZh : post.titleEn,
    excerpt: locale === "zh-hans" ? post.excerptZh : post.excerptEn,
    content: locale === "zh-hans" ? post.contentZh : post.contentEn,
    author: post.author,
    publishedAt: post.publishedAt,
  };
}
