import type { Schema, Struct } from '@strapi/strapi';

export interface CardCardPrice extends Struct.ComponentSchema {
  collectionName: 'components_card_card_prices';
  info: {
    description: '';
    displayName: 'card Price';
    icon: 'crown';
  };
  attributes: {
    isHighlighted: Schema.Attribute.Boolean;
    maintenance: Schema.Attribute.String & Schema.Attribute.Required;
    performanceFees: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal & Schema.Attribute.Required;
    setupCost: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardCards extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    description: '';
    displayName: 'card';
    icon: 'apps';
  };
  attributes: {
    button: Schema.Attribute.Component<'cta.button', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    popup: Schema.Attribute.Component<'content.popup-content', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentPopupContent extends Struct.ComponentSchema {
  collectionName: 'components_content_popup_contents';
  info: {
    description: '';
    displayName: 'popup Content';
    icon: 'message';
  };
  attributes: {
    content: Schema.Attribute.Text;
  };
}

export interface CtaButton extends Struct.ComponentSchema {
  collectionName: 'components_cta_buttons';
  info: {
    description: '';
    displayName: 'button';
    icon: 'cursor';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CtaLink extends Struct.ComponentSchema {
  collectionName: 'components_cta_links';
  info: {
    description: '';
    displayName: 'link';
    icon: 'cursor';
  };
  attributes: {
    anchor: Schema.Attribute.Enumeration<
      [
        'sections.card-section',
        'sections.faq-section',
        'sections.founder-section',
        'sections.hero-section',
        'sections.price-comparator',
        'sections.statistics-section',
        'sections.steps-section',
      ]
    >;
    target: Schema.Attribute.Enumeration<['_self', '_blank']>;
    text: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['internal', 'external', 'anchor']>;
    url: Schema.Attribute.String;
  };
}

export interface CtaSocial extends Struct.ComponentSchema {
  collectionName: 'components_cta_socials';
  info: {
    description: '';
    displayName: 'Social';
    icon: 'discuss';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    social: Schema.Attribute.Enumeration<
      ['Facebook', 'Youtube', 'Linkedin', 'Telegram', 'Discord']
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FounderFounder extends Struct.ComponentSchema {
  collectionName: 'components_founder_founders';
  info: {
    description: '';
    displayName: 'Founder';
    icon: 'gate';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
    social: Schema.Attribute.Component<'cta.social', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
  };
}

export interface HeaderHeader extends Struct.ComponentSchema {
  collectionName: 'components_header_headers';
  info: {
    description: '';
    displayName: 'header';
    icon: 'filter';
  };
  attributes: {
    links: Schema.Attribute.Component<'cta.link', true>;
  };
}

export interface QuestionQuestions extends Struct.ComponentSchema {
  collectionName: 'components_question_questions';
  info: {
    description: '';
    displayName: 'question';
    icon: 'question';
  };
  attributes: {
    question: Schema.Attribute.String & Schema.Attribute.Required;
    reply: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsCardSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_sections';
  info: {
    description: '';
    displayName: 'Card Section';
    icon: 'apps';
  };
  attributes: {
    cards: Schema.Attribute.Component<'card.cards', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_sections';
  info: {
    description: '';
    displayName: 'FAQ Section';
    icon: 'question';
  };
  attributes: {
    questions: Schema.Attribute.Component<'question.questions', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFounderSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_founder_sections';
  info: {
    description: '';
    displayName: 'Founder Section';
    icon: 'gate';
  };
  attributes: {
    cards: Schema.Attribute.Component<'card.cards', false> &
      Schema.Attribute.Required;
    founders: Schema.Attribute.Component<'founder.founder', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_sections';
  info: {
    description: '';
    displayName: 'Hero Section';
    icon: 'expand';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    button: Schema.Attribute.Component<'cta.button', false>;
    popup: Schema.Attribute.Component<'content.popup-content', false>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPriceComparator extends Struct.ComponentSchema {
  collectionName: 'components_sections_price_comparators';
  info: {
    description: '';
    displayName: 'Price Comparator';
    icon: 'crown';
  };
  attributes: {
    priceCards: Schema.Attribute.Component<'card.card-price', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatisticsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_statistics_sections';
  info: {
    description: '';
    displayName: 'Statistics Section';
    icon: 'chartCircle';
  };
  attributes: {
    stats: Schema.Attribute.Component<'stat.stats', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 1;
        },
        number
      >;
  };
}

export interface SectionsStepsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_steps_sections';
  info: {
    description: '';
    displayName: 'Steps Section';
    icon: 'bulletList';
  };
  attributes: {
    steps: Schema.Attribute.Component<'step.steps', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
    icon: 'code';
  };
  attributes: {
    text: Schema.Attribute.RichText & Schema.Attribute.Required;
  };
}

export interface StatStats extends Struct.ComponentSchema {
  collectionName: 'components_stat_stats';
  info: {
    description: '';
    displayName: 'stat';
    icon: 'chartCircle';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    suffix: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'%'>;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface StepSteps extends Struct.ComponentSchema {
  collectionName: 'components_step_steps';
  info: {
    description: '';
    displayName: 'step';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'card.card-price': CardCardPrice;
      'card.cards': CardCards;
      'content.popup-content': ContentPopupContent;
      'cta.button': CtaButton;
      'cta.link': CtaLink;
      'cta.social': CtaSocial;
      'founder.founder': FounderFounder;
      'header.header': HeaderHeader;
      'question.questions': QuestionQuestions;
      'sections.card-section': SectionsCardSection;
      'sections.faq-section': SectionsFaqSection;
      'sections.founder-section': SectionsFounderSection;
      'sections.hero-section': SectionsHeroSection;
      'sections.price-comparator': SectionsPriceComparator;
      'sections.statistics-section': SectionsStatisticsSection;
      'sections.steps-section': SectionsStepsSection;
      'sections.text-section': SectionsTextSection;
      'stat.stats': StatStats;
      'step.steps': StepSteps;
    }
  }
}
