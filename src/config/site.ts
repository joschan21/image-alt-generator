import { NavItem } from '@/src/types/nav'

interface SiteConfig {
  name: string
  description: string
  mainNav: NavItem[]
  links: {
    youtube: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'ImageToAlt',
  description: 'Easily create alt-descriptions for your images.',
  mainNav: [
    {
      title: 'Home',
      href: '/',
    },
  ],
  links: {
    github: 'https://github.com/joschan21/image-alt-generator',
    youtube: 'https://www.youtube.com/@joshtriedcoding',
  },
}
