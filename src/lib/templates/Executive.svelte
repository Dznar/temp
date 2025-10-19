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

<div class="cv-template executive">
  <div class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.location}</span> | <span>{cvData.phone}</span> | <span>{cvData.email}</span>
    </div>
  </div>

  <div class="content">
    <div class="main-column">
      {#if cvData.summary}
        <section class="section summary">
          <h2 class="section-title">PROFESSIONAL PROFILE</h2>
          <p>{cvData.summary}</p>
        </section>
      {/if}

      <section class="section">
        <h2 class="section-title">PROFESSIONAL EXPERIENCE</h2>
        {#each cvData.experience as exp}
          <div class="entry">
            <div class="entry-header">
              <h3 class="job-title">{exp.jobTitle}</h3>
              <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
            </div>
            <div class="company">{exp.company}</div>
            <p class="description">{exp.description}</p>
          </div>
        {/each}
      </section>

      {#if cvData.projects.length > 0}
        <section class="section">
          <h2 class="section-title">KEY PROJECTS</h2>
          {#each cvData.projects as proj}
            <div class="entry">
              <h3 class="project-name">{proj.name}</h3>
              <p class="description">{proj.description}</p>
            </div>
          {/each}
        </section>
      {/if}
    </div>

    <div class="sidebar">
      <section class="section">
        <h2 class="section-title">EDUCATION</h2>
        {#each cvData.education as edu}
          <div class="entry">
            <h3 class="degree">{edu.degree}</h3>
            <div class="institution">{edu.institution}</div>
            <div class="year">{edu.year}</div>
          </div>
        {/each}
      </section>

      <section class="section">
        <h2 class="section-title">SKILLS</h2>
        <ul class="skills-list">
          {#each skills as skill}
            <li>{skill}</li>
          {/each}
        </ul>
      </section>

      {#if cvData.certificates.length > 0}
        <section class="section">
          <h2 class="section-title">CERTIFICATIONS</h2>
          {#each cvData.certificates as cert}
            <div class="cert-entry">{cert.name} ({cert.year})</div>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .cv-template.executive {
    font-family: 'Calibri', 'Helvetica Neue', sans-serif;
    background: #ffffff;
    padding: 2.5rem;
    font-size: 10.5pt;
    color: #2d3748;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 28pt;
    font-weight: 600;
    color: #1a202c;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    font-size: 10pt;
    color: #4a5568;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 11pt;
    font-weight: 700;
    color: #2d3748;
    border-bottom: 2px solid #2d3748;
    padding-bottom: 0.4rem;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  .summary p {
    line-height: 1.6;
  }

  .entry {
    margin-bottom: 1.25rem;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .job-title, .project-name, .degree {
    font-size: 11pt;
    font-weight: 700;
    color: #1a202c;
  }

  .company, .institution {
    font-size: 10pt;
    font-style: italic;
    color: #4a5568;
    margin: 0.1rem 0 0.3rem;
  }

  .date, .year {
    font-size: 9.5pt;
    color: #718096;
  }

  .description {
    font-size: 10pt;
    line-height: 1.5;
  }

  .sidebar .section-title {
    color: #4a5568;
    border-bottom-color: #718096;
  }

  .skills-list {
    padding-left: 1.2rem;
    margin: 0;
  }

  .skills-list li {
    margin-bottom: 0.4rem;
  }

  .cert-entry {
    font-size: 10pt;
    margin-bottom: 0.3rem;
  }
</style>
