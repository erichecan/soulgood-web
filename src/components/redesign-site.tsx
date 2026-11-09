import Image from "next/image";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { localizeCourse } from "@/lib/localize-content";
import type { Locale } from "@/i18n/routing";
import type { Course } from "@/generated/prisma/client";

type Language = "en" | "zh-hans";
type PageKey =
  | "home" | "events" | "event-detail" | "event-register" | "event-payment" | "event-confirmed"
  | "membership" | "membership-join" | "membership-pending" | "membership-active"
  | "space" | "space-inquiry" | "space-sent" | "about" | "contact" | "contact-sent"
  | "faq" | "privacy" | "membership-terms" | "refunds" | "event-guidelines" | "event-unavailable";

const copy = {
  en: {
    nav: ["Home", "Events", "Membership", "Venue", "About", "Contact"],
    enquire: "Enquire about the space", signIn: "Sign in", language: "中文",
    footerLead: "Good things happen\nwhen we come together.",
    footerGroups: [
      { title: "Explore", links: [["Events & Workshops", "/events"], ["Membership", "/membership-pricing"], ["The Space", "/the-space"], ["Courses", "/courses"]] },
      { title: "Discover", links: [["About Us", "/about-us"], ["Contact", "/contact"], ["FAQ", "/faq"]] },
      { title: "Policies", links: [["Privacy", "/privacy"], ["Membership Terms", "/membership-terms"], ["Refunds", "/refunds"], ["Event Guidelines", "/event-guidelines"]] },
    ],
    note: "North York, Toronto · A place to gather, learn and feel at home.",
    homeEyebrow: "Soul Good · Happy Women's Club", homeTitle: "More room\nto belong.",
    homeIntro: "A gathering place for women, ideas and the good things that happen when we make time for each other.",
    exploreEvents: "Explore events", homeSpace: "Find your place", threeWays: "Three ways to gather.",
    threeWaysIntro: "Different invitations, the same warm. Find the way that fits what you need today.",
    comeEvent: "Come to an event", community: "Join the community", makeSpace: "Make space for yours",
    eventWay: "Explore workshops, gatherings and shared experiences.", communityWay: "Keep a connection beyond a single afternoon.",
    spaceWay: "A considered setting for your class, gathering or content work.",
    storyEyebrow: "A small idea with room to grow", storyTitle: "Come as you are.\nLeave with more.",
    storyBody: "Connection can begin with a shared table, a new conversation or the courage to try something for the first time.",
    ourStory: "Our story", whatOn: "What's on", programmeTitle: "The next gathering\nstarts with an invitation.",
    programmeIntro: "See the upcoming format, host, place and registration details together in one clear event view.",
    exploreProgramme: "Explore the programme", learning: "Learning with others", connect: "Make time to connect",
    moments: "The good, in real life.", momentsIntro: "Glimpses of the Soul Good community and the space, captured in the photographs you shared.",
    album: "Explore the album", spaceTitle: "A setting for your next\ngood idea.",
    spaceIntro: "From small workshops to creative sessions and intimate conversations, the space can flex around your plans.",
    newsletter: "A little more good,\nin your inbox.", newsletterBody: "Occasional updates about events and the community. Only if you ask for them.",
    email: "Your email address", subscribe: "Get updates",
    eventsEyebrow: "02 / Soul Good", eventsTitle: "Worth gathering for.", eventsIntro: "Explore the programme, discover a session that speaks to you and register when the details are confirmed.",
    filters: ["All experiences", "Workshops", "Community", "Free sessions"], featured: "Featured · Programme preview",
    featuredTitle: "An invitation to\nsomething new.", featuredBody: "Event title, date, facilitator and ticket availability will appear after the programme is approved.",
    viewFormat: "View event format", programme: "The programme", programmeBody: "Filters and availability states are shown here as a design example. No event dates or prices are being asserted.",
    eventNames: ["Workshop experience", "Community gathering", "Free introductory session"],
    eventNotes: ["Date, facilitator and price to be confirmed", "The full invitation is coming soon", "Registration opens when announced"],
    recent: "Recent\nmoments.", recentBody: "A visual window into the community, venue, and thoughtful details.",
    howAttend: "From interest to attendance.", steps: [["Discover", "Choose an event and review the host, format, date and terms."], ["Register", "Complete the form, then payment if the event requires it."], ["Confirm", "Receive the correct confirmation for the completed registration."]],
    courses: "Learning with others", coursesIntro: "Current courses remain available here. Course details and prices come from the existing Soul Good catalogue.", viewCourses: "View all courses", viewCourse: "View course",
    detailTitle: "A workshop to make room\nfor new connections.", detailIntro: "A thoughtful gathering for learning, conversation and a little more space to be yourself.",
    expect: "What to expect", expectBody: "A welcoming small-group experience with time to learn, connect and take something useful home.",
    begin: "A place to begin together.", details: "The important details", date: "Date", location: "Location", price: "Ticket price", confirmPending: "To be confirmed", registerInterest: "Register your interest",
    regTitle: "Save your\nplace.", regIntro: "Share a few details and we will be ready when the next gathering is announced.", yourNext: "Your next step", formName: "Your name", formEmail: "Email address", formPhone: "Phone number (optional)", formMessage: "Anything you would like us to know?", bookingPending: "Registration opens when event details are confirmed.", sendInterest: "Registration coming soon",
    paymentTitle: "One more step\nto join us.", paymentStatus: "Payment pending", paymentBody: "Your registration is being checked. We will confirm your place once payment is verified.",
    confirmedTitle: "We'll see\nyou there.", confirmedStatus: "You're on the list.", confirmedBody: "Your event registration is confirmed. Keep this page for the details of your gathering.",
    unavailableTitle: "This one has\nfilled up.", unavailableStatus: "Registration closed", unavailableBody: "This experience is no longer taking registrations. Explore another way to spend time with Soul Good.",
    membershipTitle: "A place to\nkeep coming\nback to.", membershipIntro: "For those who want their connection to Soul Good to continue beyond one event.", exploreJoining: "Explore joining", possibility: "More of what matters.",
    benefits: [["First to know.", "Hear about selected experiences as the programme takes shape."], ["Room to join.", "Access to member opportunities where an event makes them available."], ["Stay close.", "A continuing line to the Soul Good community and its updates."]],
    sensePlace: "A sense of place", warm: "The details that\nmake room feel warm.", membershipDetail: "A real detail from a Soul Good setup; membership details and benefits still follow the approved plan.",
    simpleChoice: "A simple choice, clearly explained.", planPending: "Plan price, billing period, renewal, cancellation and final benefits are shown before any payment. Values here are pending owner approval.", viewJoinFlow: "View joining flow",
    howJoin: "How joining works.", journey: [["Understand", "Review approved benefits and membership terms."], ["Choose & pay", "Send the form and complete secure payment."], ["Start belonging", "Benefits activate only when payment is verified."]],
    joinTitle: "Make it\nyours.", joinIntro: "Tell us how to reach you. Membership options and prices will be confirmed before payment opens.", beforeJoining: "Before joining", membershipCaution: "We will publish the confirmed plan, price and terms before taking payment.", pendingTitle: "We're getting\nthings ready.", pendingStatus: "Pending verification", pendingBody: "We are checking your membership request. Access begins only after payment and eligibility are confirmed.", activeTitle: "Welcome to\nSoul Good.", activeStatus: "You're in.", activeBody: "Your membership is active. Find the next gathering and make yourself at home.",
    spaceEyebrow: "04 / The Soul Good Space", spacePageTitle: "A setting\nfor your\nnext idea.", possibilities: "Make it your own.", spaceOptionNames: ["Workshops & classes", "Talks & gatherings", "Content sessions"],
    spaceOptionText: ["An inviting format for facilitated small groups.", "Conversations, presentations and shared experiences.", "A calm setting for small-scale creative work."],
    ask: "Details make\nthe day feel\neffortless.", askBody: "Request the layout, inclusions, any add-ons and a quote for your specific date and activity.", sendEnquiry: "Send an enquiry", process: "An enquiry, then a clear answer.", processSteps: [["Tell us your plan", "Describe your event, date, guests and layout needs."], ["Review a quote", "The team checks availability and confirms price and conditions."], ["Decide & book", "A contract and payment follow only after terms are accepted."]],
    inquiryTitle: "Tell us about\nyour gathering.", inquiryIntro: "Share your plans and we will come back with the next steps.", inquiryAside: "How it works", inquiryNote: "We will review your date, layout and guest count before confirming availability.",
    sentTitle: "Thanks for\nyour idea.", sentStatus: "Enquiry received", sentBody: "We have your enquiry and will be in touch with next steps. A booking is only confirmed after availability and terms are agreed.", notBooked: "Not booked yet",
    aboutTitle: "A little more\nroom for each other.", aboutIntro: "Rooted in connection, care and the belief that good things grow when women make room for one another.", conversation: "Conversation,\ncare and a place to begin.", people: "People are the point.", aboutBody: "Soul Good creates welcoming ways to learn, meet and make memories together.", manyWays: "Many ways to gather.", purpose: "Our purpose", approach: "How we gather", welcome: "Everyone is welcome to find their own way in.",
    contactTitle: "Let's begin a\nconversation.", contactIntro: "What can we help with? Choose a topic or tell us a little more.", contactRouteTitle: "What can we help with?", contactTopics: ["Events", "Membership", "The space", "Partnerships"], contactTopicDescriptions: ["Questions about a programme or registration.", "Benefits, status, billing or support.", "Availability, guest count, setup and a quote.", "Workshops, facilitators and collaborations."], tellMore: "Tell us a little more.", contactFormEyebrow: "02 / SEND A MESSAGE", contactInquiryType: "Inquiry type", contactChooseTopic: "Select a topic", contactMessageLabel: "Message", contactConsent: "I agree to the relevant terms and privacy notice.", contactSubmit: "Contact form coming soon", contactFormNote: "Please review your details before continuing. Fields needing attention will be marked in the form.", goodToKnow: "Good to know", contactGuideTitle: "Before you continue", contactSteps: [["Choose a topic", "Pick the option closest to your question."], ["We will reply", "We will use the contact details you provide."], ["A message is not a booking", "A message does not reserve an event place or venue." ]], contactAside: "For a quick question, write to hello@soulgoodwclub.org.",
    sentContactTitle: "Good to hear\nfrom you.", sentContactBody: "Your message is ready for the Soul Good team. We will follow up as soon as we can.", whatHappens: "What happens next",
    faqTitle: "A few things\nworth knowing.", faqGroups: ["Events", "Membership", "The space"], faqQuestions: [["When will event details be available?", "Event dates, hosts, ticket prices and availability will be published once each programme is confirmed."], ["Can I bring a friend?", "Each event will list its guest and registration arrangements."], ["How do I know my place is confirmed?", "A place is confirmed only after the required payment and confirmation message."], ["What does membership include?", "The final benefits and pricing will be published before membership opens."], ["Can I cancel membership?", "Please review the membership terms for the approved cancellation process."], ["Can I visit the space first?", "Send an enquiry and we can discuss a visit subject to availability."], ["How do I get a quote?", "Share your date, activity and guest count through the space enquiry form."]],
    legalTitle: "Privacy, with\nclarity.", legalIntro: "How we look after the information you choose to share.", legalGroups: [["Information", "We collect only the information needed to respond to your enquiry, manage a registration or provide an agreed service."], ["Why it is used", "Your information is used to communicate with you, coordinate an event or membership, and keep necessary business records."], ["Access & retention", "Access is limited to people who need the information. Records are kept only as long as needed for the stated purpose and legal obligations."], ["Consent", "You can ask us to update or remove information where applicable, and you can unsubscribe from optional updates at any time."]],
    membershipTermsTitle: "Membership,\nclearly defined.", termsIntro: "The final plan terms will be published before any membership payment is accepted.",
    refundTitle: "Before you\ncommit.", refundIntro: "A clear guide to refunds and changes.", refundGroups: [["Event tickets", "The event-specific refund and transfer terms will be shown before you pay. If an event is cancelled by Soul Good, attendees will be contacted about the available refund or transfer options."], ["Membership", "Membership refund eligibility, renewals and cancellation terms will be shown before a plan is offered for purchase."], ["Venue", "A venue booking is not confirmed until a written quote and booking terms are accepted. Deposits and cancellation terms will be stated in that agreement."], ["Exceptions", "For help with an existing payment or special circumstance, contact hello@soulgoodwclub.org with your receipt or booking reference."]],
    guidelinesTitle: "Good to know\nbefore you go.", guidelinesIntro: "A few thoughtful ways to help everyone feel welcome.", guidelineGroups: [["Arrival", "Please follow the arrival information shared with your event confirmation and contact us if you need help finding the space."], ["Time together", "Arrive on time where possible and let the host know if your plans change."], ["Accessibility", "If you have access needs, share them in advance so we can discuss what the venue can provide."], ["Changes", "If an event needs to change or be cancelled, registered guests will receive an update using the contact details they provided."]],
    formDisabled: "Online requests will open when the final details are approved.", joinNow: "Membership applications coming soon", eventOpen: "Registration details coming soon", pageNav: "Explore Soul Good",
  },
  "zh-hans": {
    nav: ["首页", "活动", "会员", "场地", "关于", "联系"],
    enquire: "咨询场地", signIn: "登录", language: "EN",
    footerLead: "相聚在一起，\n美好自然发生。",
    footerGroups: [
      { title: "探索", links: [["活动与工作坊", "/events"], ["会员", "/membership-pricing"], ["场地空间", "/the-space"], ["课程", "/courses"]] },
      { title: "认识我们", links: [["关于我们", "/about-us"], ["联系", "/contact"], ["常见问题", "/faq"]] },
      { title: "相关政策", links: [["隐私政策", "/privacy"], ["会员条款", "/membership-terms"], ["退款政策", "/refunds"], ["活动须知", "/event-guidelines"]] },
    ],
    note: "多伦多北约克 · 一个相聚、学习、自在做自己的地方。",
    homeEyebrow: "Soul Good · 快乐女性俱乐部", homeTitle: "多一点空间，\n自在归属。",
    homeIntro: "为女性、想法和美好相遇而设的聚集之地，让我们为彼此留出时间。", exploreEvents: "探索活动", homeSpace: "找到属于你的空间",
    threeWays: "三种相聚方式。", threeWaysIntro: "不同的邀请，同样的温暖。找到今天适合你的方式。", comeEvent: "参加一场活动", community: "加入我们的社群", makeSpace: "为你的想法留个空间",
    eventWay: "探索工作坊、聚会和共同体验。", communityWay: "让连接不只停留在一个下午。", spaceWay: "为课程、聚会或内容创作提供舒适空间。",
    storyEyebrow: "一个可以慢慢生长的想法", storyTitle: "带着真实的自己来。\n带着更多收获离开。", storyBody: "连接可以从一张共享的桌子、一段新的对话，或第一次尝试某件事的勇气开始。", ourStory: "我们的故事",
    whatOn: "近期活动", programmeTitle: "下一次相聚，\n从一份邀请开始。", programmeIntro: "在清晰的活动页面了解时间、地点、主持人和报名信息。", exploreProgramme: "查看活动安排", learning: "一起学习", connect: "留一点时间彼此连接",
    moments: "真实生活中的美好。", momentsIntro: "看看 Soul Good 社群和空间里的片刻，记录下你分享的照片。", album: "浏览相册", spaceTitle: "为你的下一个\n好想法找个空间。", spaceIntro: "从小型工作坊、创意活动到温馨对话，空间可以配合你的计划灵活安排。",
    newsletter: "把一点美好，\n送进你的收件箱。", newsletterBody: "不定期分享活动和社群消息，只在你愿意接收时发送。", email: "你的电子邮箱", subscribe: "订阅消息",
    eventsEyebrow: "02 / Soul Good", eventsTitle: "值得相聚的\n时光。", eventsIntro: "探索活动安排，找到让你心动的体验；详情确认后即可报名。", filters: ["全部体验", "工作坊", "社群活动", "免费体验"], featured: "精选 · 活动预览", featuredTitle: "一份新体验的\n邀请。", featuredBody: "活动名称、日期、主持人和票务信息将在方案确认后公布。", viewFormat: "查看活动形式", programme: "活动安排", programmeBody: "此处展示筛选与报名状态的设计示例，目前尚未确认活动日期或票价。", eventNames: ["工作坊体验", "社群聚会", "免费介绍活动"], eventNotes: ["日期、主持人与费用待确认", "完整邀请即将公布", "开放报名时另行通知"], recent: "最近的\n美好时刻。", recentBody: "用照片看看社群、场地和那些用心的小细节。", howAttend: "从感兴趣到参与。", steps: [["了解活动", "查看活动形式、主持人、日期和条款。"], ["报名", "填写表单；如需付费，再完成支付。"], ["确认", "报名完成后收到确认信息。"]], courses: "一起学习", coursesIntro: "现有课程仍在这里展示，详情和价格来自 Soul Good 现有课程目录。", viewCourses: "查看全部课程", viewCourse: "查看课程",
    detailTitle: "一场让彼此靠近的\n工作坊。", detailIntro: "一段温暖的相聚时光，在学习与交谈中给自己多一点空间。", expect: "你将体验什么", expectBody: "适合小组参与的温馨体验，让你有时间学习、连接，并带走一些实用收获。", begin: "一起开启新的相遇。", details: "活动重要信息", date: "日期", location: "地点", price: "活动费用", confirmPending: "待确认", registerInterest: "登记兴趣",
    regTitle: "为自己留个\n位置。", regIntro: "留下联系方式，下一场活动公布后我们会及时通知你。", yourNext: "接下来", formName: "姓名", formEmail: "电子邮箱", formPhone: "电话（选填）", formMessage: "还有什么想告诉我们？", bookingPending: "活动详情确认后开放报名。", sendInterest: "报名即将开放",
    paymentTitle: "再一步，\n就能加入。", paymentStatus: "付款处理中", paymentBody: "我们正在核实你的报名信息。付款确认后会通知你活动席位。", confirmedTitle: "期待与你\n相见。", confirmedStatus: "报名已确认", confirmedBody: "你的活动报名已确认，请保留此页面以查看活动信息。", unavailableTitle: "本场活动\n名额已满。", unavailableStatus: "报名已结束", unavailableBody: "这场活动已停止接受报名，欢迎探索 Soul Good 的其他体验。",
    membershipTitle: "一个可以\n常常回来的\n地方。", membershipIntro: "让你与 Soul Good 的连接，不止于一场活动。", exploreJoining: "了解如何加入", possibility: "更多值得珍惜的连接。", benefits: [["优先了解。", "在活动安排逐渐成形时，优先了解精选体验。"], ["拥有参与空间。", "活动开放会员名额时，可了解相关机会。"], ["保持连接。", "持续关注 Soul Good 社群与最新消息。"]], sensePlace: "感受空间", warm: "让空间温暖起来的\n用心细节。", membershipDetail: "来自 Soul Good 实际布置的细节；会员权益仍以最终确认方案为准。", simpleChoice: "选择简单，条款清晰。", planPending: "所有计划价格、缴费周期、续订、取消和最终权益都会在付款前说明。目前内容仍待确认。", viewJoinFlow: "查看加入流程", howJoin: "如何加入。", journey: [["了解", "查看已确认的权益和会员条款。"], ["选择并付款", "提交申请，再完成安全支付。"], ["开始归属", "付款核实后才会启用会员权益。"]],
    joinTitle: "让这里成为\n你的空间。", joinIntro: "告诉我们如何联系你。会员选项和价格确认后才会开放付款。", beforeJoining: "加入前请了解", membershipCaution: "计划、价格和条款确认并公布后，我们才会开放付款。", pendingTitle: "我们正在\n做好准备。", pendingStatus: "等待核实", pendingBody: "我们正在核实你的会员申请。付款及资格确认后，会员权益才会启用。", activeTitle: "欢迎来到\nSoul Good。", activeStatus: "会员已启用", activeBody: "你的会员资格已生效。看看近期活动，让这里成为自在的地方。",
    spaceEyebrow: "04 / Soul Good 场地", spacePageTitle: "为你的\n下一个想法\n找个空间。", possibilities: "按你的想法布置。", spaceOptionNames: ["工作坊与课程", "分享与聚会", "内容创作"], spaceOptionText: ["适合小组活动的温馨空间。", "适合对话、分享和共同体验。", "适合小规模创意工作的安静环境。"], ask: "用心安排，让\n当天轻松自在。", askBody: "咨询空间布置、包含项目、增值服务，以及适合你日期和活动的报价。", sendEnquiry: "提交咨询", process: "先沟通，再清晰安排。", processSteps: [["告诉我们计划", "说明活动日期、人数和空间需求。"], ["确认报价", "团队核对档期并确认价格与条件。"], ["决定并预订", "双方接受条款后再签约和付款。"]], inquiryTitle: "告诉我们你的\n聚会想法。", inquiryIntro: "分享你的计划，我们会联系你说明下一步。", inquiryAside: "流程说明", inquiryNote: "我们会先核对日期、布置与人数，再确认是否有档期。", sentTitle: "谢谢你的\n分享。", sentStatus: "已收到场地咨询", sentBody: "我们已收到你的咨询，会联系你说明后续。档期与条款确认后才算预订成功。", notBooked: "尚未预订",
    aboutTitle: "为彼此多留一点\n空间。", aboutIntro: "相信女性彼此留出空间，美好的连接就会慢慢生长。", conversation: "从对话、关怀和\n一个起点开始。", people: "人，始终是最重要的。", aboutBody: "Soul Good 以温暖的方式连接彼此，一起学习、相识并创造回忆。", manyWays: "相聚有很多种方式。", purpose: "我们的初衷", approach: "相聚的方式", welcome: "欢迎每个人找到适合自己的参与方式。",
    contactTitle: "让我们开始\n一段对话。", contactIntro: "有什么可以帮你？选择一个主题，或告诉我们更多。", contactRouteTitle: "你想咨询什么？", contactTopics: ["活动", "会员", "场地", "合作"], contactTopicDescriptions: ["咨询近期活动、报名和活动安排。", "了解会员权益、状态或相关支持。", "咨询档期、人数、布置和场地报价。", "交流工作坊、带领者和合作提案。"], tellMore: "多告诉我们一些。", contactFormEyebrow: "02 / 留下信息", contactInquiryType: "咨询主题", contactChooseTopic: "选择一个主题", contactMessageLabel: "留言内容", contactConsent: "我同意相关条款及隐私说明。", contactSubmit: "联系表单即将开放", contactFormNote: "提交前请检查信息。需要补充的项目会在表单中标明。", goodToKnow: "重要信息", contactGuideTitle: "提交前请了解", contactSteps: [["选择主题", "选择最贴近你问题的咨询主题。"], ["等待回复", "我们会通过你留下的联系方式回复。"], ["留言不等于预订", "提交留言不会保留活动名额或场地档期。"]], contactAside: "有简短问题？欢迎写信至 hello@soulgoodwclub.org。", sentContactTitle: "很高兴收到\n你的消息。", sentContactBody: "你的信息已准备好交给 Soul Good 团队，我们会尽快跟进。", whatHappens: "接下来会怎样",
    faqTitle: "一些值得提前\n了解的事。", faqGroups: ["活动", "会员", "场地"], faqQuestions: [["活动详情何时公布？", "每场活动的日期、主持人、票价和名额会在确认后公布。"], ["可以带朋友一起来吗？", "每场活动页面会说明来宾和报名安排。"], ["怎样才算确认报名？", "所需款项支付并收到确认信息后，席位才算确认。"], ["会员包含哪些权益？", "会员开放前会公布最终权益与价格。"], ["如何取消会员？", "请查看会员条款中最终确认的取消流程。"], ["可以先参观场地吗？", "欢迎提交咨询，我们会根据档期讨论参观安排。"], ["如何获取场地报价？", "请通过场地咨询表告诉我们日期、活动类型和人数。"]],
    legalTitle: "清晰说明\n隐私安排。", legalIntro: "我们如何照顾你选择与我们分享的信息。", legalGroups: [["收集的信息", "我们只收集回复咨询、处理报名或提供约定服务所需的信息。"], ["信息用途", "用于与你沟通、协调活动或会员服务，以及保存必要的业务记录。"], ["访问与保留", "仅向有工作需要的人员开放，并在达到目的或履行法律义务所需期限内保留。"], ["你的选择", "在适用范围内，你可以要求更正或删除信息，也可以随时取消订阅非必要消息。"]],
    membershipTermsTitle: "清晰说明\n会员条款。", termsIntro: "任何会员付款开放前，都会公布最终计划条款。", refundTitle: "付款之前，\n请先了解。", refundIntro: "关于退款与变更的清晰说明。", refundGroups: [["活动门票", "每场活动的退款与转让条款会在付款前显示。如果 Soul Good 取消活动，我们会联系参与者说明退款或改期安排。"], ["会员", "会员退款资格、续订和取消条款会在计划开放购买前公布。"], ["场地", "书面报价与预订条款被接受后才算确认预订，押金与取消条件会写在协议中。"], ["特殊情况", "如需协助处理付款或特殊情况，请将收据或预订编号发送至 hello@soulgoodwclub.org。"]], guidelinesTitle: "出发前，\n请了解这些。", guidelinesIntro: "一些简单的约定，让大家都能自在参与。", guidelineGroups: [["到达", "请按活动确认信息到达；如果找场地需要帮助，请提前联系我们。"], ["共同相处", "尽量准时到达；计划有变时请通知主持人。"], ["无障碍需求", "如有特殊需求，请提前告知，我们会讨论场地可以提供的协助。"], ["活动变更", "如需调整或取消活动，我们会通过报名时留下的联系方式联系已报名来宾。"]],
    formDisabled: "最终内容确认后，将开放线上提交。", joinNow: "会员申请即将开放", eventOpen: "报名详情即将公布", pageNav: "探索 Soul Good",
  },
} as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="editorial-eyebrow">{children}</p>;
}

function Title({ children, className = "" }: { children: string; className?: string }) {
  const parts = children.split("\n");
  return <h1 className={`editorial-title ${className}`}>{parts.map((part, i) => <span key={`${part}-${i}`}>{part.split(/(空间|时间|一点)/g).map((segment, j) => <span key={j} className={/^(空间|时间|一点)$/.test(segment) ? "editorial-no-break" : undefined}>{segment}</span>)}{i < parts.length - 1 && <br />}</span>)}</h1>;
}

function Action({ href, children, dark = true }: { href: string; children: ReactNode; dark?: boolean }) {
  return <Link className={`editorial-action ${dark ? "editorial-action-dark" : "editorial-action-light"}`} href={href}>{children}<span aria-hidden="true">↗</span></Link>;
}

function SectionIntro({ eyebrow, title, body, className = "" }: { eyebrow?: string; title: string; body?: string; className?: string }) {
  return <div className={`editorial-section-intro ${className}`}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2>{title}</h2>{body && <p>{body}</p>}</div>;
}

function Photo({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <figure className={`editorial-photo ${className}`}><Image src={src} alt={alt} width={900} height={760} sizes="(max-width: 768px) 100vw, 50vw" /><figcaption><span>{alt}</span><span>SOUL GOOD</span></figcaption></figure>;
}

function Rows({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className="editorial-rows">{rows.map((row, i) => <div className="editorial-row" key={row[0]}><span className="row-number">{String(i + 1).padStart(2, "0")}</span><h3>{row[0]}</h3><p>{row[1]}</p>{row[2] && <Link href={row[2]}>Explore <span aria-hidden="true">↗</span></Link>}</div>)}</div>;
}

function Steps({ rows }: { rows: readonly (readonly string[])[] }) {
  return <div className="editorial-steps">{rows.map((row, i) => <article key={row[0]}><span>{String(i + 1).padStart(2, "0")}</span><h3>{row[0]}</h3><p>{row[1]}</p></article>)}</div>;
}

function PreviewForm({ locale, title, actionLabel, previewHref, previewLabel }: { locale: Language; title?: string; actionLabel?: string; previewHref: string; previewLabel: string }) {
  const c = copy[locale];
  return <div className="editorial-form-wrap"><div className="editorial-form"><Eyebrow>{title ?? c.yourNext}</Eyebrow><div className="editorial-fields"><label>{c.formName}<input disabled placeholder={c.formName} /></label><label>{c.formEmail}<input disabled type="email" placeholder={c.formEmail} /></label><label>{c.formPhone}<input disabled placeholder={c.formPhone} /></label><label className="field-wide">{c.formMessage}<textarea disabled rows={3} placeholder={c.formMessage} /></label></div><p className="editorial-form-note">{c.formDisabled}</p><button className="editorial-action editorial-action-dark" disabled>{actionLabel ?? c.eventOpen}<span aria-hidden="true">↗</span></button><Link className="editorial-form-preview-link" href={previewHref}>{previewLabel} <span aria-hidden="true">↗</span></Link></div><aside className="editorial-aside"><Eyebrow>{title ?? c.beforeJoining}</Eyebrow><p>{title === c.inquiryAside ? c.inquiryNote : c.membershipCaution}</p></aside></div>;
}

function ContactMessageForm({ locale }: { locale: Language }) {
  const c = copy[locale];
  return <form className="editorial-form editorial-contact-form">
    <div className="editorial-fields">
      <label>{c.contactInquiryType}<select disabled defaultValue=""><option value="">{c.contactChooseTopic}</option>{c.contactTopics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      <label>{c.formName}<input disabled placeholder={c.formName} /></label>
      <label>{c.formEmail}<input disabled type="email" placeholder={c.formEmail} /></label>
      <label className="field-wide">{c.contactMessageLabel}<textarea disabled rows={4} placeholder={c.contactMessageLabel} /></label>
      <label className="editorial-contact-consent field-wide"><input disabled type="checkbox" /><span>{c.contactConsent}</span></label>
    </div>
    <p className="editorial-form-note">{c.contactFormNote}</p>
    <button className="editorial-action editorial-action-dark" disabled>{c.contactSubmit}<span aria-hidden="true">↗</span></button>
    <Link className="editorial-form-preview-link" href="/contact/sent">{locale === "zh-hans" ? "预览提交成功页" : "Preview sent state"} <span aria-hidden="true">↗</span></Link>
  </form>;
}

function ContactGuide({ locale }: { locale: Language }) {
  const c = copy[locale];
  return <aside className="editorial-contact-guide">
    <Image src="/migrated/redesign/home-flower.jpg" alt={c.goodToKnow} width={800} height={500} />
    <div className="editorial-aside">
      <Eyebrow>{c.contactGuideTitle}</Eyebrow>
      <h3>{c.goodToKnow}</h3>
      <ol>{c.contactSteps.map((step, index) => <li key={step[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{step[0]}</strong><p>{step[1]}</p></div></li>)}</ol>
      <p className="editorial-contact-quick-note">{c.contactAside}</p>
    </div>
  </aside>;
}

function Hero({ eyebrow, title, intro, image, cta, href, tone = "paper", className = "" }: { eyebrow: string; title: string; intro: string; image: string; cta?: string; href?: string; tone?: "paper" | "lavender"; className?: string }) {
  return <section className={`editorial-hero tone-${tone} ${className}`}><div className="editorial-hero-inner"><div className="editorial-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><Title>{title}</Title><p>{intro}</p>{cta && href && <Action href={href}>{cta}</Action>}</div><Photo src={image} alt={eyebrow} className="hero-photo" /></div></section>;
}

function CourseCards({ courses, locale }: { courses: Course[]; locale: Language }) {
  const list = courses.map((course) => localizeCourse(course, locale as Locale)).filter((course) => course !== null);
  if (!list.length) return null;
  return <div className="editorial-course-grid">{list.map((course) => <Link className="editorial-course" href={`/courses/${encodeURIComponent(course.slug)}`} key={course.slug}><Image src={course.image} alt={course.title} width={600} height={420} /><div className="course-copy"><Eyebrow>{course.level}</Eyebrow><h3>{course.title}</h3><p>{course.description}</p><strong>{formatMoney(course.price, "CAD", locale as Locale)}</strong></div><span className="course-link">{copy[locale].viewCourse} ↗</span></Link>)}</div>;
}

export function HomeRedesign({ locale, courses }: { locale: Language; courses: Course[] }) {
  const c = copy[locale];
  return <main className="editorial-main">
    <Hero eyebrow={c.homeEyebrow} title={c.homeTitle} intro={c.homeIntro} image="/migrated/redesign/home-vase.jpg" cta={c.exploreEvents} href="/events" />
    <section className="editorial-content"><SectionIntro eyebrow="01 / A PLACE FOR YOU" title={c.threeWays} body={c.threeWaysIntro} /><Rows rows={[[c.comeEvent,c.eventWay,"/events"],[c.community,c.communityWay,"/membership-pricing"],[c.makeSpace,c.spaceWay,"/the-space"]]} /></section>
    <section className="editorial-split tone-lavender"><Photo src="/migrated/redesign/craft-table.jpg" alt={c.storyEyebrow} /><div><Eyebrow>{c.storyEyebrow}</Eyebrow><h2>{c.storyTitle.split("\n").map((line,i)=><span key={i}>{i>0&&<br/>}{line}</span>)}</h2><p>{c.storyBody}</p><Action href="/about-us" dark={false}>{c.ourStory}</Action></div></section>
    <section className="editorial-content"><SectionIntro eyebrow="02 / WHAT'S ON" title={c.whatOn} body={c.programmeIntro}/><div className="editorial-feature"><div><Eyebrow>PROGRAMME PREVIEW · DETAILS TO BE CONFIRMED</Eyebrow><h3>{c.programmeTitle}</h3><p>{c.programmeIntro}</p><Action href="/events" dark={false}>{c.exploreProgramme}</Action></div><Photo src="/migrated/redesign/home-flower.jpg" alt={c.whatOn}/></div><Rows rows={[[c.learning,c.eventNotes[0],"/events"],[c.connect,c.eventNotes[1],"/events"]]}/></section>
    <section className="editorial-gallery tone-stone"><SectionIntro eyebrow="03 / RECENT MOMENTS" title={c.moments} body={c.momentsIntro}/><div className="home-gallery"><Photo src="/migrated/redesign/community.jpg" alt={c.community}/><Photo src="/migrated/redesign/venue-room.jpg" alt={c.spaceTitle}/><Photo src="/migrated/redesign/venue-decor.jpg" alt={c.moments}/></div><Action href="/events" dark={false}>{c.album}</Action></section>
    <section className="editorial-split tone-sand"><Photo src="/migrated/redesign/venue-main.jpg" alt={c.spaceTitle}/><div><Eyebrow>04 / THE SPACE · NORTH YORK</Eyebrow><h2>{c.spaceTitle.split("\n").map((line,i)=><span key={i}>{i>0&&<br/>}{line}</span>)}</h2><p>{c.spaceIntro}</p><Action href="/the-space">{c.enquire}</Action></div></section>
    <Newsletter locale={locale}/>
  </main>;
}

function Newsletter({ locale }: { locale: Language }) {
  const c = copy[locale];
  return <section className="editorial-newsletter"><div><Eyebrow>KEEP IN TOUCH</Eyebrow><h2>{c.newsletter.split("\n").map((line,i)=><span key={i}>{i>0&&<br/>}{line}</span>)}</h2></div><form><p>{c.newsletterBody}</p><label className="sr-only" htmlFor="newsletter-email">{c.email}</label><input id="newsletter-email" type="email" placeholder={c.email} disabled/><button disabled>{c.subscribe} ↗</button></form></section>;
}

export function EditorialPage({ page, locale, courses = [], slug }: { page: PageKey; locale: Language; courses?: Course[]; slug?: string }) {
  const c = copy[locale];
  const eventRows = c.eventNames.map((name,i)=>[name,c.eventNotes[i],`/events/${slug || "workshop-experience"}`] as const);
  const titleFor = (title: string, intro: string, eyebrow: string, image = "/migrated/redesign/gathering.jpg", tone: "paper"|"lavender" = "paper", className = "") => <Hero eyebrow={eyebrow} title={title} intro={intro} image={image} tone={tone} className={className}/>;
  if (page === "events") return <main className="editorial-main"><header className="editorial-events-hero"><Eyebrow>{c.eventsEyebrow}</Eyebrow><div><Title>{c.eventsTitle}</Title><p>{c.eventsIntro}</p></div></header><section className="editorial-content editorial-events-content"><div className="editorial-events-featured"><nav className="editorial-filter-row" aria-label={locale === "zh-hans" ? "活动类别" : "Event categories"}>{c.filters.map((f,i)=><a className={i===0?"active":""} href="#programme" key={f}>{f}</a>)}</nav><div className="editorial-feature"><div><Eyebrow>{c.featured}</Eyebrow><h2>{c.featuredTitle}</h2><p>{c.featuredBody}</p><Action href="/events/workshop-experience">{c.viewFormat}</Action></div><Photo src="/migrated/redesign/gathering.jpg" alt={c.featured}/></div></div><div id="programme"><SectionIntro eyebrow="01 / DISCOVER" title={c.programme} body={c.programmeBody}/><Rows rows={eventRows}/></div></section><section className="editorial-gallery tone-stone"><SectionIntro eyebrow="02 / THE ALBUM" title={c.recent} body={c.recentBody}/><div className="home-gallery"><Photo src="/migrated/redesign/community.jpg" alt={c.community}/><Photo src="/migrated/redesign/venue-room.jpg" alt={c.spaceTitle}/><Photo src="/migrated/redesign/venue-decor.jpg" alt={c.moments}/></div><p className="editorial-album-note">{locale === "zh-hans" ? "网站中的箭头可翻看照片；选择照片可查看大图与说明。" : "Use the arrows to browse the photographs. Select a photo to view it with its caption."}</p></section><section className="editorial-content"><SectionIntro eyebrow="03 / HOW IT WORKS" title={c.howAttend}/><Steps rows={c.steps}/></section><section className="editorial-content tone-lavender"><SectionIntro title={c.courses} body={c.coursesIntro}/><CourseCards courses={courses} locale={locale}/><Action href="/courses" dark={false}>{c.viewCourses}</Action></section></main>;
  if (page === "event-detail") return <main className="editorial-main">{titleFor(c.detailTitle,c.detailIntro,"03 / EVENT · SOUL GOOD","/migrated/redesign/craft-table.jpg","lavender")}<section className="editorial-content"><SectionIntro eyebrow="01 / THE EXPERIENCE" title={c.expect} body={c.expectBody}/><div className="editorial-split editorial-split-inner"><Photo src="/migrated/redesign/gathering.jpg" alt={c.expect}/><div><Eyebrow>02 / WHAT TO EXPECT</Eyebrow><h2>{c.begin}</h2><p>{c.expectBody}</p></div></div><SectionIntro eyebrow="03 / DETAILS" title={c.details}/><Rows rows={[[c.date,c.confirmPending],[c.location,c.confirmPending],[c.price,c.confirmPending]]}/><p className="editorial-callout">{c.bookingPending}</p><Action href={`/events/${slug || "workshop-experience"}/register`}>{c.registerInterest}</Action><Link className="editorial-form-preview-link" href="/events/unavailable">{locale === "zh-hans" ? "预览名额已满页面 ↗" : "Preview unavailable state ↗"}</Link></section></main>;
  if (page === "event-register") return <main className="editorial-main">{titleFor(c.regTitle,c.regIntro,"04 / EVENT REGISTRATION","/migrated/redesign/craft-table.jpg","lavender")}<section className="editorial-content"><PreviewForm locale={locale} actionLabel={c.sendInterest} previewHref="/events/payment-pending" previewLabel={locale === "zh-hans" ? "预览付款状态" : "Preview payment step"}/></section></main>;
  if (page === "event-payment" || page === "membership-pending") return <StatusPage locale={locale} title={page === "event-payment"?c.paymentTitle:c.pendingTitle} status={page === "event-payment"?c.paymentStatus:c.pendingStatus} body={page === "event-payment"?c.paymentBody:c.pendingBody} image="/migrated/redesign/home-vase.jpg"/>
  if (page === "event-confirmed") return <StatusPage locale={locale} title={c.confirmedTitle} status={c.confirmedStatus} body={c.confirmedBody} image="/migrated/redesign/community.jpg"/>
  if (page === "event-unavailable") return <StatusPage locale={locale} title={c.unavailableTitle} status={c.unavailableStatus} body={c.unavailableBody} image="/migrated/redesign/gathering.jpg"/>
  if (page === "membership") return <main className="editorial-main">{titleFor(c.membershipTitle,c.membershipIntro,"07 / MEMBERSHIP · SOUL GOOD","/migrated/redesign/home-flower.jpg","lavender","editorial-membership-hero")}<section className="editorial-content"><SectionIntro eyebrow="01 / THE POSSIBILITY" title={c.possibility} body={c.planPending}/><Steps rows={c.benefits}/><div className="editorial-split editorial-split-inner"><div><Eyebrow>{c.sensePlace}</Eyebrow><h2>{c.warm}</h2><p>{c.membershipDetail}</p><Action href="/about-us" dark={false}>{c.ourStory}</Action></div><Photo src="/migrated/redesign/venue-decor.jpg" alt={c.sensePlace}/></div><div className="editorial-banner"><div><Eyebrow>02 / THE MEMBERSHIP</Eyebrow><h2>{c.simpleChoice}</h2><p>{c.planPending}</p></div><Action href="/membership/join">{c.viewJoinFlow}</Action></div><SectionIntro eyebrow="03 / THE JOURNEY" title={c.howJoin}/><Steps rows={c.journey}/></section></main>;
  if (page === "membership-join") return <main className="editorial-main">{titleFor(c.joinTitle,c.joinIntro,"08 / MEMBERSHIP APPLICATION","/migrated/redesign/home-flower.jpg","lavender")}<section className="editorial-content"><PreviewForm locale={locale} title={c.beforeJoining} previewHref="/membership/pending" previewLabel={locale === "zh-hans" ? "预览审核状态" : "Preview pending state"}/></section></main>;
  if (page === "membership-active") return <StatusPage locale={locale} title={c.activeTitle} status={c.activeStatus} body={c.activeBody} image="/migrated/redesign/home-vase.jpg"/>
  if (page === "space") return <main className="editorial-main">{titleFor(c.spacePageTitle,c.spaceIntro,c.spaceEyebrow,"/migrated/redesign/venue-main.jpg","paper","editorial-venue-hero")}<section className="editorial-content"><SectionIntro eyebrow="01 / THE POSSIBILITIES" title={c.possibilities} body={locale === "zh-hans" ? "空间可按不同活动形式灵活布置；最终安排取决于活动、人数与可用日期。" : "Use the space for an intimate format; the final setup depends on the event, guest count and availability."}/><Rows rows={c.spaceOptionNames.map((name,i)=>[name,c.spaceOptionText[i]])}/></section><section className="editorial-split tone-stone"><Photo src="/migrated/redesign/venue-room.jpg" alt={c.spaceTitle}/><div><Eyebrow>02 / WHAT TO ASK</Eyebrow><h2>{c.ask}</h2><p>{c.askBody}</p><Action href="/the-space/inquiry" dark={false}>{c.sendEnquiry}</Action></div></section><section className="editorial-content editorial-venue-inspiration"><SectionIntro eyebrow="03 / STYLING IDEAS" title={locale === "zh-hans" ? "让空间自由生长。" : "Room for imagination."} body={locale === "zh-hans" ? "季节与庆祝主题的布置灵感。图片为概念展示，实际场地布置需另行确认。" : "Seasonal and celebration visuals show possible moods. These are conceptual images, not photographs of past events or confirmed venue setups."}/><div className="editorial-venue-gallery"><Photo src="/migrated/redesign/venue-decor.jpg" alt={locale === "zh-hans" ? "餐桌布置灵感" : "Autumn table"}/><Photo src="/migrated/redesign/venue-room.jpg" alt={locale === "zh-hans" ? "安静的空间布置" : "Quiet setting"}/><Photo src="/migrated/redesign/gathering.jpg" alt={locale === "zh-hans" ? "庆祝活动布置" : "Celebration"}/></div><p className="editorial-venue-note">{locale === "zh-hans" ? "布置灵感展示 / 家具、装饰与配置需另行确认。" : "STYLING INSPIRATION ONLY / FURNITURE, DÉCOR AND CONFIGURATIONS REQUIRE SEPARATE CONFIRMATION."}</p><SectionIntro eyebrow="04 / THE PROCESS" title={c.process}/><Steps rows={c.processSteps}/><Action href="/the-space/inquiry">{c.enquire}</Action></section></main>;
  if (page === "space-inquiry") return <main className="editorial-main">{titleFor(c.inquiryTitle,c.inquiryIntro,"11 / SPACE INQUIRY","/migrated/redesign/venue-main.jpg","lavender")}<section className="editorial-content"><PreviewForm locale={locale} title={c.inquiryAside} actionLabel={c.sendEnquiry} previewHref="/the-space/sent" previewLabel={locale === "zh-hans" ? "预览提交成功页" : "Preview sent state"}/></section></main>;
  if (page === "space-sent") return <StatusPage locale={locale} title={c.sentTitle} status={c.notBooked} body={c.sentBody} image="/migrated/redesign/venue-room.jpg"/>
  if (page === "about") return <main className="editorial-main"><section className="editorial-about-hero"><div className="editorial-about-hero-inner"><Eyebrow>13 / ABOUT SOUL GOOD</Eyebrow><div><Title>{c.aboutTitle}</Title><p>{c.aboutIntro}</p></div><Photo src="/migrated/redesign/home-vase.jpg" alt={c.aboutTitle} className="hero-photo"/></div></section><section className="editorial-content editorial-about-purpose"><SectionIntro eyebrow="01 / OUR PURPOSE" title={c.purpose} body={c.aboutBody}/><div className="editorial-about-split"><div><h2>{locale === "zh-hans" ? "在好奇中学习，也在相遇中找到归属。" : "A place to be curious, learn something and feel part of it."}</h2><p>{locale === "zh-hans" ? "我们相信，真实的交流和一个舒适的空间，能让美好自然发生。" : "We picture a community made of real conversations and a space that helps them happen."}</p><Action href="/events" dark={false}>{c.exploreProgramme}</Action></div><Photo src="/migrated/redesign/craft-table.jpg" alt={c.conversation}/></div></section><section className="editorial-about-quote"><h2>{locale === "zh-hans" ? "人，是相聚的意义。\n空间，让我们彼此靠近。" : "People are the point.\nThe space helps us meet."}</h2><Eyebrow>SOUL GOOD / COMMUNITY PRINCIPLE</Eyebrow></section><section className="editorial-split tone-stone editorial-about-people"><Photo src="/migrated/redesign/community.jpg" alt={c.community}/><div><Eyebrow>THE PEOPLE / A REAL MOMENT</Eyebrow><h2>{locale === "zh-hans" ? "在一起，空间也变得不同。" : "The space feels different together."}</h2><p>{locale === "zh-hans" ? "一张来自 Soul Good 社群的真实合影，为安静的空间故事添上人的温度。" : "A photograph from the Soul Good community. It gives a human counterpoint to the quieter editorial imagery across the site."}</p><Action href="/events" dark={false}>{c.album}</Action></div></section><section className="editorial-content"><SectionIntro eyebrow="02 / OUR WORLD" title={c.manyWays} className="editorial-about-world-heading"/><Rows rows={[[c.comeEvent,c.eventWay,"/events"],[c.community,c.communityWay,"/membership-pricing"],[c.makeSpace,c.spaceWay,"/the-space"]]}/></section></main>;
  if (page === "contact") return <main className="editorial-main">
    {titleFor(c.contactTitle,c.contactIntro,"14 / CONTACT","/migrated/redesign/home-vase.jpg")}
    <section className="editorial-content editorial-contact-content">
      <section className="editorial-contact-topics">
        <div className="editorial-contact-section-heading"><Eyebrow>{locale === "zh-hans" ? "01 / 找到咨询方向" : "01 / FIND YOUR ROUTE"}</Eyebrow><h2>{c.contactRouteTitle}</h2></div>
        <div className="editorial-contact-topic-list">{c.contactTopics.map((topic,i)=><Link href="#contact-message" key={topic}><span>{String(i+1).padStart(2,"0")}</span><strong>{topic}</strong><p>{c.contactTopicDescriptions[i]}</p><span aria-hidden="true">↗</span></Link>)}</div>
      </section>
      <section className="editorial-contact-message" id="contact-message">
        <div className="editorial-contact-message-main"><Eyebrow>{c.contactFormEyebrow}</Eyebrow><h2>{c.tellMore}</h2><ContactMessageForm locale={locale}/></div>
        <ContactGuide locale={locale}/>
      </section>
    </section>
  </main>;
  if (page === "contact-sent") return <StatusPage locale={locale} title={c.sentContactTitle} status={c.whatHappens} body={c.sentContactBody} image="/migrated/redesign/community.jpg"/>
  if (page === "faq") return <FaqPage locale={locale} title={c.faqTitle} intro={locale === "zh-hans" ? "关于活动安排、会员和场地的清晰答复。" : "Clear answers about the programme, membership and the space."} groups={c.faqQuestions}/>
  if (page === "privacy") return <LegalPage locale={locale} title={c.legalTitle} intro={c.legalIntro} groups={c.legalGroups}/>
  if (page === "membership-terms") return <LegalPage locale={locale} title={c.membershipTermsTitle} intro={c.termsIntro} groups={[["The plan",c.planPending],["Benefits",c.membershipDetail],["Activation",c.journey[2][1]],["Renewal & exit",c.refundGroups[1][1]]]}/>
  if (page === "refunds") return <LegalPage locale={locale} title={c.refundTitle} intro={c.refundIntro} groups={c.refundGroups}/>
  if (page === "event-guidelines") return <LegalPage locale={locale} title={c.guidelinesTitle} intro={c.guidelinesIntro} groups={c.guidelineGroups}/>
  return <main className="editorial-main"><section className="editorial-content"><SectionIntro title={c.pageNav}/><Action href="/events">{c.exploreEvents}</Action><CourseCards courses={courses} locale={locale}/></section></main>;
}

function StatusPage({ locale, title, status, body, image }: { locale: Language; title: string; status: string; body: string; image: string }) {
  const isMembership = title === copy[locale].pendingTitle || title === copy[locale].activeTitle;
  const isSpace = image.includes("venue");
  const isContact = title === copy[locale].sentContactTitle;
  const primaryHref = isMembership ? "/membership-pricing" : isSpace ? "/the-space" : isContact ? "/contact" : "/events";
  const primaryLabel = isMembership ? (locale === "zh-hans" ? "了解会员" : "Explore membership") : isSpace ? (locale === "zh-hans" ? "返回场地页面" : "Back to the space") : isContact ? (locale === "zh-hans" ? "返回联系页面" : "Back to contact") : copy[locale].exploreEvents;
  const breadcrumb = isMembership ? "MEMBERSHIP" : isSpace ? "THE SPACE" : isContact ? "CONTACT" : "EVENTS";
  const path = title === copy[locale].paymentTitle ? ["Registration received", "Payment pending", "Confirmation"] : title === copy[locale].confirmedTitle ? ["Registration received", "Payment complete", "Confirmed"] : title === copy[locale].activeTitle ? ["Application received", "Verified", "Active"] : [status, "Review", "Next steps"];
  return <main className="editorial-main editorial-status-page"><div className="editorial-status-breadcrumb"><Link href={primaryHref}>{breadcrumb}</Link><span>/</span><span>{status}</span></div><section className="editorial-status"><div className="editorial-status-copy"><Eyebrow>{status}</Eyebrow><Title>{title}</Title><p>{body}</p><div className="editorial-status-progress" aria-label={status}>{path.map((step, index)=><span className={(title === copy[locale].confirmedTitle || title === copy[locale].activeTitle || index < 2) ? "is-complete" : ""} key={step}/>)}</div><Action href={primaryHref}>{primaryLabel}</Action>{title === copy[locale].paymentTitle && <Link className="editorial-status-secondary" href="/events/confirmed">{locale === "zh-hans" ? "预览报名确认页 ↗" : "Preview confirmation ↗"}</Link>}{title === copy[locale].pendingTitle && <Link className="editorial-status-secondary" href="/membership/active">{locale === "zh-hans" ? "预览会员生效页 ↗" : "Preview active membership ↗"}</Link>}</div><aside className="editorial-status-card"><Eyebrow>{locale === "zh-hans" ? "你的进度" : "YOUR PATH / 2 OF 3"}</Eyebrow><h2>{status}.</h2><dl><div><dt>{locale === "zh-hans" ? "项目" : isMembership ? "MEMBERSHIP" : isSpace ? "VENUE" : isContact ? "MESSAGE" : "EVENT"}</dt><dd>{locale === "zh-hans" ? (isMembership ? "会员申请" : isSpace ? "场地咨询" : isContact ? "联系信息" : "所选活动") : isMembership ? "Membership application" : isSpace ? "Venue enquiry" : isContact ? "Contact message" : "Selected event"}</dd></div><div><dt>{locale === "zh-hans" ? "状态" : "STATUS"}</dt><dd>{status}</dd></div></dl><p>{isSpace ? copy[locale].notBooked : locale === "zh-hans" ? "状态更新后，我们会通过你提供的联系方式通知你。" : "We will send an update using the contact details provided."}</p></aside></section></main>;
}

function LegalPage({ locale, title, intro, groups }: { locale: Language; title: string; intro: string; groups: readonly (readonly string[])[] }) {
  return <main className="editorial-main editorial-legal-page"><header className="editorial-legal-hero"><Eyebrow>SOUL GOOD · {copy[locale].pageNav}</Eyebrow><Title>{title}</Title><p>{intro}</p></header><div className="editorial-legal-layout"><nav className="editorial-legal-index" aria-label={locale === "zh-hans" ? "页面索引" : "Page index"}><Eyebrow>{locale === "zh-hans" ? "本页索引" : "ON THIS PAGE"}</Eyebrow>{groups.map((group,i)=><a href={`#legal-section-${i+1}`} key={group[0]}><span>{String(i+1).padStart(2,"0")}</span>{group[0]}</a>)}</nav><section className="editorial-legal-content">{groups.map((group,i)=><article id={`legal-section-${i+1}`} className="editorial-legal-row" key={group[0]}><span>{String(i+1).padStart(2,"0")}</span><h2>{group[0]}</h2><p>{group[1]}</p></article>)}</section></div></main>;
}

function FaqPage({ locale, title, intro, groups }: { locale: Language; title: string; intro: string; groups: readonly (readonly string[])[] }) {
  const sections = [
    { title: locale === "zh-hans" ? "活动" : "Events", items: groups.slice(0,3) },
    { title: locale === "zh-hans" ? "会员" : "Membership", items: groups.slice(3,5) },
    { title: locale === "zh-hans" ? "场地" : "The space", items: groups.slice(5,7) },
  ];
  return <main className="editorial-main editorial-legal-page editorial-faq-page"><header className="editorial-faq-hero"><Eyebrow>16 / SOUL GOOD</Eyebrow><div><Title>{title}</Title><p>{intro}</p></div></header><div className="editorial-legal-layout editorial-faq-layout"><nav className="editorial-legal-index" aria-label={locale === "zh-hans" ? "页面索引" : "In this section"}><Eyebrow>{locale === "zh-hans" ? "本页索引" : "IN THIS SECTION"}</Eyebrow>{sections.map((section,i)=><a href={`#faq-section-${i+1}`} key={section.title}>{section.title.toUpperCase()}</a>)}<Action href="/contact" dark={false}>{locale === "zh-hans" ? "咨询问题" : "Ask a question"}</Action></nav><div className="editorial-faq-groups">{sections.map((section,i)=><section id={`faq-section-${i+1}`} className="editorial-faq-group" key={section.title}><h2>{section.title}</h2>{section.items.map(row=><article className="editorial-faq-row" key={row[0]}><h3>{row[0]}</h3><p>{row[1]}</p></article>)}</section>)}</div></div></main>;
}

export function getRedesignPage(path: string[]): { page: PageKey; slug?: string } | null {
  const key = path.join("/");
  const exact: Record<string, PageKey> = {
    events: "events", "events/payment-pending": "event-payment", "events/confirmed": "event-confirmed", "events/unavailable": "event-unavailable",
    "membership/join": "membership-join", "membership/pending": "membership-pending", "membership/active": "membership-active",
    "the-space": "space", "the-space/inquiry": "space-inquiry", "the-space/sent": "space-sent", contact: "contact", "contact/sent": "contact-sent",
    faq: "faq", privacy: "privacy", "membership-terms": "membership-terms", refunds: "refunds", "event-guidelines": "event-guidelines",
  };
  if (exact[key]) return { page: exact[key] };
  if (path.length === 2 && path[0] === "events") return { page: "event-detail", slug: path[1] };
  if (path.length === 3 && path[0] === "events" && path[2] === "register") return { page: "event-register", slug: path[1] };
  return null;
}
