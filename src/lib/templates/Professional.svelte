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

<div class="cv-template professional">
  <div class="sidebar">
    <h1 class="name">{cvData.fullName}</h1>
    {#if cvData.summary}
      <p class="summary">{cvData.summary}</p>
    {/if}
  </div>

  <div class="main-content">
    <section class="section contact">
      <h2 class="section-title">Contact</h2>
      <div class="contact-grid">
        <div><strong>Email</strong><br>{cvData.email}</div>
        <div><strong>Phone</strong><br>{cvData.phone}</div>
        <div><strong>Location</strong><br>{cvData.location}</div>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Work Experience</h2>
      {#each cvData.experience as exp}
        <div class="entry">
          <div class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</div>
          <h3 class="job-title">{exp.jobTitle}</h3>
          <div class="company">{exp.company}</div>
          <p class="description">{exp.description}</p>
        </div>
      {/each}
    </section>

    <section class="section">
      <h2 class="section-title">Education</h2>
      {#each cvData.education as edu}
        <div class="entry">
          <div class="date">{edu.year}</div>
          <h3 class="degree">{edu.degree}</h3>
          <div class="institution">{edu.institution}</div>
        </div>
      {/each}
    </section>

    <div class="grid-2-col">
      <section class="section">
        <h2 class="section-title">Skills</h2>
        <ul class="skills-list">
          {#each skills as skill}
            <li>{skill}</li>
          {/each}
        </ul>
      </section>

      {#if cvData.certificates.length > 0}
        <section class="section">
          <h2 class="section-title">Certifications</h2>
          {#each cvData.certificates as cert}
            <div class="cert-entry"><strong>{cert.name}</strong>, {cert.issuer} ({cert.year})</div>
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
  .cv-template.professional {
    display: grid;
    grid-template-columns: 1fr 2fr;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10pt;
    background: #f4f4f4;
    color: #333;
  }

  .sidebar {
    background: #2c3e50;
    color: #ecf0f1;
    padding: 2.5rem;
  }

  .name {
    font-size: 26pt;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1.5rem;
  }

  .summary {
    font-size: 9.5pt;
    line-height: 1.6;
    border-top: 1px solid #7f8c8d;
    padding-top: 1rem;
  }

  .main-content {
    padding: 2.5rem;
  }

  .section {
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 12pt;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .contact {
    background: #ecf0f1;
    padding: 1rem;
    border-radius: 4px;
    margin-top: -1rem;
  }
  .contact .section-title {
      margin-bottom: 0.5rem;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 0.5rem;
  }

  .entry {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
  }

  .entry::before {
    content: '';
    position: absolute;
    left: 0;
    top: 5px;
    width: 6px;
    height: 6px;
    background: #3498db;
    border-radius: 50%;
  }

  .date {
    position: absolute;
    left: 1.5rem;
    top: -1.2rem;
    font-size: 8pt;
    font-weight: bold;
    color: #95a5a6;
  }

  .job-title, .degree, .project-name {
    font-size: 11pt;
    font-weight: bold;
  }

  .company, .institution {
    font-style: italic;
    color: #555;
    margin-bottom: 0.3rem;
  }

  .description {
    font-size: 9.5pt;
  }

  .grid-2-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  .skills-list {
    list-style-type: none;
    padding: 0;
  }

  .skills-list li {
    margin-bottom: 0.3rem;
  }

  .cert-entry {
    font-size: 9.5pt;
    margin-bottom: 0.3rem;
  }
</style>
