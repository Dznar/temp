<script lang="ts">
  import type { CVData } from '../types';
  export let cvData: CVData;

  const skills = cvData.skills.split(',').map(s => s.trim()).filter(s => s);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
</script>

<div class="cv-template minimal">
  <header class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.email || 'email@example.com'}</span>
      <span>{cvData.phone || '+1 (555) 123-4567'}</span>
      <span>{cvData.location || 'City, State'}</span>
    </div>
  </header>

  <div class="main-content">
    {#if cvData.summary}
      <section class="section">
        <p>{cvData.summary}</p>
      </section>
    {/if}

    <section class="section">
      <h2 class="section-title">Experience</h2>
      {#each cvData.experience as exp}
        {#if exp.jobTitle || exp.company}
          <div class="entry">
            <div class="entry-header">
              <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
              <span class="company">{exp.company || 'Company Name'}</span>
              <span class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
            </div>
            {#if exp.description}
              <p class="description">{exp.description}</p>
            {/if}
          </div>
        {/if}
      {/each}
    </section>

    <section class="section">
      <h2 class="section-title">Education</h2>
      {#each cvData.education as edu}
        {#if edu.degree || edu.institution}
          <div class="entry">
            <div class="entry-header">
              <h3 class="degree">{edu.degree || 'Degree'}</h3>
              <span class="institution">{edu.institution || 'Institution'}</span>
              <span class="date">{edu.year}</span>
            </div>
          </div>
        {/if}
      {/each}
    </section>

    {#if cvData.certificates.length > 0}
      <section class="section">
        <h2 class="section-title">Certificates</h2>
        {#each cvData.certificates as cert}
          <div class="entry">
            <div class="entry-header">
              <h3 class="cert-name">{cert.name}</h3>
              <span class="institution">{cert.issuer}</span>
              <span class="date">{cert.year}</span>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    {#if cvData.projects.length > 0}
      <section class="section">
        <h2 class="section-title">Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <div class="entry-header">
              <h3 class="project-name">{proj.name}</h3>
              {#if proj.url}
                <a href={proj.url} class="project-url" target="_blank">{proj.url}</a>
              {/if}
            </div>
            <p class="description">{proj.description}</p>
          </div>
        {/each}
      </section>
    {/if}

    {#if skills.length > 0}
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <p class="skills-list">{skills.join(', ')}</p>
      </section>
    {/if}
  </div>
</div>

<style>
  .cv-template.minimal {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    background: #fff;
    padding: 2.5rem;
    font-size: 10pt;
    line-height: 1.6;
    color: #444;
  }

  .header {
    margin-bottom: 2rem;
  }

  .name {
    font-size: 24pt;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    font-size: 9pt;
    color: #555;
  }

  .main-content {
    border-top: 1px solid #eee;
    padding-top: 1.5rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .section-title {
    font-size: 11pt;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #333;
    margin-bottom: 1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }

  .entry {
    margin-bottom: 1rem;
  }

  .entry-header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem 1rem;
    margin-bottom: 0.25rem;
  }

  .job-title, .degree, .cert-name, .project-name {
    font-size: 11pt;
    font-weight: 600;
  }

  .company, .institution {
    font-size: 10pt;
    color: #666;
  }

  .date {
    font-size: 9pt;
    color: #888;
    margin-left: auto;
    white-space: nowrap;
  }

  .description {
    font-size: 9.5pt;
    color: #555;
    padding-left: 1.5rem;
  }

  .project-url {
    font-size: 9pt;
    color: #007bff;
    text-decoration: none;
  }

  .project-url:hover {
    text-decoration: underline;
  }

  .skills-list {
    font-size: 10pt;
  }
</style>
