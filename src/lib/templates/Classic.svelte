<script lang="ts">
  import type { CVData } from '../types';
  export let cvData: CVData;

  const skills = cvData.skills.split(',').map(s => s.trim()).filter(s => s);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }
</script>

<div class="cv-template classic">
  <header class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.location || 'City, State'}</span>
      <span class="separator">|</span>
      <span>{cvData.phone || '+1 (555) 123-4567'}</span>
      <span class="separator">|</span>
      <span>{cvData.email || 'email@example.com'}</span>
    </div>
  </header>

  {#if cvData.summary}
    <section class="section summary">
      <p>{cvData.summary}</p>
    </section>
  {/if}

  <section class="section">
    <h2 class="section-title">Experience</h2>
    {#each cvData.experience as exp}
      <div class="entry">
        <div class="entry-header">
          <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
          <div class="company">{exp.company || 'Company Name'}</div>
          <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
        </div>
        <p class="description">{exp.description}</p>
      </div>
    {/each}
  </section>

  <section class="section">
    <h2 class="section-title">Education</h2>
    {#each cvData.education as edu}
      <div class="entry">
        <div class="entry-header">
          <h3 class="degree">{edu.degree || 'Degree'}</h3>
          <div class="institution">{edu.institution || 'Institution'}</div>
          <div class="date">{edu.year}</div>
        </div>
      </div>
    {/each}
  </section>

  <div class="two-col-section">
    {#if skills.length > 0}
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <p>{skills.join(', ')}</p>
      </section>
    {/if}

    {#if cvData.certificates.length > 0}
      <section class="section">
        <h2 class="section-title">Certifications</h2>
        {#each cvData.certificates as cert}
          <div class="cert-entry">{cert.name} ({cert.issuer}, {cert.year})</div>
        {/each}
      </section>
    {/if}
  </div>

  {#if cvData.projects.length > 0}
    <section class="section">
      <h2 class="section-title">Projects</h2>
      {#each cvData.projects as proj}
        <div class="entry">
          <div class="entry-header">
            <h3 class="project-name">{proj.name}</h3>
            {#if proj.url}
              <a href={proj.url} target="_blank" class="project-url">{proj.url}</a>
            {/if}
          </div>
          <p class="description">{proj.description}</p>
        </div>
      {/each}
    </section>
  {/if}
</div>

<style>
  .cv-template.classic {
    font-family: 'Times New Roman', Times, serif;
    background: #fff;
    padding: 2.5rem;
    font-size: 12pt;
    color: #000;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .name {
    font-size: 24pt;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    font-size: 11pt;
  }

  .contact-info .separator {
    margin: 0 1rem;
  }

  .summary {
    text-align: justify;
    margin-bottom: 1.5rem;
    border-top: 1px solid #000;
    border-bottom: 1px solid #000;
    padding: 0.75rem 0;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.75rem;
  }

  .entry {
    margin-bottom: 1rem;
  }

  .entry-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0 1rem;
    margin-bottom: 0.25rem;
  }

  .job-title, .degree, .project-name {
    font-weight: bold;
    font-size: 12pt;
  }

  .company, .institution {
    grid-column: 1;
    font-style: italic;
  }

  .date {
    grid-column: 2;
    grid-row: 1 / span 2;
    text-align: right;
  }

  .description {
    margin-top: 0.25rem;
    line-height: 1.4;
  }

  .two-col-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .cert-entry {
    margin-bottom: 0.25rem;
  }

  .project-url {
    color: #000;
    text-decoration: none;
    font-style: italic;
  }
</style>
