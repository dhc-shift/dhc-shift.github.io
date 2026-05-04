import {
  getBooleanValue,
  getStringValue,
  readContentCollection,
  readContentFile,
} from "@/lib/content";

export interface SiteMetaContent {
  titleDefault: string;
  titleTemplate: string;
  description: string;
  metadataBase: string;
  openGraphSiteName: string;
  openGraphLocale: string;
  openGraphType: "website";
  htmlLang: string;
}

export interface LinkContent {
  href: string;
  label: string;
}

export interface NavigationContent {
  links: LinkContent[];
  ctaHref: string;
  ctaLabel: string;
  menuAriaLabel: string;
  logoAlt: string;
}

export interface FooterContent {
  brand: string;
  tagline: string;
  description: string;
  links: LinkContent[];
  githubUrl: string;
  githubAriaLabel: string;
  copyright: string;
}

export interface AnnouncementContent {
  enabled: boolean;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  closeLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  imageSrc: string;
  imageAlt: string;
}

export interface IconTextContent {
  icon: string;
  label: string;
  value: string;
}

export interface IconCardContent {
  icon: string;
  title: string;
  description: string;
}

export interface SectionContent {
  title: string;
  description: string;
}

export interface RoadmapStepContent {
  num: string;
  title: string;
  description: string;
}

export interface QuickLinkContent {
  icon: string;
  title: string;
  description: string;
  href: string;
  actionLabel: string;
}

export interface HomeContent {
  announcement: AnnouncementContent;
  hero: HeroContent;
  infoItems: IconTextContent[];
  activitiesSection: SectionContent;
  activityCards: IconCardContent[];
  roadmapSection: SectionContent;
  roadmapSteps: RoadmapStepContent[];
  quickLinksSection: SectionContent;
  quickLinks: QuickLinkContent[];
}

export interface AboutPageContent {
  metadataTitle: string;
  metadataDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    note: string;
  };
  missionsSection: SectionContent;
  missionCards: IconCardContent[];
  shiftSection: {
    title: string;
    letterHeader: string;
    wordHeader: string;
    descriptionHeader: string;
  };
  shiftLetters: {
    letter: string;
    word: string;
    description: string;
  }[];
  audienceSection: {
    title: string;
    ctaHref: string;
    ctaLabel: string;
  };
  audienceCards: {
    title: string;
    description: string;
  }[];
}

export interface ActivitiesPageContent {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  detailBackLabel: string;
  tagPrefix: string;
}

export interface JoinPageContent {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  qualificationsTitle: string;
  timelineTitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
  deadlineLabel: string;
  faqTitle: string;
  faqQuestionPrefix: string;
  qualifications: string[];
  timeline: {
    step: string;
    title: string;
    description: string;
    date: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export interface NewsletterPostContent {
  id: string;
  type: string;
  title: string;
  date: string;
  summary: string;
  link: string;
  pinned: boolean;
}

export interface NewsletterPageContent {
  metadataTitle: string;
  metadataDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  pinnedLabel: string;
  recentLabel: string;
  emptyTitle: string;
  posts: NewsletterPostContent[];
}

export function getSiteMetaContent(): SiteMetaContent {
  const { data } = readContentFile("site/meta.mdx");

  return {
    titleDefault: getStringValue(data, "titleDefault"),
    titleTemplate: getStringValue(data, "titleTemplate"),
    description: getStringValue(data, "description"),
    metadataBase: getStringValue(data, "metadataBase"),
    openGraphSiteName: getStringValue(data, "openGraphSiteName"),
    openGraphLocale: getStringValue(data, "openGraphLocale"),
    openGraphType: "website",
    htmlLang: getStringValue(data, "htmlLang", "ko"),
  };
}

export function getNavigationContent(): NavigationContent {
  const { data } = readContentFile("site/navigation.mdx");

  return {
    links: getLinks("site/nav-links"),
    ctaHref: getStringValue(data, "ctaHref"),
    ctaLabel: getStringValue(data, "ctaLabel"),
    menuAriaLabel: getStringValue(data, "menuAriaLabel"),
    logoAlt: getStringValue(data, "logoAlt"),
  };
}

export function getFooterContent(): FooterContent {
  const { data } = readContentFile("site/footer.mdx");

  return {
    brand: getStringValue(data, "brand"),
    tagline: getStringValue(data, "tagline"),
    description: getStringValue(data, "description"),
    links: getLinks("site/footer-links"),
    githubUrl: getStringValue(data, "githubUrl"),
    githubAriaLabel: getStringValue(data, "githubAriaLabel"),
    copyright: getStringValue(data, "copyright"),
  };
}

export function getHomeContent(): HomeContent {
  const announcement = readContentFile("home/announcement.mdx").data;
  const hero = readContentFile("home/hero.mdx").data;
  const activitiesSection = readContentFile("home/activities.mdx").data;
  const roadmapSection = readContentFile("home/roadmap.mdx").data;
  const quickLinksSection = readContentFile("home/quick-links.mdx").data;

  return {
    announcement: {
      enabled: getBooleanValue(announcement, "enabled", true),
      title: getStringValue(announcement, "title"),
      description: getStringValue(announcement, "description"),
      href: getStringValue(announcement, "href"),
      linkLabel: getStringValue(announcement, "linkLabel"),
      closeLabel: getStringValue(announcement, "closeLabel"),
    },
    hero: {
      eyebrow: getStringValue(hero, "eyebrow"),
      title: getStringValue(hero, "title"),
      description: getStringValue(hero, "description"),
      primaryHref: getStringValue(hero, "primaryHref"),
      primaryLabel: getStringValue(hero, "primaryLabel"),
      secondaryHref: getStringValue(hero, "secondaryHref"),
      secondaryLabel: getStringValue(hero, "secondaryLabel"),
      imageSrc: getStringValue(hero, "imageSrc"),
      imageAlt: getStringValue(hero, "imageAlt"),
    },
    infoItems: readContentCollection("home/info-items").map(({ data }) => ({
      icon: getStringValue(data, "icon"),
      label: getStringValue(data, "label"),
      value: getStringValue(data, "value"),
    })),
    activitiesSection: getSection(activitiesSection),
    activityCards: getIconCards("home/activity-cards"),
    roadmapSection: getSection(roadmapSection),
    roadmapSteps: readContentCollection("home/roadmap-steps").map(({ data }) => ({
      num: getStringValue(data, "num"),
      title: getStringValue(data, "title"),
      description: getStringValue(data, "description"),
    })),
    quickLinksSection: getSection(quickLinksSection),
    quickLinks: readContentCollection("home/quick-link-cards").map(({ data }) => ({
      icon: getStringValue(data, "icon"),
      title: getStringValue(data, "title"),
      description: getStringValue(data, "description"),
      href: getStringValue(data, "href"),
      actionLabel: getStringValue(data, "actionLabel"),
    })),
  };
}

export function getAboutPageContent(): AboutPageContent {
  const page = readContentFile("pages/about.mdx").data;
  const hero = readContentFile("about/hero.mdx").data;
  const missionsSection = readContentFile("about/missions.mdx").data;
  const shiftSection = readContentFile("about/shift-meaning.mdx").data;
  const audienceSection = readContentFile("about/who-fits.mdx").data;

  return {
    metadataTitle: getStringValue(page, "metadataTitle"),
    metadataDescription: getStringValue(page, "metadataDescription"),
    hero: {
      eyebrow: getStringValue(hero, "eyebrow"),
      title: getStringValue(hero, "title"),
      description: getStringValue(hero, "description"),
      note: getStringValue(hero, "note"),
    },
    missionsSection: getSection(missionsSection),
    missionCards: getIconCards("about/mission-cards"),
    shiftSection: {
      title: getStringValue(shiftSection, "title"),
      letterHeader: getStringValue(shiftSection, "letterHeader"),
      wordHeader: getStringValue(shiftSection, "wordHeader"),
      descriptionHeader: getStringValue(shiftSection, "descriptionHeader"),
    },
    shiftLetters: readContentCollection("about/shift-letters").map(({ data }) => ({
      letter: getStringValue(data, "letter"),
      word: getStringValue(data, "word"),
      description: getStringValue(data, "description"),
    })),
    audienceSection: {
      title: getStringValue(audienceSection, "title"),
      ctaHref: getStringValue(audienceSection, "ctaHref"),
      ctaLabel: getStringValue(audienceSection, "ctaLabel"),
    },
    audienceCards: readContentCollection("about/audience-cards").map(({ data }) => ({
      title: getStringValue(data, "title"),
      description: getStringValue(data, "description"),
    })),
  };
}

export function getActivitiesPageContent(): ActivitiesPageContent {
  const { data } = readContentFile("pages/activities.mdx");

  return {
    metadataTitle: getStringValue(data, "metadataTitle"),
    metadataDescription: getStringValue(data, "metadataDescription"),
    eyebrow: getStringValue(data, "eyebrow"),
    title: getStringValue(data, "title"),
    description: getStringValue(data, "description"),
    emptyTitle: getStringValue(data, "emptyTitle"),
    emptyDescription: getStringValue(data, "emptyDescription"),
    detailBackLabel: getStringValue(data, "detailBackLabel"),
    tagPrefix: getStringValue(data, "tagPrefix", "#"),
  };
}

export function getJoinPageContent(): JoinPageContent {
  const { data } = readContentFile("pages/join.mdx");

  return {
    metadataTitle: getStringValue(data, "metadataTitle"),
    metadataDescription: getStringValue(data, "metadataDescription"),
    eyebrow: getStringValue(data, "eyebrow"),
    title: getStringValue(data, "title"),
    description: getStringValue(data, "description"),
    qualificationsTitle: getStringValue(data, "qualificationsTitle"),
    timelineTitle: getStringValue(data, "timelineTitle"),
    ctaTitle: getStringValue(data, "ctaTitle"),
    ctaDescription: getStringValue(data, "ctaDescription"),
    ctaHref: getStringValue(data, "ctaHref"),
    ctaLabel: getStringValue(data, "ctaLabel"),
    deadlineLabel: getStringValue(data, "deadlineLabel"),
    faqTitle: getStringValue(data, "faqTitle"),
    faqQuestionPrefix: getStringValue(data, "faqQuestionPrefix"),
    qualifications: readContentCollection("join/qualifications").map(({ data }) =>
      getStringValue(data, "text")
    ),
    timeline: readContentCollection("join/timeline").map(({ data }) => ({
      step: getStringValue(data, "step"),
      title: getStringValue(data, "title"),
      description: getStringValue(data, "description"),
      date: getStringValue(data, "date"),
    })),
    faq: readContentCollection("join/faq").map(({ data }) => ({
      question: getStringValue(data, "question"),
      answer: getStringValue(data, "answer"),
    })),
  };
}

export function getNewsletterPageContent(): NewsletterPageContent {
  const { data } = readContentFile("pages/newsletter.mdx");

  return {
    metadataTitle: getStringValue(data, "metadataTitle"),
    metadataDescription: getStringValue(data, "metadataDescription"),
    eyebrow: getStringValue(data, "eyebrow"),
    title: getStringValue(data, "title"),
    description: getStringValue(data, "description"),
    pinnedLabel: getStringValue(data, "pinnedLabel"),
    recentLabel: getStringValue(data, "recentLabel"),
    emptyTitle: getStringValue(data, "emptyTitle"),
    posts: readContentCollection("newsletter/posts")
      .map(({ slug, data }) => ({
        id: getStringValue(data, "id", slug),
        type: getStringValue(data, "type") as NewsletterPostContent["type"],
        title: getStringValue(data, "title"),
        date: getStringValue(data, "date"),
        summary: getStringValue(data, "summary"),
        link: getStringValue(data, "link"),
        pinned: getBooleanValue(data, "pinned"),
      }))
      .sort((a, b) => (a.date > b.date ? -1 : 1)),
  };
}

function getLinks(relativeDir: string): LinkContent[] {
  return readContentCollection(relativeDir).map(({ data }) => ({
    href: getStringValue(data, "href"),
    label: getStringValue(data, "label"),
  }));
}

function getIconCards(relativeDir: string): IconCardContent[] {
  return readContentCollection(relativeDir).map(({ data }) => ({
    icon: getStringValue(data, "icon"),
    title: getStringValue(data, "title"),
    description: getStringValue(data, "description"),
  }));
}

function getSection(data: Record<string, unknown>): SectionContent {
  return {
    title: typeof data.title === "string" ? data.title : "",
    description: typeof data.description === "string" ? data.description : "",
  };
}
