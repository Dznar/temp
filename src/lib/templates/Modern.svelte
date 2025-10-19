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

<div class="cv-template modern">
  <div class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.email || 'email@example.com'}</span>
      <span class="separator">•</span>
      <span>{cvData.phone || '+1 (555) 123-4567'}</span>
      <span class="separator">•</span>
      <span>{cvData.location || 'City, State'}</span>
    </div>
  </div>

  <div class="content">
    <div class="main-col">
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
            <div class="entry-header">
              <h3 class="job-title">{exp.jobTitle || 'Job Title'}</h3>
              <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
            </div>
            <div class="company">{exp.company || 'Company Name'}</div>
            <p class="description">{exp.description}</p>
          </div>
        {/each}
      </section>

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

    <div class="sidebar">
      <section class="section">
        <h2 class="section-title">Education</h2>
        {#each cvData.education as edu}
          <div class="entry">
            <h3 class="degree">{edu.degree || 'Degree'}</h3>
            <div class="institution">{edu.institution || 'Institution'}</div>
            <div class="year">{edu.year}</div>
          </div>
        {/each}
      </section>

      {#if skills.length > 0}
        <section class="section">
          <h2 class="section-title">Skills</h2>
          <ul class="skills-list">
            {#each skills as skill}
              <li>{skill}</li>
            {/each}
          </ul>
        </section>
      {/if}

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
    </div>
  </div>
</div>

<style>
  .cv-template.modern {
    font-family: 'Inter', sans-serif;
    background: #fff;
    padding: 2.5rem;
    font-size: 10pt;
    color: #334155;
  }

  .header {
    margin-bottom: 2rem;
    text-align: left;
  }

  .name {
    font-size: 26pt;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    font-size: 9.5pt;
    color: #475569;
  }

  .contact-info .separator {
    margin: 0 0.5rem;
    color: #cbd5e1;
  }

  .content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2.5rem;
  }

  .section {
    margin-bottom: 1.75rem;
  }

  .section-title {
    font-size: 12pt;
    font-weight: 600;
    color: #0ea5e9;
    margin-bottom: 1rem;
    padding-bottom: 0.4rem;
    border-bottom: 2px solid #0ea5e9;
  }

  .sidebar .section-title {
    color: #64748b;
    border-bottom-color: #cbd5e1;
  }

  .entry {
    margin-bottom: 1.25rem;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.2rem;
  }

  .job-title, .project-name, .degree, .cert-name {
    font-size: 11pt;
    font-weight: 600;
    color: #1e293b;
  }

  .company, .institution {
    font-size: 10pt;
    color: #475569;
    margin-bottom: 0.3rem;
  }

  .date, .year {
    font-size: 9pt;
    color: #64748b;
    font-style: italic;
  }

  .description {
    font-size: 9.5pt;
    line-height: 1.5;
  }

  .project-url {
    font-size: 9pt;
    color: #0ea5e9;
    text-decoration: none;
  }

  .skills-list {
    list-style: none;
    padding: 0;
  }

  .skills-list li {
    background: #f1f5f9;
    color: #475569;
    padding: 0.3rem 0.7rem;
    border-radius: 0.3rem;
    margin-bottom: 0.5rem;
    font-size: 9pt;
  }
</style>
