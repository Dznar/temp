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

<div class="cv-template monochrome">
  <header class="header">
    <h1 class="name">{cvData.fullName}</h1>
    <div class="contact-info">
      <span>{cvData.email}</span>
      <span>{cvData.phone}</span>
      <span>{cvData.location}</span>
    </div>
  </header>

  <div class="content">
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
            <h3 class="job-title">{exp.jobTitle}</h3>
            <div class="company">{exp.company}</div>
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
            <h3 class="degree">{edu.degree}</h3>
            <div class="institution">{edu.institution}</div>
            <div class="date">{edu.year}</div>
          </div>
        </div>
      {/each}
    </section>

    <div class="columns">
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
          {#each skills as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </section>

      {#if cvData.certificates.length > 0}
        <section class="section">
          <h2 class="section-title">Certificates</h2>
          {#each cvData.certificates as cert}
            <div class="cert-entry">{cert.name} ({cert.year})</div>
          {/each}
        </section>
      {/if}
    </div>

    {#if cvData.projects.length > 0}
      <section class="section">
        <h2 class="section-title">Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <h3 class="project-name">{proj.name}</h3>
            <p class="description">{proj.description}</p>
          </div>
        {/each}
      </section>
    {/if}
  </div>
</div>

<style>
  .cv-template.monochrome {
    font-family: 'Georgia', serif;
    background: #fff;
    padding: 2.5rem;
    font-size: 11pt;
    color: #000;
  }

  .header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid #000;
  }

  .name {
    font-size: 28pt;
    font-weight: normal;
    text-align: center;
    letter-spacing: 4px;
    margin-bottom: 1rem;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 10pt;
  }

  .summary {
    text-align: center;
    font-style: italic;
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 1rem;
    text-align: center;
  }

  .entry {
    margin-bottom: 1.25rem;
  }

  .entry-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: baseline;
    gap: 0 1rem;
    margin-bottom: 0.25rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.25rem;
  }

  .job-title, .degree, .project-name {
    font-weight: bold;
    font-size: 11pt;
  }

  .company, .institution {
    grid-column: 1;
    font-size: 10pt;
  }

  .date {
    grid-column: 2;
    grid-row: 1 / span 2;
    text-align: right;
    font-size: 9pt;
    font-style: italic;
  }

  .description {
    margin-top: 0.5rem;
    line-height: 1.5;
  }

  .columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    border: 1px solid #000;
    padding: 0.2rem 0.6rem;
    font-size: 9pt;
  }

  .cert-entry {
    margin-bottom: 0.25rem;
  }
</style>
