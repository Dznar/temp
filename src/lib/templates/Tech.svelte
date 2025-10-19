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

<div class="cv-template tech">
  <header class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <a href="mailto:{cvData.email}">{cvData.email || 'email@example.com'}</a>
      <a href="tel:{cvData.phone}">{cvData.phone || '+1 (555) 123-4567'}</a>
      <span>{cvData.location || 'City, State'}</span>
    </div>
  </header>

  <div class="content">
    <div class="column left">
      {#if cvData.summary}
        <section class="section">
          <h2 class="section-title">// SUMMARY</h2>
          <p>{cvData.summary}</p>
        </section>
      {/if}

      <section class="section">
        <h2 class="section-title">// EXPERIENCE</h2>
        {#each cvData.experience as exp}
          <div class="entry">
            <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
            <div class="company-date">
              <span class="company">{exp.company || 'Company Name'}</span>
              <span class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</span>
            </div>
            <p class="description">{exp.description}</p>
          </div>
        {/each}
      </section>

      {#if cvData.projects.length > 0}
        <section class="section">
          <h2 class="section-title">// PROJECTS</h2>
          {#each cvData.projects as proj}
            <div class="entry">
              <h3 class="project-name">{proj.name}</h3>
              {#if proj.url}<a href={proj.url} class="project-url" target="_blank">{proj.url}</a>{/if}
              <p class="description">{proj.description}</p>
            </div>
          {/each}
        </section>
      {/if}
    </div>

    <div class="column right">
      <section class="section skills-section">
        <h2 class="section-title">// SKILLS</h2>
        <div class="skills-list">
          {#each skills as skill}
            <span class="skill-tag">{skill}</span>
          {/each}
        </div>
      </section>

      <section class="section">
        <h2 class="section-title">// EDUCATION</h2>
        {#each cvData.education as edu}
          <div class="entry">
            <h3 class="degree">{edu.degree || 'Degree'}</h3>
            <div class="institution">{edu.institution || 'Institution'}</div>
            <div class="year">{edu.year}</div>
          </div>
        {/each}
      </section>

      {#if cvData.certificates.length > 0}
        <section class="section">
          <h2 class="section-title">// CERTIFICATES</h2>
          {#each cvData.certificates as cert}
            <div class="entry">
              <h3 class="cert-name">{cert.name}</h3>
              <div class="institution">{cert.issuer} - {cert.year}</div>
            </div>
          {/each}
        </section>
      {/if}
    </div>
  </div>
</div>

<style>
  .cv-template.tech {
    font-family: 'Fira Code', 'Source Code Pro', monospace;
    background: #0d1117;
    color: #c9d1d9;
    padding: 2.5rem;
    font-size: 10pt;
    border: 1px solid #30363d;
  }

  .header {
    margin-bottom: 2rem;
    border-bottom: 1px solid #30363d;
    padding-bottom: 1rem;
  }

  .name {
    font-size: 24pt;
    font-weight: 500;
    color: #58a6ff;
  }

  .name::after {
    content: '_';
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    50% { opacity: 0; }
  }

  .contact-info {
    display: flex;
    gap: 1.5rem;
    margin-top: 0.5rem;
    font-size: 9pt;
  }

  .contact-info a {
    color: #8b949e;
    text-decoration: none;
  }
  .contact-info a:hover {
    color: #58a6ff;
    text-decoration: underline;
  }

  .content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 2rem;
  }

  .section-title {
    font-size: 13pt;
    font-weight: 500;
    color: #f0a623;
    margin-bottom: 1rem;
  }

  .entry {
    margin-bottom: 1.5rem;
  }

  .job-title, .project-name, .degree, .cert-name {
    font-size: 11pt;
    font-weight: 500;
    color: #79c0ff;
    margin-bottom: 0.25rem;
  }

  .company-date {
    display: flex;
    justify-content: space-between;
    font-size: 9pt;
    color: #8b949e;
    margin-bottom: 0.5rem;
  }

  .description {
    font-size: 9.5pt;
    line-height: 1.6;
    color: #c9d1d9;
  }

  .project-url {
    display: block;
    margin-bottom: 0.5rem;
    color: #f0a623;
    text-decoration: none;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-tag {
    background: #21262d;
    border: 1px solid #30363d;
    color: #c9d1d9;
    padding: 0.3rem 0.7rem;
    border-radius: 0.3rem;
    font-size: 9pt;
  }

  .institution, .year {
    font-size: 9pt;
    color: #8b949e;
  }
</style>
