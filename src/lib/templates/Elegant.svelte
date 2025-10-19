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

<div class="cv-template elegant">
  <header class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.email || 'email@example.com'}</span>
      <span class="separator">|</span>
      <span>{cvData.phone || '+1 (555) 123-4567'}</span>
      <span class="separator">|</span>
      <span>{cvData.location || 'City, State'}</span>
    </div>
  </header>

  <div class="main-content">
    {#if cvData.summary}
      <section class="section summary">
        <p>{cvData.summary}</p>
      </section>
    {/if}

    <section class="section">
      <h2 class="section-title">Work Experience</h2>
      {#each cvData.experience as exp}
        {#if exp.jobTitle || exp.company}
          <div class="entry">
            <div class="entry-header">
              <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
              <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
            </div>
            <div class="company">{exp.company || 'Company Name'}</div>
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
              <div class="date">{edu.year}</div>
            </div>
            <div class="institution">{edu.institution || 'Institution'}</div>
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
              <div class="date">{cert.year}</div>
            </div>
            <div class="institution">{cert.issuer}</div>
          </div>
        {/each}
      </section>
    {/if}

    {#if cvData.projects.length > 0}
      <section class="section">
        <h2 class="section-title">Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <h3 class="project-name">{proj.name}</h3>
            {#if proj.url}
              <a href={proj.url} class="project-url" target="_blank">{proj.url}</a>
            {/if}
            <p class="description">{proj.description}</p>
          </div>
        {/each}
      </section>
    {/if}

    {#if skills.length > 0}
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
          {#each skills as skill}
            <span>{skill}</span>
          {/each}
        </div>
      </section>
    {/if}
  </div>
</div>

<style>
  .cv-template.elegant {
    font-family: 'Garamond', serif;
    color: #333;
    background: #fdfdfd;
    padding: 2.5rem;
    font-size: 11pt;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
    border-bottom: 2px solid #d3c5b3;
    padding-bottom: 1rem;
  }

  .name {
    font-size: 28pt;
    font-weight: 600;
    color: #4a4a4a;
    margin-bottom: 0.5rem;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .contact-info {
    font-size: 10pt;
    color: #666;
  }

  .contact-info .separator {
    margin: 0 0.75rem;
  }

  .main-content {
    line-height: 1.5;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .summary p {
    text-align: center;
    font-style: italic;
    color: #555;
    max-width: 80%;
    margin: 0 auto;
  }

  .section-title {
    font-size: 14pt;
    font-weight: 600;
    color: #6a5c4d;
    margin-bottom: 1rem;
    border-bottom: 1px solid #d3c5b3;
    padding-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .entry {
    margin-bottom: 1rem;
  }

  .entry:last-child {
    margin-bottom: 0;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.1rem;
  }

  .job-title, .degree, .cert-name, .project-name {
    font-size: 12pt;
    font-weight: bold;
    color: #4a4a4a;
  }

  .company, .institution {
    font-size: 11pt;
    font-style: italic;
    color: #555;
    margin-bottom: 0.25rem;
  }

  .date {
    font-size: 10pt;
    color: #777;
    font-style: italic;
  }

  .description {
    font-size: 10pt;
    color: #444;
  }

  .project-url {
    font-size: 10pt;
    color: #6a5c4d;
    text-decoration: none;
    display: block;
    margin-bottom: 0.25rem;
  }

  .project-url:hover {
    text-decoration: underline;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 10pt;
  }
</style>
