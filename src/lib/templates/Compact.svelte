<script lang="ts">
  import type { CVData } from '../types';
  export let cvData: CVData;

  const skills = cvData.skills.split(',').map(s => s.trim()).filter(s => s);

  function formatDate(dateStr: string): string {
    if (!dateStr) return 'Present';
    const date = new Date(dateStr + '-01');
    return date.toLocaleDateString('en-US', { year: '2-digit', month: 'short' });
  }
</script>

<div class="cv-template compact">
  <div class="header">
    <div class="name-title">
      <h1 class="name">{cvData.fullName || 'Your Name'}</h1>
      <div class="summary">{cvData.summary}</div>
    </div>
    <div class="contact-info">
      <div>{cvData.email}</div>
      <div>{cvData.phone}</div>
      <div>{cvData.location}</div>
    </div>
  </div>

  <div class="content">
    <section class="section experience">
      <h2 class="section-title">Experience</h2>
      <table>
        {#each cvData.experience as exp}
          <tr>
            <td class="date">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</td>
            <td class="details">
              <div class="job-title">{exp.jobTitle}</div>
              <div class="company">{exp.company}</div>
              <p class="description">{exp.description}</p>
            </td>
          </tr>
        {/each}
      </table>
    </section>

    <div class="row-sections">
      <section class="section education">
        <h2 class="section-title">Education</h2>
        <table>
          {#each cvData.education as edu}
            <tr>
              <td class="date">{edu.year}</td>
              <td class="details">
                <div class="degree">{edu.degree}</div>
                <div class="institution">{edu.institution}</div>
              </td>
            </tr>
          {/each}
        </table>
      </section>

      <section class="section skills">
        <h2 class="section-title">Skills</h2>
        <p>{skills.join(' | ')}</p>
      </section>
    </div>

    {#if cvData.projects.length > 0 || cvData.certificates.length > 0}
    <div class="row-sections">
        <section class="section projects">
          <h2 class="section-title">Projects</h2>
          {#each cvData.projects as proj}
            <div class="entry"><strong>{proj.name}:</strong> {proj.description}</div>
          {/each}
        </section>

        <section class="section certificates">
          <h2 class="section-title">Certificates</h2>
          {#each cvData.certificates as cert}
            <div class="entry"><strong>{cert.name}</strong> ({cert.issuer}, {cert.year})</div>
          {/each}
        </section>
      </div>
    {/if}
  </div>
</div>

<style>
  .cv-template.compact {
    font-family: 'Arial', sans-serif;
    background: #fff;
    padding: 2rem;
    font-size: 9pt;
    line-height: 1.4;
    color: #333;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ccc;
    padding-bottom: 1rem;
  }

  .name {
    font-size: 20pt;
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  .summary {
    font-size: 9pt;
    max-width: 400px;
  }

  .contact-info {
    text-align: right;
    font-size: 8.5pt;
  }

  .section {
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 11pt;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    vertical-align: top;
    padding-bottom: 0.8rem;
  }

  td.date {
    width: 100px;
    font-weight: bold;
    color: #666;
    padding-right: 1rem;
  }

  .job-title, .degree {
    font-weight: bold;
    font-size: 10pt;
  }

  .company, .institution {
    font-style: italic;
    color: #444;
    margin-bottom: 0.2rem;
  }

  .description {
    font-size: 8.5pt;
    text-align: justify;
  }

  .row-sections {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    border-top: 1px solid #eee;
    padding-top: 1rem;
  }

  .skills p {
    font-size: 8.5pt;
  }

  .entry {
    font-size: 8.5pt;
    margin-bottom: 0.3rem;
  }
</style>
