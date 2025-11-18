// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Landing Page interface
export interface LandingPage extends CosmicObject {
  type: 'landing-pages';
  metadata: {
    page_title?: string;
    hero_headline?: string;
    hero_subheadline?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    hero_cta_text?: string;
    hero_cta_link?: string;
    features_title?: string;
    features_content?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    content_sections?: Array<{
      type: string;
      heading: string;
      subheading: string;
      button_text: string;
      button_link: string;
    }>;
    seo_title?: string;
    seo_description?: string;
  };
}

// Blog Post interface
export interface BlogPost extends CosmicObject {
  type: 'blog-posts';
  metadata: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    published_date?: string;
    reading_time?: string;
    tags?: string[];
    seo_title?: string;
    seo_description?: string;
  };
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    role?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}