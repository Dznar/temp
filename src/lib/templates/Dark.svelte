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

<div class="cv-template dark">
  <header class="header">
    <h1 class="name">{cvData.fullName}</h1>
    <div class="contact-info">
      <span>{cvData.email}</span> | <span>{cvData.phone}</span> | <span>{cvData.location}</span>
    </div>
  </header>

  <div class="content">
    <div class="column left">
      {#if cvData.summary}
        <section class="section">
          <h2 class="section-title">Summary</h2>
          <p>{cvData.summary}</p>
        </section>
      {/if}

      <section class="section">
        <h2 class="section-title">Experience</h2>
        {#each cvData.experience as exp}
          <div class="entry">
            <h3 class="job-title">{exp.jobTitle}</h3>
            <div class="company-date">
              <span class="company">{exp.company}</span>
              <span class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
            </div>
            <p class="description">{exp.description}</p>
          </div>
        {/each}
      </section>
    </div>

    <div class="column right">
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
          {#each skills as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">Education</h2>
        {#each cvData.education as edu}
          <div class="entry">
            <h3 class="degree">{edu.degree}</h3>
            <div class="institution">{edu.institution} - {edu.year}</div>
          </div>
        {/each}
      </section>

      {#if cvData.certificates.length > 0}
        <section class="section">
          <h2 class="section-title">Certificates</h2>
          {#each cvData.certificates as cert}
            <div class="entry">
              <h3 class="cert-name">{cert.name}</h3>
              <div class="institution">{cert.issuer} - {cert.year}</div>
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
              <p class="description">{proj.description}</p>
            </div>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .cv-template.dark {
    font-family: 'Roboto', sans-serif;
    background: #1a1a1a;
    color: #e0e0e0;
    padding: 2.5rem;
    font-size: 10pt;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 26pt;
    font-weight: 300;
    color: #00aaff;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    font-size: 10pt;
    color: #aaa;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }

  .section-title {
    font-size: 13pt;
    font-weight: 400;
    color: #00aaff;
    border-bottom: 1px solid #444;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }

  .entry {
    margin-bottom: 1.5rem;
  }

  .job-title, .degree, .cert-name, .project-name {
    font-size: 11pt;
    font-weight: 500;
    color: #f0f0f0;
  }

  .company-date {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0 0.4rem;
    color: #aaa;
    font-size: 9pt;
  }

  .description {
    line-height: 1.6;
    color: #ccc;
  }

  .right .institution {
      color: #aaa;
      font-size: 9pt;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: #333;
    color: #e0e0e0;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    font-size: 9pt;
  }
</style>
