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

<div class="cv-template clean">
  <header class="header">
    <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
    <div class="contact-info">
      <span>{cvData.email}</span>
      <span>{cvData.phone}</span>
      <span>{cvData.location}</span>
    </div>
  </header>

  {#if cvData.summary}
    <section class="section summary">
      <p>{cvData.summary}</p>
    </section>
  {/if}

  <div class="content">
    <section class="section">
      <h2 class="section-title">Experience</h2>
      {#each cvData.experience as exp}
        <div class="entry">
          <div class="entry-left">
            <h3 class="job-title">{exp.jobTitle}</h3>
            <div class="company">{exp.company}</div>
          </div>
          <div class="entry-right">
            <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
            <p class="description">{exp.description}</p>
          </div>
        </div>
      {/each}
    </section>

    <section class="section">
      <h2 class="section-title">Education</h2>
      {#each cvData.education as edu}
        <div class="entry">
          <div class="entry-left">
            <h3 class="degree">{edu.degree}</h3>
            <div class="institution">{edu.institution}</div>
          </div>
          <div class="entry-right">
            <div class="date">{edu.year}</div>
          </div>
        </div>
      {/each}
    </section>

    {#if cvData.projects.length > 0}
      <section class="section">
        <h2 class="section-title">Projects</h2>
        {#each cvData.projects as proj}
          <div class="entry">
            <div class="entry-left">
              <h3 class="project-name">{proj.name}</h3>
            </div>
            <div class="entry-right">
              <p class="description">{proj.description}</p>
            </div>
          </div>
        {/each}
      </section>
    {/if}

    <div class="grid-section">
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
  </div>
</div>

<style>
  .cv-template.clean {
    font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background: #fff;
    padding: 2.5rem;
    font-size: 10pt;
    color: #444;
  }

  .header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .name {
    font-size: 24pt;
    font-weight: 300;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    gap: 2rem;
    font-size: 9.5pt;
    color: #7f8c8d;
  }

  .summary {
    text-align: center;
    font-size: 10.5pt;
    margin-bottom: 2rem;
    color: #34495e;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 12pt;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #2980b9;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ecf0f1;
  }

  .entry {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1.5rem;
    margin-bottom: 1rem;
  }

  .entry-left {
    text-align: right;
  }

  .job-title, .degree, .project-name {
    font-size: 11pt;
    font-weight: 700;
    color: #34495e;
  }

  .company, .institution {
    font-size: 10pt;
    color: #7f8c8d;
  }

  .date {
    font-size: 9pt;
    font-weight: 700;
    color: #95a5a6;
    margin-bottom: 0.25rem;
  }

  .description {
    line-height: 1.6;
  }

  .grid-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
  }

  .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: flex-end;
  }

  .skill-tag {
      background-color: #ecf0f1;
      color: #7f8c8d;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-size: 9pt;
  }

  .cert-entry {
      text-align: right;
  }
</style>
