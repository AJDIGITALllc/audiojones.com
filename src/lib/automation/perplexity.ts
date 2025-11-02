/**
 * Perplexity API Integration for Audio Jones Blog Automation
 *
 * Implements automated research using Perplexity's web-connected AI models.
 * Researches topics across the 5 strategic pillars with Audio Jones context.
 *
 * @module lib/automation/perplexity
 */

export interface PerplexityRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user';
    content: string;
  }>;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  return_citations?: boolean;
  search_domain_filter?: string[];
  return_images?: boolean;
  return_related_questions?: boolean;
  search_recency_filter?: 'month' | 'week' | 'day' | 'hour';
  top_k?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
}

export interface PerplexityResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  citations?: string[];
  related_questions?: string[];
}

export interface ResearchContext {
  pillar: string;
  topic: string;
  persona: string;
  intent: string;
  currentDate: string;
  sourceUrls?: string[];
  frameworks?: string[];
}

export interface ResearchResult {
  topic: string;
  pillar: string;
  summary: string;
  keyPoints: string[];
  trends: string[];
  insights: string[];
  citations: string[];
  relatedQuestions: string[];
  frameworkApplication?: string;
  audienceInsights: string[];
  competitorMentions: string[];
  actionableAdvice: string[];
  quotableStats: string[];
  socialProof: string[];
  rawResponse: PerplexityResponse;
}

/**
 * Perplexity API Client
 *
 * Provides web-connected research capabilities using Perplexity's
 * llama-3.1-sonar-huge-128k-online model with citations and related questions.
 *
 * @class PerplexityClient
 */
class PerplexityClient {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY!;
    this.baseUrl = 'https://api.perplexity.ai';

    if (!this.apiKey) {
      throw new Error('PERPLEXITY_API_KEY environment variable is required');
    }
  }

  /**
   * Conduct comprehensive research on a topic
   *
   * Uses Perplexity's web-connected model to research a topic with:
   * - Real-time web access
   * - Citation tracking
   * - Related question suggestions
   * - Audio Jones context awareness
   *
   * @param context - Research context with pillar, topic, persona, intent
   * @returns Promise resolving to structured research results
   * @throws {Error} If PERPLEXITY_API_KEY is missing or API call fails
   *
   * @example
   * ```typescript
   * const research = await perplexityClient.research({
   *   pillar: 'ai',
   *   topic: 'AI marketing trends 2025',
   *   persona: 'entrepreneur',
   *   intent: 'educate',
   *   currentDate: '2025-01-20'
   * });
   *
   * console.log(research.summary);
   * console.log(research.keyPoints);
   * console.log(research.citations);
   * ```
   */
  async research(context: ResearchContext): Promise<ResearchResult> {
    const prompt = this.buildResearchPrompt(context);
    
    const request: PerplexityRequest = {
      model: 'llama-3.1-sonar-huge-128k-online', // Latest model with web access
      messages: [
        {
          role: 'system',
          content: this.getSystemPrompt(context.pillar)
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.2, // Lower temperature for factual research
      return_citations: true,
      return_related_questions: true,
      search_recency_filter: 'week', // Focus on recent developments
      top_k: 10
    };

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
      }

      const data: PerplexityResponse = await response.json();
      return this.parseResearchResponse(data, context);
    } catch (error) {
      console.error('Perplexity API research failed:', error);
      throw new Error(`Research failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private getSystemPrompt(pillar: string): string {
    const basePillarPrompts = {
      ai: `You are a research assistant specializing in AI for marketing and creators. Focus on practical AI applications, tools, and trends that impact marketing automation, content creation, and business growth. Prioritize actionable insights over theoretical concepts.`,
      
      marketing: `You are a research assistant specializing in AEO/SEO, marketing funnels, and automation. Focus on optimization strategies, conversion tactics, and systematic approaches to predictable growth. Emphasize data-driven methods and proven frameworks.`,
      
      'podcast-news': `You are a research assistant covering podcast industry, creator economy, and digital media trends. Focus on industry developments, creator tools, monetization strategies, and audience building tactics. Include specific examples and case studies.`,
      
      'tech-business-trends': `You are a research assistant analyzing technology and business trends. Focus on emerging technologies, business model innovations, market disruptions, and strategic implications for operators and entrepreneurs. Provide actionable business intelligence.`,
      
      'personal-brand': `You are a research assistant specializing in personal brand development and thought leadership. Focus on brand building strategies, content frameworks, audience development, and KOL positioning tactics. Emphasize authentic growth and strategic positioning.`
    };

    const basePrompt = basePillarPrompts[pillar as keyof typeof basePillarPrompts] || basePillarPrompts.ai;

    return `${basePrompt}

IMPORTANT CONTEXT:
- You're researching for Audio Jones / AJ DIGITAL LLC, a Miami-based AI branding and marketing agency
- Audio Jones specializes in predictable growth through automation and systematic frameworks
- The agency uses proprietary frameworks: EPM (Engagement Prediction Model), ASI (Audience Sentiment Intelligence), PR (Predictive Reach), AOF (Automation Optimization Framework)
- Target audience includes creators, entrepreneurs, SMBs, and agencies
- Maintain an operator's perspective - practical, results-focused, Miami-forward
- Avoid generic marketing language and buzzwords

RESEARCH REQUIREMENTS:
- Provide specific, actionable insights
- Include recent data and statistics when available
- Identify trending topics and emerging opportunities
- Note competitive landscape and market positioning
- Suggest framework applications where relevant
- Extract quotable statistics and social proof elements
- Focus on business impact and growth implications`;
  }

  private buildResearchPrompt(context: ResearchContext): string {
    const { pillar, topic, persona, intent, currentDate, sourceUrls, frameworks } = context;

    let prompt = `Research Topic: ${topic}
Target Pillar: ${pillar}
Target Persona: ${persona}
Content Intent: ${intent}
Research Date: ${currentDate}

Please conduct comprehensive research on this topic and provide:

1. EXECUTIVE SUMMARY (2-3 sentences)
   - Key market reality and business implications

2. KEY POINTS (5-7 bullet points)
   - Most important insights and findings
   - Include specific data points and statistics where available

3. TRENDING DEVELOPMENTS (3-5 points)
   - Recent news, updates, or changes in the space
   - Emerging opportunities or challenges

4. STRATEGIC INSIGHTS (3-5 points)
   - How this impacts the ${persona} audience
   - Business growth implications
   - Competitive advantages or risks

5. ACTIONABLE ADVICE (4-6 points)
   - Specific steps or recommendations
   - Framework applications (mention EPM, ASI, PR, or AOF if relevant)
   - Implementation guidance

6. QUOTABLE STATISTICS (3-5 data points)
   - Compelling numbers that support the narrative
   - Market size, growth rates, adoption metrics
   - Include source context

7. SOCIAL PROOF ELEMENTS (2-4 points)
   - Company case studies or success stories
   - Industry expert quotes or predictions
   - Market validation examples`;

    if (sourceUrls && sourceUrls.length > 0) {
      prompt += `\n\nPRIORITY SOURCES:\n${sourceUrls.map(url => `- ${url}`).join('\n')}`;
    }

    if (frameworks && frameworks.length > 0) {
      prompt += `\n\nFRAMEWORK APPLICATIONS:\nConsider how these Audio Jones frameworks might apply:\n${frameworks.map(f => `- ${f}`).join('\n')}`;
    }

    prompt += `\n\nDELIVERY FORMAT:
Structure your response as a comprehensive research brief that could be used to create authoritative content. Include citations for all claims and statistics. Focus on insights that would be valuable for Audio Jones' ${persona} clients seeking ${intent}-focused information about ${topic}.

Remember: Audio Jones clients expect operator-level insights, not surface-level marketing content. Dig deep into business implications and growth opportunities.`;

    return prompt;
  }

  private parseResearchResponse(response: PerplexityResponse, context: ResearchContext): ResearchResult {
    const content = response.choices[0]?.message?.content || '';
    
    // Parse structured response sections
    const sections = this.extractSections(content);
    
    return {
      topic: context.topic,
      pillar: context.pillar,
      summary: Array.isArray(sections.summary) ? sections.summary.join(' ') : (sections.summary || this.extractSummary(content)),
      keyPoints: Array.isArray(sections.keyPoints) ? sections.keyPoints : (sections.keyPoints ? [sections.keyPoints] : this.extractKeyPoints(content)),
      trends: Array.isArray(sections.trends) ? sections.trends : (sections.trends ? [sections.trends] : this.extractTrends(content)),
      insights: Array.isArray(sections.insights) ? sections.insights : (sections.insights ? [sections.insights] : this.extractInsights(content)),
      citations: response.citations || this.extractCitations(content),
      relatedQuestions: response.related_questions || [],
      frameworkApplication: Array.isArray(sections.frameworkApplication) ? sections.frameworkApplication.join(' ') : sections.frameworkApplication,
      audienceInsights: Array.isArray(sections.audienceInsights) ? sections.audienceInsights : (sections.audienceInsights ? [sections.audienceInsights] : []),
      competitorMentions: Array.isArray(sections.competitorMentions) ? sections.competitorMentions : (sections.competitorMentions ? [sections.competitorMentions] : []),
      actionableAdvice: Array.isArray(sections.actionableAdvice) ? sections.actionableAdvice : (sections.actionableAdvice ? [sections.actionableAdvice] : this.extractActionableAdvice(content)),
      quotableStats: Array.isArray(sections.quotableStats) ? sections.quotableStats : (sections.quotableStats ? [sections.quotableStats] : this.extractQuotableStats(content)),
      socialProof: Array.isArray(sections.socialProof) ? sections.socialProof : (sections.socialProof ? [sections.socialProof] : this.extractSocialProof(content)),
      rawResponse: response
    };
  }

  private extractSections(content: string): Record<string, string | string[]> {
    const sections: Record<string, string | string[]> = {};
    
    // Define section patterns
    const patterns = {
      summary: /(?:EXECUTIVE SUMMARY|Summary)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      keyPoints: /(?:KEY POINTS|Key Points)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      trends: /(?:TRENDING DEVELOPMENTS|Trends)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      insights: /(?:STRATEGIC INSIGHTS|Insights)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      actionableAdvice: /(?:ACTIONABLE ADVICE|Advice)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      quotableStats: /(?:QUOTABLE STATISTICS|Statistics)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i,
      socialProof: /(?:SOCIAL PROOF|Social Proof)[:\s]*([\s\S]*?)(?=\n\d+\.|$)/i
    };

    Object.entries(patterns).forEach(([key, pattern]) => {
      const match = content.match(pattern);
      if (match) {
        const extracted = match[1].trim();
        sections[key] = this.parseBulletPoints(extracted);
      }
    });

    return sections;
  }

  private parseBulletPoints(text: string): string[] {
    return text
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => line.replace(/^[-•*]\s*/, ''))
      .filter(line => line.length > 10); // Filter out very short lines
  }

  private extractSummary(content: string): string {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).join('. ').trim() + '.';
  }

  private extractKeyPoints(content: string): string[] {
    const bulletPattern = /^[-•*]\s*(.+)$/gm;
    const matches = [...content.matchAll(bulletPattern)];
    return matches.map(match => match[1].trim()).slice(0, 7);
  }

  private extractTrends(content: string): string[] {
    const trendKeywords = ['trending', 'emerging', 'growing', 'increasing', 'rising', 'new', 'latest'];
    const sentences = content.split(/[.!?]+/);
    return sentences
      .filter(sentence => trendKeywords.some(keyword => sentence.toLowerCase().includes(keyword)))
      .map(sentence => sentence.trim())
      .slice(0, 5);
  }

  private extractInsights(content: string): string[] {
    const insightKeywords = ['insight', 'opportunity', 'implication', 'impact', 'advantage', 'challenge'];
    const sentences = content.split(/[.!?]+/);
    return sentences
      .filter(sentence => insightKeywords.some(keyword => sentence.toLowerCase().includes(keyword)))
      .map(sentence => sentence.trim())
      .slice(0, 5);
  }

  private extractActionableAdvice(content: string): string[] {
    const actionKeywords = ['should', 'must', 'need to', 'recommend', 'suggest', 'implement', 'consider', 'focus on'];
    const sentences = content.split(/[.!?]+/);
    return sentences
      .filter(sentence => actionKeywords.some(keyword => sentence.toLowerCase().includes(keyword)))
      .map(sentence => sentence.trim())
      .slice(0, 6);
  }

  private extractQuotableStats(content: string): string[] {
    const statPattern = /\b\d+(?:\.\d+)?%|\$\d+(?:\.\d+)?[BMK]?|\d+(?:\.\d+)?\s*(?:million|billion|thousand)/gi;
    const matches = [...content.matchAll(statPattern)];
    const sentences = content.split(/[.!?]+/);
    
    return sentences
      .filter(sentence => statPattern.test(sentence))
      .map(sentence => sentence.trim())
      .slice(0, 5);
  }

  private extractSocialProof(content: string): string[] {
    const proofKeywords = ['company', 'startup', 'enterprise', 'study', 'research', 'survey', 'report'];
    const sentences = content.split(/[.!?]+/);
    return sentences
      .filter(sentence => proofKeywords.some(keyword => sentence.toLowerCase().includes(keyword)))
      .map(sentence => sentence.trim())
      .slice(0, 4);
  }

  private extractCitations(content: string): string[] {
    const urlPattern = /https?:\/\/[^\s)]+/gi;
    const matches = [...content.matchAll(urlPattern)];
    return [...new Set(matches.map(match => match[0]))]; // Remove duplicates
  }

  // Utility methods for batch research
  async batchResearch(contexts: ResearchContext[]): Promise<ResearchResult[]> {
    const results: ResearchResult[] = [];
    
    // Process in batches to respect rate limits
    const batchSize = 3;
    for (let i = 0; i < contexts.length; i += batchSize) {
      const batch = contexts.slice(i, i + batchSize);
      const batchPromises = batch.map(context => this.research(context));
      
      try {
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Add delay between batches to respect rate limits
        if (i + batchSize < contexts.length) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } catch (error) {
        console.error(`Batch research failed for batch starting at index ${i}:`, error);
        // Continue with next batch
      }
    }
    
    return results;
  }
}

export const perplexityClient = new PerplexityClient();

// Utility functions for creating research contexts
export function createResearchContext(
  pillar: string,
  topic: string,
  persona: string = 'entrepreneur',
  intent: string = 'educate'
): ResearchContext {
  return {
    pillar,
    topic,
    persona,
    intent,
    currentDate: new Date().toISOString().split('T')[0],
    frameworks: ['EPM', 'ASI', 'PR', 'AOF']
  };
}

export function createPillarResearchBatch(topics: string[]): ResearchContext[] {
  const pillars = ['ai', 'marketing', 'podcast-news', 'tech-business-trends', 'personal-brand'];
  const personas = ['creator', 'entrepreneur', 'smb', 'agency'];
  const intents = ['news', 'educate', 'authority', 'trend'];
  
  return topics.map((topic, index) => ({
    pillar: pillars[index % pillars.length],
    topic,
    persona: personas[index % personas.length],
    intent: intents[index % intents.length],
    currentDate: new Date().toISOString().split('T')[0],
    frameworks: ['EPM', 'ASI', 'PR', 'AOF']
  }));
}